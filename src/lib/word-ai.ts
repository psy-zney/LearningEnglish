import { ollama, ollamaModel } from '@/lib/ollama';

export type WordValidationResult = {
  status: string;
  correctedWord: string;
  correctMeaning: string;
  explanation: string;
  synonyms: string;
};

export async function validateWordMeaning(word: string, meaning: string): Promise<WordValidationResult> {
  const prompt = `You are a professional English-Vietnamese lexicographer.
Evaluate if the Vietnamese meaning provided by the student is correct/accurate for the English word. Also check the English spelling.
English word: "${word}"
Student's Vietnamese meaning: "${meaning}"

Respond strictly in JSON format with these keys:
- "status": string, must be one of "correct" (spelling and meaning are fully correct), "partially_correct" (meaning is close, incomplete, or spelling needs correction), "incorrect" (wrong meaning)
- "correctedWord": string, the correctly spelled English headword. If the spelling is already correct, return the original word exactly.
- "correctMeaning": string, a clean and standard Vietnamese translation of the corrected English word. If the student's meaning is wrong, this must be the suggested right meaning.
- "explanation": string, a detailed explanation in Vietnamese (1-2 sentences) about the corrected word, its word class (noun, verb, adj, etc.), collocations, and why the meaning is correct/incorrect. If spelling was wrong, mention the spelling correction. Add 1 English example sentence with its Vietnamese translation at the end.
- "synonyms": array of 2 to 5 common English synonyms or near-synonyms only. Every item must be English, not Vietnamese. Return an empty array if there are no good beginner-friendly English synonyms.

Strictly return ONLY a raw JSON object.`;

  const response = await ollama.chat({
    model: ollamaModel,
    messages: [{ role: 'user', content: prompt }],
    format: 'json',
  });

  const aiResponse = JSON.parse(response.message.content.trim());
  const rawSynonyms = Array.isArray(aiResponse.synonyms)
    ? aiResponse.synonyms
    : typeof aiResponse.synonyms === 'string'
      ? aiResponse.synonyms.split(',')
      : [];
  const synonyms = rawSynonyms
    .filter((item: unknown): item is string => typeof item === 'string' && item.trim().length > 0)
    .map((item: string) => item.trim())
    .filter((item: string) => /^[A-Za-z][A-Za-z\s'-]*$/.test(item))
    .slice(0, 5)
    .join(', ');
  const allowedStatuses = new Set(['correct', 'partially_correct', 'incorrect']);
  const status = typeof aiResponse.status === 'string' && allowedStatuses.has(aiResponse.status)
    ? aiResponse.status
    : 'unverified';
  const correctedWord = typeof aiResponse.correctedWord === 'string' && aiResponse.correctedWord.trim()
    ? aiResponse.correctedWord.trim()
    : word;

  return {
    status,
    correctedWord,
    correctMeaning: typeof aiResponse.correctMeaning === 'string' && aiResponse.correctMeaning.trim()
      ? aiResponse.correctMeaning.trim()
      : meaning,
    explanation: typeof aiResponse.explanation === 'string' && aiResponse.explanation.trim()
      ? aiResponse.explanation.trim()
      : 'Khong co giai thich tu AI.',
    synonyms,
  };
}
