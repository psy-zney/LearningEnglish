import assert from "node:assert/strict";
import test from "node:test";

import type { DrillContent, DrillMode } from "../src/domain/drill.ts";
import { buildDailyDrills, gradeDailyDrill } from "../src/lib/drill-builder.ts";

const modes: DrillMode[] = ["meaning", "reverse_meaning", "fill_blank", "collocation", "pattern"];

const content: DrillContent[] = [
  {
    id: "verb-approve",
    kind: "verb",
    title: "approve",
    meaningVi: "phê duyệt",
    topic: "finance",
    detail: {
      patterns: ["approve + noun"],
      collocations: ["approve a budget"],
      examples: [{ en: "Managers approve the budget every April." }],
      forms: { past: "approved", pastParticiple: "approved", thirdPerson: "approves", ing: "approving" },
    },
  },
  {
    id: "verb-submit",
    kind: "verb",
    title: "submit",
    meaningVi: "nộp",
    topic: "finance",
    detail: {
      patterns: ["submit + noun"],
      collocations: ["submit an invoice"],
      examples: [{ en: "Please submit the invoice by Friday." }],
    },
  },
  {
    id: "verb-refund",
    kind: "verb",
    title: "refund",
    meaningVi: "hoàn tiền",
    topic: "finance",
    detail: {
      patterns: ["refund + amount"],
      collocations: ["refund the payment"],
      examples: [{ en: "We refund the payment within five days." }],
    },
  },
  {
    id: "verb-budget",
    kind: "verb",
    title: "budget",
    meaningVi: "lập ngân sách",
    topic: "finance",
    detail: {
      patterns: ["budget for + noun"],
      collocations: ["budget for repairs"],
      examples: [{ en: "Teams budget for repairs each year." }],
    },
  },
  {
    id: "verb-arrange",
    kind: "verb",
    title: "arrange",
    meaningVi: "sắp xếp",
    topic: "meetings",
    detail: {
      patterns: ["arrange to + verb"],
      collocations: ["arrange a meeting"],
      examples: [{ en: "We arrange a meeting every month." }],
    },
  },
];

const buildOptions = { dateKey: "2026-08-21", modes, limitPerMode: 1, optionCount: 4 } as const;

test("builds all five drill modes without leaking grading data", () => {
  const drills = buildDailyDrills(content, buildOptions);

  assert.deepEqual(drills.map((drill) => drill.mode).sort(), [...modes].sort());
  for (const drill of drills) {
    assert.equal("correctAnswer" in drill, false);
    assert.equal("correctOptionId" in drill, false);
    assert.equal("acceptedAnswers" in drill, false);
  }
});

test("builds a repeatable daily set and rotates it when the date changes", () => {
  const first = buildDailyDrills(content, buildOptions);
  const second = buildDailyDrills([...content].reverse(), buildOptions);
  const nextDay = buildDailyDrills(content, { ...buildOptions, dateKey: "2026-08-22" });

  assert.deepEqual(second, first);
  assert.notDeepEqual(nextDay, first);
});

test("prefers same-kind and same-topic distractors when enough exist", () => {
  const drill = buildDailyDrills(content, {
    dateKey: "2026-08-21",
    modes: ["meaning"],
    limitPerMode: 1,
    optionCount: 4,
  })[0];

  assert.equal(drill.inputKind, "choice");
  assert.equal(drill.options?.length, 4);
  const financeMeanings = new Set(content.filter((item) => item.topic === "finance").map((item) => item.meaningVi));
  assert.ok(drill.options?.every((option) => financeMeanings.has(option.text)));
});

test("blanks an exact escaped term without replacing a longer lookalike", () => {
  const escapedContent: DrillContent[] = [{
    id: "phrase-plan-a",
    kind: "phrase",
    title: "plan (A)",
    meaningVi: "kế hoạch A",
    topic: "office",
    detail: { examples: [{ en: "Use plan (A) today; plan (AB) stays visible." }] },
  }];

  const drill = buildDailyDrills(escapedContent, {
    dateKey: "2026-08-21",
    modes: ["fill_blank"],
    limitPerMode: 1,
  })[0];

  assert.equal(drill.prompt, "Use _____ today; plan (AB) stays visible.");
  assert.equal(drill.prompt.includes("plan (A)"), false);
});

