import "server-only";

import prisma from "@/lib/prisma";
import { toLocalDateKey } from "@/lib/date-key";

export async function getDailyPlan(now = new Date()) {
  const dateKey = toLocalDateKey(now);
  const [dueCount, newCount, activity, activities, totalContent, attemptsToday] = await Promise.all([
    prisma.reviewState.count({ where: { nextReviewAt: { lte: now }, contentItem: { archivedAt: null } } }),
    prisma.contentItem.count({
      where: { archivedAt: null, status: "approved", kind: { in: ["verb", "phrase", "tense"] }, reviewState: null },
    }),
    prisma.dailyActivity.findUnique({ where: { activityDate: dateKey } }),
    prisma.dailyActivity.findMany({ orderBy: { activityDate: "desc" }, take: 60 }),
    prisma.contentItem.count({ where: { archivedAt: null, status: "approved", kind: { in: ["verb", "phrase", "tense"] } } }),
    prisma.attempt.count({ where: { createdAt: { gte: new Date(`${dateKey}T00:00:00+07:00`) } } }),
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

  const reviewGoal = Math.min(20, dueCount);
  const learnGoal = dueCount > 50 ? 0 : Math.min(6, newCount);
  const completed = {
    review: (activity?.reviewsCompleted ?? 0) >= reviewGoal,
    learn: learnGoal === 0 || (activity?.itemsLearned ?? 0) >= learnGoal,
    practice: (activity?.practiceAnswered ?? 0) >= 10,
    mission: activity?.missionCompleted ?? false,
  };

  return {
    dateKey,
    dueCount,
    newCount,
    totalContent,
    streak,
    recoveryMode: dueCount > 50,
    activity,
    attemptsToday,
    tasks: [
      { id: "review", title: "Review due", detail: `${reviewGoal} lượt · active recall`, minutes: 15, href: "/review", completed: completed.review, disabled: reviewGoal === 0 },
      { id: "learn", title: "Learn patterns", detail: learnGoal > 0 ? `${learnGoal} mục mới · verb / phrase / tense` : "Tạm dừng khi backlog cao", minutes: 12, href: "/learn", completed: completed.learn, disabled: learnGoal === 0 },
      { id: "practice", title: "TOEIC Part 5", detail: "10 câu · chấm deterministic", minutes: 18, href: "/practice", completed: completed.practice, disabled: false },
      { id: "listen", title: "Listening & shadowing", detail: "Prototype audio · phase tiếp theo", minutes: 10, href: "/practice", completed: false, disabled: true },
      { id: "mission", title: "Live with English", detail: "Viết 3 việc hôm nay bằng cụm đã học", minutes: 5, href: "/#mission", completed: completed.mission, disabled: false },
    ],
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
