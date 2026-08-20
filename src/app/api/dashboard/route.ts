import { NextResponse } from 'next/server';
import { getDailyPlan } from '@/services/daily-plan-service';
import { getProgressSummary } from '@/services/progress-service';

export async function GET() {
  try {
    const [plan, progress] = await Promise.all([getDailyPlan(), getProgressSummary()]);
    return NextResponse.json({ plan, progress });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
