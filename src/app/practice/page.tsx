import { FileCheck2, ShieldCheck } from "lucide-react";
import { PracticeSession } from "@/components/practice/practice-session";
import { getPracticeExercises } from "@/services/practice-service";

export const dynamic = "force-dynamic";

export default async function PracticePage() {
  const exercises = await getPracticeExercises(10);

  return (
    <div className="study-page space-y-6">
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">TOEIC Practice · Part 5</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-[-0.015em] md:text-4xl">Chấm bằng dữ liệu. Giải thích bằng quy tắc.</h1>
          <p className="muted mt-3 max-w-2xl leading-7">10 incomplete sentences, một đáp án chuẩn, rationale cho từng lựa chọn. Không gọi AI để quyết định đúng/sai.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="status-pill"><FileCheck2 className="size-3.5" />10 câu</span>
          <span className="status-pill text-[var(--success)]"><ShieldCheck className="size-3.5" />Offline-safe</span>
        </div>
      </header>
      <PracticeSession exercises={exercises} />
    </div>
  );
}
