import assert from "node:assert/strict";
import test from "node:test";

import { buildReviewQueue } from "../src/lib/queue-builder.ts";

test("can build an explicit reinforcement queue from not-yet-due items", () => {
  const now = new Date("2026-08-21T12:00:00.000Z");
  const queue = buildReviewQueue([
    { id: "future", kind: "verb", priority: 1, nextReviewAt: new Date("2026-08-22T12:00:00.000Z"), recentErrors: 2 },
    { id: "later", kind: "phrase", priority: 2, nextReviewAt: new Date("2026-08-23T12:00:00.000Z"), recentErrors: 0 },
  ], now, 30, { includeNotDue: true });

  assert.deepEqual(queue.map((item) => item.id), ["future", "later"]);
});
