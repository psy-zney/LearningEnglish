import { answerPracticeExercise } from "@/services/practice-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const exerciseId = typeof body.exerciseId === "string" ? body.exerciseId : "";
    const selectedOptionId = typeof body.selectedOptionId === "string" ? body.selectedOptionId : "";
    const responseTimeMs = typeof body.responseTimeMs === "number" && Number.isFinite(body.responseTimeMs)
      ? Math.min(3_600_000, Math.max(0, Math.round(body.responseTimeMs)))
      : undefined;
    if (!exerciseId || !selectedOptionId) {
      return Response.json({ error: "Câu trả lời không hợp lệ." }, { status: 400 });
    }
    return Response.json(await answerPracticeExercise(exerciseId, selectedOptionId, responseTimeMs));
  } catch (error) {
    console.error("Practice answer error:", error);
    const message = error instanceof Error && error.message.includes("Invalid")
      ? "Lựa chọn không hợp lệ."
      : "Không thể chấm câu trả lời.";
    return Response.json({ error: message }, { status: 500 });
  }
}
