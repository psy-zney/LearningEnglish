export const LEGACY_FOOT_WORD_ID = "7f4e2b76-9f51-41dc-9500-1c9a3a2b8da0";

const LEGACY_FOOT_MEANING = "lòng bàn chân";
const LEGACY_FOOT_EXPLANATION =
  '“foot” là danh từ chỉ bàn chân hoặc lòng bàn chân trong ngữ cảnh của mục từ này. Ví dụ: My foot hurts. (Bàn chân của tôi bị đau.)';

export type LegacyWordForSeed = {
  id: string;
  word: string;
  meaning: string;
  correctedWord?: string | null;
  correctMeaning?: string | null;
  explanation?: string | null;
};

export function repairKnownLegacyWord<T extends LegacyWordForSeed>(word: T): T {
  if (word.id !== LEGACY_FOOT_WORD_ID || word.word.trim().toLowerCase() !== "foot") {
    return word;
  }

  if (
    word.meaning === LEGACY_FOOT_MEANING
    && word.correctMeaning === LEGACY_FOOT_MEANING
    && !/đùi/iu.test(word.explanation ?? "")
  ) {
    return word;
  }

  return {
    ...word,
    meaning: LEGACY_FOOT_MEANING,
    correctMeaning: LEGACY_FOOT_MEANING,
    explanation: LEGACY_FOOT_EXPLANATION,
  };
}

export function serializeLegacyWordContent(word: LegacyWordForSeed) {
  return {
    title: word.correctedWord || word.word,
    meaningVi: word.correctMeaning || word.meaning,
    contentJson: JSON.stringify(word),
  };
}
