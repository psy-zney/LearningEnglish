type RateEntry = { count: number; resetAt: number };

const rateEntries = new Map<string, RateEntry>();

export function requestClientKey(request: Request): string {
  return request.headers.get("cf-connecting-ip")
    ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? "local";
}

export function consumeRateLimit(key: string, limit: number, windowMs: number, now = Date.now()): boolean {
  const existing = rateEntries.get(key);
  if (!existing || existing.resetAt <= now) {
    rateEntries.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (existing.count >= limit) return false;
  existing.count += 1;
  return true;
}
