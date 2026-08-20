import { BookOpenCheck, Layers3 } from "lucide-react";
import Link from "next/link";
import { BackendUnavailable } from "@/components/backend-unavailable";
import { LearnSession } from "@/components/learn/learn-session";
import type { ContentListResponse, ContentView } from "@/domain/api-contracts";
import { apiRequest } from "@/lib/api-client";

export const dynamic = "force-dynamic";

export default async function LearnPage() {
  let items: ContentView[];
  try {
    ({ items } = await apiRequest<ContentListResponse>("/api/learn/content?limit=6"));
  } catch (error) {
    console.error("Learn backend request failed:", error);
    return <BackendUnavailable title="Chưa tải được phiên Learn" retryHref="/learn" />;
  }

  return (
    <div className="study-page space-y-6">
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Learn · Pattern first</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-[-0.015em] md:text-4xl">Học ít, nhưng học thành cấu trúc.</h1>
          <p className="muted mt-3 max-w-2xl leading-7">Mỗi mục đi qua rule → context → recall. Chỉ sau đó nó mới vào hàng đợi ôn tập.</p>
        </div>
        <div className="status-pill w-fit"><Layers3 className="size-3.5" />{items.length} mục trong phiên</div>
      </header>

      {items.length > 0 ? (
        <LearnSession items={items} />
      ) : (
        <section className="study-panel grid min-h-80 place-items-center p-8 text-center">
          <div>
            <BookOpenCheck className="mx-auto size-10 text-[var(--success)]" />
            <h2 className="mt-4 text-2xl font-extrabold">Starter core đã được mở hết.</h2>
            <p className="muted mx-auto mt-2 max-w-md">Không cần thêm nội dung mới hôm nay. Hãy củng cố recall hoặc dùng các mục đã học trong Part 5.</p>
            <Link href="/review" className="btn-primary mt-5">Mở Review</Link>
          </div>
        </section>
      )}
    </div>
  );
}
