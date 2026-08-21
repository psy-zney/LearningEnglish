import assert from "node:assert/strict";
import test from "node:test";

import { buildSessionTasks } from "../src/lib/daily-plan.ts";

test("builds exactly five enabled learning stations", () => {
  const tasks = buildSessionTasks({
    dueCount: 4,
    newCount: 8,
    recoveryMode: false,
    reviewsCompleted: 0,
    itemsLearned: 0,
    attemptModes: [],
  });

  assert.deepEqual(tasks.map((task) => task.id), [
    "review",
    "learn",
    "meaning",
    "context",
    "toeic_part_5",
  ]);
  assert.equal(tasks.length, 5);
  assert.equal(tasks.every((task) => !task.disabled), true);
});

test("switches learn to reinforcement during recovery without disabling it", () => {
  const [review, learn] = buildSessionTasks({
    dueCount: 60,
    newCount: 20,
    recoveryMode: true,
    reviewsCompleted: 20,
    itemsLearned: 0,
    attemptModes: Array.from({ length: 6 }, () => "reinforce"),
  });

  assert.equal(review.completed, true);
  assert.equal(learn.completed, true);
  assert.equal(learn.href, "/learn?mode=reinforce");
  assert.match(learn.detail, /củng cố/i);
  assert.equal(learn.disabled, false);
});

test("keeps completion evidence isolated per drill station", () => {
  const tasks = buildSessionTasks({
    dueCount: 0,
    newCount: 0,
    recoveryMode: false,
    reviewsCompleted: 0,
    itemsLearned: 0,
    attemptModes: [
      ...Array.from({ length: 4 }, () => "meaning"),
      ...Array.from({ length: 4 }, () => "reverse_meaning"),
      ...Array.from({ length: 8 }, () => "fill_blank"),
    ],
  });

  assert.equal(tasks.find((task) => task.id === "meaning")?.completed, true);
  assert.equal(tasks.find((task) => task.id === "context")?.completed, true);
  assert.equal(tasks.find((task) => task.id === "toeic_part_5")?.completed, false);
});

test("counts distinct questions instead of duplicate submissions", () => {
  const tasks = buildSessionTasks({
    dueCount: 0,
    newCount: 0,
    recoveryMode: false,
    reviewsCompleted: 0,
    itemsLearned: 0,
    attemptModes: [],
    attemptEvidence: Array.from({ length: 8 }, () => ({ mode: "meaning", identity: "same-drill" })),
  });

  assert.equal(tasks.find((task) => task.id === "meaning")?.completed, false);
});
