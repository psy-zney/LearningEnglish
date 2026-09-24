/**
 * Study Roadmap domain types for TOEIC 0→600 curriculum.
 *
 * Covers two stages: Foundation (0→300) and Intermediate (300→600).
 * Each stage contains grammar lessons, vocabulary lessons, listening/reading
 * practice, and progress/final tests.
 */

export type StudyStage = "foundation" | "intermediate";

export type LessonCategory =
  | "grammar"
  | "vocabulary"
  | "listening"
  | "reading"
  | "test";

export type ExerciseType =
  | "part5_fill_blank"      // Part 5 style: sentence with blank + 4 options
  | "word_form"             // Choose correct word form (noun/verb/adj/adv)
  | "meaning_match"         // Match word to Vietnamese meaning
  | "collocation"           // Choose correct collocation
  | "error_correction"      // Identify the error
  | "sentence_completion"   // Complete sentence with vocab
  | "listening_photo"       // Part 1: describe photo
  | "listening_qa"          // Part 2: question-response
  | "listening_conversation"// Part 3: short conversation
  | "listening_talk"        // Part 4: short talk
  | "reading_text_completion" // Part 6: text completion
  | "reading_comprehension";  // Part 7: reading passage + questions

export type GrammarExercise = {
  id: string;
  type: ExerciseType;
  prompt: string;
  options: { id: "A" | "B" | "C" | "D"; text: string }[];
  correctOptionId: "A" | "B" | "C" | "D";
  explanationVi: string;
  grammarPoint: string;
  difficulty: 1 | 2 | 3;
};

export type VocabWord = {
  id: string;
  word: string;
  phonetic: string;
  pos: "noun" | "verb" | "adjective" | "adverb" | "preposition" | "conjunction" | "phrase";
  meaningVi: string;
  exampleEn: string;
  exampleVi: string;
  topic: string;
  collocations: string[];
  wordFamily?: { noun?: string; verb?: string; adjective?: string; adverb?: string };
};

export type VocabExercise = {
  id: string;
  type: "meaning_match" | "collocation" | "sentence_completion" | "word_form";
  prompt: string;
  options: { id: "A" | "B" | "C" | "D"; text: string }[];
  correctOptionId: "A" | "B" | "C" | "D";
  explanationVi: string;
  targetWordId: string;
  difficulty: 1 | 2 | 3;
};

export type ListeningExercise = {
  id: string;
  type: ExerciseType;
  /** Audio transcript (displayed after answering for study) */
  transcript: string;
  /** The question displayed to the learner */
  question: string;
  options: { id: "A" | "B" | "C" | "D"; text: string }[];
  correctOptionId: "A" | "B" | "C" | "D";
  explanationVi: string;
  part: 1 | 2 | 3 | 4;
  difficulty: 1 | 2 | 3;
};

export type ReadingExercise = {
  id: string;
  type: "reading_text_completion" | "reading_comprehension";
  passage: string;
  questions: {
    id: string;
    question: string;
    options: { id: "A" | "B" | "C" | "D"; text: string }[];
    correctOptionId: "A" | "B" | "C" | "D";
    explanationVi: string;
  }[];
  part: 6 | 7;
  difficulty: 1 | 2 | 3;
};

export type GrammarLesson = {
  id: string;
  stage: StudyStage;
  order: number;
  titleVi: string;
  titleEn: string;
  category: "grammar";
  /** Structured theory content in Vietnamese */
  theorySections: {
    heading: string;
    content: string;
    examples?: { en: string; vi: string }[];
    tip?: string;
  }[];
  exercises: GrammarExercise[];
  /** Source URL for reference */
  sourceUrl?: string;
};

export type VocabLesson = {
  id: string;
  stage: StudyStage;
  order: number;
  titleVi: string;
  titleEn: string;
  category: "vocabulary";
  topic: string;
  words: VocabWord[];
  exercises: VocabExercise[];
  sourceUrl?: string;
};

export type ListeningLesson = {
  id: string;
  stage: StudyStage;
  order: number;
  titleVi: string;
  titleEn: string;
  category: "listening";
  part: 1 | 2 | 3 | 4;
  strategyVi: string;
  exercises: ListeningExercise[];
};

export type ReadingLesson = {
  id: string;
  stage: StudyStage;
  order: number;
  titleVi: string;
  titleEn: string;
  category: "reading";
  part: 5 | 6 | 7;
  strategyVi: string;
  exercises: (GrammarExercise | ReadingExercise)[];
  sourceUrl?: string;
};

export type TestUnit = {
  id: string;
  stage: StudyStage;
  order: number;
  titleVi: string;
  titleEn: string;
  category: "test";
  testType: "mini_test" | "progress_test" | "final_test";
  /** Which lesson IDs this test covers */
  coversLessonIds: string[];
  exercises: (GrammarExercise | VocabExercise | ListeningExercise | ReadingExercise)[];
  /** Passing threshold as percentage (0-100) */
  passingScore: number;
  timeLimit?: number; // minutes
};

export type LessonUnit =
  | GrammarLesson
  | VocabLesson
  | ListeningLesson
  | ReadingLesson
  | TestUnit;

export type StudyRoadmap = {
  version: string;
  stages: {
    id: StudyStage;
    titleVi: string;
    targetScore: string;
    lessons: LessonUnit[];
  }[];
};

export type LessonProgress = {
  lessonId: string;
  completedAt: string | null;
  score: number | null;
  totalQuestions: number;
  correctAnswers: number;
  attempts: number;
};

export type StageProgress = {
  stage: StudyStage;
  totalLessons: number;
  completedLessons: number;
  averageScore: number;
  lessonsProgress: LessonProgress[];
};
