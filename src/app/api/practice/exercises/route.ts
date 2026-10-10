import { parseFoundationType } from "@/domain/foundation";
import { getPracticeExercises } from "@/services/practice-service";

export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const category = parseFoundationType(searchParams.get("category"));
    if (searchParams.has("category") && !category) return Response.json({ error: "Dạng bài không hợp lệ." }, { status: 400 });
    const round = Number(searchParams.get("round") ?? 0);
    if (!Number.isSafeInteger(round) || round < 0 || round > 1_000_000) return Response.json({ error: "Lượt học không hợp lệ." }, { status: 400 });
    return Response.json({ exercises: await getPracticeExercises(5, round, category) });
  } catch (error) {
    console.error("Practice exercises error:", error);
    return Response.json({ error: "Không thể tải bài tập Part 5." }, { status: 500 });
  }
}
