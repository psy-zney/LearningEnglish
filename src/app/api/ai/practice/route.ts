import { NextResponse } from 'next/server';
import ollama from 'ollama';

export async function POST(request: Request) {
  try {
    const { mode, words, exerciseType = 'translation' } = await request.json();
    
    let prompt = "";
    let targetWords: string[] = [];
    let clozeAnswer: string | null = null;

    if (mode === 'focus' && words && words.length > 0) {
      // Pick 2-3 random words for translation, or just 1 for cloze/flashcard
      const numWords = exerciseType === 'translation' ? Math.min(3, words.length) : 1;
      const shuffled = [...words].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, numWords);
      targetWords = selected.map(w => w.word);
      const wordsList = selected.map(w => `${w.word} (${w.meaning})`).join(', ');
      
      if (exerciseType === 'cloze') {
        const word = selected[0];
        clozeAnswer = word.word;
        prompt = `You are an English teacher. Create ONE single English sentence that uses the word "${word.word}".
Then, replace the exact word "${word.word}" with "___".
Also provide the Vietnamese translation of the sentence in parentheses at the end.
Example: The ___ is jumping over the fence. (Con chó đang nhảy qua hàng rào.)
Return ONLY the final sentence with the blank and the translation. Do NOT return the answer.`;
      } else {
        prompt = `You are an English teacher. The user is practicing translation.
Please create ONE single Vietnamese sentence that, when translated to English, MUST naturally use the following words: ${wordsList}.
Return ONLY the Vietnamese sentence in plain text, nothing else, no quotes.`;
      }
    } else {
      if (exerciseType === 'cloze') {
        prompt = `You are an English teacher. Create ONE interesting English sentence (B1/B2 level) with one key vocabulary word missing (replaced by "___").
Also provide the Vietnamese translation of the sentence in parentheses at the end.
Return ONLY the final sentence with the blank and the translation.`;
      } else {
        prompt = `You are an English teacher. 
Create ONE interesting Vietnamese sentence about daily life, technology, or work that requires B1/B2 level English to translate.
Return ONLY the Vietnamese sentence in plain text, nothing else, no quotes.`;
      }
    }

    if (exerciseType === 'flashcard') {
       // Flashcard doesn't need AI generation, handled client side, but just in case
       return NextResponse.json({ question: "Flashcard mode", targetWords });
    }

    const response = await ollama.chat({
      model: 'qwen2.5:3b',
      messages: [{ role: 'user', content: prompt }],
    });

    return NextResponse.json({ 
      question: response.message.content.trim().replace(/^["']|["']$/g, ''),
      targetWords,
      clozeAnswer
    });
  } catch (error) {
    console.error('Error generating practice question:', error);
    return NextResponse.json({ error: 'Failed to generate question' }, { status: 500 });
  }
}
