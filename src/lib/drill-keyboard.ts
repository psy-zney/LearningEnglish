export type DrillKeyboardAction =
  | { type: "select"; index: number }
  | { type: "submit" }
  | { type: "next" }
  | { type: "focus" };

export function getDrillKeyboardAction(key: string, answered: boolean, hasAnswer: boolean): DrillKeyboardAction | null {
  if (/^[1-4]$/.test(key) && !answered) return { type: "select", index: Number(key) - 1 };
  if (key === "/" && !answered) return { type: "focus" };
  if (key === "Enter" && answered) return { type: "next" };
  if (key === "Enter" && hasAnswer) return { type: "submit" };
  return null;
}
