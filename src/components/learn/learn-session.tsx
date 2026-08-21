"use client";

import { ArrowRight, Check, Loader2, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PronunciationControls } from "@/components/pronunciation-controls";
import type { ContentView } from "@/domain/api-contracts";
import { apiRequest } from "@/lib/api-client";
import { isAcceptedAnswer } from "@/lib/answer-normalizer";
import { playAnswerFeedback } from "@/lib/feedback-sound";

type Phase = "pattern" | "recall" | "summary";

function stringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function getPattern(item: ContentView) {
  if (item.kind === "verb") return stringArray(item.detail.patterns)[0] ?? "Verb + workplace context";
  if (item.kind === "phrase") return typeof item.detail.pattern === "string" ? item.detail.pattern : "Learn as one complete chunk";
  if (item.kind === "legacy_word") return "Headword ↔ nghĩa đã lưu · kiểm tra chủ động";
  const formula = item.detail.formula as Record<string, unknown> | undefined;
  return typeof formula?.affirmative === "string" ? formula.affirmative : "Time anchor → aspect → verb form";
}

function getRule(item: ContentView) {
  if (item.kind === "tense" && typeof item.detail.decisionRuleVi === "string") return item.detail.decisionRuleVi;
  if (item.kind === "verb") return stringArray(item.detail.collocations).slice(0, 3).join(" · ");
  return typeof item.detail.pattern === "string" ? item.detail.pattern : "Ghi nhớ cả cụm, không dịch từng từ.";
}

function getExample(item: ContentView) {
  const examples = Array.isArray(item.detail.examples) ? item.detail.examples : [];
  const example = examples[0] as Record<string, unknown> | undefined;
  return {
    en: typeof example?.en === "string" ? example.en : "",
    vi: typeof example?.vi === "string" ? example.vi : "",
  };
}