test("grades choice and text drills while tolerating case, spacing, and trailing punctuation", () => {
  const drills = buildDailyDrills(content, buildOptions);
  const meaning = drills.find((drill) => drill.mode === "meaning");
  const reverse = drills.find((drill) => drill.mode === "reverse_meaning");
  assert.ok(meaning?.options);
  assert.ok(reverse);

  const meaningTarget = content.find((item) => item.id === meaning.contentId);
  assert.ok(meaningTarget);
  const correctOption = meaning.options.find((option) => option.text === meaningTarget?.meaningVi);
  assert.ok(correctOption);
  assert.deepEqual(
    gradeDailyDrill(content, { ...buildOptions, drillId: meaning.id, answer: correctOption.id }),
    {
      status: "graded",
      isCorrect: true,
      correctAnswer: meaningTarget.meaningVi,
      contentId: meaning.contentId,
      mode: "meaning",
    },
  );

  const reverseTarget = content.find((item) => item.id === reverse.contentId);
  assert.ok(reverseTarget);
  const reverseGrade = gradeDailyDrill(content, {
    ...buildOptions,
    drillId: reverse.id,
    answer: `  ${reverseTarget?.title.toUpperCase()}; `,
  });
  assert.equal(reverseGrade.status, "graded");
  assert.equal(reverseGrade.isCorrect, true);
});

test("grades fill-blank, collocation, and pattern drills from rebuilt private answers", () => {
  const drills = buildDailyDrills(content, buildOptions);

  for (const mode of ["fill_blank", "collocation", "pattern"] as const) {
    const drill = drills.find((candidate) => candidate.mode === mode);
    assert.ok(drill);
    const target = content.find((item) => item.id === drill.contentId);
    assert.ok(target);

    let answer: string;
    if (mode === "fill_blank") {
      const candidates = [
        target.title,
        ...Object.values((target.detail.forms ?? {}) as Record<string, string>),
      ];
      answer = candidates.find((candidate) => new RegExp(`(^|[^A-Za-z])${candidate}([^A-Za-z]|$)`, "i").test(
        (target.detail.examples as Array<{ en: string }>)[0].en,
      )) ?? target.title;
    } else {
      const correctText = mode === "collocation"
        ? (target.detail.collocations as string[])[0]
        : (target.detail.patterns as string[])[0];
      answer = drill.options?.find((option) => option.text === correctText)?.id ?? "missing-option";
    }

    const grade = gradeDailyDrill(content, { ...buildOptions, drillId: drill.id, answer });
    assert.equal(grade.status, "graded");
    assert.equal(grade.isCorrect, true);
  }
});

test("rejects malformed, tampered, unknown, and wrong-date drill IDs without throwing", () => {
  const [drill] = buildDailyDrills(content, {
    dateKey: "2026-08-21",
    modes: ["meaning"],
    limitPerMode: 1,
  });

  for (const drillId of [
    "../../dev.db",
    `${drill.id}extra`,
    drill.id.replace(drill.contentId, "missing-content"),
  ]) {
    assert.deepEqual(
      gradeDailyDrill(content, {
        dateKey: "2026-08-21",
        modes: ["meaning"],
        limitPerMode: 1,
        drillId,
        answer: "anything",
      }),
      { status: "invalid", code: "invalid_drill" },
    );
  }

  assert.deepEqual(
    gradeDailyDrill(content, {
      dateKey: "2026-08-22",
      modes: ["meaning"],
      limitPerMode: 1,
      drillId: drill.id,
      answer: "anything",
    }),
    { status: "invalid", code: "invalid_drill" },
  );
});

test("rotates licensed example contexts across daily fill-blank sessions", () => {
  const enriched: DrillContent[] = [{
    id: "verb-approve",
    kind: "verb",
    title: "approve",
    meaningVi: "phê duyệt",
    topic: "office",
    detail: {
      examples: [
        { en: "Managers approve the budget." },
        { en: "Directors approve each request." },
        { en: "Committees approve revised schedules." },
      ],
    },
  }];
  const prompts = new Set(Array.from({ length: 12 }, (_, offset) => buildDailyDrills(enriched, {
    dateKey: `2026-09-${String(offset + 1).padStart(2, "0")}`,
    modes: ["fill_blank"],
    limitPerMode: 1,
  })[0]?.prompt));

  assert.ok(prompts.size > 1);
});

test("carries licensed example attribution into the public fill-blank DTO", () => {
  const licensed: DrillContent[] = [{
    id: "verb-approve",
    kind: "verb",
    title: "approve",
    meaningVi: "phê duyệt",
    topic: "office",
    detail: { examples: [{
      en: "Managers approve each request.",
      source: {
        attribution: "Example Author via Tatoeba",
        sourceUrl: "https://tatoeba.org/en/sentences/show/123",
        license: "CC BY 2.0 FR",
        licenseUrl: "https://creativecommons.org/licenses/by/2.0/fr/",
      },
    }] },
  }];

  const [drill] = buildDailyDrills(licensed, { dateKey: "2026-08-21", modes: ["fill_blank"] });
  assert.deepEqual(drill.source, {
    attribution: "Example Author via Tatoeba",
    sourceUrl: "https://tatoeba.org/en/sentences/show/123",
    license: "CC BY 2.0 FR",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/fr/",
  });
});
