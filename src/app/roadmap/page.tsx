import type { Metadata } from "next";
import { StudyRoadmapView } from "@/components/learn/study-roadmap";

export const metadata: Metadata = {
  title: "Lộ trình TOEIC 0 → 600 Cấp tốc | LearningEnglish",
  description:
    "Lộ trình ôn thi TOEIC toàn diện từ mất gốc lên 600 điểm, dồn toàn bộ thời gian học không giới hạn ngày. Nắm chắc ngữ pháp nền tảng, 740 từ vựng và bài tập thực chiến Part 1-7.",
};

export default function RoadmapPage() {
  return (
    <div className="study-page py-2">
      <StudyRoadmapView />
    </div>
  );
}
