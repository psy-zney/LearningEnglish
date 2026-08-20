import { getProgressSummary } from "@/services/progress-service";

export async function GET() {
  try {
    return Response.json({ progress: await getProgressSummary() });
  } catch (error) {
    console.error("Progress summary error:", error);
    return Response.json({ error: "KhÃ´ng thá»ƒ táº£i tiáº¿n Ä‘á»™." }, { status: 500 });
  }
}
