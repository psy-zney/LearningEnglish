import type { DrillContent, DrillMode, DrillView } from "../domain/drill.ts";
import { buildDailyDrills } from "./drill-builder.ts";

export const drillSessions = ["meaning", "context"] as const;
export type DrillSession = (typeof drillSessions)[number];

const sessionModes: Record<DrillSession, readonly DrillMode[]> = {
  meaning: ["meaning", "reverse_meaning"],
  context: ["fill_blank", "collocation", "pattern"],
};

export function parseDrillSession(value: unknown): DrillSession | null {
  return typeof value === "string" && drillSessions.includes(value as DrillSession)
    ? value as DrillSession
    : null;
}

export function getSessionModes(session: DrillSession) {
  return sessionModes[session];
}

export function buildDrillSession(
  content: readonly DrillContent[],
  session: DrillSession,
  dateKey: string,
  requestedLimit = 8,
  round = 0,
): DrillView[] {
  const limit = Math.min(24, Math.max(1, Math.trunc(requestedLimit)));
  const modes = sessionModes[session];
  const perMode = Math.ceil(limit / modes.length);
  const generated = buildDailyDrills(content, { dateKey, modes, limitPerMode: perMode, round });
  const buckets = new Map(modes.map((mode) => [mode, generated.filter((drill) => drill.mode === mode)]));
  const balanced: DrillView[] = [];

  while (balanced.length < limit) {
    let added = false;
    for (const mode of modes) {
      const drill = buckets.get(mode)?.shift();
      if (!drill) continue;
      balanced.push(drill);
      added = true;
      if (balanced.length >= limit) break;
    }
    if (!added) break;
  }

  return balanced;
}
