import assert from "node:assert/strict";
import test from "node:test";
import {
  LEGACY_FOOT_WORD_ID,
  repairKnownLegacyWord,
  serializeLegacyWordContent,
} from "../src/lib/legacy-content.ts";

const brokenFoot = {
  id: LEGACY_FOOT_WORD_ID,
  word: "foot",
  meaning: "lòng bàn chân",
  correctedWord: null,
  correctMeaning: "đùi",
  explanation: "Foot có nghĩa là đùi.",
};

test("repairs the known foot legacy record and its derived content", () => {
  const repaired = repairKnownLegacyWord(brokenFoot);
  const content = serializeLegacyWordContent(repaired);

  assert.notStrictEqual(repaired, brokenFoot);
  assert.equal(repaired.meaning, "lòng bàn chân");
  assert.equal(repaired.correctMeaning, "lòng bàn chân");
  assert.doesNotMatch(repaired.explanation ?? "", /đùi/iu);
  assert.equal(content.meaningVi, "lòng bàn chân");
  assert.doesNotMatch(content.contentJson, /đùi/iu);
});

test("is idempotent after the foot repair has been applied", () => {
  const repaired = repairKnownLegacyWord(brokenFoot);

  assert.strictEqual(repairKnownLegacyWord(repaired), repaired);
});

test("does not change an unrelated foot record", () => {
  const unrelated = { ...brokenFoot, id: "another-record" };

  assert.strictEqual(repairKnownLegacyWord(unrelated), unrelated);
});
