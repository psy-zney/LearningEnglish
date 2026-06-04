// SuperMemo-2 (SM-2) Algorithm Implementation

type SRSData = {
  interval: number;
  repetition: number;
  easeFactor: number;
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
  currentEaseFactor: number
): SRSData & { nextReviewDate: Date } {
  let interval = 0;
  let repetition = currentRepetition;
  let easeFactor = currentEaseFactor;

  if (quality >= 3) {
    // Correct response
    if (repetition === 0) {
      interval = 1;
    } else if (repetition === 1) {
      interval = 6;
    } else {
      interval = Math.round(currentInterval * easeFactor);
    }
    repetition += 1;
  } else {
    // Incorrect response
    repetition = 0;
    interval = 1;
  }

  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < 1.3) {
    easeFactor = 1.3;
  }

  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);

  return {
    interval,
    repetition,
    easeFactor,
    nextReviewDate,
  };
}
