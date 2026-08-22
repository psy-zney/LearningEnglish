import assert from "node:assert/strict";
import test from "node:test";

import { rotateExerciseBank } from "../src/lib/exercise-bank.ts";

test("rotates a short session across the full exercise bank", () => {
  const bank = Array.from({ length: 100 }, (_, index) => ({ id: `q-${index + 1}` }));
  const seen = new Set<string>();
  for (let day = 1; day <= 28; day += 1) {
    const dateKey = `2026-08-${String(day).padStart(2, "0")}`;
    for (const item of rotateExerciseBank(bank, dateKey, 10)) seen.add(item.id);
  }

  assert.equal(seen.size, 37);
  assert.equal(seen.has("q-1"), true);
  assert.equal(seen.has("q-37"), true);
});

test("clamps invalid limits without mutating the ordered bank", () => {
  const bank = [{ id: "a" }, { id: "b" }, { id: "c" }];
  const snapshot = structuredClone(bank);
  assert.deepEqual(rotateExerciseBank(bank, "2026-08-22", 99).map((item) => item.id).sort(), ["a", "b", "c"]);
  assert.deepEqual(bank, snapshot);
});

test("rotates immediately across rounds on the same date", () => {
  const bank = Array.from({ length: 100 }, (_, index) => ({ id: `q-${index + 1}` }));
  const round0 = rotateExerciseBank(bank, "2026-08-22", 10, 0);
  const round1 = rotateExerciseBank(bank, "2026-08-22", 10, 1);
  const round2 = rotateExerciseBank(bank, "2026-08-22", 10, 2);

  assert.equal(round0.length, 10);
  assert.equal(round1.length, 10);
  assert.equal(round2.length, 10);

  // Round 1 items should be different from Round 0 items
  const r0Ids = new Set(round0.map((i) => i.id));
  const r1Ids = new Set(round1.map((i) => i.id));
  for (const id of r1Ids) {
    assert.equal(r0Ids.has(id), false);
  }
});

