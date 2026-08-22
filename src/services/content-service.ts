import "server-only";

import prisma from "@/lib/prisma";
import type { ContentView } from "@/domain/api-contracts";
import type { ExerciseOption } from "@/domain/exercise";

function safeJson(value: string) {
  try {
    return JSON.parse(value) as Record<string, unknown>;
  } catch {
    return {};
  }
}

export function toContentView(item: {
  id: string;
  sourceKey: string;
  kind: string;
  title: string;
  meaningVi: string;
  topic: string | null;
  toeicParts: string;
  cefr: string | null;
  priority: number;
  contentJson: string;
  reviewState?: {
    stage: string;
    nextReviewAt: Date;
    interval: number;
    repetition: number;
  } | null;
}): ContentView {
  return {
    id: item.id,
    sourceKey: item.sourceKey,
    kind: item.kind,
    title: item.title,
    meaningVi: item.meaningVi,
    topic: item.topic,
    toeicParts: item.toeicParts.split(",").filter(Boolean).map(Number),
    cefr: item.cefr,
    priority: item.priority,
    detail: safeJson(item.contentJson),
    review: item.reviewState
      ? {
          stage: item.reviewState.stage,
          nextReviewAt: item.reviewState.nextReviewAt.toISOString(),
          interval: item.reviewState.interval,
          repetition: item.reviewState.repetition,
        }
      : null,
  };
}

async function attachAppliedExercises(views: ContentView[]): Promise<ContentView[]> {
  if (views.length === 0) return views;
  const exercises = await prisma.exercise.findMany({
    where: { status: "approved" },
    select: {
      id: true,
      prompt: true,
      optionsJson: true,
      correctOptionId: true,
      explanationVi: true,
      errorCategory: true,
      focusContentIds: true,
    },
  });

  const exerciseMap = new Map<string, {
    id: string;
    prompt: string;
    options: ExerciseOption[];
    correctOptionId: string;
    explanationVi: string;
    errorCategory: string;
  }>();

  for (const ex of exercises) {
    const focusIds = ex.focusContentIds.split(",").map((s) => s.trim()).filter(Boolean);
    let options: ExerciseOption[] = [];
    try {
      options = JSON.parse(ex.optionsJson) as ExerciseOption[];
    } catch {
      continue;
    }
    const viewObj = {
      id: ex.id,
      prompt: ex.prompt,
      options,
      correctOptionId: ex.correctOptionId,
      explanationVi: ex.explanationVi,
      errorCategory: ex.errorCategory,
    };
    for (const id of focusIds) {
      if (!exerciseMap.has(id)) {
        exerciseMap.set(id, viewObj);
      }
    }
  }

  return views.map((v) => ({
    ...v,
    appliedExercise: exerciseMap.get(v.sourceKey) ?? null,
  }));
}

export async function getLibraryContent() {
  const items = await prisma.contentItem.findMany({
    where: { archivedAt: null },
    include: { reviewState: true },
    orderBy: [{ priority: "asc" }, { title: "asc" }],
  });
  return items.map(toContentView);
}

export async function getNewContent(limit = 6) {
  const items = await prisma.contentItem.findMany({
    where: {
      archivedAt: null,
      status: "approved",
      kind: { in: ["verb", "phrase", "tense"] },
      reviewState: null,
    },
    include: { reviewState: true },
    orderBy: [{ priority: "asc" }, { title: "asc" }],
    take: 36,
  });

  const mixed: typeof items = [];
  const remaining = [...items];
  const kinds = ["verb", "phrase", "tense"];
  while (remaining.length > 0 && mixed.length < limit) {
    for (const kind of kinds) {
      const index = remaining.findIndex((item) => item.kind === kind);
      if (index >= 0) mixed.push(remaining.splice(index, 1)[0]);
      if (mixed.length >= limit) break;
    }
  }

  return attachAppliedExercises(mixed.map(toContentView));
}

export async function getReinforcementContent(limit = 6) {
  const states = await prisma.reviewState.findMany({
    where: {
      contentItem: {
        archivedAt: null,
        status: "approved",
        kind: { in: ["verb", "phrase", "tense", "legacy_word"] },
      },
    },
    include: { contentItem: true },
    orderBy: [{ lastReviewedAt: "asc" }, { createdAt: "asc" }],
    take: Math.max(limit, 48),
  });
  const items = states.map((state) => ({ ...state.contentItem, reviewState: state }));

  const mixed: typeof items = [];
  const remaining = [...items];
  while (remaining.length > 0 && mixed.length < limit) {
    for (const kind of ["verb", "phrase", "tense", "legacy_word"]) {
      const index = remaining.findIndex((item) => item.kind === kind);
      if (index >= 0) mixed.push(remaining.splice(index, 1)[0]);
      if (mixed.length >= limit) break;
    }
  }
  while (mixed.length < limit && remaining.length > 0) mixed.push(remaining.shift()!);

  return attachAppliedExercises(mixed.slice(0, limit).map(toContentView));
}

