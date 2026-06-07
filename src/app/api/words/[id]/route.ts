import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { validateWordMeaning } from '@/lib/word-ai';
import { verifyToken } from '@/lib/auth';

type RouteParams = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1] || '';
    if (!verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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
      updateData.status = 'unverified';
      updateData.explanation = 'Dang cho AI kiem tra lai.';
    }

    if (meaning !== undefined) {
      if (!meaning) {
        return NextResponse.json({ error: 'Meaning is required' }, { status: 400 });
      }

      updateData.meaning = meaning;
      updateData.status = 'unverified';
      updateData.correctMeaning = meaning;
      updateData.explanation = 'Dang cho AI kiem tra lai.';
    }

    if (synonyms !== undefined) {
      updateData.synonyms = synonyms;
    }

    if (recheck) {
      try {
        const aiResponse = await validateWordMeaning(nextWord, nextMeaning);
        updateData.status = aiResponse.status;
        updateData.correctMeaning = aiResponse.correctMeaning;
        updateData.explanation = aiResponse.explanation;
        updateData.synonyms = aiResponse.synonyms || synonyms || existingWord.synonyms || '';
      } catch (aiError) {
        console.error('Failed to recheck word with Ollama:', aiError);
        updateData.status = 'unverified';
        updateData.explanation = 'Khong the ket noi voi AI de kiem tra lai.';
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No changes provided' }, { status: 400 });
    }

    const updatedWord = await prisma.word.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedWord);
  } catch (error) {
    console.error('Error updating word:', error);
    return NextResponse.json({ error: 'Failed to update word' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1] || '';
    if (!verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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
