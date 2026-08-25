import assert from "node:assert/strict";
import test from "node:test";

import { isAcceptedAnswer, normalizeAnswer } from "../src/lib/answer-normalizer.ts";

test("normalizes answers by trimming, lowercase, removing accents and extra spaces", () => {
  assert.equal(normalizeAnswer("  Distribution Center  "), "distribution center");
  assert.equal(normalizeAnswer("Tiếng Việt có dấu"), "tieng viet co dau");
  assert.equal(normalizeAnswer("It's   fine!"), "it's fine");
});

test("matches accepted answers correctly and rejects wrong answers", () => {
  const targets = ["distribution center"];
  assert.equal(isAcceptedAnswer("distribution center", targets), true);
  assert.equal(isAcceptedAnswer("Distribution Center", targets), true);
  assert.equal(isAcceptedAnswer("  distribution   center  ", targets), true);

  // Wrong answers must return false
  assert.equal(isAcceptedAnswer("distribut", targets), false);
  assert.equal(isAcceptedAnswer("center distribution", targets), false);
  assert.equal(isAcceptedAnswer("", targets), false);
});
