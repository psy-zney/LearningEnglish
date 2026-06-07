import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { validateWordMeaning } from '@/lib/word-ai';
import { verifyToken } from '@/lib/auth';

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
    return NextResponse.json(
      { error: 'Failed to fetch words', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Check auth
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1] || '';
    if (!verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const word = typeof body.word === 'string' ? body.word.trim() : '';
    const meaning = typeof body.meaning === 'string' ? body.meaning.trim() : '';

    if (!word || !meaning) {
      return NextResponse.json({ error: 'Word and meaning are required' }, { status: 400 });
    }

    const existingWord = await prisma.word.findFirst({
      where: {
        word,
      },
    });

    if (existingWord) {
      return NextResponse.json(
        { error: 'This word already exists', word: existingWord },
        { status: 409 }
      );
    }

    let status = 'unverified';
    let correctMeaning = meaning;
    let explanation = 'Chua duoc kiem tra bang AI.';
    let synonyms = '';

    try {
      const aiResponse = await validateWordMeaning(word, meaning);
      status = aiResponse.status;
      correctMeaning = aiResponse.correctMeaning;
      explanation = aiResponse.explanation;
      synonyms = aiResponse.synonyms;
    } catch (aiError) {
      console.error('Failed to validate meaning with Ollama:', aiError);
      explanation = 'Khong the ket noi voi AI de kiem tra nghia.';
    }

    const newWord = await prisma.word.create({
      data: {
        word,
        meaning,
        status,
        correctMeaning,
        explanation,
        synonyms,
      },
    });

    return NextResponse.json(newWord, { status: 201 });
  } catch (error) {
    console.error('Error creating word:', error);
    return NextResponse.json({ error: 'Failed to create word' }, { status: 500 });
  }
}
