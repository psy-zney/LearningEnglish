import assert from "node:assert/strict";
import test from "node:test";

import { part5Exercises } from "../src/data/part5-exercises.ts";
import { phrases, tenses, verbs } from "../src/data/toeic650-source-data.ts";

test("provides a broad TOEIC 650 vocabulary and Part 5 bank", () => {
  assert.ok(verbs.length >= 70, `expected at least 70 verbs, received ${verbs.length}`);
  assert.ok(phrases.length >= 100, `expected at least 100 phrases, received ${phrases.length}`);
  assert.ok(part5Exercises.length >= 100, `expected at least 100 Part 5 questions, received ${part5Exercises.length}`);
});

test("covers every business topic with both vocabulary and multiple questions", () => {
  const content = [...verbs, ...phrases];
  const topicIds = new Map<string, Set<string>>();
  for (const item of content) {
    const ids = topicIds.get(item.topic) ?? new Set<string>();
    ids.add(item.id);
    topicIds.set(item.topic, ids);
  }

  for (const [topic, ids] of topicIds) {
    assert.ok(ids.size >= 5, `${topic} has only ${ids.size} vocabulary items`);
    const questionCount = part5Exercises.filter((exercise) => exercise.focusContentIds.some((id) => ids.has(id))).length;
    assert.ok(questionCount >= 2, `${topic} has only ${questionCount} linked questions`);
  }
});

test("links every Part 5 focus to an existing approved content ID", () => {
  const contentIds = new Set([...verbs, ...phrases, ...tenses].map((item) => item.id));
  for (const exercise of part5Exercises) {
    assert.ok(exercise.focusContentIds.length > 0, `${exercise.id} has no focus content`);
    for (const id of exercise.focusContentIds) assert.ok(contentIds.has(id), `${exercise.id} references ${id}`);
  }
});
