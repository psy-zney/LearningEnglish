import type { Metadata } from "next";
import { ShadowingStudio } from "@/components/learn/shadowing-studio";

export const metadata: Metadata = {
  title: "Luyện Shadowing & Giao Tiếp TOEIC | LearningEnglish",
  description:
    "Phòng luyện phát âm chuẩn IPA, thực hành shadowing từng câu và đối thoại nhập vai công sở với AI và hệ thống nhận diện giọng nói tự nhiên.",
};

export default function ShadowingPage() {
  return (
    <div className="shadowing-page py-2">
      <ShadowingStudio />
    </div>
  );
}
