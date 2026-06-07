import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const totalWords = await prisma.word.count();
    
    // Words due for review today (nextReviewDate <= now)
    const now = new Date();
    const wordsToReview = await prisma.word.count({
      where: {
        nextReviewDate: {
          lte: now,
        },
      },
    });

    const masteredWords = await prisma.word.count({
      where: {
        interval: {
          gte: 21, // Arbitrary threshold for "mastered" (e.g., interval > 21 days)
        },
      },
    });

    const learningWords = totalWords - masteredWords;

    return NextResponse.json({
      totalWords,
      wordsToReview,
      masteredWords,
      learningWords,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
