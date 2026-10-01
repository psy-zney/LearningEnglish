import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({ authenticated: true, configured: true });
}

export async function POST(request: Request) {
  return NextResponse.json({ success: true });
}
