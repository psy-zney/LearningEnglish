export function parseAllowedOrigins(value: string | undefined): string[] {
  return (value ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export function isOriginAllowed(origin: string | null, requestOrigin: string, configuredOrigins: readonly string[]): boolean {
  if (!origin) return true;
  return origin === requestOrigin || configuredOrigins.includes(origin);
}

export function setVaryOrigin(headers: Headers): void {
  const values = (headers.get("Vary") ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  if (!values.some((value) => value.toLowerCase() === "origin")) values.push("Origin");
  headers.set("Vary", values.join(", "));
}
