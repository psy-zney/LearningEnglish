import type { ExerciseOption } from "@/domain/exercise";
import type { DrillView } from "@/domain/drill";
import type { DrillSession } from "@/lib/drill-session";

export type ContentView = {
  id: string;
  sourceKey: string;
  kind: string;
  title: string;
  meaningVi: string;
  topic: string | null;
  toeicParts: number[];
  cefr: string | null;
  priority: number;
  detail: Record<string, unknown>;
  review: {
    stage: string;
    nextReviewAt: string;
    interval: number;
    repetition: number;
  } | null;
};

export type DailyPlan = {
  dateKey: string;
  dueCount: number;
  newCount: number;
  totalContent: number;
  streak: number;
  recoveryMode: boolean;
  attemptsToday: number;
  missionCompleted: boolean;
  tasks: Array<{
    id: string;
    title: string;
    detail: string;
    minutes: number;
    href: string;
    completed: boolean;
    disabled: boolean;
  }>;
};

export type ProgressSummary = {
  contentCount: number;
  startedCount: number;
  masteredCount: number;
  reviewRetention: number | null;
  part5: {
    answered: number;
    accuracy: number | null;
    medianSeconds: number | null;
  };
  drills: {
    answered: number;
    accuracy: number | null;
    medianSeconds: number | null;
    byMode: Array<{ mode: string; answered: number; accuracy: number | null; medianSeconds: number | null }>;
  };
  topErrors: Array<{ key: string; label: string; count: number }>;
  activities: Array<{ date: string; recalls: number; practice: number; learned: number }>;
};

export type PracticeExerciseView = {
  id: string;
  part: number;
  prompt: string;
  options: ExerciseOption[];
  difficulty: number;
};

export type ReviewQueueItem = { reviewStateId: string; content: ContentView };

export type DashboardResponse = { plan: DailyPlan; progress: ProgressSummary };
export type ContentListResponse = { items: ContentView[] };
export type ReviewQueueResponse = { items: ReviewQueueItem[] };
export type PracticeExercisesResponse = { exercises: PracticeExerciseView[] };
export type DrillSessionResponse = { session: DrillSession; dateKey: string; drills: DrillView[] };
export type DrillAnswerResponse = {
  correct: boolean;
  correctAnswer: string;
  errorCategory: string | null;
  explanation: string;
  mode: string;
};
export type ProgressResponse = { progress: ProgressSummary };
