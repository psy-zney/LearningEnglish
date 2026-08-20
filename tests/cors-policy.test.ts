import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  isOriginAllowed,
  parseAllowedOrigins,
  setVaryOrigin,
} from "../src/lib/cors-policy.ts";

const frontendOrigin = "https://study.zney295.id.vn";
const backendOrigin = "https://learning.zney295.id.vn";

test("parses a trimmed, exact origin allowlist", () => {
  const origins = parseAllowedOrigins(` ${frontendOrigin}, http://localhost:1002 ,,`);
  assert.deepEqual(origins, [frontendOrigin, "http://localhost:1002"]);
});

test("allows no-Origin and exact configured or same-origin requests", () => {
  const configured = parseAllowedOrigins(frontendOrigin);
  assert.equal(isOriginAllowed(null, backendOrigin, configured), true);
  assert.equal(isOriginAllowed(frontendOrigin, backendOrigin, configured), true);
  assert.equal(isOriginAllowed(backendOrigin, backendOrigin, configured), true);
});

test("rejects lookalike origins without reflection or wildcard matching", () => {
  const configured = parseAllowedOrigins(frontendOrigin);
  assert.equal(isOriginAllowed("http://study.zney295.id.vn", backendOrigin, configured), false);
  assert.equal(isOriginAllowed("https://study.zney295.id.vn.evil.example", backendOrigin, configured), false);
  assert.equal(isOriginAllowed("https://evil.example", backendOrigin, configured), false);
});

test("adds Origin to Vary without overwriting existing cache keys", () => {
  const headers = new Headers({ Vary: "Accept-Encoding" });
  setVaryOrigin(headers);
  setVaryOrigin(headers);
  assert.equal(headers.get("Vary"), "Accept-Encoding, Origin");
});

test("the documented backend allowlist includes the production frontend origin", () => {
  const example = readFileSync(new URL("../.env.example", import.meta.url), "utf8");
  assert.match(example, /^ALLOWED_ORIGINS=.*https:\/\/study\.zney295\.id\.vn/m);
});
