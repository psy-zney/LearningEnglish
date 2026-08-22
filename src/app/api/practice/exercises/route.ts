import { getPracticeExercises } from "@/services/practice-service";

export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const requested = Number(searchParams.get("limit") ?? 10);
    const limit = Number.isFinite(requested) ? Math.min(30, Math.max(1, Math.trunc(requested))) : 10;
    const round = Math.max(0, parseInt(searchParams.get("round") ?? "0", 10) || 0);
    return Response.json({ exercises: await getPracticeExercises(limit, round) });
  } catch (error) {
    console.error("Practice exercises error:", error);
    return Response.json({ error: "Không thể tải bài tập Part 5." }, { status: 500 });
  }
}
