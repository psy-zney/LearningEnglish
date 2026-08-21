import "server-only";

import prisma from "@/lib/prisma";
import { toLocalDateKey } from "@/lib/date-key";
import type { ExerciseOption } from "@/domain/exercise";
import type { PracticeExerciseView } from "@/domain/api-contracts";
import { rotateExerciseBank } from "@/lib/exercise-bank";

export async function getPracticeExercises(limit = 10): Promise<PracticeExerciseView[]> {
  const exercises = await prisma.exercise.findMany({
    where: { part: 5, status: "approved" },
    orderBy: [{ difficulty: "asc" }, { id: "asc" }],
  });
  const rotated = rotateExerciseBank(exercises, toLocalDateKey(), limit);
  return rotated.map((exercise) => ({
    id: exercise.id,
    part: exercise.part,
    prompt: exercise.prompt,
    options: JSON.parse(exercise.optionsJson) as ExerciseOption[],
    difficulty: exercise.difficulty,
  }));
}

export async function answerPracticeExercise(exerciseId: string, selectedOptionId: string, responseTimeMs?: number) {
  const exercise = await prisma.exercise.findUnique({ where: { id: exerciseId } });
  if (!exercise) throw new Error("Exercise not found");
  const options = JSON.parse(exercise.optionsJson) as ExerciseOption[];
  if (!options.some((option) => option.id === selectedOptionId)) throw new Error("Invalid option");

  const isCorrect = selectedOptionId === exercise.correctOptionId;
  const correctOption = options.find((option) => option.id === exercise.correctOptionId)!;
  const dateKey = toLocalDateKey();

  const dayStart = new Date(`${dateKey}T00:00:00+07:00`);
  const storedCorrect = await prisma.$transaction(async (tx) => {
    const existing = await tx.attempt.findFirst({
      where: { exerciseId, mode: "toeic_part_5", createdAt: { gte: dayStart } },
      select: { isCorrect: true },
    });
    if (existing) return existing.isCorrect ?? false;

    await tx.attempt.create({
      data: {
        exerciseId,
        mode: "toeic_part_5",
        answer: selectedOptionId,
        correctAnswer: exercise.correctOptionId,
        isCorrect,
        errorCategory: isCorrect ? null : exercise.errorCategory,
        responseTimeMs: typeof responseTimeMs === "number" && Number.isFinite(responseTimeMs)
          ? Math.min(3_600_000, Math.max(0, Math.round(responseTimeMs)))
          : null,
      },
    });
    await tx.dailyActivity.upsert({
      where: { activityDate: dateKey },
      create: {
        activityDate: dateKey,
        practiceAnswered: 1,
        practiceCorrect: isCorrect ? 1 : 0,
        minutesStudied: 1,
      },
      update: {
        practiceAnswered: { increment: 1 },
        practiceCorrect: { increment: isCorrect ? 1 : 0 },
        minutesStudied: { increment: 1 },
      },
    });
    return isCorrect;
  });

  return {
    correct: storedCorrect,
    acceptedAnswers: [correctOption.text],
    correctOptionId: exercise.correctOptionId,
    errorCategory: storedCorrect ? null : exercise.errorCategory,
    explanation: exercise.explanationVi,
    optionRationales: Object.fromEntries(options.map((option) => [option.id, option.rationaleVi])),
  };
}
