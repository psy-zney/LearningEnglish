import "server-only";

import prisma from "@/lib/prisma";
import { toLocalDateKey } from "@/lib/date-key";
import { buildSessionTasks } from "@/lib/daily-plan";

export async function getDailyPlan(now = new Date()) {
  const dateKey = toLocalDateKey(now);
  const [dueCount, newCount, activity, activities, totalContent, todayAttempts] = await Promise.all([
    prisma.reviewState.count({ where: { nextReviewAt: { lte: now }, contentItem: { archivedAt: null } } }),
    prisma.contentItem.count({
      where: { archivedAt: null, status: "approved", kind: { in: ["verb", "phrase", "tense"] }, reviewState: null },
    }),
    prisma.dailyActivity.findUnique({ where: { activityDate: dateKey } }),
    prisma.dailyActivity.findMany({ orderBy: { activityDate: "desc" }, take: 60 }),
    prisma.contentItem.count({ where: { archivedAt: null, status: "approved", kind: { in: ["verb", "phrase", "tense"] } } }),
    prisma.attempt.findMany({
      where: { createdAt: { gte: new Date(`${dateKey}T00:00:00+07:00`) } },
      select: { id: true, mode: true, contentItemId: true, exerciseId: true, metadataJson: true },
    }),
  ]);

  const activeDates = new Set(
    activities
      .filter((item) => item.reviewsCompleted + item.itemsLearned + item.practiceAnswered > 0 || item.missionCompleted)
      .map((item) => item.activityDate),
  );
  let streak = 0;
  const cursor = new Date(now);
  for (let index = 0; index < 60; index += 1) {
    const key = toLocalDateKey(cursor);
    if (!activeDates.has(key)) {
      if (index === 0) {
        cursor.setDate(cursor.getDate() - 1);
        continue;
      }
      break;
    }
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  const recoveryMode = dueCount > 50;
  const attemptEvidence = todayAttempts.map((attempt) => {
    let drillId = "";
    try {
      const metadata = attempt.metadataJson ? JSON.parse(attempt.metadataJson) as Record<string, unknown> : null;
      drillId = typeof metadata?.drillId === "string" ? metadata.drillId : "";
    } catch {
      // Older attempt metadata remains valid and falls back to its stored relation.
    }
    return {
      mode: attempt.mode,
      identity: drillId || attempt.exerciseId || attempt.contentItemId || attempt.id,
    };
  });
  const distinctReviews = new Set(
    attemptEvidence.filter((attempt) => attempt.mode === "review").map((attempt) => attempt.identity),
  ).size;

  return {
    dateKey,
    dueCount,
    newCount,
    totalContent,
    streak,
    recoveryMode,
    activity,
    attemptsToday: todayAttempts.length,
    missionCompleted: activity?.missionCompleted ?? false,
    tasks: buildSessionTasks({
      dueCount,
      newCount,
      recoveryMode,
      reviewsCompleted: distinctReviews,
      itemsLearned: activity?.itemsLearned ?? 0,
      attemptModes: todayAttempts.map((attempt) => attempt.mode),
      attemptEvidence,
    }),
  };
}

export async function completeLifeMission() {
  const dateKey = toLocalDateKey();
  return prisma.dailyActivity.upsert({
    where: { activityDate: dateKey },
    create: { activityDate: dateKey, missionCompleted: true, minutesStudied: 5 },
    update: { missionCompleted: true, minutesStudied: { increment: 5 } },
  });
}
