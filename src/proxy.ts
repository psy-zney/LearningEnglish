import { NextResponse } from 'next/server.js';
import type { NextRequest } from 'next/server.js';
import { isOriginAllowed, parseAllowedOrigins, setVaryOrigin } from './lib/cors-policy.ts';
import { getAuthSecret, isAuthorizedRequest } from './lib/auth.ts';
import { consumeRateLimit, requestClientKey } from './lib/request-security.ts';

const corsHeaders = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
};

const writeMethods = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

function withCors(response: NextResponse, origin: string | null) {
  if (origin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }
  setVaryOrigin(response.headers);
  return response;
}

export function proxy(request: NextRequest) {
  if (process.env.APP_DEPLOYMENT_MODE !== 'backend') {
    return NextResponse.json({ error: 'API is served by the LearningEnglish backend.' }, { status: 404 });
  }

  const origin = request.headers.get('origin');
  const configuredOrigins = parseAllowedOrigins(process.env.ALLOWED_ORIGINS);

  if (!isOriginAllowed(origin, request.nextUrl.origin, configuredOrigins)) {
    const response = NextResponse.json({ error: 'Origin is not allowed' }, { status: 403 });
    setVaryOrigin(response.headers);
    return response;
  }

  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    });
    if (origin) response.headers.set('Access-Control-Allow-Origin', origin);
    setVaryOrigin(response.headers);
    return response;
  }

  const isLogin = request.nextUrl.pathname === '/api/auth/login';
  if (writeMethods.has(request.method) && !isLogin) {
    const contentLength = Number(request.headers.get('content-length') ?? 0);
    if (Number.isFinite(contentLength) && contentLength > 65_536) {
      return withCors(NextResponse.json({ error: 'Request is too large.' }, { status: 413 }), origin);
    }
    const secret = getAuthSecret();
    if (!secret) {
      return withCors(NextResponse.json({ error: 'Backend authentication is not configured.' }, { status: 503 }), origin);
    }
    if (!isAuthorizedRequest(request, secret)) {
      return withCors(NextResponse.json({ error: 'Authentication required.' }, { status: 401 }), origin);
    }
    if (!consumeRateLimit(`write:${requestClientKey(request)}`, 180, 60_000)) {
      return withCors(NextResponse.json({ error: 'Too many write requests.' }, { status: 429 }), origin);
    }
  }

  return withCors(NextResponse.next(), origin);
}

export const config = {
  matcher: '/api/:path*',
};
