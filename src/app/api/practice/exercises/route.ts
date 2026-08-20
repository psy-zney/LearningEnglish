import { getPracticeExercises } from "@/services/practice-service";

export async function GET(request: Request) {
  try {
    const requested = Number(new URL(request.url).searchParams.get("limit") ?? 10);
    const limit = Number.isFinite(requested) ? Math.min(30, Math.max(1, Math.trunc(requested))) : 10;
    return Response.json({ exercises: await getPracticeExercises(limit) });
  } catch (error) {
    console.error("Practice exercises error:", error);
    return Response.json({ error: "KhÃ´ng thá»ƒ táº£i bÃ i táº­p Part 5." }, { status: 500 });
  }
}
