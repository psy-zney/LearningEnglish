"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Volume2,
  Award,
  RotateCcw,
  Sparkles,
  Layers,
  FileText,
  Headphones,
  Check,
  ChevronRight,
  Lightbulb,
} from "lucide-react";
import type {
  LessonUnit,
  GrammarLesson,
  VocabLesson,
  ListeningLesson,
  ReadingLesson,
  TestUnit,
  GrammarExercise,
  VocabExercise,
  ListeningExercise,
  ReadingExercise,
} from "@/domain/study-roadmap";
import {
  getLessonById,
  getNextLesson,
  getPreviousLesson,
  recordLessonCompletion,
  getLessonProgress,
} from "@/services/lesson-service";

interface LessonViewerProps {
  lessonId: string;
  onBack: () => void;
  onSelectLesson?: (id: string) => void;
}

export function LessonViewer({ lessonId, onBack, onSelectLesson }: LessonViewerProps) {
  const lesson = getLessonById(lessonId);

  const [activeTab, setActiveTab] = useState<"theory" | "exercises" | "words">("theory");
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [completedSaved, setCompletedSaved] = useState(false);

  // Reset state when lesson changes
  useEffect(() => {
    setUserAnswers({});
    setSubmitted(false);
    setCompletedSaved(false);

    if (lesson?.category === "vocabulary") {
      setActiveTab("words");
    } else if (lesson?.category === "grammar" && "theorySections" in lesson) {
      setActiveTab("theory");
    } else {
      setActiveTab("exercises");
    }
  }, [lessonId, lesson?.category]);

  if (!lesson) {
    return (
      <div className="p-8 text-center bg-[var(--surface-1)] rounded-2xl border border-[var(--border)]">
        <p className="text-lg font-bold text-[var(--muted-1)]">Không tìm thấy bài học #{lessonId}</p>
        <button onClick={onBack} className="btn-primary mt-4">
          Quay lại lộ trình
        </button>
      </div>
    );
  }

  const nextLesson = getNextLesson(lessonId);
  const prevLesson = getPreviousLesson(lessonId);
  const existingProgress = getLessonProgress(lessonId);

  // Play audio speech using Web Speech API
  const speakWord = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (submitted && lesson.category === "test") return; // locked after test submit
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  // Extract all questions for grading
  const extractTestQuestions = (): { id: string; correct: string }[] => {
    const list: { id: string; correct: string }[] = [];
    if (lesson.category === "grammar") {
      lesson.exercises.forEach((e) => list.push({ id: e.id, correct: e.correctOptionId }));
    } else if (lesson.category === "vocabulary") {
      lesson.exercises.forEach((e) => list.push({ id: e.id, correct: e.correctOptionId }));
    } else if (lesson.category === "listening") {
      lesson.exercises.forEach((e) => list.push({ id: e.id, correct: e.correctOptionId }));
    } else if (lesson.category === "reading") {
      lesson.exercises.forEach((e) => {
        if ("questions" in e) {
          e.questions.forEach((q) => list.push({ id: q.id, correct: q.correctOptionId }));
        } else {
          list.push({ id: e.id, correct: e.correctOptionId });
        }
      });
    } else if (lesson.category === "test") {
      lesson.exercises.forEach((e) => {
        if ("questions" in e) {
          e.questions.forEach((q) => list.push({ id: q.id, correct: q.correctOptionId }));
        } else {
          list.push({ id: e.id, correct: e.correctOptionId });
        }
      });
    }
    return list;
  };

  const allQuestions = extractTestQuestions();
  const totalQuestions = allQuestions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = allQuestions.filter((q) => userAnswers[q.id] === q.correct).length;
  const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const isPassing = lesson.category === "test" ? scorePercent >= (lesson.passingScore ?? 60) : scorePercent >= 60;

  const handleSubmitTest = () => {
    setSubmitted(true);
    recordLessonCompletion(lessonId, correctCount, totalQuestions);
    setCompletedSaved(true);
  };

  const handleResetExercises = () => {
    setUserAnswers({});
    setSubmitted(false);
    setCompletedSaved(false);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto pb-16">
      {/* ─── Top Navigation Bar ────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[var(--surface-1)] border border-[var(--border)] p-4 rounded-2xl shadow-sm">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-[var(--muted-1)] hover:text-[var(--foreground)] transition-colors px-3 py-1.5 rounded-lg hover:bg-[var(--surface-2)]"
        >
          <ArrowLeft className="size-4" />
          <span>Lộ trình học</span>
        </button>

        <div className="flex items-center gap-2">
          {prevLesson && (
            <button
              onClick={() => onSelectLesson?.(prevLesson.id)}
              className="flex items-center gap-1.5 text-xs font-semibold text-[var(--muted-1)] hover:text-[var(--foreground)] px-2.5 py-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--surface-2)] transition-colors"
              title={prevLesson.titleVi}
            >
              <ArrowLeft className="size-3.5" />
              <span className="hidden sm:inline">Bài trước</span>
            </button>
          )}

          {nextLesson && (
            <button
              onClick={() => onSelectLesson?.(nextLesson.id)}
              className="flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] hover:opacity-90 px-3 py-1.5 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/20 transition-colors"
              title={nextLesson.titleVi}
            >
              <span className="hidden sm:inline">Bài tiếp theo</span>
              <ArrowRight className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ─── Lesson Header Banner ──────────────────────────────────────── */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[var(--surface-1)] to-[var(--surface-2)] border border-[var(--border)] shadow-sm relative overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[var(--primary)]/15 text-[var(--primary)]">
            {lesson.stage === "foundation" ? "Chặng 1: 0 → 300" : "Chặng 2: 300 → 600"}
          </span>

          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[var(--surface-2)] border border-[var(--border)] text-[var(--foreground)] capitalize">
            {lesson.category === "grammar"
              ? "Ngữ pháp"
              : lesson.category === "vocabulary"
              ? "Từ vựng"
              : lesson.category === "listening"
              ? `Luyện nghe Part ${"part" in lesson ? lesson.part : ""}`
              : lesson.category === "reading"
              ? `Đọc hiểu Part ${"part" in lesson ? lesson.part : ""}`
              : "Bài kiểm tra"}
          </span>

          {existingProgress && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Check className="size-3" /> Đã hoàn thành ({existingProgress.score}%)
            </span>
          )}
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-[var(--foreground)] tracking-tight">
          {lesson.titleVi}
        </h1>
        <p className="text-sm md:text-base font-medium text-[var(--muted-1)] mt-1">
          {lesson.titleEn}
        </p>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-[var(--border)]">
          {lesson.category === "grammar" && (
            <button
              onClick={() => setActiveTab("theory")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === "theory"
                  ? "bg-[var(--primary)] text-white shadow-sm"
                  : "bg-[var(--surface-2)] text-[var(--muted-1)] hover:text-[var(--foreground)]"
              }`}
            >
              <BookOpen className="size-4" />
              Lý thuyết trọng tâm
            </button>
          )}

          {lesson.category === "vocabulary" && (
            <button
              onClick={() => setActiveTab("words")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === "words"
                  ? "bg-[var(--primary)] text-white shadow-sm"
                  : "bg-[var(--surface-2)] text-[var(--muted-1)] hover:text-[var(--foreground)]"
              }`}
            >
              <Layers className="size-4" />
              Từ vựng cốt lõi ({"words" in lesson ? lesson.words.length : 0})
            </button>
          )}

          <button
            onClick={() => setActiveTab("exercises")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === "exercises"
                ? "bg-[var(--primary)] text-white shadow-sm"
                : "bg-[var(--surface-2)] text-[var(--muted-1)] hover:text-[var(--foreground)]"
            }`}
          >
            <Sparkles className="size-4" />
            {lesson.category === "test" ? "Làm bài kiểm tra" : "Bài tập thực hành"} ({totalQuestions})
          </button>
        </div>
      </div>

      {/* ─── TAB 1: Grammar Theory ─────────────────────────────────────── */}
      {activeTab === "theory" && lesson.category === "grammar" && (
        <div className="space-y-6">
          {"theorySections" in lesson &&
            lesson.theorySections.map((sec, idx) => (
              <div
                key={idx}
                className="p-6 md:p-7 rounded-2xl bg-[var(--surface-1)] border border-[var(--border)] shadow-sm space-y-4"
              >
                <h2 className="text-xl font-extrabold text-[var(--foreground)] flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-[var(--primary)]/15 text-[var(--primary)] text-xs font-black">
                    {idx + 1}
                  </span>
                  {sec.heading}
                </h2>

                <div className="text-sm md:text-base leading-relaxed text-[var(--foreground)] whitespace-pre-line font-normal">
                  {sec.content}
                </div>

                {sec.examples && sec.examples.length > 0 && (
                  <div className="mt-4 p-4 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] space-y-2">
                    <p className="text-xs font-extrabold uppercase text-[var(--muted-1)] tracking-wider">
                      Ví dụ minh họa:
                    </p>
                    <div className="space-y-2">
                      {sec.examples.map((ex, exIdx) => (
                        <div key={exIdx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 text-sm">
                          <span className="font-bold text-[var(--primary)]">{ex.en}</span>
                          <span className="text-[var(--muted-1)] italic">→ {ex.vi}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {sec.tip && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-800 dark:text-amber-300">
                    <Lightbulb className="size-5 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs uppercase tracking-wide block mb-1">Mẹo thi TOEIC:</span>
                      <p className="text-sm leading-relaxed">{sec.tip}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setActiveTab("exercises")}
              className="btn-primary flex items-center gap-2 px-6 py-3 text-sm font-bold shadow-md"
            >
              <span>Chuyển sang làm bài tập</span>
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      )}

      {/* ─── TAB 2: Vocabulary Words List ──────────────────────────────── */}
      {activeTab === "words" && lesson.category === "vocabulary" && "words" in lesson && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lesson.words.map((w, idx) => (
              <div
                key={w.id || idx}
                className="p-5 rounded-2xl bg-[var(--surface-1)] border border-[var(--border)] shadow-sm hover:border-[var(--primary)]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-xl font-black text-[var(--foreground)] tracking-tight">{w.word}</h3>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[var(--surface-2)] text-[var(--muted-1)] uppercase border border-[var(--border)]">
                          {w.pos}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-[var(--muted-2)] font-mono mt-0.5">{w.phonetic}</p>
                    </div>

                    <button
                      onClick={() => speakWord(w.word)}
                      className="p-2 rounded-xl bg-[var(--surface-2)] hover:bg-[var(--primary)]/15 text-[var(--muted-1)] hover:text-[var(--primary)] transition-colors"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="size-4" />
                    </button>
                  </div>

                  <div className="mt-3">
                    <p className="text-base font-extrabold text-[var(--primary)]">{w.meaningVi}</p>
                  </div>

                  {w.collocations && w.collocations.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {w.collocations.map((col, cIdx) => (
                        <span
                          key={cIdx}
                          className="text-[0.72rem] font-medium px-2 py-0.5 rounded-md bg-[var(--surface-2)] text-[var(--muted-1)]"
                        >
                          {col}
                        </span>
                      ))}
                    </div>
                  )}

                  {w.wordFamily && (
                    <div className="mt-2.5 text-xs text-[var(--muted-2)] flex flex-wrap gap-x-3 gap-y-1">
                      {w.wordFamily.noun && <span>n: <strong className="text-[var(--muted-1)]">{w.wordFamily.noun}</strong></span>}
                      {w.wordFamily.verb && <span>v: <strong className="text-[var(--muted-1)]">{w.wordFamily.verb}</strong></span>}
                      {w.wordFamily.adjective && <span>adj: <strong className="text-[var(--muted-1)]">{w.wordFamily.adjective}</strong></span>}
                      {w.wordFamily.adverb && <span>adv: <strong className="text-[var(--muted-1)]">{w.wordFamily.adverb}</strong></span>}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border)] text-xs space-y-1 bg-[var(--surface-2)]/50 p-2.5 rounded-xl">
                  <p className="font-semibold text-[var(--foreground)]">{w.exampleEn}</p>
                  <p className="text-[var(--muted-1)] italic">{w.exampleVi}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setActiveTab("exercises")}
              className="btn-primary flex items-center gap-2 px-6 py-3 text-sm font-bold shadow-md"
            >
              <span>Luyện tập từ vựng ({lesson.exercises.length} bài)</span>
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      )}

      {/* ─── TAB 3: Exercises & Tests ──────────────────────────────────── */}
      {activeTab === "exercises" && (
        <div className="space-y-6">
          {/* Progress / Score Header */}
          <div className="p-4 rounded-2xl bg-[var(--surface-1)] border border-[var(--border)] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="text-sm font-bold text-[var(--foreground)]">
                Đã trả lời: <span className="text-[var(--primary)] font-black">{answeredCount}</span> / {totalQuestions}
              </div>
            </div>

            {submitted ? (
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm font-extrabold px-3 py-1 rounded-lg ${
                    isPassing
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                      : "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                  }`}
                >
                  Kết quả: {scorePercent}% ({correctCount}/{totalQuestions} câu đúng)
                </span>
                <button
                  onClick={handleResetExercises}
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--surface-2)] text-[var(--muted-1)]"
                >
                  <RotateCcw className="size-3.5" /> Làm lại
                </button>
              </div>
            ) : (
              <button
                onClick={handleSubmitTest}
                disabled={answeredCount === 0}
                className="btn-primary text-sm font-bold px-5 py-2 disabled:opacity-50"
              >
                Hoàn tất & Chấm điểm
              </button>
            )}
          </div>

          {/* Exercise List */}
          <div className="space-y-6">
            {/* Grammar / Vocab / Listening / Test questions */}
            {renderExercisesList(lesson, userAnswers, submitted, handleSelectOption, speakWord)}
          </div>

          {/* Completion Footer */}
          {submitted && (
            <div className="p-6 md:p-8 rounded-3xl bg-[var(--surface-1)] border border-[var(--border)] text-center space-y-4 shadow-sm">
              <Award className="size-12 mx-auto text-[var(--primary)]" />
              <h3 className="text-2xl font-black text-[var(--foreground)]">
                {isPassing ? "Xuất sắc! Bạn đã đạt yêu cầu bài học." : "Cố lên! Bạn có thể làm lại để nâng cao điểm số."}
              </h3>
              <p className="text-sm text-[var(--muted-1)] max-w-md mx-auto">
                Điểm số: <strong className="text-[var(--foreground)]">{scorePercent}%</strong> ({correctCount}/{totalQuestions} câu đúng).
                Tiến độ của bạn đã được tự động lưu.
              </p>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={handleResetExercises}
                  className="px-5 py-2.5 rounded-xl border border-[var(--border)] text-sm font-bold hover:bg-[var(--surface-2)] text-[var(--foreground)]"
                >
                  Làm lại bài này
                </button>

                {nextLesson && (
                  <button
                    onClick={() => onSelectLesson?.(nextLesson.id)}
                    className="btn-primary px-6 py-2.5 text-sm font-bold flex items-center gap-2"
                  >
                    <span>Bài học tiếp theo: {nextLesson.titleVi}</span>
                    <ArrowRight className="size-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Helper to render different exercise categories ────────────────

function renderExercisesList(
  lesson: LessonUnit,
  userAnswers: Record<string, string>,
  submitted: boolean,
  handleSelectOption: (qId: string, optId: string) => void,
  speakWord: (text: string) => void,
) {
  // If it's a Reading lesson or Test containing reading passages:
  if (lesson.category === "reading" || (lesson.category === "test" && lesson.exercises.some((e) => "passage" in e))) {
    return lesson.exercises.map((item, idx) => {
      if ("passage" in item) {
        const readEx = item as ReadingExercise;
        return (
          <div key={readEx.id} className="p-6 rounded-2xl bg-[var(--surface-1)] border border-[var(--border)] space-y-5">
            <div className="p-4 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] text-sm leading-relaxed font-mono whitespace-pre-line text-[var(--foreground)]">
              {readEx.passage}
            </div>

            <div className="space-y-4">
              {readEx.questions.map((q, qIdx) => (
                <QuestionItem
                  key={q.id}
                  index={qIdx + 1}
                  questionId={q.id}
                  prompt={q.question}
                  options={q.options}
                  correctOptionId={q.correctOptionId}
                  explanationVi={q.explanationVi}
                  selectedOptionId={userAnswers[q.id]}
                  submitted={submitted}
                  onSelect={(optId) => handleSelectOption(q.id, optId)}
                />
              ))}
            </div>
          </div>
        );
      }

      // Fallback single question item
      const singleEx = item as GrammarExercise;
      return (
        <QuestionItem
          key={singleEx.id}
          index={idx + 1}
          questionId={singleEx.id}
          prompt={singleEx.prompt}
          options={singleEx.options}
          correctOptionId={singleEx.correctOptionId}
          explanationVi={singleEx.explanationVi}
          selectedOptionId={userAnswers[singleEx.id]}
          submitted={submitted}
          onSelect={(optId) => handleSelectOption(singleEx.id, optId)}
        />
      );
    });
  }

  // If it's Listening Lesson:
  if (lesson.category === "listening") {
    return lesson.exercises.map((ex, idx) => {
      const lEx = ex as ListeningExercise;
      return (
        <div key={lEx.id} className="p-6 rounded-2xl bg-[var(--surface-1)] border border-[var(--border)] space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-[var(--surface-2)] text-[var(--muted-1)] uppercase">
              Câu hỏi #{idx + 1} · Part {lEx.part}
            </span>
            <button
              onClick={() => speakWord(lEx.transcript)}
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-[var(--surface-2)] hover:bg-[var(--primary)]/15 text-[var(--primary)] transition-colors"
              title="Đọc nội dung nghe"
            >
              <Volume2 className="size-3.5" />
              <span>Nghe audio</span>
            </button>
          </div>

          <p className="text-base font-bold text-[var(--foreground)] whitespace-pre-line">{lEx.question}</p>

          {/* Options */}
          <div className="grid grid-cols-1 gap-2 pt-1">
            {lEx.options.map((opt) => {
              const isSelected = userAnswers[lEx.id] === opt.id;
              const isCorrect = opt.id === lEx.correctOptionId;
              const showResult = submitted || isSelected;

              let btnStyle = "border-[var(--border)] bg-[var(--surface-2)] hover:border-[var(--primary)]/40 text-[var(--foreground)]";
              if (showResult && isSelected && isCorrect) {
                btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold";
              } else if (showResult && isSelected && !isCorrect) {
                btnStyle = "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-bold";
              } else if (submitted && isCorrect) {
                btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold";
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(lEx.id, opt.id)}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border text-left text-sm transition-all ${btnStyle}`}
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-1)] font-extrabold text-xs">
                    {opt.id}
                  </span>
                  <span className="leading-snug pt-0.5">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation / Transcript Reveal */}
          {(userAnswers[lEx.id] || submitted) && (
            <div className="mt-3 p-4 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] space-y-2 text-xs">
              <div>
                <span className="font-bold text-[var(--muted-1)] block mb-1">Transcript (Nội dung bài nghe):</span>
                <p className="font-mono text-[var(--foreground)] whitespace-pre-line">{lEx.transcript}</p>
              </div>
              <div className="pt-2 border-t border-[var(--border)]">
                <span className="font-bold text-[var(--primary)] block mb-0.5">Giải thích chi tiết:</span>
                <p className="text-[var(--foreground)]">{lEx.explanationVi}</p>
              </div>
            </div>
          )}
        </div>
      );
    });
  }

  // Standard Grammar & Vocab questions
  return lesson.exercises.map((ex, idx) => {
    const qEx = ex as GrammarExercise | VocabExercise;
    return (
      <QuestionItem
        key={qEx.id}
        index={idx + 1}
        questionId={qEx.id}
        prompt={qEx.prompt}
        options={qEx.options}
        correctOptionId={qEx.correctOptionId}
        explanationVi={qEx.explanationVi}
        selectedOptionId={userAnswers[qEx.id]}
        submitted={submitted}
        onSelect={(optId) => handleSelectOption(qEx.id, optId)}
      />
    );
  });
}

// ─── Single Question Item Component ───────────────────────────────

interface QuestionItemProps {
  index: number;
  questionId: string;
  prompt: string;
  options: { id: "A" | "B" | "C" | "D"; text: string }[];
  correctOptionId: "A" | "B" | "C" | "D";
  explanationVi: string;
  selectedOptionId?: string;
  submitted: boolean;
  onSelect: (optionId: string) => void;
}

function QuestionItem({
  index,
  prompt,
  options,
  correctOptionId,
  explanationVi,
  selectedOptionId,
  submitted,
  onSelect,
}: QuestionItemProps) {
  const isAnswered = selectedOptionId !== undefined;
  const isCorrect = selectedOptionId === correctOptionId;
  const showFeedback = isAnswered || submitted;

  return (
    <div className="p-5 md:p-6 rounded-2xl bg-[var(--surface-1)] border border-[var(--border)] shadow-sm space-y-4">
      <div className="flex items-start gap-3">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-2)] text-xs font-black text-[var(--muted-1)]">
          {index}
        </span>
        <p className="text-base font-bold text-[var(--foreground)] pt-0.5 leading-snug">{prompt}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        {options.map((opt) => {
          const isThisSelected = selectedOptionId === opt.id;
          const isThisCorrect = opt.id === correctOptionId;

          let btnStyle = "border-[var(--border)] bg-[var(--surface-2)] hover:border-[var(--primary)]/50 text-[var(--foreground)]";
          if (showFeedback && isThisSelected && isThisCorrect) {
            btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold shadow-sm";
          } else if (showFeedback && isThisSelected && !isThisCorrect) {
            btnStyle = "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-bold shadow-sm";
          } else if (submitted && isThisCorrect) {
            btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold";
          }

          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`flex items-start gap-3 p-3.5 rounded-xl border text-left text-sm transition-all ${btnStyle}`}
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-1)] font-black text-xs">
                {opt.id}
              </span>
              <span className="leading-snug pt-0.5">{opt.text}</span>
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div className="mt-3 p-3.5 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] text-xs flex items-start gap-2.5">
          {isCorrect ? (
            <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="size-4 text-rose-500 shrink-0 mt-0.5" />
          )}
          <div>
            <span className="font-extrabold block text-[var(--foreground)] mb-0.5">
              {isCorrect ? "Chính xác!" : `Chưa đúng. Đáp án chính xác là (${correctOptionId})`}
            </span>
            <p className="text-[var(--muted-1)] leading-relaxed">{explanationVi}</p>
          </div>
        </div>
      )}
    </div>
  );
}
