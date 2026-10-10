import { verifiedWord } from '@/data/verified-vocabulary';
export type WordValidationResult = { status: string; correctedWord: string; correctMeaning: string; explanation: string; synonyms: string };
/** Unknown entries retain the learner's wording until dictionary review. */
export async function validateWordMeaning(word: string, meaning: string): Promise<WordValidationResult> {
  const verified = verifiedWord(word);
  if (verified) return { status: 'correct', correctedWord: verified.headword, correctMeaning: verified.meaning,
    explanation: `${verified.explanation} Nguồn: ${verified.source}`, synonyms: '' };
  return { status: 'unverified', correctedWord: word, correctMeaning: meaning,
    explanation: 'Chưa đối chiếu từ điển. Nghĩa bạn nhập được giữ nguyên; cần kiểm chứng trước khi dùng làm nội dung chuẩn.', synonyms: '' };
}
