import Link from "next/link";
import { ArrowRight, BarChart3, Brain, Clock3, Target, TrendingUp } from "lucide-react";
import { getProgressSummary } from "@/services/progress-service";

export const dynamic = "force-dynamic";

function Metric({ label, value, note, icon: Icon }: { label: string; value: string; note: string; icon: typeof Target }) {
  return (
    <div className="study-card p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-extrabold uppercase tracking-wider text-[var(--muted-2)]">{label}</p>
        <Icon className="size-4 text-[var(--primary)]" />
      </div>
      <p className="mt-3 text-3xl font-extrabold tracking-[-0.015em]">{value}</p>
      <p className="muted mt-2 text-sm leading-6">{note}</p>
    </div>
  );
}

export default async function ProgressPage() {
  const progress = await getProgressSummary();
  const maxActivity = Math.max(1, ...progress.activities.map((item) => item.recalls + item.practice + item.learned));
  const nextFocus = progress.topErrors[0];

  return (
    <div className="study-page space-y-6">
      <header>
        <p className="eyebrow">Progress · Evidence to action</p>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-[-0.015em] md:text-4xl">Chỉ số nào cũng phải dẫn tới việc học.</h1>
        <p className="muted mt-3 max-w-2xl leading-7">Không đổi “mastery %” thành điểm TOEIC. Estimated score chỉ xuất hiện sau diagnostic hoặc mock có blueprint cố định.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Content started" value={`${progress.startedCount}/${progress.contentCount}`} note="Số mục đã đi qua Learn hoặc legacy migration." icon={Brain} />
        <Metric label="Qualified recall" value={progress.reviewRetention === null ? "—" : `${progress.reviewRetention}%`} note="Retention từ các lượt review đã tự chấm." icon={TrendingUp} />
        <Metric label="Part 5 accuracy" value={progress.part5.accuracy === null ? "—" : `${progress.part5.accuracy}%`} note={`${progress.part5.answered} câu được chấm deterministic trong 30 ngày.`} icon={Target} />
        <Metric label="Median time" value={progress.part5.medianSeconds === null ? "—" : `${progress.part5.medianSeconds}s`} note="Median response time cho Part 5, không gồm thời gian xem feedback." icon={Clock3} />
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
        <div className="study-panel p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">14-day activity</p>
              <h2 className="mt-2 text-xl font-extrabold">Qualified work, không phải app opens</h2>
            </div>
            <BarChart3 className="size-5 text-[var(--primary)]" />
          </div>
          <div className="mt-8 flex h-56 items-end gap-2 border-b border-[var(--border)] pb-3">
            {progress.activities.length > 0 ? progress.activities.map((item) => {
              const total = item.recalls + item.practice + item.learned;
              return (
                <div key={item.date} className="group flex min-w-0 flex-1 flex-col items-center justify-end gap-2">
                  <span className="text-[0.62rem] font-bold text-[var(--muted-2)] opacity-0 transition-opacity group-hover:opacity-100">{total}</span>
                  <div className="w-full max-w-8 rounded-t-md bg-[var(--primary)]/75" style={{ height: `${Math.max(total > 0 ? 8 : 2, (total / maxActivity) * 160)}px` }} />
                  <span className="truncate text-[0.58rem] text-[var(--muted-2)]">{item.date.slice(5)}</span>
                </div>
              );
            }) : <div className="grid h-full w-full place-items-center"><p className="muted text-sm">Làm một review hoặc Part 5 drill để bắt đầu biểu đồ.</p></div>}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-[var(--muted)]">
            <span>Started: {progress.startedCount}</span><span>Mastered with spacing: {progress.masteredCount}</span><span>Part 5 attempts: {progress.part5.answered}</span>
          </div>
        </div>

        <div className="study-panel p-5 md:p-6">
          <p className="eyebrow">Error matrix</p>
          <h2 className="mt-2 text-xl font-extrabold">Focus được chứng minh</h2>
          <div className="mt-5 space-y-3">
            {progress.topErrors.length > 0 ? progress.topErrors.map((error, index) => (
              <div key={error.key} className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-[var(--panel-soft)] text-xs font-extrabold">{index + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold">{error.label}</p>
                  <p className="muted mt-1 text-xs">{error.count} lỗi trong 30 ngày</p>
                </div>
              </div>
            )) : <p className="muted rounded-2xl border border-dashed border-[var(--border)] p-5 text-sm leading-6">Chưa có lỗi đủ dữ liệu. Làm Part 5 drill để hệ thống xác định focus thật.</p>}
          </div>
          <Link href={nextFocus?.key === "content_recall" ? "/review" : "/practice"} className="btn-primary mt-5 w-full">{nextFocus ? "Sửa focus số 1" : "Tạo baseline Part 5"}<ArrowRight className="size-4" /></Link>
        </div>
      </section>

      <section className="study-card flex flex-col justify-between gap-4 p-5 md:flex-row md:items-center">
        <div>
          <p className="font-extrabold">Estimated score: chưa hiển thị</p>
          <p className="muted mt-1 text-sm">Cần diagnostic/mock đủ blueprint Listening + Reading; flashcards và 10 câu Part 5 không đủ để suy ra 650.</p>
        </div>
        <span className="status-pill w-fit">Responsible metric</span>
      </section>
    </div>
  );
}
