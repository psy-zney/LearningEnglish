export type ExerciseOption = {
  id: "A" | "B" | "C" | "D";
  text: string;
  rationaleVi: string;
};

export type Part5Exercise = {
  id: string;
  part: 5;
  prompt: string;
  options: ExerciseOption[];
  correctOptionId: ExerciseOption["id"];
  explanationVi: string;
  errorCategory: string;
  focusContentIds: string[];
  difficulty: 1 | 2 | 3;
};
