import "server-only";

import prisma from "@/lib/prisma";
import type { ContentView } from "@/domain/api-contracts";

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

  return mixed.map(toContentView);
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

  return mixed.slice(0, limit).map(toContentView);
}
