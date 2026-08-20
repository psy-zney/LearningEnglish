export type ApiErrorCode = "CONFIG" | "HTTP" | "NETWORK" | "TIMEOUT" | "PARSE";

export class ApiClientError extends Error {
  readonly code: ApiErrorCode;
  readonly status: number | null;
  readonly details: unknown;

  constructor(message: string, options: { code: ApiErrorCode; status?: number; details?: unknown; cause?: unknown }) {
    super(message, { cause: options.cause });
    this.name = "ApiClientError";
    this.code = options.code;
    this.status = options.status ?? null;
    this.details = options.details ?? null;
  }
}

export function normalizeApiBaseUrl(value = process.env.NEXT_PUBLIC_API_URL): string {
  const trimmed = value?.trim().replace(/\/+$/, "");
  if (!trimmed) {
    throw new ApiClientError("NEXT_PUBLIC_API_URL is not configured.", { code: "CONFIG" });
  }

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch (cause) {
    throw new ApiClientError("NEXT_PUBLIC_API_URL must be an absolute HTTP(S) URL.", { code: "CONFIG", cause });
  }

  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.search || url.hash) {
    throw new ApiClientError("NEXT_PUBLIC_API_URL must be a public HTTP(S) base URL without credentials, query, or hash.", { code: "CONFIG" });
  }

  return trimmed;
}

export function buildApiUrl(path: string, baseUrl?: string): string {
  const base = normalizeApiBaseUrl(baseUrl);
  const normalizedPath = `/${path.trim().replace(/^\/+/, "")}`;
  return `${base}${normalizedPath}`;
}

type ApiRequestOptions = Omit<RequestInit, "signal"> & {
  baseUrl?: string;
  fetcher?: typeof fetch;
  signal?: AbortSignal;
  timeoutMs?: number;
};

function errorMessage(payload: unknown, fallback: string) {
  if (payload && typeof payload === "object" && "error" in payload && typeof payload.error === "string") {
    return payload.error;
  }
  if (typeof payload === "string" && payload.trim()) return payload.trim();
  return fallback;
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const {
    baseUrl,
    fetcher = fetch,
    timeoutMs = 10_000,
    signal: callerSignal,
    headers: inputHeaders,
    ...requestInit
  } = options;
  const url = buildApiUrl(path, baseUrl);
  const controller = new AbortController();
  let didTimeout = false;
  const abortFromCaller = () => controller.abort(callerSignal?.reason);
  callerSignal?.addEventListener("abort", abortFromCaller, { once: true });
  if (callerSignal?.aborted) abortFromCaller();
  const timeout = setTimeout(() => {
    didTimeout = true;
    controller.abort(new DOMException("Request timed out", "TimeoutError"));
  }, Math.max(1, timeoutMs));

  const headers = new Headers(inputHeaders);
  headers.set("Accept", "application/json");
  if (requestInit.body !== undefined && !(requestInit.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  let response: Response;
  let raw: string;
  try {
    response = await fetcher(url, {
      cache: "no-store",
      ...requestInit,
      headers,
      signal: controller.signal,
    });
    if (response.status === 204) return undefined as T;
    raw = await response.text();
  } catch (cause) {
    if (didTimeout) {
      throw new ApiClientError(`Backend did not respond within ${timeoutMs}ms.`, { code: "TIMEOUT", cause });
    }
    throw new ApiClientError("Unable to reach the LearningEnglish backend.", { code: "NETWORK", cause });
  } finally {
    clearTimeout(timeout);
    callerSignal?.removeEventListener("abort", abortFromCaller);
  }

  let payload: unknown = null;
  if (raw) {
    try {
      payload = JSON.parse(raw);
    } catch (cause) {
      if (response.ok) {
        throw new ApiClientError("Backend returned an invalid JSON response.", {
          code: "PARSE",
          status: response.status,
          cause,
        });
      }
      payload = raw;
    }
  }

  if (!response.ok) {
    throw new ApiClientError(errorMessage(payload, `Backend request failed with status ${response.status}.`), {
      code: "HTTP",
      status: response.status,
      details: payload,
    });
  }

  return payload as T;
}
