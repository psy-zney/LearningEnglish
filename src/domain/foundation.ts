export const foundationTypes = {
  basic_be: "Động từ be",
  basic_articles: "Mạo từ a / an",
  basic_plural: "Danh từ số nhiều",
  basic_present: "Hiện tại đơn",
  basic_negative: "Phủ định hiện tại",
  basic_questions: "Câu hỏi Do / Does",
  basic_continuous: "Hiện tại tiếp diễn",
  basic_past: "Quá khứ đơn",
  basic_pronouns: "Đại từ tân ngữ",
  basic_possessives: "Tính từ sở hữu",
  basic_comparison: "So sánh hơn",
  basic_modals: "Động từ sau can / must",
} as const;
export type FoundationType = keyof typeof foundationTypes;
export function parseFoundationType(value: unknown): FoundationType | null {
  return typeof value === "string" && Object.hasOwn(foundationTypes, value) ? value as FoundationType : null;
}
