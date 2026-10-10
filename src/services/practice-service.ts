import "server-only";

import prisma from "@/lib/prisma";
import { toLocalDateKey } from "@/lib/date-key";
import type { ExerciseOption } from "@/domain/exercise";
import type { PracticeExerciseView } from "@/domain/api-contracts";
import type { FoundationType } from "@/domain/foundation";
import { rotateExerciseBank } from "@/lib/exercise-bank";

export async function getPracticeExercises(_limit = 5, round = 0, category: FoundationType | null = null): Promise<PracticeExerciseView[]> {
  void _limit;
  const exercises = await prisma.exercise.findMany({
    where: { part: 5, status: "approved", ...(category ? { errorCategory: category } : { NOT: { errorCategory: { startsWith: "basic_" } } }) },
    orderBy: [{ difficulty: "asc" }, { id: "asc" }],
  });
  const rotated = rotateExerciseBank(exercises, toLocalDateKey(), 5, round);
  if (rotated.length !== 5) throw new Error('Không đủ 5 câu cho dạng bài này.');
  return rotated.map((exercise) => ({
    id: exercise.id,
    part: exercise.part,
    prompt: exercise.prompt,
    options: (JSON.parse(exercise.optionsJson) as ExerciseOption[]).map(({ id, text }) => ({ id, text })),
    difficulty: exercise.difficulty,
  }));
}

export async function answerPracticeExercise(exerciseId: string, selectedOptionId: string, responseTimeMs?: number) {
  const exercise = await prisma.exercise.findUnique({ where: { id: exerciseId } });
  if (!exercise || exercise.status !== "approved") throw new Error("Exercise not found");
  const options = JSON.parse(exercise.optionsJson) as ExerciseOption[];
  if (!options.some((option) => option.id === selectedOptionId)) throw new Error("Invalid option");

  const isCorrect = selectedOptionId === exercise.correctOptionId;
  const correctOption = options.find((option) => option.id === exercise.correctOptionId)!;
  const dateKey = toLocalDateKey();

  await prisma.$transaction(async (tx) => {
    await tx.attempt.create({
      data: {
        exerciseId,
        mode: exercise.errorCategory.startsWith("basic_") ? exercise.errorCategory : "toeic_part_5",
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
  });

  return {
    correct: isCorrect,
    acceptedAnswers: [correctOption.text],
    correctOptionId: exercise.correctOptionId,
    errorCategory: isCorrect ? null : exercise.errorCategory,
    explanation: exercise.explanationVi,
    optionRationales: Object.fromEntries(options.map((option) => [option.id, option.rationaleVi])),
  };
}
