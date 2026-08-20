export type QueueCandidate = {
  id: string;
  kind: string;
  priority: number;
  nextReviewAt: Date;
  recentErrors: number;
};

export function queueScore(candidate: QueueCandidate, now: Date) {
  const overdueDays = Math.max(0, (now.getTime() - candidate.nextReviewAt.getTime()) / 86_400_000);
  const overdueWeight = Math.min(40, overdueDays * 4);
  const weaknessWeight = Math.min(30, candidate.recentErrors * 10);
  const toeicPriority = (4 - candidate.priority) * 8;
  return overdueWeight + weaknessWeight + toeicPriority;
}

export function buildReviewQueue(candidates: QueueCandidate[], now = new Date(), limit = 30) {
  const sorted = candidates
    .filter((candidate) => candidate.nextReviewAt <= now)
    .sort((a, b) => queueScore(b, now) - queueScore(a, now) || a.nextReviewAt.getTime() - b.nextReviewAt.getTime());

  const queue: QueueCandidate[] = [];
  const remaining = [...sorted];

  while (remaining.length > 0 && queue.length < limit) {
    const recentKinds = new Set(queue.slice(-3).map((item) => item.kind));
    const diverseIndex = remaining.findIndex((item) => !recentKinds.has(item.kind));
    const index = diverseIndex >= 0 ? diverseIndex : 0;
    queue.push(remaining.splice(index, 1)[0]);
  }

  return queue;
}
