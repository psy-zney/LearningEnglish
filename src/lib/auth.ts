import crypto from "node:crypto";

export const AUTH_COOKIE_NAME = "learning_session";
export const AUTH_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

const SHA256_PATTERN = /^[a-f0-9]{64}$/i;
const SESSION_PATTERN = /^v1\.(\d{10,13})\.([a-f0-9]{32})\.([a-f0-9]{64})$/;

export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

export function verifyPasswordHash(password: string, expectedHash: string): boolean {
  if (!SHA256_PATTERN.test(expectedHash)) return false;
  return safeEqual(hashPassword(password), expectedHash.toLowerCase());
}

export function getAdminPasswordHash(): string | null {
  const value = process.env.ADMIN_PASSWORD_HASH?.trim() ?? "";
  return SHA256_PATTERN.test(value) ? value.toLowerCase() : null;
}

export function getAuthSecret(): string | null {
  const value = process.env.TOKEN_SALT?.trim() ?? "";
  return value.length >= 32 && !value.startsWith("replace-with-") ? value : null;
}

export function verifyPassword(password: string): boolean {
  const expectedHash = getAdminPasswordHash();
  return Boolean(expectedHash && verifyPasswordHash(password, expectedHash));
}

function signSession(payload: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

export function createSessionToken(
  secret: string,
  now = new Date(),
  maxAgeSeconds = AUTH_SESSION_MAX_AGE_SECONDS,
): string {
  if (secret.length < 32) throw new Error("Authentication secret is not configured securely.");
  const expiresAt = Math.floor(now.getTime() / 1_000) + Math.max(1, Math.trunc(maxAgeSeconds));
  const payload = `v1.${expiresAt}.${crypto.randomBytes(16).toString("hex")}`;
  return `${payload}.${signSession(payload, secret)}`;
}

export function verifySessionToken(token: string, secret: string, now = new Date()): boolean {
  if (secret.length < 32 || token.length > 180) return false;
  const match = SESSION_PATTERN.exec(token);
  if (!match) return false;
  const expiresAt = Number(match[1]);
  if (!Number.isSafeInteger(expiresAt) || expiresAt < Math.floor(now.getTime() / 1_000)) return false;
  const payload = token.slice(0, token.lastIndexOf("."));
  return safeEqual(match[3], signSession(payload, secret));
}

function cookieValue(cookieHeader: string | null, name: string): string {
  if (!cookieHeader) return "";
  for (const entry of cookieHeader.split(";")) {
    const [key, ...parts] = entry.trim().split("=");
    if (key === name) return parts.join("=");
  }
  return "";
}

export function isAuthorizedRequest(request: Request, secret = getAuthSecret(), now = new Date()): boolean {
  if (!secret) return false;
  const bearer = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1] ?? "";
  const cookie = cookieValue(request.headers.get("cookie"), AUTH_COOKIE_NAME);
  return verifySessionToken(cookie || bearer, secret, now);
}

/** Compatibility helper for legacy route code; new code should validate the full request. */
export function verifyToken(token: string): boolean {
  const secret = getAuthSecret();
  return Boolean(secret && verifySessionToken(token, secret));
}
