import { NextResponse } from 'next/server.js';
import type { NextRequest } from 'next/server.js';
import { isOriginAllowed, parseAllowedOrigins, setVaryOrigin } from './lib/cors-policy.ts';

const corsHeaders = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

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

  const response = NextResponse.next();
  if (origin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }
  setVaryOrigin(response.headers);

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
