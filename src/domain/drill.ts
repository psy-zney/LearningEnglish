export const drillModes = ["meaning", "reverse_meaning", "fill_blank", "collocation", "pattern"] as const;

export type DrillMode = (typeof drillModes)[number];
export type DrillInputKind = "choice" | "text";

/**
 * Pure, serializable input accepted by the drill builder. Callers must pass
 * content that has already passed the application's approval filter.
 */
export type DrillContent = {
  id: string;
  kind: string;
  title: string;
  meaningVi: string;
  topic: string | null;
  detail: Record<string, unknown>;
};

export type DrillOption = {
  id: string;
  text: string;
};

export type DrillSource = {
  attribution: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
};

/** Public exercise DTO. It intentionally contains no answer marker. */
export type DrillView = {
  id: string;
  contentId: string;
  mode: DrillMode;
  inputKind: DrillInputKind;
  instruction: string;
  prompt: string;
  options?: DrillOption[];
  source?: DrillSource;
};

export type DrillBuildOptions = {
  dateKey: string;
  modes?: readonly DrillMode[];
  limitPerMode?: number;
  optionCount?: number;
  round?: number;
};

export type DrillGrade =
  | {
      status: "graded";
      isCorrect: boolean;
      correctAnswer: string;
      contentId: string;
      mode: DrillMode;
      explanation?: string;
    }
  | {
      status: "invalid";
      code: "invalid_drill" | "invalid_answer";
    };

export type GradeDailyDrillInput = DrillBuildOptions & {
  drillId: string;
  answer: string;
};
