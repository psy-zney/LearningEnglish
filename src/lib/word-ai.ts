import ollama from 'ollama';

export type WordValidationResult = {
  status: string;
  correctMeaning: string;
  explanation: string;
  synonyms: string;
};

export async function validateWordMeaning(word: string, meaning: string): Promise<WordValidationResult> {
  const prompt = `You are a professional English-Vietnamese lexicographer.
Evaluate if the Vietnamese meaning provided by the student is correct/accurate for the English word.
English word: "${word}"
Student's Vietnamese meaning: "${meaning}"

Respond strictly in JSON format with these keys:
- "status": string, must be one of "correct" (fully correct), "partially_correct" (close or has other meanings), "incorrect" (wrong meaning)
- "correctMeaning": string, a clean and standard Vietnamese translation of this word (correct the student's entry if incorrect)
- "explanation": string, a detailed explanation in Vietnamese (1-2 sentences) about the word, its word class (noun, verb, adj, etc.), collocations, and why the meaning is correct/incorrect. Add 1 English example sentence with its Vietnamese translation at the end.
- "synonyms": array of 2 to 5 common English synonyms or near-synonyms appropriate for the same sense. Return an empty array if there are no good beginner-friendly synonyms.

Strictly return ONLY a raw JSON object.`;

  const response = await ollama.chat({
    model: 'qwen2.5:3b',
    messages: [{ role: 'user', content: prompt }],
    format: 'json',
  });

  const aiResponse = JSON.parse(response.message.content.trim());
  const synonyms = Array.isArray(aiResponse.synonyms)
    ? aiResponse.synonyms
        .filter((item: unknown): item is string => typeof item === 'string' && item.trim().length > 0)
        .map((item: string) => item.trim())
        .join(', ')
    : '';

  return {
    status: typeof aiResponse.status === 'string' ? aiResponse.status : 'unverified',
    correctMeaning: typeof aiResponse.correctMeaning === 'string' && aiResponse.correctMeaning.trim()
      ? aiResponse.correctMeaning.trim()
      : meaning,
    explanation: typeof aiResponse.explanation === 'string' && aiResponse.explanation.trim()
      ? aiResponse.explanation.trim()
      : 'Khong co giai thich tu AI.',
    synonyms,
  };
}
