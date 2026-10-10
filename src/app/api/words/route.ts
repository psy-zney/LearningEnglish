import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { validateWordMeaning } from '@/lib/word-ai';
import { toPublicWord } from '@/lib/legacy-content';

export async function GET() {
  try {
    const words = await prisma.word.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(words.map(toPublicWord));
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
    let correctedWord = word;
    let correctMeaning = meaning;
    let explanation = 'Chưa đối chiếu từ điển.';
    let synonyms = '';

    try {
      const aiResponse = await validateWordMeaning(word, meaning);
      status = aiResponse.status;
      correctedWord = aiResponse.correctedWord;
      correctMeaning = aiResponse.correctMeaning;
      explanation = aiResponse.explanation;
      synonyms = aiResponse.synonyms;
    } catch (aiError) {
      console.error('Dictionary validation failed:', aiError);
      explanation = 'Chưa thể đối chiếu từ điển; giữ nguyên nghĩa bạn nhập.';
    }

    const newWord = await prisma.word.create({
      data: {
        word,
        meaning,
        status,
        correctedWord,
        correctMeaning,
        explanation,
        synonyms,
      },
    });

    return NextResponse.json(toPublicWord(newWord), { status: 201 });
  } catch (error) {
    console.error('Error creating word:', error);
    return NextResponse.json({ error: 'Failed to create word' }, { status: 500 });
  }
}
