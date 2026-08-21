import assert from "node:assert/strict";
import test from "node:test";

import type { DrillContent } from "../src/domain/drill.ts";
import { buildDrillSession, parseDrillSession } from "../src/lib/drill-session.ts";

const content: DrillContent[] = [
  { id: "verb-approve", kind: "verb", title: "approve", meaningVi: "phê duyệt", topic: "office", detail: { patterns: ["approve + noun"], collocations: ["approve a request"], examples: [{ en: "They approve a request." }] } },
  { id: "verb-submit", kind: "verb", title: "submit", meaningVi: "nộp", topic: "office", detail: { patterns: ["submit + noun"], collocations: ["submit a report"], examples: [{ en: "They submit a report." }] } },
  { id: "verb-arrange", kind: "verb", title: "arrange", meaningVi: "sắp xếp", topic: "office", detail: { patterns: ["arrange + noun"], collocations: ["arrange a meeting"], examples: [{ en: "They arrange a meeting." }] } },
  { id: "verb-confirm", kind: "verb", title: "confirm", meaningVi: "xác nhận", topic: "office", detail: { patterns: ["confirm + noun"], collocations: ["confirm a booking"], examples: [{ en: "They confirm a booking." }] } },
];

test("accepts only the two generated drill sessions", () => {
  assert.equal(parseDrillSession("meaning"), "meaning");
  assert.equal(parseDrillSession("context"), "context");
  assert.equal(parseDrillSession("toeic_part_5"), null);
  assert.equal(parseDrillSession("../../dev.db"), null);
});

test("balances modes and honors the requested session limit", () => {
  const meaning = buildDrillSession(content, "meaning", "2026-08-21", 4);
  assert.equal(meaning.length, 4);
  assert.deepEqual(new Set(meaning.map((drill) => drill.mode)), new Set(["meaning", "reverse_meaning"]));

  const context = buildDrillSession(content, "context", "2026-08-21", 6);
  assert.equal(context.length, 6);
  assert.deepEqual(new Set(context.map((drill) => drill.mode)), new Set(["fill_blank", "collocation", "pattern"]));
});
