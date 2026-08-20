"use client";

import { Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiRequest } from "@/lib/api-client";

export function MissionButton({ completed }: { completed: boolean }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [done, setDone] = useState(completed);
  const [error, setError] = useState("");

  async function complete() {
    setIsSaving(true);
    setError("");
    try {
      await apiRequest("/api/activity/mission", { method: "POST" });
      setDone(true);
      router.refresh();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Không thể lưu nhiệm vụ.");
    }
    setIsSaving(false);
  }

  return <div>
    <button type="button" onClick={complete} disabled={done || isSaving} className={done ? "btn-quiet text-[var(--success)]" : "btn-primary"}>
      {isSaving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
      {done ? "Đã hoàn thành" : "Tôi đã làm xong"}
    </button>
    {error && <p className="mt-2 max-w-xs text-sm text-[var(--danger)]">{error}</p>}
  </div>;
}
