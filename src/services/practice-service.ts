import "server-only";

import prisma from "@/lib/prisma";
import { toLocalDateKey } from "@/lib/date-key";
import type { ExerciseOption } from "@/domain/exercise";
import type { PracticeExerciseView } from "@/domain/api-contracts";

export async function getPracticeExercises(limit = 10): Promise<PracticeExerciseView[]> {
  const exercises = await prisma.exercise.findMany({
    where: { part: 5, status: "approved" },
    orderBy: [{ difficulty: "asc" }, { id: "asc" }],
    take: Math.max(limit, 30),
  });
  const dayOffset = Number(toLocalDateKey().replaceAll("-", "")) % Math.max(1, exercises.length);
  const rotated = [...exercises.slice(dayOffset), ...exercises.slice(0, dayOffset)].slice(0, limit);
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

  await prisma.$transaction([
    prisma.attempt.create({
      data: {
        exerciseId,
        mode: "toeic_part_5",
        answer: selectedOptionId,
        correctAnswer: exercise.correctOptionId,
        isCorrect,
        errorCategory: isCorrect ? null : exercise.errorCategory,
        responseTimeMs: typeof responseTimeMs === "number" ? Math.max(0, Math.round(responseTimeMs)) : null,
      },
    }),
    prisma.dailyActivity.upsert({
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
    }),
  ]);

  return {
    correct: isCorrect,
    acceptedAnswers: [correctOption.text],
    correctOptionId: exercise.correctOptionId,
    errorCategory: isCorrect ? null : exercise.errorCategory,
    explanation: exercise.explanationVi,
    optionRationales: Object.fromEntries(options.map((option) => [option.id, option.rationaleVi])),
  };
}
