"use client";

import { ArrowRight, Check, Clock3, Loader2, Target, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { PracticeExerciseView } from "@/services/practice-service";

type AnswerFeedback = {
  correct: boolean;
  acceptedAnswers: string[];
  correctOptionId: string;
  errorCategory: string | null;
  explanation: string;
  optionRationales: Record<string, string>;
};

export function PracticeSession({ exercises }: { exercises: PracticeExerciseView[] }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState<AnswerFeedback | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [results, setResults] = useState<Array<{ correct: boolean; errorCategory: string | null }>>([]);
  const [error, setError] = useState("");
  const current = exercises[index];
  const finished = index >= exercises.length;

  async function submit() {
    if (!selected || feedback) return;
    setIsChecking(true);
    setError("");
    const response = await fetch("/api/practice/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        exerciseId: current.id,
        selectedOptionId: selected,
        responseTimeMs: Date.now() - startedAt,
      }),
    });
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      setError(data?.error ?? "Không thể chấm câu trả lời.");
      setIsChecking(false);
      return;
    }
    setFeedback(data);
    setResults((values) => [...values, { correct: data.correct, errorCategory: data.errorCategory }]);
    setIsChecking(false);
  }

  function next() {
    setIndex((value) => value + 1);
    setSelected("");
    setFeedback(null);
    setError("");
    setStartedAt(Date.now());
  }

  if (finished) {
    const correct = results.filter((result) => result.correct).length;
    const errorCounts = new Map<string, number>();
    for (const result of results) {
      if (result.errorCategory) errorCounts.set(result.errorCategory, (errorCounts.get(result.errorCategory) ?? 0) + 1);
    }
    const topError = [...errorCounts.entries()].sort((a, b) => b[1] - a[1])[0];
    return (
      <section className="study-panel grid min-h-[460px] place-items-center p-7 text-center">
        <div className="max-w-lg">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-[var(--primary)] text-[var(--primary-ink)]"><Target className="size-7" /></span>
          <p className="eyebrow mt-5">Mini drill hoàn tất</p>
          <h2 className="mt-2 text-5xl font-extrabold tracking-[-0.015em]">{correct}/{results.length}</h2>
          <p className="muted mt-3">Đây là accuracy của Part 5 drill, không phải điểm TOEIC ước tính.</p>
          {topError && <p className="mt-5 rounded-2xl border border-[var(--warning)]/35 bg-[rgba(146,112,58,0.07)] p-4 text-sm">Focus tiếp theo: <strong>{topError[0].replaceAll("_", " ")}</strong> · {topError[1]} lỗi.</p>}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/progress" className="btn-primary">Xem bằng chứng tiến bộ</Link>
            <Link href="/" className="btn-quiet">Về Today</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="study-panel overflow-hidden">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_270px]">
        <div className="min-h-[590px] p-5 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow">Question {index + 1} / {exercises.length}</p>
              <p className="muted mt-1 flex items-center gap-1.5 text-xs"><Clock3 className="size-3.5" />Recommended: 25 seconds</p>
            </div>
            <span className="status-pill">Difficulty {current.difficulty}</span>
          </div>

          <h2 className="mt-9 max-w-3xl text-2xl font-bold leading-10 md:text-[1.7rem]">{current.prompt}</h2>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {current.options.map((option) => {
              const isSelected = selected === option.id;
              const isCorrectOption = feedback?.correctOptionId === option.id;
              const isWrongSelected = feedback && isSelected && !feedback.correct;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => !feedback && setSelected(option.id)}
                  disabled={Boolean(feedback)}
                  className={`flex min-h-16 items-center gap-3 rounded-2xl border px-4 py-3 text-left font-bold ${
                    isCorrectOption ? "border-[var(--success)] bg-[rgba(95,118,93,0.08)]" : isWrongSelected ? "border-[var(--danger)] bg-[rgba(166,87,87,0.07)]" : isSelected ? "border-[var(--primary)] bg-[var(--active)]" : "border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--panel-soft)]"
                  }`}
                >
                  <span className={`grid size-8 shrink-0 place-items-center rounded-xl border text-xs ${isSelected ? "border-current" : "border-[var(--border)] text-[var(--muted)]"}`}>{option.id}</span>
                  <span>{option.text}</span>
                  {isCorrectOption && <Check className="ml-auto size-4 text-[var(--success)]" />}
                  {isWrongSelected && <X className="ml-auto size-4 text-[var(--danger)]" />}
                </button>
              );
            })}
          </div>

          {!feedback ? (
            <button type="button" onClick={submit} disabled={!selected || isChecking} className="btn-primary mt-6">
              {isChecking ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}Chấm câu trả lời
            </button>
          ) : (
            <div className={`mt-7 rounded-2xl border p-5 ${feedback.correct ? "border-[var(--success)]/40 bg-[rgba(95,118,93,0.07)]" : "border-[var(--warning)]/40 bg-[rgba(146,112,58,0.07)]"}`}>
              <p className="font-extrabold">{feedback.correct ? "Đúng. Rule đã được áp dụng chính xác." : `Chưa đúng · ${feedback.errorCategory?.replaceAll("_", " ")}`}</p>
              <p className="muted mt-2 leading-7">{feedback.explanation}</p>
              <p className="mt-3 text-sm"><strong>{selected}:</strong> {feedback.optionRationales[selected]}</p>
              <button type="button" onClick={next} className="btn-primary mt-5">{index === exercises.length - 1 ? "Xem kết quả" : "Câu tiếp theo"}<ArrowRight className="size-4" /></button>
            </div>
          )}
          {error && <p className="mt-4 text-sm text-[var(--danger)]">{error}</p>}
        </div>

        <aside className="border-t border-[var(--border)] bg-[var(--surface)] p-5 lg:border-l lg:border-t-0">
          <p className="eyebrow">Session map</p>
          <div className="mt-4 grid grid-cols-5 gap-2 lg:grid-cols-2">
            {exercises.map((exercise, exerciseIndex) => {
              const result = results[exerciseIndex];
              return (
                <span key={exercise.id} className={`grid aspect-square place-items-center rounded-xl border text-xs font-extrabold lg:aspect-auto lg:min-h-10 ${exerciseIndex === index ? "border-[var(--primary)] text-[var(--primary)]" : result?.correct ? "border-[var(--success)]/45 text-[var(--success)]" : result ? "border-[var(--danger)]/45 text-[var(--danger)]" : "border-[var(--border)] text-[var(--muted-2)]"}`}>
                  {result?.correct ? <Check className="size-3.5" /> : result ? <X className="size-3.5" /> : exerciseIndex + 1}
                </span>
              );
            })}
          </div>
          <div className="mt-6 border-t border-[var(--border)] pt-5">
            <p className="text-sm font-bold">Format thật, workload ngắn</p>
            <p className="muted mt-2 text-xs leading-5">Part 5 dùng tốc độ và word/grammar decisions. Mỗi lỗi được ghi theo taxonomy để Progress có hành động tiếp theo.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
