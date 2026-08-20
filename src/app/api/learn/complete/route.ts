import { completeLearnSession } from "@/services/review-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const contentItemIds = Array.isArray(body.contentItemIds)
      ? body.contentItemIds.filter((value: unknown): value is string => typeof value === "string")
      : [];
    if (contentItemIds.length === 0) {
      return Response.json({ error: "Phiên học chưa có nội dung." }, { status: 400 });
    }
    return Response.json(await completeLearnSession(contentItemIds));
  } catch (error) {
    console.error("Learn completion error:", error);
    return Response.json({ error: "Không thể hoàn tất phiên học." }, { status: 500 });
  }
}
