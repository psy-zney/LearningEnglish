import { rateReview } from "@/services/review-service";
import type { ReviewRating } from "@/lib/srs";

const ratings = new Set<ReviewRating>(["again", "hard", "good", "easy"]);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const contentItemId = typeof body.contentItemId === "string" ? body.contentItemId : "";
    const rating = body.rating as ReviewRating;
    const answer = typeof body.answer === "string" ? body.answer.slice(0, 500) : undefined;
    const responseTimeMs = typeof body.responseTimeMs === "number" && Number.isFinite(body.responseTimeMs)
      ? Math.min(3_600_000, Math.max(0, Math.round(body.responseTimeMs)))
      : undefined;
    if (!contentItemId || !ratings.has(rating)) {
      return Response.json({ error: "Dữ liệu đánh giá không hợp lệ." }, { status: 400 });
    }
    return Response.json(await rateReview(contentItemId, rating, answer, responseTimeMs));
  } catch (error) {
    console.error("Review rating error:", error);
    return Response.json({ error: "Không thể lưu lịch ôn tập." }, { status: 500 });
  }
}
