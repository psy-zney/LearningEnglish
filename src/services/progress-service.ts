import "server-only";

import prisma from "@/lib/prisma";
import { ERROR_CATEGORY_LABELS } from "@/lib/error-taxonomy";
import { drillModes } from "@/domain/drill";

function attemptMetrics(attempts: Array<{ isCorrect: boolean | null; responseTimeMs: number | null }>) {
  const answered = attempts.length;
  const correct = attempts.filter((attempt) => attempt.isCorrect).length;
  const responseTimes = attempts
    .map((attempt) => attempt.responseTimeMs)
    .filter((value): value is number => value !== null)
    .sort((a, b) => a - b);
  const medianMs = responseTimes.length === 0 ? null : responseTimes[Math.floor(responseTimes.length / 2)];
  return {
    answered,
    accuracy: answered > 0 ? Math.round((correct / answered) * 100) : null,
    medianSeconds: medianMs === null ? null : Math.round(medianMs / 100) / 10,
  };
}

export async function getProgressSummary(now = new Date()) {
  const since = new Date(now);
  since.setDate(since.getDate() - 30);

  const [attempts, reviewStates, contentCount, activities] = await Promise.all([
    prisma.attempt.findMany({
      where: { createdAt: { gte: since } },
      orderBy: { createdAt: "asc" },
    }),
    prisma.reviewState.findMany(),
    prisma.contentItem.count({ where: { archivedAt: null, kind: { in: ["verb", "phrase", "tense"] } } }),
    prisma.dailyActivity.findMany({ orderBy: { activityDate: "desc" }, take: 14 }),
  ]);

  const practiceAttempts = attempts.filter((attempt) => attempt.mode === "toeic_part_5" && attempt.isCorrect !== null);
  const part5 = attemptMetrics(practiceAttempts);
  const drillAttempts = attempts.filter((attempt) => drillModes.includes(attempt.mode as (typeof drillModes)[number]) && attempt.isCorrect !== null);
  const drills = attemptMetrics(drillAttempts);

  const errorCounts = new Map<string, number>();
  for (const attempt of attempts) {
    if (!attempt.errorCategory) continue;
    errorCounts.set(attempt.errorCategory, (errorCounts.get(attempt.errorCategory) ?? 0) + 1);
  }
  const topErrors = [...errorCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([key, count]) => ({ key, label: ERROR_CATEGORY_LABELS[key] ?? key, count }));

  const mastered = reviewStates.filter((state) => state.repetition >= 3 && state.interval >= 7).length;
  const retentionAttempts = attempts.filter((attempt) => attempt.mode === "review" && attempt.isCorrect !== null);
  const retained = retentionAttempts.filter((attempt) => attempt.isCorrect).length;

  return {
    contentCount,
    startedCount: reviewStates.length,
    masteredCount: mastered,
    reviewRetention: retentionAttempts.length > 0 ? Math.round((retained / retentionAttempts.length) * 100) : null,
    part5,
    drills: {
      ...drills,
      byMode: drillModes.map((mode) => ({
        mode,
        ...attemptMetrics(drillAttempts.filter((attempt) => attempt.mode === mode)),
      })),
    },
    topErrors,
    activities: activities.reverse().map((activity) => ({
      date: activity.activityDate,
      recalls: activity.reviewsCompleted,
      practice: activity.practiceAnswered,
      learned: activity.itemsLearned,
    })),
  };
}
