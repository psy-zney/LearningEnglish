export type SessionTask = {
  id: "review" | "learn" | "meaning" | "context" | "toeic_part_5";
  title: string;
  detail: string;
  minutes: number;
  href: string;
  completed: boolean;
  disabled: false;
};

type SessionEvidence = {
  dueCount: number;
  newCount: number;
  recoveryMode: boolean;
  reviewsCompleted: number;
  itemsLearned: number;
  attemptModes: readonly string[];
  attemptEvidence?: ReadonlyArray<{ mode: string; identity: string }>;
};

function countModes(evidence: SessionEvidence, accepted: ReadonlySet<string>) {
  const attempts = evidence.attemptEvidence
    ?? evidence.attemptModes.map((mode, index) => ({ mode, identity: `legacy-${index}` }));
  return new Set(attempts.filter((attempt) => accepted.has(attempt.mode)).map((attempt) => attempt.identity)).size;
}

export function buildSessionTasks(evidence: SessionEvidence): SessionTask[] {
  const reviewGoal = Math.min(20, evidence.dueCount);
  const reinforcement = evidence.recoveryMode || evidence.newCount === 0;
  const learnGoal = reinforcement ? 6 : Math.min(6, evidence.newCount);
  const reinforcementCount = countModes(evidence, new Set(["reinforce"]));
  const meaningCount = countModes(evidence, new Set(["meaning", "reverse_meaning"]));
  const contextCount = countModes(evidence, new Set(["fill_blank", "collocation", "pattern"]));
  const part5Count = countModes(evidence, new Set(["toeic_part_5"]));

  return [
    {
      id: "review",
      title: evidence.dueCount > 0 ? "Ôn đến hạn" : "Củng cố recall",
      detail: evidence.dueCount > 0 ? `${reviewGoal} lượt · active recall` : "Hàng đợi sạch · ôn lại mục yếu nếu muốn",
      minutes: 15,
      href: "/review",
      completed: reviewGoal === 0 || evidence.reviewsCompleted >= reviewGoal,
      disabled: false,
    },
    {
      id: "learn",
      title: reinforcement ? "Củng cố mẫu câu" : "Học mẫu câu mới",
      detail: reinforcement ? `${learnGoal} mục · củng cố nội dung đã học` : `${learnGoal} mục mới · verb / phrase / tense`,
      minutes: 12,
      href: reinforcement ? "/learn?mode=reinforce" : "/learn",
      completed: reinforcement ? reinforcementCount >= learnGoal : evidence.itemsLearned >= learnGoal,
      disabled: false,
    },
    {
      id: "meaning",
      title: "Luyện nghĩa hai chiều",
      detail: "8 câu · chọn nghĩa và tự gõ tiếng Anh",
      minutes: 10,
      href: "/practice?session=meaning",
      completed: meaningCount >= 8,
      disabled: false,
    },
    {
      id: "context",
      title: "Điền từ & collocation",
      detail: "8 câu · context, pattern và cụm từ",
      minutes: 10,
      href: "/practice?session=context",
      completed: contextCount >= 8,
      disabled: false,
    },
    {
      id: "toeic_part_5",
      title: "TOEIC-style Part 5",
      detail: "10 câu tự biên soạn · chấm deterministic",
      minutes: 18,
      href: "/practice?session=toeic_part_5",
      completed: part5Count >= 10,
      disabled: false,
    },
  ];
}
