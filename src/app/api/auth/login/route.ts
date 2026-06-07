import { NextResponse } from 'next/server';
import { verifyPassword, hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password = body.password;

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    if (verifyPassword(password)) {
      // The token is simply the hash of the password for this single user app
      const token = hashPassword(password);
      return NextResponse.json({ success: true, token });
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Failed to process login' }, { status: 500 });
  }
}
