export type SRSData = {
  interval: number;
  repetition: number;
  easeFactor: number;
};

export type ReviewRating = "again" | "hard" | "good" | "easy";

export const RATING_QUALITY: Record<ReviewRating, 1 | 3 | 4 | 5> = {
  again: 1,
  hard: 3,
  good: 4,
  easy: 5,
};

/**
 * Calculate the next review date and SRS variables for a word based on user's performance.
 * @param quality Quality of response (0-5)
 *  5 - perfect response
 *  4 - correct response after a hesitation
 *  3 - correct response recalled with serious difficulty
 *  2 - incorrect response; where the correct one seemed easy to recall
 *  1 - incorrect response; the correct one remembered
 *  0 - complete blackout
 * @param currentInterval Current interval in days
 * @param currentRepetition Current number of consecutive correct repetitions
 * @param currentEaseFactor Current ease factor
 * @returns Updated SRS data and the next review date
 */
export function calculateNextReview(
  quality: number,
  currentInterval: number,
  currentRepetition: number,
  currentEaseFactor: number,
  now: Date = new Date(),
): SRSData & { nextReviewDate: Date } {
  const boundedQuality = Math.max(0, Math.min(5, quality));
  let interval = currentInterval;
  let repetition = currentRepetition;
  let easeFactor = currentEaseFactor;
  let delayMinutes: number | null = null;

  if (boundedQuality < 3) {
    repetition = 0;
    interval = 0;
    delayMinutes = 10;
  } else if (boundedQuality === 3) {
    interval = repetition === 0 ? 1 : Math.max(2, Math.round(Math.max(1, currentInterval) * 1.2));
    repetition += 1;
  } else if (boundedQuality === 4) {
    interval = repetition === 0 ? 1 : repetition === 1 ? 6 : Math.max(7, Math.round(currentInterval * easeFactor));
    repetition += 1;
  } else {
    interval = repetition === 0 ? 4 : repetition === 1 ? 10 : Math.max(12, Math.round(currentInterval * easeFactor * 1.3));
    repetition += 1;
  }

  easeFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - boundedQuality) * (0.08 + (5 - boundedQuality) * 0.02)),
  );

  const nextReviewDate = new Date(now);
  if (delayMinutes !== null) {
    nextReviewDate.setMinutes(nextReviewDate.getMinutes() + delayMinutes);
  } else {
    nextReviewDate.setDate(nextReviewDate.getDate() + interval);
  }

  return {
    interval,
    repetition,
    easeFactor,
    nextReviewDate,
  };
}

export function scheduleReview(
  rating: ReviewRating,
  state: SRSData,
  now: Date = new Date(),
) {
  return calculateNextReview(
    RATING_QUALITY[rating],
    state.interval,
    state.repetition,
    state.easeFactor,
    now,
  );
}
