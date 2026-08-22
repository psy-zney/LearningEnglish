import { FileCheck2, Layers3, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { BackendUnavailable } from "@/components/backend-unavailable";
import { DrillSession as GeneratedDrillSession } from "@/components/practice/drill-session";
import { PracticeSession } from "@/components/practice/practice-session";
import type {
  DrillSessionResponse,
  PracticeExerciseView,
  PracticeExercisesResponse,
} from "@/domain/api-contracts";
import { apiRequest } from "@/lib/api-client";
import { parseDrillSession } from "@/lib/drill-session";

export const dynamic = "force-dynamic";

const sessionLinks = [
  { href: "/practice?session=meaning", label: "Luyện nghĩa" },
  { href: "/practice?session=context", label: "Điền từ & cụm" },
  { href: "/practice?session=toeic_part_5", label: "Part 5" },
];

export default async function PracticePage({
  searchParams,
}: {
  searchParams: Promise<{ session?: string | string[]; round?: string | string[] }>;
}) {
  const params = await searchParams;
  const rawSession = params.session;
  const rawRound = params.round;
  const sessionValue = Array.isArray(rawSession) ? rawSession[0] : rawSession;
  const roundValue = Array.isArray(rawRound) ? rawRound[0] : rawRound;
  const round = Math.max(0, parseInt(roundValue ?? "0", 10) || 0);
  const drillSession = parseDrillSession(sessionValue);
  const isPart5 = !drillSession;
  let exercises: PracticeExerciseView[] = [];
  let generated: DrillSessionResponse | null = null;

  try {
    if (drillSession) {
      generated = await apiRequest<DrillSessionResponse>(`/api/practice/drills?session=${drillSession}&limit=8&round=${round}`);
    } else {
      ({ exercises } = await apiRequest<PracticeExercisesResponse>(`/api/practice/exercises?limit=10&round=${round}`));
    }
  } catch (error) {
    console.error("Practice backend request failed:", error);
    const retryHref = drillSession ? `/practice?session=${drillSession}&round=${round}` : `/practice?session=toeic_part_5&round=${round}`;
    return <BackendUnavailable title="Chưa tải được phiên luyện tập" retryHref={retryHref} />;
  }

  const itemCount = generated?.drills.length ?? exercises.length;
  const title = drillSession === "meaning"
    ? "Nhớ nghĩa theo cả hai chiều."
    : drillSession === "context"
      ? "Dùng từ đúng trong câu và cụm."
      : "Chấm bằng dữ liệu. Giải thích bằng quy tắc.";
  const description = drillSession === "meaning"
    ? "Luân phiên nhận diện nghĩa và tự gõ headword/cụm tiếng Anh."
    : drillSession === "context"
      ? "Điền từ trong ví dụ của core, chọn collocation và pattern đúng."
      : "10 incomplete sentences, một đáp án chuẩn và rationale cho từng lựa chọn.";

  return (
    <div className="study-page space-y-6">
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Practice · {drillSession ? "Core drills" : "TOEIC-style Part 5"}{round > 0 ? ` · Vòng ${round + 1}` : ""}</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-[-0.015em] md:text-4xl">{title}</h1>
          <p className="muted mt-3 max-w-2xl leading-7">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {round > 0 && <span className="status-pill font-bold text-[var(--primary)]">Vòng {round + 1}</span>}
          <span className="status-pill"><Layers3 className="size-3.5" />{itemCount} câu</span>
          <span className="status-pill text-[var(--success)]"><ShieldCheck className="size-3.5" />Deterministic</span>
        </div>
      </header>

      <nav aria-label="Loại bài luyện" className="flex flex-wrap gap-2">
        {sessionLinks.map((link) => {
          const active = link.href.endsWith(`=${drillSession ?? "toeic_part_5"}`);
          return <Link key={link.href} href={link.href} className={active ? "btn-primary" : "btn-quiet"}>{link.label}</Link>;
        })}
      </nav>

      {generated && generated.drills.length > 0 ? (
        <GeneratedDrillSession drills={generated.drills} dateKey={generated.dateKey} session={generated.session} round={round} />
      ) : isPart5 && exercises.length > 0 ? (
        <PracticeSession exercises={exercises} round={round} />
      ) : (
        <section className="study-panel grid min-h-80 place-items-center p-8 text-center">
          <div>
            <FileCheck2 className="mx-auto size-10 text-[var(--muted)]" />
            <h2 className="mt-4 text-2xl font-extrabold">Chưa có bài phù hợp.</h2>
            <p className="muted mx-auto mt-2 max-w-md">Backend đang hoạt động nhưng corpus chưa tạo được bài cho chế độ này.</p>
          </div>
        </section>
      )}
    </div>
  );
}
