import "server-only";

import prisma from "@/lib/prisma";
import { toLocalDateKey } from "@/lib/date-key";
import { buildReviewQueue } from "@/lib/queue-builder";
import { scheduleReview, type ReviewRating } from "@/lib/srs";
import { toContentView } from "@/services/content-service";

export async function getDueReviewQueue(limit = 30, now = new Date()) {
  const recentSince = new Date(now);
  recentSince.setDate(recentSince.getDate() - 7);

  const [states, recentErrors] = await Promise.all([
    prisma.reviewState.findMany({
      where: { nextReviewAt: { lte: now }, contentItem: { archivedAt: null } },
      include: { contentItem: true },
    }),
    prisma.attempt.findMany({
      where: { createdAt: { gte: recentSince }, isCorrect: false, contentItemId: { not: null } },
      select: { contentItemId: true },
    }),
  ]);

  const errorCounts = new Map<string, number>();
  for (const attempt of recentErrors) {
    if (!attempt.contentItemId) continue;
    errorCounts.set(attempt.contentItemId, (errorCounts.get(attempt.contentItemId) ?? 0) + 1);
  }

  const candidates = states.map((state) => ({
    id: state.id,
    kind: state.contentItem.kind,
    priority: state.contentItem.priority,
    nextReviewAt: state.nextReviewAt,
    recentErrors: errorCounts.get(state.contentItemId) ?? 0,
  }));
  const orderedIds = buildReviewQueue(candidates, now, limit).map((item) => item.id);
  const stateById = new Map(states.map((state) => [state.id, state]));

  return orderedIds.map((id) => {
    const state = stateById.get(id)!;
    return {
      reviewStateId: state.id,
      content: toContentView({ ...state.contentItem, reviewState: state }),
    };
  });
}

export async function rateReview(contentItemId: string, rating: ReviewRating, answer?: string) {
  const now = new Date();
  const dateKey = toLocalDateKey(now);

  return prisma.$transaction(async (tx) => {
    const state = await tx.reviewState.findUnique({
      where: { contentItemId },
      include: { contentItem: true },
    });
    if (!state) throw new Error("Review state not found");

    const scheduled = scheduleReview(rating, state, now);
    const isCorrect = rating !== "again";
    await tx.reviewState.update({
      where: { id: state.id },
      data: {
        interval: scheduled.interval,
        repetition: scheduled.repetition,
        easeFactor: scheduled.easeFactor,
        nextReviewAt: scheduled.nextReviewDate,
        lastReviewedAt: now,
        lastRating: rating,
        lapses: rating === "again" ? { increment: 1 } : undefined,
        stage: scheduled.repetition >= 3 ? "production" : "recall",
      },
    });
    await tx.attempt.create({
      data: {
        contentItemId,
        mode: "review",
        answer,
        correctAnswer: state.contentItem.title,
        isCorrect,
        errorCategory: isCorrect ? null : "content_recall",
        rating,
      },
    });
    await tx.dailyActivity.upsert({
      where: { activityDate: dateKey },
      create: { activityDate: dateKey, reviewsCompleted: 1, minutesStudied: 1 },
      update: { reviewsCompleted: { increment: 1 }, minutesStudied: { increment: 1 } },
    });

    return {
      correct: isCorrect,
      acceptedAnswers: [state.contentItem.title],
      errorCategory: isCorrect ? null : "content_recall",
      explanation: `Lần ôn tiếp theo: ${scheduled.nextReviewDate.toLocaleString("vi-VN")}`,
      nextReview: scheduled.nextReviewDate.toISOString(),
    };
  });
}

export async function completeLearnSession(contentItemIds: string[]) {
  const uniqueIds = [...new Set(contentItemIds)].slice(0, 10);
  const now = new Date();
  const dateKey = toLocalDateKey(now);

  return prisma.$transaction(async (tx) => {
    for (const contentItemId of uniqueIds) {
      await tx.reviewState.upsert({
        where: { contentItemId },
        create: { contentItemId, nextReviewAt: now, stage: "recall" },
        update: {},
      });
      await tx.attempt.create({ data: { contentItemId, mode: "learn" } });
    }
    await tx.dailyActivity.upsert({
      where: { activityDate: dateKey },
      create: { activityDate: dateKey, itemsLearned: uniqueIds.length, minutesStudied: 10 },
      update: { itemsLearned: { increment: uniqueIds.length }, minutesStudied: { increment: 10 } },
    });
    return { learned: uniqueIds.length };
  });
}
