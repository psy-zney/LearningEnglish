import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Circle,
  Clock3,
  Flame,
  ShieldCheck,
  Target,
} from "lucide-react";
import { BackendUnavailable } from "@/components/backend-unavailable";
import { MissionButton } from "@/components/today/mission-button";
import type { DailyPlan, DashboardResponse } from "@/domain/api-contracts";
import { apiRequest } from "@/lib/api-client";

export const dynamic = "force-dynamic";

export default async function TodayPage() {
  let plan: DailyPlan;
  try {
    ({ plan } = await apiRequest<DashboardResponse>("/api/dashboard"));
  } catch (error) {
    console.error("Today backend request failed:", error);
    return <BackendUnavailable title="Chưa tải được kế hoạch hôm nay" retryHref="/" />;
  }
  const actionableTasks = plan.tasks.filter((task) => !task.disabled);
  const completedCount = actionableTasks.filter((task) => task.completed).length;
  const progress = actionableTasks.length > 0 ? Math.round((completedCount / actionableTasks.length) * 100) : 0;
  const nextTask = actionableTasks.find((task) => !task.completed) ?? actionableTasks.at(-1);
  const dateLabel = new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  }).format(new Date());

  return (
    <div className="study-page space-y-6">
      <header className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="eyebrow">{dateLabel}</p>
          <h1 className="mt-2 max-w-2xl text-3xl font-extrabold leading-[1.12] tracking-[-0.015em] md:text-5xl">Một kế hoạch rõ ràng. Một bước tiếp theo.</h1>
          <p className="muted mt-3 max-w-2xl leading-7">Ôn đúng hạn trước, học theo cụm, rồi dùng lại trong format TOEIC. AI có thể tắt mà phiên học vẫn chạy.</p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
          <Flame className="size-5 text-[var(--warning)]" />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted-2)]">Nhịp học thật</p>
            <p className="font-extrabold">{plan.streak} ngày liên tiếp</p>
          </div>
        </div>
      </header>

      {plan.recoveryMode && (
        <section className="study-panel flex items-start gap-3 border-[var(--warning)]/40 p-4">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[var(--warning)]" />
          <div>
            <p className="font-bold">Recovery mode đang bật</p>
            <p className="muted mt-1 text-sm">Backlog hiện có {plan.dueCount} mục. Nội dung mới được tạm dừng và review sẽ chia thành phiên ngắn.</p>
          </div>
        </section>
      )}

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.72fr)]">
        <div className="study-panel overflow-hidden">
          <div className="flex flex-col gap-4 border-b border-[var(--border)] p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
            <div>
              <p className="eyebrow">Daily session · 60 phút</p>
              <h2 className="mt-1 text-2xl font-extrabold">Session rail</h2>
            </div>
            {nextTask && (
              <Link href={nextTask.href} className="btn-primary">
                {completedCount > 0 ? "Tiếp tục" : "Bắt đầu"}
                <ArrowRight className="size-4" />
              </Link>
            )}
          </div>

          <ol className="divide-y divide-[var(--border)]">
            {plan.tasks.map((task, index) => {
              const taskDone = task.completed && !task.disabled;
              const disabledLabel = task.id === "listen" ? "Phase sau" : plan.recoveryMode ? "Recovery pause" : "Core đã mở";
              return (
              <li key={task.id} className={`grid grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-3 px-5 py-4 md:px-6 ${task.disabled ? "bg-[var(--surface)] text-[var(--muted)]" : ""}`}>
                <span className={`grid size-8 place-items-center rounded-full border text-xs font-extrabold ${taskDone ? "border-[var(--success)] bg-[var(--success)] text-[#052016]" : "border-[var(--border)] text-[var(--muted)]"}`}>
                  {taskDone ? <Check className="size-4" /> : index + 1}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-bold">{task.title}</p>
                    {task.disabled && <span className="status-pill">{disabledLabel}</span>}
                  </div>
                  <p className="muted mt-1 truncate text-sm">{task.detail}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden items-center gap-1 text-xs text-[var(--muted-2)] sm:flex"><Clock3 className="size-3.5" />{task.minutes}m</span>
                  {!task.disabled && task.id !== "mission" ? (
                    <Link href={task.href} aria-label={`Mở ${task.title}`} className="grid size-9 place-items-center rounded-xl text-[var(--muted)] hover:bg-[var(--panel-soft)] hover:text-[var(--foreground)]"><ChevronRight className="size-5" /></Link>
                  ) : taskDone ? <Check className="size-5 text-[var(--success)]" /> : <Circle className="size-4 text-[var(--muted-2)]" />}
                </div>
              </li>
              );
            })}
          </ol>
        </div>

        <aside className="space-y-5">
          <div className="study-panel p-5 md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Mục tiêu</p>
                <p className="mt-2 text-6xl font-extrabold tracking-[-0.015em]">650</p>
                <p className="muted mt-2 text-sm">TOEIC Listening &amp; Reading</p>
              </div>
              <Target className="size-7 text-[var(--primary)]" />
            </div>
            <div className="mt-6 flex items-center gap-4">
              <div className="relative grid size-20 shrink-0 place-items-center rounded-full" style={{ background: `conic-gradient(var(--primary) ${progress}%, var(--panel-soft) ${progress}% 100%)` }}>
                <div className="grid size-[66px] place-items-center rounded-full bg-[var(--panel)] text-lg font-extrabold">{progress}%</div>
              </div>
              <div>
                <p className="font-bold">{completedCount}/{actionableTasks.length} nhiệm vụ</p>
                <p className="muted mt-1 text-sm">Tiến độ dựa trên việc hôm nay, không quy đổi từ số flashcard.</p>
              </div>
            </div>
          </div>

          <div className="study-card p-5">
            <p className="eyebrow">Starter core</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <p className="text-3xl font-extrabold">{plan.totalContent}</p>
              <p className="muted text-sm">mục đã duyệt</p>
            </div>
            <p className="muted mt-3 text-sm leading-6">40 verbs · 51 phrases · 12 tense families. Đây là core đã kiểm tra, không phải lời hứa “học 103 mục = 650”.</p>
          </div>
        </aside>
      </section>

      <section id="mission" className="study-panel grid gap-5 p-5 md:grid-cols-[1fr_auto] md:items-center md:p-6">
        <div>
          <p className="eyebrow">Live with English · 5 phút</p>
          <h2 className="mt-2 text-xl font-extrabold">Viết 3 việc bạn sẽ làm hôm nay bằng cụm đã học.</h2>
          <p className="muted mt-2 max-w-3xl text-sm leading-6">Gợi ý: <span className="text-[var(--foreground)]">follow up on</span>, <span className="text-[var(--foreground)]">make sure</span>, <span className="text-[var(--foreground)]">by the end of</span>. Tự đánh giá sau khi bạn thật sự viết xong.</p>
        </div>
        <MissionButton completed={plan.tasks.find((task) => task.id === "mission")?.completed ?? false} />
      </section>
    </div>
  );
}
