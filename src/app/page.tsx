"use client";

import Link from "next/link";
import { AlertCircle, BookOpen, BrainCircuit, ChevronRight, Flame, RefreshCw, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { useSoftReveal } from "@/lib/use-soft-reveal";

export default function Dashboard() {
  const pageRef = useSoftReveal<HTMLDivElement>();
  const [stats, setStats] = useState({
    totalWords: 0,
    wordsToReview: 0,
    masteredWords: 0,
    learningWords: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    void fetchStats();
  }, []);

  const fetchStats = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await fetch(`${apiUrl}/api/dashboard`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setStats({
        totalWords: data.totalWords || 0,
        wordsToReview: data.wordsToReview || 0,
        masteredWords: data.masteredWords || 0,
        learningWords: data.learningWords || 0,
      });
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isError) {
    return (
      <div ref={pageRef} className="study-page flex min-h-[70vh] items-center justify-center">
        <div data-reveal className="study-panel max-w-md p-6 text-center">
          <AlertCircle className="mx-auto mb-4 size-11 text-[var(--danger)]" />
          <h1 className="text-2xl font-bold">Backend is offline</h1>
          <p className="muted mt-2">Cannot connect to the database or local AI service.</p>
          <button onClick={fetchStats} className="btn-primary mt-5">
            <RefreshCw className="size-4" />
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="study-page flex min-h-[70vh] items-center justify-center">
        <div className="study-panel flex items-center gap-3 px-5 py-4 text-[var(--muted)]">
          <RefreshCw className="size-5 animate-spin text-[var(--primary)]" />
          Loading study plan
        </div>
      </div>
    );
  }

  const progress = stats.totalWords > 0 ? Math.round((stats.masteredWords / stats.totalWords) * 100) : 0;

  return (
    <div ref={pageRef} className="study-page space-y-5">
      <section data-reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--primary-hover)]">Today</p>
          <h1 className="mt-1 text-3xl font-extrabold leading-tight md:text-4xl">Daily English study</h1>
          <p className="muted mt-2 max-w-2xl">
            Review due words first, then add new vocabulary when your list is clear.
          </p>
        </div>
        <div className="study-card flex w-fit items-center gap-3 px-4 py-3">
          <Flame className="size-5 text-[var(--primary-hover)]" />
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted-2)]">Streak</p>
            <p className="font-bold">3 days</p>
          </div>
        </div>
      </section>

      <section data-reveal className="study-panel grid gap-4 p-5 md:grid-cols-[1.3fr_0.8fr]">
        <div className="flex flex-col justify-between gap-6">
          <div>
            <div className="mb-4 grid size-11 place-items-center rounded-xl bg-[rgba(176,106,74,0.18)] text-[var(--primary-hover)]">
              <Target className="size-5" />
            </div>
            <p className="text-sm font-bold uppercase tracking-wide text-[var(--muted-2)]">Due for review</p>
            <p className="mt-2 text-6xl font-extrabold leading-none">{stats.wordsToReview}</p>
          </div>
          <Link href="/practice" className="btn-primary w-full md:w-fit">
            Start practice
            <ChevronRight className="size-4" />
          </Link>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--muted-2)]">Mastery</p>
          <div className="mt-4 flex items-end justify-between gap-3">
            <p className="text-4xl font-extrabold">{progress}%</p>
            <p className="muted text-sm">{stats.masteredWords} mastered</p>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--panel-soft)]">
            <div className="h-full rounded-full bg-[var(--success)]" style={{ width: `${progress}%` }} />
          </div>
          <p className="muted mt-4 text-sm">{stats.learningWords} words still learning.</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Link data-reveal href="/vocabulary" className="study-card p-5 hover:border-[var(--primary)]">
          <BookOpen className="mb-4 size-6 text-[var(--primary-hover)]" />
          <h2 className="text-xl font-bold">Add and clean up words</h2>
          <p className="muted mt-2">Save English words with Vietnamese meanings, pronunciation, and AI checks.</p>
        </Link>
        <Link data-reveal href="/practice" className="study-card p-5 hover:border-[var(--primary)]">
          <BrainCircuit className="mb-4 size-6 text-[var(--success)]" />
          <h2 className="text-xl font-bold">Practice active recall</h2>
          <p className="muted mt-2">Use translation, cloze, and flashcards for fast daily study sessions.</p>
        </Link>
      </section>
    </div>
  );
}
