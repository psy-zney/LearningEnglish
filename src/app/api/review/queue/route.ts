import { getDueReviewQueue } from "@/services/review-service";

export async function GET() {
  try {
    return Response.json({ items: await getDueReviewQueue() });
  } catch (error) {
    console.error("Review queue error:", error);
    return Response.json({ error: "Không thể tải hàng đợi ôn tập." }, { status: 500 });
  }
}
