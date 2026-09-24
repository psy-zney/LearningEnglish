/**
 * Lesson Service — manages study roadmap navigation,
 * lesson retrieval, and progress tracking.
 */

import type {
  StudyStage,
  LessonUnit,
  LessonProgress,
  StageProgress,
  GrammarExercise,
  VocabExercise,
} from "@/domain/study-roadmap";
import { stage1GrammarLessons, stage1GrammarTests } from "../data/stage1-grammar-data.ts";
import { stage1VocabLessons } from "../data/stage1-vocab-data.ts";
import { stage1VocabTests } from "../data/stage1-minitest-data.ts";
import { stage2GrammarLessons, stage2ReadingLessons, stage2ProgressTests } from "../data/stage2-grammar-data.ts";
import { stage2ListeningLessons } from "../data/stage2-listening-data.ts";
import { stage2VocabLessons, stage2VocabTests } from "../data/stage2-vocab-intermediate-data.ts";
import { stage2AdditionalProgressTests } from "../data/stage2-progress-tests.ts";

// ─── Combine all lessons ─────────────────────────────────────────

const allLessons: LessonUnit[] = [
  ...stage1GrammarLessons,
  ...stage1GrammarTests,
  ...stage1VocabLessons,
  ...stage1VocabTests,
  ...stage2GrammarLessons,
  ...stage2ReadingLessons,
  ...stage2ListeningLessons,
  ...stage2ProgressTests,
  ...stage2VocabLessons,
  ...stage2VocabTests,
  ...stage2AdditionalProgressTests,
].sort((a, b) => {
  // Sort by stage first, then by order
  const stageOrder = { foundation: 0, intermediate: 1 };
  const stageDiff = stageOrder[a.stage] - stageOrder[b.stage];
  if (stageDiff !== 0) return stageDiff;
  return a.order - b.order;
});

// ─── Public API ──────────────────────────────────────────────────

/** Get all lessons for a specific stage, ordered by sequence */
export function getLessonsByStage(stage: StudyStage): LessonUnit[] {
  return allLessons.filter((l) => l.stage === stage);
}

/** Get a single lesson by ID */
export function getLessonById(lessonId: string): LessonUnit | undefined {
  return allLessons.find((l) => l.id === lessonId);
}

/** Get the next lesson after the given one */
export function getNextLesson(currentLessonId: string): LessonUnit | undefined {
  const idx = allLessons.findIndex((l) => l.id === currentLessonId);
  if (idx === -1 || idx === allLessons.length - 1) return undefined;
  return allLessons[idx + 1];
}

/** Get the previous lesson */
export function getPreviousLesson(currentLessonId: string): LessonUnit | undefined {
  const idx = allLessons.findIndex((l) => l.id === currentLessonId);
  if (idx <= 0) return undefined;
  return allLessons[idx - 1];
}

/** Count total exercises in a lesson */
export function countExercises(lesson: LessonUnit): number {
  switch (lesson.category) {
    case "grammar":
      return lesson.exercises.length;
    case "vocabulary":
      return lesson.exercises.length;
    case "listening":
      return lesson.exercises.length;
    case "reading":
      return lesson.exercises.reduce((sum, e) => {
        if ("questions" in e) return sum + e.questions.length;
        return sum + 1;
      }, 0);
    case "test":
      return lesson.exercises.reduce((sum, e) => {
        if ("questions" in e) return sum + e.questions.length;
        return sum + 1;
      }, 0);
    default:
      return 0;
  }
}

/** Get exercises from a lesson in a uniform format for the drill engine */
export function getExercisesFromLesson(
  lesson: LessonUnit,
): (GrammarExercise | VocabExercise)[] {
  switch (lesson.category) {
    case "grammar":
      return lesson.exercises;
    case "vocabulary":
      return lesson.exercises;
    case "test":
      // TestUnit exercises are a union; filter for grammar/vocab for now
      return lesson.exercises.filter(
        (e): e is GrammarExercise | VocabExercise =>
          "grammarPoint" in e || "targetWordId" in e,
      );
    default:
      return [];
  }
}

// ─── Progress tracking (local storage based) ─────────────────────

const STORAGE_KEY = "toeic_study_progress";

function loadProgress(): Map<string, LessonProgress> {
  if (typeof window === "undefined") return new Map();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Map();
    const arr: LessonProgress[] = JSON.parse(raw);
    return new Map(arr.map((p) => [p.lessonId, p]));
  } catch {
    return new Map();
  }
}

function saveProgress(progressMap: Map<string, LessonProgress>): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...progressMap.values()]));
}

/** Record completion of a lesson */
export function recordLessonCompletion(
  lessonId: string,
  correctAnswers: number,
  totalQuestions: number,
): LessonProgress {
  const progressMap = loadProgress();
  const existing = progressMap.get(lessonId);
  const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  const progress: LessonProgress = {
    lessonId,
    completedAt: new Date().toISOString(),
    score,
    totalQuestions,
    correctAnswers,
    attempts: (existing?.attempts ?? 0) + 1,
  };

  progressMap.set(lessonId, progress);
  saveProgress(progressMap);
  return progress;
}

/** Get progress for a lesson */
export function getLessonProgress(lessonId: string): LessonProgress | null {
  const progressMap = loadProgress();
  return progressMap.get(lessonId) ?? null;
}

/** Get aggregate progress for a stage */
export function getStageProgress(stage: StudyStage): StageProgress {
  const lessons = getLessonsByStage(stage);
  const progressMap = loadProgress();

  const lessonsProgress = lessons.map((l) => {
    const p = progressMap.get(l.id);
    return p ?? {
      lessonId: l.id,
      completedAt: null,
      score: null,
      totalQuestions: countExercises(l),
      correctAnswers: 0,
      attempts: 0,
    };
  });

  const completed = lessonsProgress.filter((p) => p.completedAt !== null);
  const avgScore = completed.length > 0
    ? Math.round(completed.reduce((s, p) => s + (p.score ?? 0), 0) / completed.length)
    : 0;

  return {
    stage,
    totalLessons: lessons.length,
    completedLessons: completed.length,
    averageScore: avgScore,
    lessonsProgress,
  };
}

/** Check if a stage is complete (all lessons done with passing scores) */
export function isStageComplete(stage: StudyStage): boolean {
  const progress = getStageProgress(stage);
  return progress.completedLessons === progress.totalLessons;
}

/** Reset progress for a stage */
export function resetStageProgress(stage: StudyStage): void {
  const lessons = getLessonsByStage(stage);
  const progressMap = loadProgress();
  for (const l of lessons) {
    progressMap.delete(l.id);
  }
  saveProgress(progressMap);
}
