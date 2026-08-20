import { Inbox, RotateCcw } from "lucide-react";
import Link from "next/link";
import { ReviewSession } from "@/components/review/review-session";
import { getDueReviewQueue } from "@/services/review-service";

export const dynamic = "force-dynamic";

export default async function ReviewPage() {
  const queue = await getDueReviewQueue(30);

  return (
    <div className="study-page space-y-6">
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Review · Due only</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-[-0.015em] md:text-4xl">Nhớ trước. Giải thích sau.</h1>
          <p className="muted mt-3 max-w-2xl leading-7">Hàng đợi ưu tiên mục quá hạn, lỗi gần đây và nội dung quan trọng cho mục tiêu 650.</p>
        </div>
        <div className="status-pill w-fit"><RotateCcw className="size-3.5" />{queue.length} lượt trong phiên</div>
      </header>

      {queue.length > 0 ? (
        <ReviewSession queue={queue} />
      ) : (
        <section className="study-panel grid min-h-80 place-items-center p-8 text-center">
          <div>
            <Inbox className="mx-auto size-10 text-[var(--success)]" />
            <h2 className="mt-4 text-2xl font-extrabold">Hàng đợi hôm nay đã sạch.</h2>
            <p className="muted mx-auto mt-2 max-w-md">Bạn có thể học 6 mục mới hoặc chuyển sang một drill Part 5 ngắn.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link href="/learn" className="btn-primary">Học mục mới</Link>
              <Link href="/practice" className="btn-quiet">Luyện Part 5</Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
