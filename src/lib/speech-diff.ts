/**
 * Speech Recognition Alignment & Diffing for Shadowing Practice.
 *
 * Compares spoken transcript from browser SpeechRecognition with target English sentences.
 * Provides word-by-word alignment, phonetic tolerance, accuracy score, and Vietnamese feedback.
 */

export interface WordDiff {
  word: string;
  status: "matched" | "almost" | "missed";
  spokenWord?: string;
}

export interface SpeechEvaluationResult {
  score: number; // 0 to 100
  matchedCount: number;
  totalCount: number;
  words: WordDiff[];
  grade: "excellent" | "good" | "fair" | "needs_practice";
  feedbackVi: string;
  extraWords: string[];
}

/**
 * Remove punctuation and normalize whitespace.
 */
export function sanitizeWord(word: string): string {
  return word
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'’]/g, "")
    .trim();
}

/**
 * Calculate Levenshtein distance between two normalized words.
 */
export function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const row = Array.from({ length: b.length + 1 }, (_, i) => i);

  for (let i = 1; i <= a.length; i++) {
    let prev = i;
    for (let j = 1; j <= b.length; j++) {
      const val = a[i - 1] === b[j - 1] ? row[j - 1] : Math.min(row[j - 1], prev, row[j]) + 1;
      row[j - 1] = prev;
      prev = val;
    }
    row[b.length] = prev;
  }

  return row[b.length];
}

/**
 * Check if two words are a phonetic/morphological close match.
 */
function isCloseMatch(target: string, spoken: string): { match: boolean; isAlmost: boolean } {
  const t = sanitizeWord(target);
  const s = sanitizeWord(spoken);

  if (!t || !s) return { match: false, isAlmost: false };
  if (t === s) return { match: true, isAlmost: false };

  // Common contraction variations
  const contractions: Record<string, string[]> = {
    im: ["i", "am"],
    dont: ["do", "not"],
    cant: ["can", "not"],
    wont: ["will", "not"],
    thats: ["that", "is"],
    whats: ["what", "is"],
    hows: ["how", "is"],
    theres: ["there", "is"],
    youre: ["you", "are"],
    theyre: ["they", "are"],
    were: ["we", "are"],
    its: ["it", "is"],
  };

  if (contractions[t]?.includes(s) || contractions[s]?.includes(t)) {
    return { match: true, isAlmost: false };
  }

  const dist = levenshteinDistance(t, s);
  const maxLen = Math.max(t.length, s.length);

  // For words with length >= 4, allow 1 typo/sound variation as 'almost'
  if (maxLen >= 4 && dist === 1) {
    return { match: true, isAlmost: true };
  }
  // For long words >= 7, allow 2 typos
  if (maxLen >= 7 && dist <= 2) {
    return { match: true, isAlmost: true };
  }

  return { match: false, isAlmost: false };
}

/**
 * Align target text with spoken transcript using word-level dynamic programming.
 */
export function evaluateSpokenText(targetText: string, spokenTranscript: string): SpeechEvaluationResult {
  const rawTargetWords = targetText.trim().split(/\s+/).filter(Boolean);
  const rawSpokenWords = spokenTranscript.trim().split(/\s+/).filter(Boolean);

  if (rawTargetWords.length === 0) {
    return {
      score: 100,
      matchedCount: 0,
      totalCount: 0,
      words: [],
      grade: "excellent",
      feedbackVi: "Chưa có nội dung cần đọc.",
      extraWords: [],
    };
  }

  if (rawSpokenWords.length === 0) {
    return {
      score: 0,
      matchedCount: 0,
      totalCount: rawTargetWords.length,
      words: rawTargetWords.map((w) => ({ word: w, status: "missed" })),
      grade: "needs_practice",
      feedbackVi: "Chưa nhận diện được giọng nói. Bạn hãy kiểm tra micro và thử đọc lại nhé!",
      extraWords: [],
    };
  }

  // Greedy & window-based alignment
  const resultWords: WordDiff[] = [];
  const spokenMatchedIndices = new Set<number>();
  let lastSpokenIndex = -1;

  for (let tIdx = 0; tIdx < rawTargetWords.length; tIdx++) {
    const targetWord = rawTargetWords[tIdx];
    let foundMatch: { spokenIdx: number; isAlmost: boolean } | null = null;

    // Look in a sliding window around the expected spoken position
    const searchStart = Math.max(0, lastSpokenIndex - 1);
    const searchEnd = Math.min(rawSpokenWords.length, searchStart + 4);

    // 1st pass: exact match
    for (let sIdx = searchStart; sIdx < searchEnd; sIdx++) {
      if (spokenMatchedIndices.has(sIdx)) continue;
      const { match, isAlmost } = isCloseMatch(targetWord, rawSpokenWords[sIdx]);
      if (match && !isAlmost) {
        foundMatch = { spokenIdx: sIdx, isAlmost: false };
        break;
      }
    }

    // 2nd pass: close match
    if (!foundMatch) {
      for (let sIdx = searchStart; sIdx < searchEnd; sIdx++) {
        if (spokenMatchedIndices.has(sIdx)) continue;
        const { match, isAlmost } = isCloseMatch(targetWord, rawSpokenWords[sIdx]);
        if (match) {
          foundMatch = { spokenIdx: sIdx, isAlmost };
          break;
        }
      }
    }

    if (foundMatch) {
      spokenMatchedIndices.add(foundMatch.spokenIdx);
      lastSpokenIndex = foundMatch.spokenIdx;
      resultWords.push({
        word: targetWord,
        status: foundMatch.isAlmost ? "almost" : "matched",
        spokenWord: rawSpokenWords[foundMatch.spokenIdx],
      });
    } else {
      resultWords.push({
        word: targetWord,
        status: "missed",
      });
    }
  }

  // Find extra words uttered
  const extraWords: string[] = [];
  for (let sIdx = 0; sIdx < rawSpokenWords.length; sIdx++) {
    if (!spokenMatchedIndices.has(sIdx)) {
      extraWords.push(rawSpokenWords[sIdx]);
    }
  }

  // Calculate score
  let weightedPoints = 0;
  for (const w of resultWords) {
    if (w.status === "matched") weightedPoints += 1;
    else if (w.status === "almost") weightedPoints += 0.75;
  }

  const score = Math.round((weightedPoints / rawTargetWords.length) * 100);

  let grade: SpeechEvaluationResult["grade"];
  let feedbackVi: string;

  if (score >= 90) {
    grade = "excellent";
    feedbackVi = "Xuất sắc! Bạn phát âm rất chuẩn xác, trôi chảy và rõ ràng từng từ.";
  } else if (score >= 75) {
    grade = "good";
    feedbackVi = "Rất tốt! Bạn phát âm đúng hầu hết câu. Hãy chú ý các từ chưa khớp để hoàn thiện hơn.";
  } else if (score >= 50) {
    grade = "fair";
    feedbackVi = "Khá tốt! Bạn hãy nghe lại mẫu ở tốc độ 0.75x để nắm bắt trọng âm và các âm đuôi nhé.";
  } else {
    grade = "needs_practice";
    feedbackVi = "Cố lên! Bạn hãy chia nhỏ câu, luyện đọc từng cụm 2-3 từ rồi ghép lại nhé.";
  }

  return {
    score,
    matchedCount: resultWords.filter((w) => w.status === "matched").length,
    totalCount: rawTargetWords.length,
    words: resultWords,
    grade,
    feedbackVi,
    extraWords,
  };
}
