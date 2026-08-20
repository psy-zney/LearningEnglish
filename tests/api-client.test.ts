import assert from "node:assert/strict";
import test from "node:test";

import {
  ApiClientError,
  apiRequest,
  buildApiUrl,
  normalizeApiBaseUrl,
} from "../src/lib/api-client.ts";

const backendUrl = "https://learning.zney295.id.vn";

test("normalizes the API base URL and joins paths without duplicate slashes", () => {
  assert.equal(normalizeApiBaseUrl(`${backendUrl}/`), backendUrl);
  assert.equal(buildApiUrl("/api/dashboard", `${backendUrl}/`), `${backendUrl}/api/dashboard`);
  assert.equal(buildApiUrl("api/dashboard", backendUrl), `${backendUrl}/api/dashboard`);
});

test("rejects a missing, malformed, or non-http API base URL with a structured config error", () => {
  for (const value of [undefined, "  ", "not-a-url", "file:dev.db", "https://user:pass@example.com"]) {
    assert.throws(
      () => normalizeApiBaseUrl(value),
      (error: unknown) => error instanceof ApiClientError && error.code === "CONFIG",
    );
  }
});

test("sends requests to the absolute backend URL and returns JSON", async () => {
  let requestedUrl = "";
  const fetcher: typeof fetch = async (input) => {
    requestedUrl = String(input);
    return Response.json({ ok: true });
  };

  const result = await apiRequest<{ ok: boolean }>("/api/dashboard", {
    baseUrl: `${backendUrl}/`,
    fetcher,
  });

  assert.equal(requestedUrl, `${backendUrl}/api/dashboard`);
  assert.deepEqual(result, { ok: true });
});

test("sets JSON request headers for a body while preserving custom headers", async () => {
  let sentHeaders = new Headers();
  const fetcher: typeof fetch = async (_input, init) => {
    sentHeaders = new Headers(init?.headers);
    return Response.json({ ok: true });
  };

  await apiRequest("/api/review/rate", {
    baseUrl: backendUrl,
    fetcher,
    method: "POST",
    headers: { Authorization: "Bearer test-token" },
    body: JSON.stringify({ rating: "good" }),
  });

  assert.equal(sentHeaders.get("Content-Type"), "application/json");
  assert.equal(sentHeaders.get("Authorization"), "Bearer test-token");
});

test("turns JSON and text HTTP failures into structured errors", async (t) => {
  await t.test("JSON error", async () => {
    const fetcher: typeof fetch = async () => Response.json(
      { error: "Origin is not allowed" },
      { status: 403 },
    );

    await assert.rejects(
      apiRequest("/api/dashboard", { baseUrl: backendUrl, fetcher }),
      (error: unknown) => error instanceof ApiClientError
        && error.code === "HTTP"
        && error.status === 403
        && error.message === "Origin is not allowed",
    );
  });

  await t.test("plain-text error", async () => {
    const fetcher: typeof fetch = async () => new Response("Tunnel unavailable", { status: 502 });

    await assert.rejects(
      apiRequest("/api/dashboard", { baseUrl: backendUrl, fetcher }),
      (error: unknown) => error instanceof ApiClientError
        && error.code === "HTTP"
        && error.status === 502
        && error.message === "Tunnel unavailable",
    );
  });

  await t.test("empty error body", async () => {
    const fetcher: typeof fetch = async () => new Response(null, { status: 503 });

    await assert.rejects(
      apiRequest("/api/dashboard", { baseUrl: backendUrl, fetcher }),
      (error: unknown) => error instanceof ApiClientError
        && error.code === "HTTP"
        && error.message === "Backend request failed with status 503.",
    );
  });
});

test("returns undefined for a successful no-content response", async () => {
  const fetcher: typeof fetch = async () => new Response(null, { status: 204 });
  assert.equal(await apiRequest("/api/activity/mission", { baseUrl: backendUrl, fetcher }), undefined);
});

test("reports malformed successful responses safely", async () => {
  const fetcher: typeof fetch = async () => new Response("not-json", {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

  await assert.rejects(
    apiRequest("/api/dashboard", { baseUrl: backendUrl, fetcher }),
    (error: unknown) => error instanceof ApiClientError && error.code === "PARSE",
  );
});

test("aborts slow requests and returns a structured timeout error", async () => {
  const fetcher: typeof fetch = async (_input, init) => new Promise((_resolve, reject) => {
    init?.signal?.addEventListener("abort", () => reject(init.signal?.reason), { once: true });
  });

  await assert.rejects(
    apiRequest("/api/dashboard", { baseUrl: backendUrl, fetcher, timeoutMs: 5 }),
    (error: unknown) => error instanceof ApiClientError && error.code === "TIMEOUT",
  );
});

test("keeps the timeout active while reading the response body", async () => {
  const fetcher: typeof fetch = async (_input, init) => new Response(new ReadableStream({
    start(controller) {
      const finish = setTimeout(() => {
        controller.enqueue(new TextEncoder().encode('{"ok":true}'));
        controller.close();
      }, 40);
      init?.signal?.addEventListener("abort", () => {
        clearTimeout(finish);
        controller.error(init.signal?.reason);
      }, { once: true });
    },
  }));

  await assert.rejects(
    apiRequest("/api/dashboard", { baseUrl: backendUrl, fetcher, timeoutMs: 5 }),
    (error: unknown) => error instanceof ApiClientError && error.code === "TIMEOUT",
  );
});

test("reports non-timeout fetch failures as structured network errors", async () => {
  const fetcher: typeof fetch = async () => {
    throw new TypeError("connection refused");
  };

  await assert.rejects(
    apiRequest("/api/dashboard", { baseUrl: backendUrl, fetcher }),
    (error: unknown) => error instanceof ApiClientError && error.code === "NETWORK",
  );
});
