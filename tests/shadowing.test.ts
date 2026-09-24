import assert from "node:assert/strict";
import test from "node:test";

import { evaluateSpokenText, levenshteinDistance, sanitizeWord } from "../src/lib/speech-diff.ts";
import { shadowingDialogues, shadowingSentences } from "../src/data/shadowing-data.ts";

test("sanitizeWord strips punctuation and lowercases words", () => {
  assert.equal(sanitizeWord("Friday?"), "friday");
  assert.equal(sanitizeWord("  \"Rescheduled!\"  "), "rescheduled");
  assert.equal(sanitizeWord("it's"), "its");
  assert.equal(sanitizeWord("well-known"), "wellknown");
});

test("levenshteinDistance computes accurate character edits", () => {
  assert.equal(levenshteinDistance("hello", "hello"), 0);
  assert.equal(levenshteinDistance("update", "updated"), 1);
  assert.equal(levenshteinDistance("meeting", "meating"), 1);
  assert.equal(levenshteinDistance("kitten", "sitting"), 3);
});

test("evaluateSpokenText scores 100 on exact match with punctuation variations", () => {
  const target = "Could you please email me the updated itinerary by Friday?";
  const spoken = "could you please email me the updated itinerary by friday";

  const result = evaluateSpokenText(target, spoken);
  assert.equal(result.score, 100);
  assert.equal(result.grade, "excellent");
  assert.equal(result.words.every((w) => w.status === "matched"), true);
  assert.equal(result.extraWords.length, 0);
});

test("evaluateSpokenText detects missing and almost matched words", () => {
  const target = "The quarterly budget meeting has been rescheduled.";
  // User omitted 'budget' and said 'reschedule' instead of 'rescheduled'
  const spoken = "the quarterly meeting has been reschedule";

  const result = evaluateSpokenText(target, spoken);
  assert.ok(result.score >= 70 && result.score < 100);

  const budgetWord = result.words.find((w) => w.word.toLowerCase().includes("budget"));
  assert.equal(budgetWord?.status, "missed");

  const reschedWord = result.words.find((w) => w.word.toLowerCase().includes("rescheduled"));
  assert.ok(reschedWord?.status === "almost" || reschedWord?.status === "matched");
});

test("evaluateSpokenText handles completely empty or missing speech", () => {
  const target = "Thank you for contacting NovaTech Solutions.";
  const result = evaluateSpokenText(target, "");

  assert.equal(result.score, 0);
  assert.equal(result.grade, "needs_practice");
  assert.equal(result.words.every((w) => w.status === "missed"), true);
});

test("shadowing data contains high-frequency sentences with IPA and tips", () => {
  assert.ok(shadowingSentences.length >= 10);
  for (const s of shadowingSentences) {
    assert.ok(s.id.length > 0);
    assert.ok(s.en.length > 0);
    assert.ok(s.vi.length > 0);
    assert.ok(s.difficulty >= 1 && s.difficulty <= 3);
  }
});

test("shadowing dialogues have 2 alternating speakers and complete conversation turns", () => {
  assert.ok(shadowingDialogues.length >= 3);
  for (const d of shadowingDialogues) {
    assert.ok(d.id.length > 0);
    assert.ok(d.titleVi.length > 0);
    assert.ok(d.lines.length >= 4);
    assert.ok(d.speakerA.name.length > 0);
    assert.ok(d.speakerB.name.length > 0);

    // Verify all lines have English and Vietnamese
    for (const line of d.lines) {
      assert.ok(["A", "B"].includes(line.speaker));
      assert.ok(line.en.length > 0);
      assert.ok(line.vi.length > 0);
    }
  }
});
