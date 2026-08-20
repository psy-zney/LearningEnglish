import { FileCheck2, ShieldCheck } from "lucide-react";
import { BackendUnavailable } from "@/components/backend-unavailable";
import { PracticeSession } from "@/components/practice/practice-session";
import type { PracticeExerciseView, PracticeExercisesResponse } from "@/domain/api-contracts";
import { apiRequest } from "@/lib/api-client";

export const dynamic = "force-dynamic";

export default async function PracticePage() {
  let exercises: PracticeExerciseView[];
  try {
    ({ exercises } = await apiRequest<PracticeExercisesResponse>("/api/practice/exercises?limit=10"));
  } catch (error) {
    console.error("Practice backend request failed:", error);
    return <BackendUnavailable title="Chưa tải được bài tập Part 5" retryHref="/practice" />;
  }

  return (
    <div className="study-page space-y-6">
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">TOEIC Practice · Part 5</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-[-0.015em] md:text-4xl">Chấm bằng dữ liệu. Giải thích bằng quy tắc.</h1>
          <p className="muted mt-3 max-w-2xl leading-7">10 incomplete sentences, một đáp án chuẩn, rationale cho từng lựa chọn. Không gọi AI để quyết định đúng/sai.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="status-pill"><FileCheck2 className="size-3.5" />{exercises.length} câu</span>
          <span className="status-pill text-[var(--success)]"><ShieldCheck className="size-3.5" />Offline-safe</span>
        </div>
      </header>
      {exercises.length > 0 ? (
        <PracticeSession exercises={exercises} />
      ) : (
        <section className="study-panel grid min-h-80 place-items-center p-8 text-center">
          <div>
            <FileCheck2 className="mx-auto size-10 text-[var(--muted)]" />
            <h2 className="mt-4 text-2xl font-extrabold">Chưa có bài tập Part 5.</h2>
            <p className="muted mx-auto mt-2 max-w-md">Backend đang hoạt động nhưng chưa trả về bài tập đã duyệt.</p>
          </div>
        </section>
      )}
    </div>
  );
}
