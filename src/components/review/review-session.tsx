"use client";

import { ArrowRight, Check, Clock3, Loader2, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { PronunciationControls } from "@/components/pronunciation-controls";
import { isAcceptedAnswer } from "@/lib/answer-normalizer";
import { apiRequest } from "@/lib/api-client";
import { playAnswerFeedback } from "@/lib/feedback-sound";
import type { ReviewRating } from "@/lib/srs";
import type { ContentView } from "@/domain/api-contracts";

type QueueItem = { reviewStateId: string; content: ContentView };

const ratingOptions: Array<{ rating: ReviewRating; shortcut: string; label: string; hint: string; className: string }> = [
  { rating: "again", shortcut: "1", label: "Again", hint: "10 phút", className: "border-[var(--danger)]/50 text-[var(--danger)]" },
  { rating: "hard", shortcut: "2", label: "Hard", hint: "ngắn", className: "border-[var(--warning)]/50 text-[var(--warning)]" },
  { rating: "good", shortcut: "3", label: "Good", hint: "chuẩn", className: "border-[var(--success)]/50 text-[var(--success)]" },
  { rating: "easy", shortcut: "4", label: "Easy", hint: "dài hơn", className: "border-[var(--primary)]/50 text-[var(--primary)]" },
];

function formatElapsed(totalSeconds: number) {
  if (totalSeconds < 60) return `${totalSeconds}s`;
  const minutes = Math.floor(totalSeconds / 60);
  return `${minutes}:${String(totalSeconds % 60).padStart(2, "0")}`;
}

function getPattern(item: ContentView) {
  if (item.kind === "verb" && Array.isArray(item.detail.patterns)) return String(item.detail.patterns[0] ?? "");
  if (item.kind === "phrase" && typeof item.detail.pattern === "string") return item.detail.pattern;
  const formula = item.detail.formula as Record<string, unknown> | undefined;
  if (typeof formula?.affirmative === "string") return formula.affirmative;
  return "Học cả cụm trong ngữ cảnh.";
}

function getExample(item: ContentView) {
  const examples = Array.isArray(item.detail.examples) ? item.detail.examples : [];
  const example = examples[0] as Record<string, unknown> | undefined;
  if (typeof example?.en === "string") return example.en;
  if (typeof item.detail.word === "string") return String(item.detail.word);
  return "";
}

export function ReviewSession({ queue }: { queue: QueueItem[] }) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const startedAtRef = useRef(0);
  const enterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savingRef = useRef(false);
  const answerInputRef = useRef<HTMLInputElement>(null);
  const current = queue[index];
  const finished = index >= queue.length;
  const matched = current ? isAcceptedAnswer(answer, [current.content.title]) : false;

  useEffect(() => {
    const handleAuthSuccess = () => {
      setError("");
    };
    window.addEventListener("auth:success", handleAuthSuccess);
    return () => window.removeEventListener("auth:success", handleAuthSuccess);
  }, []);

  useEffect(() => {
    if (finished) return;
    startedAtRef.current = Date.now();
    setElapsedSeconds(0);
    const timer = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startedAtRef.current) / 1_000));
    }, 500);
    return () => clearInterval(timer);
  }, [finished, index]);

  useEffect(() => {
    if (finished || revealed) return;
    answerInputRef.current?.focus();
    const focusInput = (event: KeyboardEvent) => {
      if (event.key !== "/" || event.ctrlKey || event.altKey || event.metaKey) return;
      event.preventDefault();
      answerInputRef.current?.focus();
    };
    window.addEventListener("keydown", focusInput);
    return () => window.removeEventListener("keydown", focusInput);
  }, [finished, index, revealed]);

  function revealAnswer() {
    if (!answer.trim() || revealed) return;
    playAnswerFeedback(isAcceptedAnswer(answer, [current.content.title]));
    setRevealed(true);
  }

  const rate = useCallback(async (rating: ReviewRating) => {
    if (savingRef.current) return;
    savingRef.current = true;
    setIsSaving(true);
    setError("");
    try {
      await apiRequest("/api/review/rate", {
        method: "POST",
        body: JSON.stringify({
          contentItemId: current.content.id,
          rating,
          answer,
          responseTimeMs: Date.now() - startedAtRef.current,
        }),
      });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Không thể lưu lượt ôn.");
      savingRef.current = false;
      setIsSaving(false);
      return;
    }
    setIndex((value) => value + 1);
    setAnswer("");
    setRevealed(false);
    savingRef.current = false;
    setIsSaving(false);
  }, [answer, current]);

  useEffect(() => {
    if (!revealed || isSaving) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || event.ctrlKey || event.altKey || event.metaKey) return;
      if (event.target instanceof HTMLElement && event.target.closest("button, a")) return;
      const numberRating = ratingOptions.find((option) => option.shortcut === event.key)?.rating;
      if (numberRating) {
        event.preventDefault();
        if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
        enterTimerRef.current = null;
        void rate(numberRating);
        return;
      }

      if (event.key !== "Enter") return;
      event.preventDefault();
      if (enterTimerRef.current) {
        clearTimeout(enterTimerRef.current);
        enterTimerRef.current = null;
        void rate("hard");
        return;
      }
      enterTimerRef.current = setTimeout(() => {
        enterTimerRef.current = null;
        void rate("easy");
      }, 260);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
      enterTimerRef.current = null;
    };
  }, [isSaving, rate, revealed]);

  if (finished) {
    return (
      <section className="study-panel grid min-h-[420px] place-items-center p-8 text-center">
        <div>
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-[var(--success)] text-[#052016]"><Check className="size-7" /></span>
          <h2 className="mt-5 text-3xl font-extrabold">Phiên review hoàn tất.</h2>
          <p className="muted mt-2">{queue.length} lượt đã được ghi vào lịch sử và lịch ôn mới.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/practice" className="btn-primary">Tiếp tục Part 5 <ArrowRight className="size-4" /></Link>
            <Link href="/" className="btn-quiet">Về Today</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="study-panel overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] px-5 py-4 md:px-7">
        <div>
          <p className="text-sm font-extrabold">{index + 1} / {queue.length}</p>
          <p className="muted mt-0.5 text-xs">Meaning recall</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="status-pill">{current.content.kind.replace("_", " ")}</span>
          <span className="status-pill tabular-nums"><Clock3 className="size-3" />{formatElapsed(elapsedSeconds)}</span>
        </div>
      </div>

      <div className="mx-auto flex min-h-[500px] max-w-3xl flex-col justify-center p-5 md:p-8">
        <p className="eyebrow">Không nhìn gợi ý</p>
        <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.015em] md:text-4xl">{current.content.meaningVi}</h2>
        <p className="muted mt-3">Gõ headword hoặc cả cụm tiếng Anh.</p>
        <input ref={answerInputRef} value={answer} onChange={(event) => { setAnswer(event.target.value); setRevealed(false); }} onKeyDown={(event) => { if (event.key === "Enter" && answer.trim()) revealAnswer(); }} className={`study-input mt-7 text-lg ${revealed ? matched ? "border-[var(--success)] bg-[rgba(95,118,93,0.08)]" : "border-[var(--danger)] bg-[rgba(141,75,75,0.08)]" : ""}`} placeholder="Câu trả lời của bạn…" aria-invalid={revealed && !matched} autoFocus />
        <p className="muted mt-2 text-xs">Enter để kiểm tra · <kbd className="font-mono">/</kbd> để quay lại ô nhập.</p>

        {!revealed ? (
          <button type="button" onClick={revealAnswer} disabled={!answer.trim()} className="btn-primary mt-4 self-start">Lật đáp án</button>
        ) : (
          <div className="mt-6 border-t border-[var(--border)] pt-6">
            <div className="flex items-start gap-3">
              <span className={`mt-1 grid size-7 shrink-0 place-items-center rounded-full ${matched ? "bg-[var(--success)] text-[#052016]" : "bg-[var(--danger)] text-white"}`}>
                {matched ? <Check className="size-4" /> : <X className="size-4" />}
              </span>
              <div>
                <p className="text-3xl font-extrabold">{current.content.title}</p>
                <PronunciationControls text={current.content.title} compact />
                <p className="mt-3 font-mono text-sm text-[var(--primary)]">{getPattern(current.content)}</p>
                {getExample(current.content) && <p className="muted mt-4 leading-7">“{getExample(current.content)}”</p>}
              </div>
            </div>

            <p className="mt-7 text-xs font-extrabold uppercase tracking-wider text-[var(--muted-2)]">Bạn nhớ khó đến mức nào?</p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {ratingOptions.map((option) => (
                <button key={option.rating} type="button" onClick={() => rate(option.rating)} disabled={isSaving} className={`rounded-[14px] border bg-[var(--surface)] px-3 py-3 text-left hover:bg-[var(--panel-soft)] ${option.className}`}>
                  <span className="block font-extrabold"><kbd className="mr-1.5 font-mono">{option.shortcut}</kbd>{option.label}</span>
                  <span className="mt-1 block text-[0.68rem] text-[var(--muted-2)]">{option.hint}</span>
                </button>
              ))}
            </div>
            <p className="muted mt-3 text-xs">Enter: Easy · Enter ×2: Hard · phím 1–4: Again → Easy</p>
            {isSaving && <p className="muted mt-3 flex items-center gap-2 text-sm"><Loader2 className="size-4 animate-spin" />Đang lưu lịch ôn…</p>}
            {error && (
              <div className="mt-3 flex items-center gap-2 text-sm text-[var(--danger)]">
                <span>{error}</span>
                {(error.includes("Authentication required") || error.includes("Backend authentication") || error.includes("401")) && (
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new CustomEvent("open-auth-modal"))}
                    className="underline font-bold hover:opacity-80 cursor-pointer text-xs uppercase ml-1"
                  >
                    Đăng nhập ngay
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
