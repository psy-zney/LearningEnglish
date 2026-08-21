"use client";

import { BookOpen, ChevronRight, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { PronunciationControls } from "@/components/pronunciation-controls";
import type { ContentView } from "@/domain/api-contracts";

const tabs = [
  { id: "verb", label: "Verbs" },
  { id: "phrase", label: "Phrases" },
  { id: "tense", label: "Tenses" },
  { id: "legacy_word", label: "Legacy inbox" },
] as const;

function asStrings(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function detailLines(item: ContentView) {
  if (item.kind === "verb") {
    const forms = item.detail.forms as Record<string, unknown> | undefined;
    return [
      { label: "Forms", value: forms ? `${forms.past ?? ""} · ${forms.pastParticiple ?? ""} · ${forms.ing ?? ""}` : "" },
      { label: "Patterns", value: asStrings(item.detail.patterns).join(" · ") },
      { label: "Collocations", value: asStrings(item.detail.collocations).join(" · ") },
    ];
  }
  if (item.kind === "phrase") return [{ label: "Pattern", value: typeof item.detail.pattern === "string" ? item.detail.pattern : "Learn as one complete chunk" }];
  if (item.kind === "tense") {
    const formula = item.detail.formula as Record<string, unknown> | undefined;
    return [
      { label: "Formula", value: typeof formula?.affirmative === "string" ? formula.affirmative : "" },
      { label: "Decision rule", value: typeof item.detail.decisionRuleVi === "string" ? item.detail.decisionRuleVi : "" },
      { label: "Signals", value: asStrings(item.detail.signals).join(" · ") },
    ];
  }
  return [
    { label: "Nguồn", value: "Danh sách từ cũ đã được preserve khi migrate." },
    { label: "Ghi chú", value: typeof item.detail.explanation === "string" ? item.detail.explanation : "Chưa có enrichment có cấu trúc." },
  ];
}

function getExample(item: ContentView) {
  const examples = Array.isArray(item.detail.examples) ? item.detail.examples : [];
  return (examples[0] as Record<string, unknown> | undefined) ?? null;
}

export function LibraryExplorer({ items }: { items: ContentView[] }) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("verb");
  const [search, setSearch] = useState("");
  const [part, setPart] = useState("all");
  const [priority, setPriority] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return items.filter((item) => {
      if (item.kind !== activeTab) return false;
      if (needle && !`${item.title} ${item.meaningVi} ${item.topic ?? ""}`.toLowerCase().includes(needle)) return false;
      if (part !== "all" && !item.toeicParts.includes(Number(part))) return false;
      if (priority !== "all" && item.priority !== Number(priority)) return false;
      return true;
    });
  }, [activeTab, items, part, priority, search]);

  const selected = items.find((item) => item.id === selectedId) ?? filtered[0] ?? null;

  return (
    <section className="study-panel overflow-hidden">
      <div className="border-b border-[var(--border)] p-4 md:p-5">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {tabs.map((tab) => {
            const count = items.filter((item) => item.kind === tab.id).length;
            return (
              <button key={tab.id} type="button" onClick={() => { setActiveTab(tab.id); setSelectedId(null); }} className={`min-w-fit rounded-xl px-3 py-2 text-sm font-bold ${activeTab === tab.id ? "bg-[var(--active)] text-[var(--foreground)]" : "text-[var(--muted)] hover:bg-[var(--panel-soft)]"}`}>
                {tab.label} <span className="ml-1 text-xs text-[var(--muted-2)]">{count}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_140px_130px]">
          <label className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--muted-2)]" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} className="study-input pl-10" placeholder="Tìm submit, deadline, perfect…" />
          </label>
          <select value={part} onChange={(event) => setPart(event.target.value)} className="study-select" aria-label="Lọc theo TOEIC Part">
            <option value="all">All Parts</option>
            {[1, 2, 3, 4, 5, 6, 7].map((value) => <option key={value} value={value}>Part {value}</option>)}
          </select>
          <select value={priority} onChange={(event) => setPriority(event.target.value)} className="study-select" aria-label="Lọc theo độ ưu tiên">
            <option value="all">All priority</option>
            <option value="1">Priority 1</option>
            <option value="2">Priority 2</option>
            <option value="3">Priority 3</option>
          </select>
        </div>
      </div>

      <div className="grid min-h-[580px] lg:grid-cols-[minmax(340px,0.9fr)_minmax(0,1.1fr)]">
        <div className="border-b border-[var(--border)] lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between px-5 py-3 text-xs font-bold uppercase tracking-wider text-[var(--muted-2)]">
            <span>{filtered.length} kết quả</span><span>Status</span>
          </div>
          <div className="max-h-[540px] overflow-y-auto">
            {filtered.map((item) => (
              <button key={item.id} type="button" onClick={() => setSelectedId(item.id)} className={`grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-[var(--border)] px-5 py-4 text-left hover:bg-[var(--panel-soft)] ${selected?.id === item.id ? "bg-[var(--active)]" : ""}`}>
                <span className="min-w-0">
                  <span className="block truncate font-extrabold">{item.title}</span>
                  <span className="muted mt-1 block truncate text-sm">{item.meaningVi}</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className={`size-2 rounded-full ${item.review ? "bg-[var(--success)]" : "bg-[var(--muted-2)]"}`} />
                  <ChevronRight className="size-4 text-[var(--muted-2)]" />
                </span>
              </button>
            ))}
            {filtered.length === 0 && <p className="muted p-8 text-center">Không có mục nào khớp bộ lọc.</p>}
          </div>
        </div>

        <div className="relative p-5 md:p-7">
          {selected ? (
            <div>
              <div>
                <div>
                  <p className="eyebrow">{selected.kind.replace("_", " ")} · {selected.topic ?? "inbox"}</p>
                  <h2 className="mt-3 text-4xl font-extrabold leading-tight tracking-[-0.015em]">{selected.title}</h2>
                  <p className="mt-2 text-lg text-[var(--muted)]">{selected.meaningVi}</p>
                  <PronunciationControls text={selected.title} />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {selected.toeicParts.map((value) => <span key={value} className="status-pill">Part {value}</span>)}
                {selected.cefr && <span className="status-pill">{selected.cefr}</span>}
                <span className="status-pill">Priority {selected.priority}</span>
                <span className="status-pill">{selected.review ? selected.review.stage : "new"}</span>
              </div>

              <dl className="mt-7 space-y-5">
                {detailLines(selected).filter((line) => line.value).map((line) => (
                  <div key={line.label}>
                    <dt className="text-xs font-extrabold uppercase tracking-wider text-[var(--muted-2)]">{line.label}</dt>
                    <dd className="mt-2 leading-7">{line.value}</dd>
                  </div>
                ))}
              </dl>

              {getExample(selected) && (
                <div className="mt-7 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-[var(--primary)]">Approved example</p>
                  <p className="mt-3 text-lg font-bold leading-8">{String(getExample(selected)?.en ?? "")}</p>
                  <p className="muted mt-2 leading-7">{String(getExample(selected)?.vi ?? "")}</p>
                </div>
              )}

              {selected.review && (
                <div className="mt-6 border-t border-[var(--border)] pt-5">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-[var(--muted-2)]">Review state</p>
                  <p className="muted mt-2 text-sm">Interval {selected.review.interval} ngày · {selected.review.repetition} qualified recalls · next {new Date(selected.review.nextReviewAt).toLocaleDateString("vi-VN")}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid h-full place-items-center text-center">
              <div><BookOpen className="mx-auto size-9 text-[var(--muted-2)]" /><p className="muted mt-3">Chọn một mục để xem pattern và lịch ôn.</p></div>
            </div>
          )}
          {selectedId && <button type="button" onClick={() => setSelectedId(null)} className="absolute right-4 top-4 hidden text-[var(--muted-2)] lg:block" aria-label="Bỏ chọn"><X className="size-4" /></button>}
        </div>
      </div>
    </section>
  );
}
