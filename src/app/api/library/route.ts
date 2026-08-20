import { getLibraryContent } from "@/services/content-service";

export async function GET() {
  try {
    return Response.json({ items: await getLibraryContent() });
  } catch (error) {
    console.error("Library content error:", error);
    return Response.json({ error: "KhÃ´ng thá»ƒ táº£i thÆ° viá»‡n." }, { status: 500 });
  }
}
