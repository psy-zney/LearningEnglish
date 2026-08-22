import "server-only";

import prisma from "@/lib/prisma";
import { toLocalDateKey } from "@/lib/date-key";
import { gradeDailyDrill } from "@/lib/drill-builder";
import { buildDrillSession, getSessionModes, type DrillSession } from "@/lib/drill-session";
import { toContentView } from "@/services/content-service";

async function getApprovedContent() {
  const items = await prisma.contentItem.findMany({
    where: {
      archivedAt: null,
      status: "approved",
      kind: { in: ["verb", "phrase", "tense", "imported_example"] },
    },
    include: { reviewState: true },
    orderBy: [{ priority: "asc" }, { sourceKey: "asc" }],
  });
  const coreItems = items.filter((item) => item.kind !== "imported_example");
  const views = coreItems.map(toContentView);
  const bySourceKey = new Map(coreItems.map((item, index) => [item.sourceKey, views[index]]));

  for (const imported of items.filter((item) => item.kind === "imported_example")) {
    try {
      const detail = JSON.parse(imported.contentJson) as Record<string, unknown>;
      const focus = typeof detail.focusSourceKey === "string" ? bySourceKey.get(detail.focusSourceKey) : undefined;
      const example = detail.example;
      if (!focus || typeof example !== "object" || example === null || Array.isArray(example)) continue;
      const record = example as Record<string, unknown>;
      if (typeof record.en !== "string" || typeof record.vi !== "string") continue;
      const provenance = typeof detail.provenance === "object" && detail.provenance !== null && !Array.isArray(detail.provenance)
        ? detail.provenance as Record<string, unknown>
        : null;
      const source = provenance
        && typeof provenance.attribution === "string"
        && typeof provenance.sourceUrl === "string"
        && typeof provenance.license === "string"
        && typeof provenance.licenseUrl === "string"
        ? {
            attribution: provenance.attribution,
            sourceUrl: provenance.sourceUrl,
            license: provenance.license,
            licenseUrl: provenance.licenseUrl,
          }
        : undefined;
      const existing = Array.isArray(focus.detail.examples) ? focus.detail.examples : [];
      focus.detail = { ...focus.detail, examples: [...existing, { en: record.en, vi: record.vi, ...(source ? { source } : {}) }] };
    } catch {
      // Invalid imported content is ignored; the manifest importer validates new records.
    }
  }

  return views;
}

function explanationFor(item: Awaited<ReturnType<typeof getApprovedContent>>[number], mode: string, answer: string) {
  const examples = Array.isArray(item.detail.examples) ? item.detail.examples : [];
  const example = examples[0] as Record<string, unknown> | undefined;
  const exampleEn = typeof example?.en === "string" ? example.en : "";
  const exampleVi = typeof example?.vi === "string" ? example.vi : "";
  if (mode === "meaning" || mode === "reverse_meaning") return `${item.title}: ${item.meaningVi}`;
  if (mode === "fill_blank" && exampleEn) return `${exampleEn}${exampleVi ? ` · ${exampleVi}` : ""}`;
  return `${answer} · ${item.meaningVi}`;
}

export async function getDrills(session: DrillSession, limit = 8, round = 0, now = new Date()) {
  const dateKey = toLocalDateKey(now);
  const content = await getApprovedContent();
  return {
    session,
    dateKey,
    drills: buildDrillSession(content, session, dateKey, limit, round),
  };
}

export async function answerDrill(input: {
  session: DrillSession;
  dateKey: string;
  drillId: string;
  answer: string;
  responseTimeMs?: number;
}, now = new Date()) {
  if (input.dateKey !== toLocalDateKey(now)) return null;
  const content = await getApprovedContent();
  const grade = gradeDailyDrill(content, {
    dateKey: input.dateKey,
    modes: getSessionModes(input.session),
    limitPerMode: 24,
    drillId: input.drillId,
    answer: input.answer,
  });
  if (grade.status !== "graded") return null;

  const item = content.find((candidate) => candidate.id === grade.contentId);
  if (!item) return null;
  const responseTimeMs = typeof input.responseTimeMs === "number" && Number.isFinite(input.responseTimeMs)
    ? Math.min(3_600_000, Math.max(0, Math.round(input.responseTimeMs)))
    : null;
  const errorCategory = grade.isCorrect ? null : `drill_${grade.mode}`;

  const dayStart = new Date(`${input.dateKey}T00:00:00+07:00`);
  const storedCorrect = await prisma.$transaction(async (tx) => {
    const priorAttempts = await tx.attempt.findMany({
      where: { contentItemId: grade.contentId, mode: grade.mode, createdAt: { gte: dayStart } },
      select: { isCorrect: true, metadataJson: true },
    });
    const duplicate = priorAttempts.find((attempt) => {
      try {
        const metadata = attempt.metadataJson ? JSON.parse(attempt.metadataJson) as Record<string, unknown> : null;
        return metadata?.drillId === input.drillId;
      } catch {
        return false;
      }
    });
    if (duplicate) return duplicate.isCorrect ?? false;

    await tx.attempt.create({
      data: {
        contentItemId: grade.contentId,
        mode: grade.mode,
        answer: input.answer.slice(0, 500),
        correctAnswer: grade.correctAnswer,
        isCorrect: grade.isCorrect,
        errorCategory,
        responseTimeMs,
        metadataJson: JSON.stringify({ drillVersion: 1, drillId: input.drillId, dateKey: input.dateKey, session: input.session }),
      },
    });
    await tx.dailyActivity.upsert({
      where: { activityDate: input.dateKey },
      create: {
        activityDate: input.dateKey,
        practiceAnswered: 1,
        practiceCorrect: grade.isCorrect ? 1 : 0,
        minutesStudied: 1,
      },
      update: {
        practiceAnswered: { increment: 1 },
        practiceCorrect: { increment: grade.isCorrect ? 1 : 0 },
        minutesStudied: { increment: 1 },
      },
    });
    return grade.isCorrect;
  });

  return {
    correct: storedCorrect,
    correctAnswer: grade.correctAnswer,
    errorCategory,
    explanation: grade.explanation ?? explanationFor(item, grade.mode, grade.correctAnswer),
    mode: grade.mode,
  };
}
