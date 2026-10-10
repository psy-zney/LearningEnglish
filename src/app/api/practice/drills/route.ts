import { parseDrillSession } from "@/lib/drill-session";
import { getDrills } from "@/services/drill-service";

export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const session = parseDrillSession(searchParams.get("session"));
    if (!session) return Response.json({ error: "Phiên luyện tập không hợp lệ." }, { status: 400 });
    const round = Number(searchParams.get("round") ?? 0);
    if (!Number.isSafeInteger(round) || round < 0 || round > 1_000_000) return Response.json({ error: "Lượt học không hợp lệ." }, { status: 400 });
    return Response.json(await getDrills(session, 5, round));
  } catch (error) {
    console.error("Practice drills error:", error);
    return Response.json({ error: "Không thể tải bài luyện tập." }, { status: 500 });
  }
}
