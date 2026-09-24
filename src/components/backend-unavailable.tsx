import { CloudOff, RotateCcw } from "lucide-react";

export function BackendUnavailable({ title, retryHref }: { title: string; retryHref: string }) {
  return (
    <div className="study-page">
      <section className="study-panel grid min-h-80 place-items-center p-8 text-center">
        <div className="max-w-lg">
          <CloudOff className="mx-auto size-10 text-[var(--warning)]" />
          <h1 className="mt-4 text-2xl font-extrabold">{title}</h1>
          <p className="muted mt-3 leading-7">
            Không thể kết nối backend LearningEnglish. Bạn vẫn có thể tiếp tục học toàn bộ Lộ trình TOEIC 0 → 600 với hơn 900 bài tập offline!
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a href="/roadmap" className="btn-primary">
              Mở Lộ trình 0 → 600 TOEIC
            </a>
            <a href={retryHref} className="btn-secondary">
              <RotateCcw className="size-4" /> Thử lại
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
