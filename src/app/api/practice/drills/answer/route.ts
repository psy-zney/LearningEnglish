import { parseDrillSession } from "@/lib/drill-session";
import { answerDrill } from "@/services/drill-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const session = parseDrillSession(body.session);
    const dateKey = typeof body.dateKey === "string" ? body.dateKey : "";
    const drillId = typeof body.drillId === "string" ? body.drillId : "";
    const answer = typeof body.answer === "string" ? body.answer : "";
    const responseTimeMs = typeof body.responseTimeMs === "number" ? body.responseTimeMs : undefined;
    if (!session || !/^\d{4}-\d{2}-\d{2}$/.test(dateKey) || !drillId || !answer.trim()) {
      return Response.json({ error: "Câu trả lời không hợp lệ." }, { status: 400 });
    }
    const result = await answerDrill({ session, dateKey, drillId, answer, responseTimeMs });
    if (!result) return Response.json({ error: "Bài tập đã hết hạn hoặc không hợp lệ." }, { status: 400 });
    return Response.json(result);
  } catch (error) {
    console.error("Practice drill answer error:", error);
    return Response.json({ error: "Không thể chấm câu trả lời." }, { status: 500 });
  }
}
