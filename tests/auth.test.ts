import assert from "node:assert/strict";
import test from "node:test";

import {
  createSessionToken,
  isAuthorizedRequest,
  verifyPasswordHash,
  verifySessionToken,
} from "../src/lib/auth.ts";

const secret = "a-production-length-secret-value-for-tests";
const passwordHash = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918";

test("compares password hashes without accepting a wrong password", () => {
  assert.equal(verifyPasswordHash("admin", passwordHash), true);
  assert.equal(verifyPasswordHash("wrong", passwordHash), false);
  assert.equal(verifyPasswordHash("admin", "not-a-sha256-hash"), false);
});

test("creates expiring signed session tokens and rejects tampering", () => {
  const now = new Date("2026-08-21T12:00:00.000Z");
  const token = createSessionToken(secret, now, 60);
  assert.equal(verifySessionToken(token, secret, new Date(now.getTime() + 59_000)), true);
  assert.equal(verifySessionToken(token, secret, new Date(now.getTime() + 61_000)), false);
  assert.equal(verifySessionToken(`${token}x`, secret, now), false);
  assert.equal(verifySessionToken(token, `${secret}x`, now), false);
});

test("authorizes a signed cookie or bearer session and rejects missing credentials", () => {
  const now = new Date("2026-08-21T12:00:00.000Z");
  const token = createSessionToken(secret, now, 60);
  assert.equal(isAuthorizedRequest(new Request("https://example.test/api/x", {
    headers: { cookie: `learning_session=${token}` },
  }), secret, now), true);
  assert.equal(isAuthorizedRequest(new Request("https://example.test/api/x", {
    headers: { authorization: `Bearer ${token}` },
  }), secret, now), true);
  assert.equal(isAuthorizedRequest(new Request("https://example.test/api/x"), secret, now), false);
});
