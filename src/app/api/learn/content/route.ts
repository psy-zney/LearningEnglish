import { getNewContent, getReinforcementContent } from "@/services/content-service";

export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const requested = Number(searchParams.get("limit") ?? 6);
    const limit = Number.isFinite(requested) ? Math.min(10, Math.max(1, Math.trunc(requested))) : 6;
    const mode = searchParams.get("mode");
    if (mode !== null && mode !== "reinforce") {
      return Response.json({ error: "Chế độ học không hợp lệ." }, { status: 400 });
    }
    return Response.json({
      items: mode === "reinforce" ? await getReinforcementContent(limit) : await getNewContent(limit),
    });
  } catch (error) {
    console.error("Learn content error:", error);
    return Response.json({ error: "KhÃ´ng thá»ƒ táº£i ná»™i dung há»c." }, { status: 500 });
  }
}
