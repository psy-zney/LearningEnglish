import assert from "node:assert/strict";
import test from "node:test";
import { NextRequest } from "next/server.js";

import { config, proxy } from "../src/proxy.ts";

const frontendOrigin = "https://study.zney295.id.vn";
const backendUrl = "https://learning.zney295.id.vn/api/dashboard";
const initialMode = process.env.APP_DEPLOYMENT_MODE;
const initialOrigins = process.env.ALLOWED_ORIGINS;

test.after(() => {
  if (initialMode === undefined) delete process.env.APP_DEPLOYMENT_MODE;
  else process.env.APP_DEPLOYMENT_MODE = initialMode;
  if (initialOrigins === undefined) delete process.env.ALLOWED_ORIGINS;
  else process.env.ALLOWED_ORIGINS = initialOrigins;
});

test("matches only API paths", () => {
  assert.equal(config.matcher, "/api/:path*");
});

test("fails closed unless deployment mode is exactly backend", async () => {
  for (const mode of [undefined, "frontend", "backnd"]) {
    if (mode === undefined) delete process.env.APP_DEPLOYMENT_MODE;
    else process.env.APP_DEPLOYMENT_MODE = mode;
    const response = proxy(new NextRequest(backendUrl));
    assert.equal(response.status, 404);
  }
});

test("allows an exact production origin and adds CORS response headers", () => {
  process.env.APP_DEPLOYMENT_MODE = "backend";
  process.env.ALLOWED_ORIGINS = ` ${frontendOrigin}, http://localhost:1002 `;
  const response = proxy(new NextRequest(backendUrl, {
    headers: { Origin: frontendOrigin },
  }));

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Access-Control-Allow-Origin"), frontendOrigin);
  assert.match(response.headers.get("Vary") ?? "", /(?:^|,\s*)Origin(?:,|$)/i);
});

test("answers valid preflight and rejects a lookalike origin", () => {
  process.env.APP_DEPLOYMENT_MODE = "backend";
  process.env.ALLOWED_ORIGINS = frontendOrigin;
  const preflight = proxy(new NextRequest(backendUrl, {
    method: "OPTIONS",
    headers: {
      Origin: frontendOrigin,
      "Access-Control-Request-Method": "GET",
      "Access-Control-Request-Headers": "Content-Type",
    },
  }));
  assert.equal(preflight.status, 204);
  assert.equal(preflight.headers.get("Access-Control-Allow-Origin"), frontendOrigin);
  assert.match(preflight.headers.get("Access-Control-Allow-Methods") ?? "", /GET/);
  assert.match(preflight.headers.get("Access-Control-Allow-Headers") ?? "", /Content-Type/i);
  assert.match(preflight.headers.get("Vary") ?? "", /(?:^|,\s*)Origin(?:,|$)/i);

  const rejected = proxy(new NextRequest(backendUrl, {
    headers: { Origin: `${frontendOrigin}.evil.example` },
  }));
  assert.equal(rejected.status, 403);
  assert.equal(rejected.headers.get("Access-Control-Allow-Origin"), null);
  assert.match(rejected.headers.get("Vary") ?? "", /(?:^|,\s*)Origin(?:,|$)/i);
});
