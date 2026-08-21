"use client";

import { ArrowRight, Check, Clock3, Loader2, Target, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { DrillView } from "@/domain/drill";
import type { DrillAnswerResponse } from "@/domain/api-contracts";
import { apiRequest } from "@/lib/api-client";
import { getDrillKeyboardAction } from "@/lib/drill-keyboard";
import type { DrillSession as DrillSessionName } from "@/lib/drill-session";
import { playAnswerFeedback } from "@/lib/feedback-sound";

function formatElapsed(totalSeconds: number) {
  if (totalSeconds < 60) return `${totalSeconds}s`;
  return `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, "0")}`;
}

const modeLabels: Record<DrillView["mode"], string> = {
  meaning: "Chọn nghĩa",
  reverse_meaning: "Nhớ nghĩa ngược",
  fill_blank: "Điền từ",
  collocation: "Collocation",
  pattern: "Pattern",
};

export function DrillSession({
  drills,
  dateKey,
  session,
}: {
  drills: DrillView[];
  dateKey: string;
  session: DrillSessionName;
}) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<DrillAnswerResponse | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<boolean[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const startedAtRef = useRef(0);
  const submittingRef = useRef(false);
  const current = drills[index];
  const finished = index >= drills.length;

  useEffect(() => {
    if (finished || feedback) return;
    startedAtRef.current = Date.now();
    setElapsedSeconds(0);
    if (current.inputKind === "text") inputRef.current?.focus();
    const timer = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startedAtRef.current) / 1_000));
    }, 500);
    return () => clearInterval(timer);
  }, [current?.id, current?.inputKind, feedback, finished]);

  const submit = useCallback(async () => {
    if (!current || !answer.trim() || feedback || submittingRef.current) return;
    submittingRef.current = true;
    setIsChecking(true);
    setError("");
    try {
      const result = await apiRequest<DrillAnswerResponse>("/api/practice/drills/answer", {
        method: "POST",
        body: JSON.stringify({
          session,
          dateKey,
          drillId: current.id,
          answer,
          responseTimeMs: Date.now() - startedAtRef.current,
        }),
      });
      setFeedback(result);
      setResults((values) => [...values, result.correct]);
      playAnswerFeedback(result.correct);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Không thể chấm câu trả lời.");
    } finally {
      submittingRef.current = false;
      setIsChecking(false);
    }
  }, [answer, current, dateKey, feedback, session]);

  const next = useCallback(() => {
    if (!feedback) return;
    setIndex((value) => value + 1);
    setAnswer("");
    setFeedback(null);
    setError("");
  }, [feedback]);

  useEffect(() => {
    if (finished) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || event.ctrlKey || event.altKey || event.metaKey) return;
      if (event.target instanceof HTMLElement && event.target.closest("button, a")) return;
      const action = getDrillKeyboardAction(event.key, Boolean(feedback), Boolean(answer.trim()));
      if (!action) return;
      if (action.type === "focus") {
        if (current.inputKind !== "text" || document.activeElement === inputRef.current) return;
        event.preventDefault();
        inputRef.current?.focus();
      } else if (action.type === "select") {
        if (current.inputKind !== "choice") return;
        const option = current.options?.[action.index];
        if (!option) return;
        event.preventDefault();
        setAnswer(option.id);
      } else if (action.type === "submit") {
        event.preventDefault();
        void submit();
      } else {
        event.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [answer, current, feedback, finished, next, submit]);

  if (finished) {
    const correct = results.filter(Boolean).length;
    return (
      <section className="study-panel grid min-h-[440px] place-items-center p-7 text-center">
        <div className="max-w-lg">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-[var(--success)] text-[#052016]"><Target className="size-7" /></span>
          <p className="eyebrow mt-5">Phiên luyện hoàn tất</p>
          <h2 className="mt-2 text-5xl font-extrabold">{correct}/{results.length}</h2>
          <p className="muted mt-3">Mỗi câu đã được ghi cùng loại bài và thời gian phản hồi.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/progress" className="btn-primary">Xem tiến bộ</Link>
            <Link href="/" className="btn-quiet">Về Session Rail</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="study-panel overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] px-5 py-4 md:px-7">
        <div>
          <p className="text-sm font-extrabold">{index + 1} / {drills.length}</p>
          <p className="muted mt-0.5 text-xs">{modeLabels[current.mode]}</p>
        </div>
        <span className="status-pill tabular-nums"><Clock3 className="size-3" />{formatElapsed(elapsedSeconds)}</span>
      </div>

      <div className="mx-auto flex min-h-[500px] max-w-3xl flex-col justify-center p-5 md:p-8">
        <p className="eyebrow">{current.instruction}</p>
        <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.015em] md:text-4xl">{current.prompt}</h2>
        {current.source && (
          <p className="muted mt-3 text-xs">
            Nguồn: <a href={current.source.sourceUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2">{current.source.attribution}</a>
            {" · "}<a href={current.source.licenseUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2">{current.source.license}</a>
          </p>
        )}

        {current.inputKind === "choice" ? (
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {current.options?.map((option, optionIndex) => {
              const selected = answer === option.id;
              const correct = feedback?.correctAnswer === option.text;
              const wrong = Boolean(feedback && selected && !feedback.correct);
              return (
                <button
                  key={option.id}
                  type="button"
                  disabled={Boolean(feedback)}
                  aria-pressed={selected}
                  onClick={() => setAnswer(option.id)}
                  className={`flex min-h-16 items-center gap-3 rounded-2xl border px-4 py-3 text-left font-bold ${correct ? "border-[var(--success)] bg-[rgba(95,118,93,0.08)]" : wrong ? "border-[var(--danger)] bg-[rgba(141,75,75,0.08)]" : selected ? "border-[var(--primary)] bg-[var(--active)]" : "border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--panel-soft)]"}`}
                >
                  <kbd className="grid size-8 shrink-0 place-items-center rounded-xl border border-current font-mono text-xs">{optionIndex + 1}</kbd>
                  <span>{option.text}</span>
                  {correct && <Check className="ml-auto size-4 text-[var(--success)]" />}
                  {wrong && <X className="ml-auto size-4 text-[var(--danger)]" />}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="mt-7">
            <input
              ref={inputRef}
              value={answer}
              disabled={Boolean(feedback)}
              onChange={(event) => setAnswer(event.target.value)}
              className={`study-input text-lg ${feedback ? feedback.correct ? "border-[var(--success)] bg-[rgba(95,118,93,0.08)]" : "border-[var(--danger)] bg-[rgba(141,75,75,0.08)]" : ""}`}
              placeholder="Nhập câu trả lời…"
              aria-invalid={Boolean(feedback && !feedback.correct)}
              autoFocus
            />
            <p className="muted mt-2 text-xs">Enter để kiểm tra · <kbd className="font-mono">/</kbd> để trở lại ô nhập</p>
          </div>
        )}

        <div aria-live="polite">
          {!feedback ? (
            <button type="button" onClick={() => void submit()} disabled={!answer.trim() || isChecking} className="btn-primary mt-5 self-start">
              {isChecking ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}Kiểm tra
            </button>
          ) : (
            <div className={`mt-6 rounded-2xl border p-5 ${feedback.correct ? "border-[var(--success)]/40 bg-[rgba(95,118,93,0.07)]" : "border-[var(--danger)]/40 bg-[rgba(141,75,75,0.07)]"}`}>
              <p className="font-extrabold">{feedback.correct ? "Đúng — tiếp tục giữ nhịp." : `Chưa đúng · đáp án: ${feedback.correctAnswer}`}</p>
              <p className="muted mt-2 leading-7">{feedback.explanation}</p>
              <button type="button" onClick={next} className="btn-primary mt-5">{index === drills.length - 1 ? "Xem kết quả" : "Câu tiếp theo"}<ArrowRight className="size-4" /></button>
            </div>
          )}
          {error && <p className="mt-4 rounded-xl border border-[var(--danger)]/40 bg-[rgba(141,75,75,0.07)] p-3 text-sm text-[var(--danger)]">{error}</p>}
        </div>
      </div>
    </section>
  );
}
