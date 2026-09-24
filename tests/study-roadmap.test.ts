import assert from "node:assert/strict";
import test from "node:test";

import {
  getLessonsByStage,
  getLessonById,
  getNextLesson,
  getPreviousLesson,
  countExercises,
  getStageProgress,
} from "../src/services/lesson-service.ts";
import { stage1VocabLessons } from "../src/data/stage1-vocab-data.ts";
import { stage2VocabLessons } from "../src/data/stage2-vocab-intermediate-data.ts";

test("provides complete Stage 1 foundation curriculum (0→300)", () => {
  const stage1 = getLessonsByStage("foundation");
  assert.ok(stage1.length >= 25, `Expected at least 25 Stage 1 units, got ${stage1.length}`);

  // Grammar lessons
  const grammarLessons = stage1.filter((l) => l.category === "grammar");
  assert.equal(grammarLessons.length, 7, "Stage 1 must have 7 grammar lessons");

  // Grammar tests (4 mini tests covering grammar lessons)
  const grammarTests = stage1.filter(
    (l) => l.category === "test" && l.testType === "mini_test" && l.coversLessonIds?.every((id) => id.startsWith("s1-gram"))
  );
  assert.equal(grammarTests.length, 4, "Stage 1 must have 4 grammar mini tests");

  // Vocab lessons (V1-V12)
  assert.equal(stage1VocabLessons.length, 12, "Stage 1 must have 12 vocab lessons");

  // Check that all 12 lessons have 20 words each (total 240 words)
  const totalWords = stage1VocabLessons.reduce((sum, l) => sum + l.words.length, 0);
  assert.equal(totalWords, 240, `Expected 240 words across V1-V12, got ${totalWords}`);
});

test("provides complete Stage 2 intermediate curriculum (300→600)", () => {
  const stage2 = getLessonsByStage("intermediate");
  assert.ok(stage2.length >= 20, `Expected at least 20 Stage 2 units, got ${stage2.length}`);

  // Grammar lessons
  const grammarLessons = stage2.filter((l) => l.category === "grammar");
  assert.equal(grammarLessons.length, 6, "Stage 2 must have 6 grammar lessons");

  // Reading lessons
  const readingLessons = stage2.filter((l) => l.category === "reading");
  assert.equal(readingLessons.length, 2, "Stage 2 must have 2 reading lessons");

  // Listening lessons
  const listeningLessons = stage2.filter((l) => l.category === "listening");
  assert.equal(listeningLessons.length, 4, "Stage 2 must have 4 listening lessons");

  // Vocab lessons (TV1-TV10)
  assert.equal(stage2VocabLessons.length, 10, "Stage 2 must have 10 intermediate vocab lessons");

  // Total words across TV1-TV10
  const totalVocab2 = stage2VocabLessons.reduce((sum, l) => sum + l.words.length, 0);
  assert.equal(totalVocab2, 250, `Expected 250 intermediate words, got ${totalVocab2}`);
});

test("every exercise has valid options and matching correctOptionId", () => {
  const allLessons = [
    ...getLessonsByStage("foundation"),
    ...getLessonsByStage("intermediate"),
  ];

  for (const lesson of allLessons) {
    for (const ex of lesson.exercises) {
      if ("options" in ex && "correctOptionId" in ex) {
        assert.ok(ex.options.length >= 3, `Exercise ${ex.id} must have at least 3 options`);
        const validIds = new Set(ex.options.map((o) => o.id));
        assert.ok(
          validIds.has(ex.correctOptionId as any),
          `Exercise ${ex.id} correctOptionId (${ex.correctOptionId}) not in options (${[...validIds].join(",")})`
        );
      }
    }
  }
});

test("linear navigation between sequential lessons functions properly", () => {
  const stage1 = getLessonsByStage("foundation");
  const first = stage1[0];
  const next = getNextLesson(first.id);
  assert.ok(next !== undefined, "First lesson must have a next lesson");

  const prev = getPreviousLesson(next.id);
  assert.equal(prev?.id, first.id, "Previous lesson of next should be first");
});

test("computes stage progress metrics accurately", () => {
  const prog1 = getStageProgress("foundation");
  assert.ok(prog1.totalLessons >= 25);
  assert.equal(prog1.stage, "foundation");

  const prog2 = getStageProgress("intermediate");
  assert.ok(prog2.totalLessons >= 20);
  assert.equal(prog2.stage, "intermediate");
});
