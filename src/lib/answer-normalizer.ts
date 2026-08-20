export function normalizeAnswer(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9'\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function isAcceptedAnswer(answer: string, acceptedAnswers: readonly string[]) {
  const normalized = normalizeAnswer(answer);
  return acceptedAnswers.some((candidate) => normalizeAnswer(candidate) === normalized);
}
