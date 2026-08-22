"use client";

import { ArrowRight, Check, Clock3, Loader2, RotateCcw, Sparkles, Target, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PracticeExerciseView } from "@/domain/api-contracts";
import { apiRequest } from "@/lib/api-client";
import { playAnswerFeedback } from "@/lib/feedback-sound";

type AnswerFeedback = {
  correct: boolean;
  acceptedAnswers: string[];
  correctOptionId: string;
  errorCategory: string | null;
  explanation: string;
  optionRationales: Record<string, string>;
};

export function PracticeSession({ exercises, round = 0 }: { exercises: PracticeExerciseView[]; round?: number }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState<AnswerFeedback | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [results, setResults] = useState<Array<{ correct: boolean; errorCategory: string | null }>>([]);
  const [error, setError] = useState("");
  const startedAtRef = useRef(0);
  const submittingRef = useRef(false);
  const current = exercises[index];
  const finished = index >= exercises.length;

  const restart = () => {
    setIndex(0);
    setSelected("");
    setFeedback(null);
    setResults([]);
    setError("");
    startedAtRef.current = Date.now();
  };

  useEffect(() => {
    const handleAuthSuccess = () => setError("");
    window.addEventListener("auth:success", handleAuthSuccess);
    return () => window.removeEventListener("auth:success", handleAuthSuccess);
  }, []);

  useEffect(() => {
    if (finished || feedback) return;
    startedAtRef.current = Date.now();
    setElapsedSeconds(0);
    const timer = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startedAtRef.current) / 1_000));
    }, 500);
    return () => clearInterval(timer);
  }, [feedback, finished, index]);

  const submit = useCallback(async () => {
    if (!selected || feedback || submittingRef.current) return;
    submittingRef.current = true;
    setIsChecking(true);
    setError("");
    let data: AnswerFeedback;
    try {
      data = await apiRequest<AnswerFeedback>("/api/practice/answer", {
        method: "POST",
        body: JSON.stringify({
          exerciseId: current.id,
          selectedOptionId: selected,
          responseTimeMs: Date.now() - startedAtRef.current,
        }),
      });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Không thể chấm câu trả lời.");
      submittingRef.current = false;
      setIsChecking(false);
      return;
    }
    setFeedback(data);
    setResults((values) => [...values, { correct: data.correct, errorCategory: data.errorCategory }]);
    playAnswerFeedback(data.correct);
    submittingRef.current = false;
    setIsChecking(false);
  }, [current, feedback, selected]);

  const next = useCallback(() => {
    setIndex((value) => value + 1);
    setSelected("");
    setFeedback(null);
    setError("");
  }, []);

  useEffect(() => {
    if (finished) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || event.ctrlKey || event.altKey || event.metaKey) return;
      if (event.target instanceof HTMLElement && event.target.closest("button, a, input, textarea")) return;
      if (/^[1-4]$/.test(event.key) && !feedback) {
        const option = current.options[Number(event.key) - 1];
        if (!option) return;
        event.preventDefault();
        setSelected(option.id);
        return;
      }
      if (event.key !== "Enter") return;
      if (!feedback && !selected) return;
      event.preventDefault();
      if (feedback) next();
      else void submit();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [current, feedback, finished, next, selected, submit]);

  if (finished) {
    const correct = results.filter((result) => result.correct).length;
    const isZeroError = correct === results.length && results.length > 0;
    const errorCounts = new Map<string, number>();
    for (const result of results) {
      if (result.errorCategory) errorCounts.set(result.errorCategory, (errorCounts.get(result.errorCategory) ?? 0) + 1);
    }
    const topError = [...errorCounts.entries()].sort((a, b) => b[1] - a[1])[0];
    const nextRoundHref = `/practice?session=toeic_part_5&round=${round + 1}`;

    return (
      <section className="study-panel grid min-h-[460px] place-items-center p-7 text-center">
        <div className="max-w-lg">
          <span className={`mx-auto grid size-14 place-items-center rounded-full ${isZeroError ? "bg-[var(--success)] text-[#052016] ring-4 ring-[var(--success)]/20" : "bg-[var(--primary)] text-[var(--primary-ink)]"}`}>
            {isZeroError ? <Sparkles className="size-7 animate-pulse" /> : <Target className="size-7" />}
          </span>
          <p className="eyebrow mt-5">
            {isZeroError ? "Hoàn thành xuất sắc · 0 Lỗi" : "Mini drill hoàn tất"}
          </p>
          <h2 className="mt-2 text-5xl font-extrabold tracking-[-0.015em]">{correct}/{results.length}</h2>
          <p className="muted mt-3">
            {isZeroError
              ? "Tuyệt đối không có lỗi sai! Hệ thống đã tự động xoay và mở khóa 10 câu Part 5 tiếp theo."
              : "Đây là accuracy của Part 5 drill, không phải điểm TOEIC ước tính."}
          </p>
          {topError && !isZeroError && (
            <p className="mt-5 rounded-2xl border border-[var(--warning)]/35 bg-[rgba(146,112,58,0.07)] p-4 text-sm">
              Focus tiếp theo: <strong>{topError[0].replaceAll("_", " ")}</strong> · {topError[1]} lỗi.
            </p>
          )}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {isZeroError ? (
              <>
                <Link href={nextRoundHref} className="btn-primary flex items-center gap-2">
                  <span>Luyện 10 câu mới tiếp theo</span>
                  <ArrowRight className="size-4" />
                </Link>
                <button type="button" onClick={restart} className="btn-quiet flex items-center gap-2">
                  <RotateCcw className="size-4" />
                  <span>Làm lại bộ này</span>
                </button>
              </>
            ) : (
              <>
                <button type="button" onClick={restart} className="btn-primary flex items-center gap-2">
                  <RotateCcw className="size-4" />
                  <span>Luyện lại (Mục tiêu 0 lỗi)</span>
                </button>
                <Link href={nextRoundHref} className="btn-quiet flex items-center gap-2">
                  <span>Chuyển 10 câu mới</span>
                  <ArrowRight className="size-4" />
                </Link>
              </>
            )}
            <Link href="/progress" className="btn-quiet">Xem tiến bộ</Link>
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
              <p className="muted mt-1 flex items-center gap-1.5 text-xs"><Clock3 className="size-3.5" />{elapsedSeconds}s · recommended 25s</p>
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
                  aria-pressed={isSelected}
                  className={`flex min-h-16 items-center gap-3 rounded-2xl border px-4 py-3 text-left font-bold ${
                    isCorrectOption ? "border-[var(--success)] bg-[rgba(95,118,93,0.08)]" : isWrongSelected ? "border-[var(--danger)] bg-[rgba(166,87,87,0.07)]" : isSelected ? "border-[var(--primary)] bg-[var(--active)]" : "border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--panel-soft)]"
                  }`}
                >
                  <span className={`grid size-8 shrink-0 place-items-center rounded-xl border text-xs ${isSelected ? "border-current" : "border-[var(--border)] text-[var(--muted)]"}`}>{option.id}<span className="sr-only"> · phím {current.options.indexOf(option) + 1}</span></span>
                  <span>{option.text}</span>
                  {isCorrectOption && <Check className="ml-auto size-4 text-[var(--success)]" />}
                  {isWrongSelected && <X className="ml-auto size-4 text-[var(--danger)]" />}
                </button>
              );
            })}
          </div>

          <div aria-live="polite">
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
          </div>
          {error && (
            <div className="mt-4 flex items-center justify-between rounded-xl border border-[var(--danger)]/40 bg-[rgba(141,75,75,0.07)] p-3 text-sm text-[var(--danger)]">
              <span>{error}</span>
              {(error.includes("Authentication required") || error.includes("Backend authentication") || error.includes("401")) && (
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent("open-auth-modal"))}
                  className="underline font-bold hover:opacity-80 cursor-pointer text-xs uppercase ml-2 shrink-0"
                >
                  Đăng nhập ngay
                </button>
              )}
            </div>
          )}
          <p className="muted mt-3 text-xs">Phím 1–4 để chọn · Enter để chấm/chuyển câu</p>
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
