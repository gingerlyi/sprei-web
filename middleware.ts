// File: middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('isLoggedIn');

  // HANYA mencegat jika URL depannya adalah /admin
  if (request.nextUrl.pathname.startsWith('/admin') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/spreiwiwik', request.url));
  }

  return NextResponse.next();
}

// Pastikan matcher-nya HANYA untuk /admin
export const config = {
  matcher: '/admin/:path*', 
}