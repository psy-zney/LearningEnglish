import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { validateWordMeaning } from '@/lib/word-ai';
import { toPublicWord } from '@/lib/legacy-content';

type RouteParams = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: RouteParams) {
  try {

    const { id } = await params;
    const body = await request.json();
    const word = typeof body.word === 'string' ? body.word.trim() : undefined;
    const meaning = typeof body.meaning === 'string' ? body.meaning.trim() : undefined;
    const synonyms = typeof body.synonyms === 'string' ? body.synonyms.trim() : undefined;
    const recheck = body.recheck === true;

    const existingWord = await prisma.word.findUnique({
      where: { id },
    });

    if (!existingWord) {
      return NextResponse.json({ error: 'Word not found' }, { status: 404 });
    }

    const nextWord = word ?? existingWord.word;
    const nextMeaning = meaning ?? existingWord.meaning;
    const updateData: {
      word?: string;
      correctedWord?: string;
      meaning?: string;
      synonyms?: string;
      status?: string;
      correctMeaning?: string;
      explanation?: string;
    } = {};

    if (word !== undefined) {
      if (!word) {
        return NextResponse.json({ error: 'Word is required' }, { status: 400 });
      }

      updateData.word = word;
      updateData.correctedWord = word;
      updateData.correctMeaning = nextMeaning;
      updateData.status = 'unverified';
      updateData.explanation = 'Đang chờ đối chiếu lại với từ điển.';
    }

    if (meaning !== undefined) {
      if (!meaning) {
        return NextResponse.json({ error: 'Meaning is required' }, { status: 400 });
      }

      updateData.meaning = meaning;
      updateData.status = 'unverified';
      updateData.correctMeaning = meaning;
      updateData.explanation = 'Đang chờ đối chiếu lại với từ điển.';
    }

    if (synonyms !== undefined) {
      updateData.synonyms = synonyms;
    }

    if (recheck) {
      try {
        const aiResponse = await validateWordMeaning(nextWord, nextMeaning);
        updateData.status = aiResponse.status;
        updateData.correctedWord = aiResponse.correctedWord;
        updateData.correctMeaning = aiResponse.correctMeaning;
        updateData.explanation = aiResponse.explanation;
        updateData.synonyms = aiResponse.synonyms || synonyms || existingWord.synonyms || '';
      } catch (aiError) {
        console.error('Dictionary recheck failed:', aiError);
        updateData.status = 'unverified';
        updateData.explanation = 'Chưa thể đối chiếu lại với từ điển.';
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No changes provided' }, { status: 400 });
    }

    const updatedWord = await prisma.word.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(toPublicWord(updatedWord));
  } catch (error) {
    console.error('Error updating word:', error);
    return NextResponse.json({ error: 'Failed to update word' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    await prisma.word.delete({
      where: {
        id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting word:', error);
    return NextResponse.json({ error: 'Failed to delete word' }, { status: 500 });
  }
}