export function LearnSession({ items }: { items: ContentView[] }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("pattern");
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const answerInputRef = useRef<HTMLInputElement>(null);
  const current = items[index];
  const example = current ? getExample(current) : { en: "", vi: "" };

  useEffect(() => {
    if (phase !== "recall") return;
    answerInputRef.current?.focus();
    const focusInput = (event: KeyboardEvent) => {
      if (event.key !== "/" || event.ctrlKey || event.altKey || event.metaKey) return;
      event.preventDefault();
      answerInputRef.current?.focus();
    };
    window.addEventListener("keydown", focusInput);
    return () => window.removeEventListener("keydown", focusInput);
  }, [index, phase]);

  function checkRecall() {
    const correct = isAcceptedAnswer(answer, [current.title]);
    setIsCorrect(correct);
    setChecked(true);
    playAnswerFeedback(correct);
  }

  function nextItem() {
    if (index === items.length - 1) {
      setPhase("summary");
      return;
    }
    setIndex((value) => value + 1);
    setPhase("pattern");
    setAnswer("");
    setChecked(false);
    setIsCorrect(false);
  }

  async function finish() {
    setIsSaving(true);
    setSaveError("");
    try {
      await apiRequest("/api/learn/complete", {
        method: "POST",
        body: JSON.stringify({ contentItemIds: items.map((item) => item.id) }),
      });
      router.push("/review");
      router.refresh();
      return;
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Không thể hoàn tất phiên học.");
    }
    setIsSaving(false);
  }

  if (phase === "summary") {
    return (
      <section className="study-panel p-5 md:p-7">
        <p className="eyebrow">Summary sheet</p>
        <h2 className="mt-2 text-2xl font-extrabold">{items.length} mục sẵn sàng cho active recall.</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {items.map((item) => (
            <div key={item.id} className="study-card flex items-start gap-3 p-4">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[var(--success)] text-[#052016]"><Check className="size-4" /></span>
              <div>
                <p className="font-extrabold">{item.title}</p>
                <p className="muted mt-1 text-sm">{getPattern(item)}</p>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={finish} disabled={isSaving} className="btn-primary mt-6 w-full sm:w-auto">
          {isSaving ? <Loader2 className="size-4 animate-spin" /> : <RotateCcw className="size-4" />}
          Đưa vào Review ngay
        </button>
        {saveError && <p className="mt-3 text-sm text-[var(--danger)]">{saveError}</p>}
      </section>
    );
  }

  return (
    <section className="study-panel overflow-hidden">
      <div className="border-b border-[var(--border)] px-5 py-4 md:px-7">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-bold">Mục {index + 1} / {items.length}</p>
          <p className="status-pill">{current.kind}</p>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--panel-soft)]">
          <div className="h-full rounded-full bg-[var(--primary)] transition-[width]" style={{ width: `${((index + (phase === "recall" ? 0.7 : 0.2)) / items.length) * 100}%` }} />
        </div>
      </div>

      {phase === "pattern" ? (
        <div className="grid min-h-[440px] gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-between border-b border-[var(--border)] p-6 lg:border-b-0 lg:border-r md:p-8">
            <div>
              <p className="eyebrow">Pattern map</p>
              <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-[-0.015em] md:text-5xl">{current.title}</h2>
              <p className="mt-3 text-lg text-[var(--muted)]">{current.meaningVi}</p>
              <PronunciationControls text={current.title} />
            </div>
            <div className="mt-8 rounded-2xl border border-[var(--primary)]/25 bg-[rgba(63,63,59,0.045)] p-4">
              <p className="text-xs font-extrabold uppercase tracking-wider text-[var(--primary)]">Rule</p>
              <p className="mt-2 font-mono text-sm leading-6">{getPattern(current)}</p>
              <p className="muted mt-3 text-sm leading-6">{getRule(current)}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center p-6 md:p-8">
            <p className="eyebrow">Context before translation</p>
            {example.en ? (
              <>
                <blockquote className="mt-5 text-2xl font-bold leading-9">“{example.en}”</blockquote>
                <p className="muted mt-4 leading-7">{example.vi}</p>
              </>
            ) : (
              <p className="muted mt-5 leading-7">Mục legacy chưa có câu ví dụ đã duyệt. Hãy tập trung vào headword và nghĩa chính xác.</p>
            )}
            <div className="mt-7 flex flex-wrap gap-2">
              {current.toeicParts.map((part) => <span key={part} className="status-pill">Part {part}</span>)}
              {current.cefr && <span className="status-pill">{current.cefr}</span>}
              <span className="status-pill">P{current.priority}</span>
            </div>
            <button type="button" onClick={() => { setPhase("recall"); setAnswer(""); setChecked(false); }} className="btn-primary mt-8 self-start">
              Recall không nhìn đáp án <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex min-h-[440px] max-w-2xl flex-col justify-center p-6 md:p-8">
          <p className="eyebrow">Active recall</p>
          <h2 className="mt-3 text-2xl font-extrabold">{current.kind === "tense" ? `Tên tiếng Anh của “${current.meaningVi}” là gì?` : `Cụm tiếng Anh cho “${current.meaningVi}” là gì?`}</h2>
          <p className="muted mt-2">Gõ trước khi xem đáp án. Không cần hoàn hảo về viết hoa.</p>
          <input ref={answerInputRef} value={answer} onChange={(event) => { setAnswer(event.target.value); setChecked(false); }} onKeyDown={(event) => { if (event.key === "Enter" && answer.trim()) checkRecall(); }} className={`study-input mt-6 text-lg ${checked ? isCorrect ? "border-[var(--success)] bg-[rgba(95,118,93,0.08)]" : "border-[var(--danger)] bg-[rgba(141,75,75,0.08)]" : ""}`} placeholder="Nhập câu trả lời…" aria-invalid={checked && !isCorrect} autoFocus />
          <p className="muted mt-2 text-xs">Nhấn <kbd className="font-mono">/</kbd> để quay lại ô nhập.</p>
          {!checked ? (
            <button type="button" onClick={checkRecall} disabled={!answer.trim()} className="btn-primary mt-4 self-start">Kiểm tra</button>
          ) : (
            <div className={`mt-5 rounded-2xl border p-5 ${isCorrect ? "border-[var(--success)]/40 bg-[rgba(95,118,93,0.07)]" : "border-[var(--danger)]/40 bg-[rgba(141,75,75,0.07)]"}`}>
              <p className="font-extrabold">{isCorrect ? "Đúng — đã nhớ chủ động." : "Chưa khớp. Ghi lại cả cụm:"}</p>
              <p className="mt-2 text-2xl font-extrabold">{current.title}</p>
              <p className="muted mt-2 font-mono text-sm">{getPattern(current)}</p>
              <button type="button" onClick={nextItem} className="btn-primary mt-5">{index === items.length - 1 ? "Xem summary" : "Mục tiếp theo"}<ArrowRight className="size-4" /></button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
