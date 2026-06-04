import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import ollama from 'ollama';

export async function GET() {
  try {
    const words = await prisma.word.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(words);
  } catch (error) {
    console.error('Error fetching words:', error);
    return NextResponse.json({ error: 'Failed to fetch words', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { word, meaning } = body;

    if (!word || !meaning) {
      return NextResponse.json({ error: 'Word and meaning are required' }, { status: 400 });
    }

    let status = 'unverified';
    let correctMeaning = meaning;
    let explanation = 'Chưa được kiểm tra bằng AI.';

    try {
      const prompt = `You are a professional English-Vietnamese lexicographer.
Evaluate if the Vietnamese meaning provided by the student is correct/accurate for the English word.
English word: "${word}"
Student's Vietnamese meaning: "${meaning}"

Respond strictly in JSON format with these keys:
- "status": string, must be one of "correct" (fully correct), "partially_correct" (close or has other meanings), "incorrect" (wrong meaning)
- "correctMeaning": string, a clean and standard Vietnamese translation of this word (correct the student's entry if incorrect)
- "explanation": string, a detailed explanation in Vietnamese (1-2 sentences) about the word, its word class (noun, verb, adj, etc.), collocations, and why the meaning is correct/incorrect. Add 1 English example sentence with its Vietnamese translation at the end.

Strictly return ONLY a raw JSON object.`;

      const response = await ollama.chat({
        model: 'qwen2.5:3b',
        messages: [{ role: 'user', content: prompt }],
        format: 'json',
      });

      const aiResponse = JSON.parse(response.message.content.trim());
      if (aiResponse.status && aiResponse.correctMeaning && aiResponse.explanation) {
        status = aiResponse.status;
        correctMeaning = aiResponse.correctMeaning;
        explanation = aiResponse.explanation;
      }
    } catch (aiError) {
      console.error('Failed to validate meaning with Ollama:', aiError);
      explanation = 'Không thể kết nối với AI để kiểm tra nghĩa.';
    }

    const newWord = await prisma.word.create({
      data: {
        word,
        meaning,
        status,
        correctMeaning,
        explanation,
      },
    });

    return NextResponse.json(newWord, { status: 201 });
  } catch (error) {
    console.error('Error creating word:', error);
    return NextResponse.json({ error: 'Failed to create word' }, { status: 500 });
  }
}
