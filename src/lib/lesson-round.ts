import type { LessonUnit } from '../domain/study-roadmap.ts';
import { rotateExerciseBank } from './exercise-bank.ts';

/** Flatten passage questions first so five means questions, not passages. */
export function lessonRound(lesson: LessonUnit, round: number): LessonUnit {
  const units = lesson.exercises.flatMap<LessonUnit['exercises'][number]>(exercise => 'questions' in exercise
    ? exercise.questions.map(question => ({ ...exercise, id: `${exercise.id}-${question.id}`, questions: [question] }))
    : [exercise]);
  if (units.length < 5) return { ...lesson, exercises: [] } as LessonUnit;
  return { ...lesson, exercises: rotateExerciseBank(units, '2026-10-05', 5, round) } as LessonUnit;
}
