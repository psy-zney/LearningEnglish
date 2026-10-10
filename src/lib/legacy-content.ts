import { verifiedWord } from "../data/verified-vocabulary.ts";
export const LEGACY_FOOT_WORD_ID = "7f4e2b76-9f51-41dc-9500-1c9a3a2b8da0";

export type LegacyWordForSeed = {
  id: string;
  word: string;
  meaning: string;
  correctedWord?: string | null;
  correctMeaning?: string | null;
  explanation?: string | null;
  synonyms?: string | null;
};

export function repairKnownLegacyWord<T extends LegacyWordForSeed>(word: T): T {
  const verified = verifiedWord(word.word);
  if (!verified) return word;
  const explanation = `${verified.explanation} Nguồn: ${verified.source} (đối chiếu 05/10/2026).`;
  if (word.correctMeaning === verified.meaning && word.correctedWord === verified.headword && word.explanation === explanation) return word;
  return { ...word, correctedWord: verified.headword, correctMeaning: verified.meaning, explanation };
}

export function serializeLegacyWordContent(word: LegacyWordForSeed) {
  return {
    title: word.correctedWord || word.word,
    meaningVi: word.correctMeaning || word.meaning,
    contentJson: JSON.stringify({ ...word, originalSynonyms: word.synonyms, synonyms: verifiedWord(word.word) ? "" : word.synonyms }),
  };
}

/** Keep original synonym notes in storage; do not teach unreviewed AI lists. */
export function toPublicWord<T extends LegacyWordForSeed>(word: T): T {
  return verifiedWord(word.word) ? { ...word, synonyms: "" } : word;
}
