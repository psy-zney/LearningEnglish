"use client";

import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Award,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  GraduationCap,
  Headphones,
  Layers,
  RotateCcw,
  Search,
  Sparkles,
  Target,
  Zap,
  ChevronRight,
  Filter,
} from "lucide-react";
import type { StudyStage, LessonUnit } from "@/domain/study-roadmap";
import {
  getLessonsByStage,
  getStageProgress,
  countExercises,
  resetStageProgress,
} from "@/services/lesson-service";
import { LessonViewer } from "@/components/learn/lesson-viewer";

export function StudyRoadmapView() {
  const [selectedStage, setSelectedStage] = useState<StudyStage>("foundation");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Load progress for current stage
  const progress = getStageProgress(selectedStage);
  const lessons = getLessonsByStage(selectedStage);

  // Filter lessons
  const filteredLessons = lessons.filter((lesson) => {
    // Category match
    if (activeCategory !== "all" && lesson.category !== activeCategory) {
      return false;
    }
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitleVi = lesson.titleVi.toLowerCase().includes(q);
      const matchTitleEn = lesson.titleEn.toLowerCase().includes(q);
      const matchId = lesson.id.toLowerCase().includes(q);
      return matchTitleVi || matchTitleEn || matchId;
    }
    return true;
  });

  // Total exercises in current stage
  const totalExercisesInStage = lessons.reduce((sum, l) => sum + countExercises(l), 0);
  const percentComplete =
    progress.totalLessons > 0 ? Math.round((progress.completedLessons / progress.totalLessons) * 100) : 0;

  const handleReset = () => {
    if (confirm(`Bạn có chắc chắn muốn đặt lại toàn bộ tiến độ của ${selectedStage === "foundation" ? "Chặng 1" : "Chặng 2"}?`)) {
      resetStageProgress(selectedStage);
      setRefreshKey((k) => k + 1);
    }
  };

  // If a lesson is actively selected, show the LessonViewer
  if (activeLessonId) {
    return (
      <LessonViewer
        lessonId={activeLessonId}
        onBack={() => {
          setActiveLessonId(null);
          setRefreshKey((k) => k + 1);
        }}
        onSelectLesson={(newId) => setActiveLessonId(newId)}
      />
    );
  }

  return (
    <div key={refreshKey} className="space-y-8 animate-fade-in max-w-6xl mx-auto pb-20">
      {/* ─── Hero Header ────────────────────────────────────────────── */}
      <div className="relative overflow-hidden p-6 md:p-10 rounded-3xl bg-gradient-to-br from-[var(--surface-1)] via-[var(--surface-2)] to-[var(--surface-1)] border border-[var(--border)] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-xl bg-[var(--primary)] text-[var(--primary-ink)] shadow-sm">
                <Target className="size-4" />
              </span>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--primary)]">
                Lộ trình Cấp tốc 0 → 600 TOEIC
              </p>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-[var(--foreground)] tracking-tight">
              Chinh phục Nền tảng & Bứt phá Điểm số
            </h1>
            <p className="text-sm md:text-base text-[var(--muted-1)] leading-relaxed">
              Dồn toàn lực học liên tục không giới hạn ngày. Nắm chắc ngữ pháp, 740 từ vựng cốt lõi, chiến thuật làm bài Part 1-7 và luyện đề thực chiến.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="/shadowing"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[var(--primary)] text-[var(--primary-ink)] shadow-sm hover:opacity-90 transition-opacity"
              >
                <Headphones className="size-3.5" />
                Phòng Luyện Shadowing & Hội thoại 2 chiều
              </a>
            </div>
          </div>

          {/* Quick Stat Pill */}
          <div className="flex flex-row md:flex-col gap-3 justify-end shrink-0">
            <div className="p-4 rounded-2xl bg-[var(--surface-1)] border border-[var(--border)] shadow-sm text-center min-w-36">
              <span className="text-2xl md:text-3xl font-black text-[var(--primary)] block">
                {progress.completedLessons}/{progress.totalLessons}
              </span>
              <span className="text-xs font-bold text-[var(--muted-1)] block mt-0.5">Bài đã hoàn thành</span>
            </div>
            <div className="p-4 rounded-2xl bg-[var(--surface-1)] border border-[var(--border)] shadow-sm text-center min-w-36">
              <span className="text-2xl md:text-3xl font-black text-emerald-500 block">
                {progress.averageScore > 0 ? `${progress.averageScore}%` : "—"}
              </span>
              <span className="text-xs font-bold text-[var(--muted-1)] block mt-0.5">Điểm TB các bài test</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 pt-6 border-t border-[var(--border)]">
          <div className="flex justify-between items-center text-xs font-bold mb-2">
            <span className="text-[var(--foreground)]">
              Tiến độ {selectedStage === "foundation" ? "Chặng 1 (0→300)" : "Chặng 2 (300→600)"}:
            </span>
            <span className="text-[var(--primary)] font-black">{percentComplete}% hoàn thành</span>
          </div>
          <div className="w-full h-3 bg-[var(--surface-2)] rounded-full overflow-hidden border border-[var(--border)]">
            <div
              className="h-full bg-gradient-to-r from-[var(--primary)] to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
        </div>
      </div>

      {/* ─── Stage Switcher Tabs ────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Stage 1 Button */}
        <button
          onClick={() => {
            setSelectedStage("foundation");
            setActiveCategory("all");
          }}
          className={`p-5 rounded-2xl text-left border transition-all relative overflow-hidden ${
            selectedStage === "foundation"
              ? "border-[var(--primary)] bg-[var(--surface-1)] shadow-md ring-2 ring-[var(--primary)]/20"
              : "border-[var(--border)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)] opacity-80"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-[var(--primary)]/15 text-[var(--primary)]">
              Mục tiêu 0 → 300
            </span>
            <span className="text-xs font-semibold text-[var(--muted-1)]">
              {getLessonsByStage("foundation").length} bài học
            </span>
          </div>
          <h2 className="text-lg font-black text-[var(--foreground)]">Chặng 1: Nền tảng TOEIC</h2>
          <p className="text-xs text-[var(--muted-1)] mt-1">
            7 bài ngữ pháp gốc, 12 chủ đề từ vựng (240 từ), 4 mini test ngữ pháp, 5 mini test từ vựng & Final Test.
          </p>
        </button>

        {/* Stage 2 Button */}
        <button
          onClick={() => {
            setSelectedStage("intermediate");
            setActiveCategory("all");
          }}
          className={`p-5 rounded-2xl text-left border transition-all relative overflow-hidden ${
            selectedStage === "intermediate"
              ? "border-[var(--primary)] bg-[var(--surface-1)] shadow-md ring-2 ring-[var(--primary)]/20"
              : "border-[var(--border)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)] opacity-80"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-purple-500/15 text-purple-600 dark:text-purple-400">
              Mục tiêu 300 → 600
            </span>
            <span className="text-xs font-semibold text-[var(--muted-1)]">
              {getLessonsByStage("intermediate").length} bài học
            </span>
          </div>
          <h2 className="text-lg font-black text-[var(--foreground)]">Chặng 2: TOEIC Trung cấp</h2>
          <p className="text-xs text-[var(--muted-1)] mt-1">
            Ngữ pháp nâng cao, luyện nghe Part 1-4, đọc hiểu Part 6-7, 10 chủ đề từ vựng trung cấp & bài thi định kỳ.
          </p>
        </button>
      </div>

      {/* ─── Filter Bar & Search ────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--surface-1)] border border-[var(--border)]">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-[var(--muted-1)] flex items-center gap-1 mr-1 shrink-0">
            <Filter className="size-3.5" /> Lọc:
          </span>

          {[
            { id: "all", label: "Tất cả" },
            { id: "grammar", label: "Ngữ pháp" },
            { id: "vocabulary", label: "Từ vựng" },
            { id: "listening", label: "Luyện nghe" },
            { id: "reading", label: "Đọc hiểu" },
            { id: "test", label: "Bài test" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all shrink-0 ${
                activeCategory === cat.id
                  ? "bg-[var(--primary)] text-white shadow-sm"
                  : "bg-[var(--surface-2)] text-[var(--muted-1)] hover:text-[var(--foreground)]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-64">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-2)]" />
          <input
            type="text"
            placeholder="Tìm bài học, chủ đề..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-[var(--surface-2)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder-[var(--muted-2)] focus:outline-none focus:border-[var(--primary)]"
          />
        </div>
      </div>

      {/* ─── Lessons Grid ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLessons.map((lesson) => {
          const lessonProg = progress.lessonsProgress.find((p) => p.lessonId === lesson.id);
          const isDone = Boolean(lessonProg?.completedAt);
          const score = lessonProg?.score;
          const exCount = countExercises(lesson);

          let badgeColor = "bg-blue-500/15 text-blue-600 dark:text-blue-400";
          let icon = <BookOpen className="size-4" />;
          if (lesson.category === "vocabulary") {
            badgeColor = "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400";
            icon = <Layers className="size-4" />;
          } else if (lesson.category === "listening") {
            badgeColor = "bg-amber-500/15 text-amber-600 dark:text-amber-400";
            icon = <Headphones className="size-4" />;
          } else if (lesson.category === "reading") {
            badgeColor = "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400";
            icon = <FileText className="size-4" />;
          } else if (lesson.category === "test") {
            badgeColor = "bg-rose-500/15 text-rose-600 dark:text-rose-400";
            icon = <Award className="size-4" />;
          }

          return (
            <div
              key={lesson.id}
              onClick={() => setActiveLessonId(lesson.id)}
              className="group cursor-pointer p-5 rounded-2xl bg-[var(--surface-1)] border border-[var(--border)] hover:border-[var(--primary)] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[0.72rem] font-bold px-2.5 py-0.5 rounded-md uppercase flex items-center gap-1.5 ${badgeColor}`}>
                    {icon}
                    <span>
                      {lesson.category === "grammar"
                        ? "Ngữ pháp"
                        : lesson.category === "vocabulary"
                        ? "Từ vựng"
                        : lesson.category === "listening"
                        ? "Nghe"
                        : lesson.category === "reading"
                        ? "Đọc"
                        : "Kiểm tra"}
                    </span>
                  </span>

                  {isDone ? (
                    <span className="text-[0.72rem] font-extrabold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="size-3" />
                      {score !== null ? `${score}%` : "Xong"}
                    </span>
                  ) : (
                    <span className="text-[0.72rem] font-semibold text-[var(--muted-2)]">
                      {exCount} câu hỏi
                    </span>
                  )}
                </div>

                <h3 className="text-base font-extrabold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors leading-snug">
                  {lesson.titleVi}
                </h3>
                <p className="text-xs text-[var(--muted-1)] font-medium mt-1 line-clamp-1">
                  {lesson.titleEn}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs">
                <span className="font-bold text-[var(--muted-2)]">#{lesson.order}</span>
                <span className="font-bold text-[var(--primary)] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>{isDone ? "Làm lại" : "Bắt đầu học"}</span>
                  <ChevronRight className="size-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredLessons.length === 0 && (
        <div className="p-12 text-center bg-[var(--surface-1)] rounded-2xl border border-[var(--border)] space-y-3">
          <Compass className="size-8 mx-auto text-[var(--muted-2)]" />
          <p className="text-sm font-bold text-[var(--foreground)]">Không tìm thấy bài học phù hợp</p>
          <p className="text-xs text-[var(--muted-1)]">Vui lòng thử lại với từ khóa hoặc bộ lọc khác.</p>
        </div>
      )}

      {/* ─── Footer Controls ────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--border)] text-xs text-[var(--muted-1)]">
        <div>
          Tổng số: <strong className="text-[var(--foreground)]">{lessons.length}</strong> bài học ({totalExercisesInStage} bài tập). Tất cả nội dung đã được mở sẵn để học liên tục.
        </div>
        <button
          onClick={handleReset}
          className="text-xs text-[var(--muted-2)] hover:text-rose-500 font-semibold transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="size-3" /> Đặt lại tiến độ {selectedStage === "foundation" ? "Chặng 1" : "Chặng 2"}
        </button>
      </div>
    </div>
  );
}
