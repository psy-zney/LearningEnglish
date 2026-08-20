"use client";

import { Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function MissionButton({ completed }: { completed: boolean }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [done, setDone] = useState(completed);

  async function complete() {
    setIsSaving(true);
    const response = await fetch("/api/activity/mission", { method: "POST" });
    if (response.ok) {
      setDone(true);
      router.refresh();
    }
    setIsSaving(false);
  }

  return (
    <button type="button" onClick={complete} disabled={done || isSaving} className={done ? "btn-quiet text-[var(--success)]" : "btn-primary"}>
      {isSaving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
      {done ? "Đã hoàn thành" : "Tôi đã làm xong"}
    </button>
  );
}
