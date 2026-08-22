import { NextResponse } from 'next/server';
import {
  AUTH_COOKIE_NAME,
  AUTH_SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  getAdminPasswordHash,
  getAuthSecret,
  isAuthorizedRequest,
  verifyPasswordHash,
} from '@/lib/auth';
import { consumeRateLimit, requestClientKey } from '@/lib/request-security';

export async function GET(request: Request) {
  const secret = getAuthSecret();
  if (!secret) {
    return NextResponse.json({ authenticated: false, configured: false });
  }
  const authenticated = isAuthorizedRequest(request, secret);
  return NextResponse.json({ authenticated, configured: true });
}

export async function POST(request: Request) {
  try {
    if (!consumeRateLimit(`login:${requestClientKey(request)}`, 10, 15 * 60_000)) {
      return NextResponse.json({ error: 'Too many login attempts.' }, { status: 429 });
    }
    const contentLength = Number(request.headers.get('content-length') ?? 0);
    if (Number.isFinite(contentLength) && contentLength > 2_048) {
      return NextResponse.json({ error: 'Request is too large.' }, { status: 413 });
    }
    const body = await request.json();
    const password = typeof body.password === 'string' ? body.password : '';

    if (!password || password.length > 256) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    const passwordHash = getAdminPasswordHash();
    const secret = getAuthSecret();
    if (!passwordHash || !secret) {
      return NextResponse.json({ error: 'Backend authentication is not configured.' }, { status: 503 });
    }

    if (verifyPasswordHash(password, passwordHash)) {
      const token = createSessionToken(secret);
      const forwardedProto = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim();
      const secure = forwardedProto === 'https' || new URL(request.url).protocol === 'https:';
      const response = NextResponse.json({ success: true });
      response.cookies.set({
        name: AUTH_COOKIE_NAME,
        value: token,
        httpOnly: true,
        secure,
        sameSite: 'lax',
        path: '/',
        maxAge: AUTH_SESSION_MAX_AGE_SECONDS,
      });
      return response;
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Invalid login request' }, { status: 400 });
  }
}
