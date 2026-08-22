import { parseDrillSession } from "@/lib/drill-session";
import { getDrills } from "@/services/drill-service";

export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const session = parseDrillSession(searchParams.get("session"));
    if (!session) return Response.json({ error: "Phiên luyện tập không hợp lệ." }, { status: 400 });
    const requested = Number(searchParams.get("limit") ?? 8);
    const limit = Number.isFinite(requested) ? Math.min(24, Math.max(1, Math.trunc(requested))) : 8;
    const round = Math.max(0, parseInt(searchParams.get("round") ?? "0", 10) || 0);
    return Response.json(await getDrills(session, limit, round));
  } catch (error) {
    console.error("Practice drills error:", error);
    return Response.json({ error: "Không thể tải bài luyện tập." }, { status: 500 });
  }
}
