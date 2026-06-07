import { NextResponse } from 'next/server';
import ollama from 'ollama';
import { verifyToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1] || '';
    if (!verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { words } = await request.json();
    
    if (!words || !Array.isArray(words) || words.length === 0) {
      return NextResponse.json({ error: 'No words provided' }, { status: 400 });
    }

    const wordList = words.map((w: any) => `${w.word} (${w.meaning})`).join(', ');

    const prompt = `
You are an English teacher. The user has selected the following vocabulary word(s): ${wordList}.
Please provide:
1. 3-5 example sentences using ALL the provided word(s) in each sentence if possible (or combinations of them).
2. Briefly explain the grammar structure, the part of speech, and the position in the sentence.
3. Provide the Vietnamese translation for the example sentences.

Format the output cleanly in plain text (with bullet points and spacing). Use Vietnamese for your explanations.
`;

    const response = await ollama.chat({
      model: 'qwen2.5:3b',
      messages: [{ role: 'user', content: prompt }],
    });

    return NextResponse.json({ result: response.message.content });
  } catch (error) {
    console.error('Error generating sentences with Ollama:', error);
    return NextResponse.json({ error: 'Failed to generate sentences' }, { status: 500 });
  }
}
