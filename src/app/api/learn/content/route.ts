import { getNewContent } from "@/services/content-service";

export async function GET(request: Request) {
  try {
    const requested = Number(new URL(request.url).searchParams.get("limit") ?? 6);
    const limit = Number.isFinite(requested) ? Math.min(10, Math.max(1, Math.trunc(requested))) : 6;
    return Response.json({ items: await getNewContent(limit) });
  } catch (error) {
    console.error("Learn content error:", error);
    return Response.json({ error: "KhÃ´ng thá»ƒ táº£i ná»™i dung há»c." }, { status: 500 });
  }
}
