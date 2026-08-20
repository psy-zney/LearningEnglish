import { completeLifeMission } from "@/services/daily-plan-service";

export async function POST() {
  try {
    await completeLifeMission();
    return Response.json({ completed: true });
  } catch (error) {
    console.error("Mission completion error:", error);
    return Response.json({ error: "Không thể lưu nhiệm vụ." }, { status: 500 });
  }
}
