// File: middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Mengecek apakah pengunjung membawa "Kartu Akses" (Cookie isLoggedIn)
  const isLoggedIn = request.cookies.get('isLoggedIn');

  // Jika mencoba masuk ke folder /admin tapi TIDAK punya kartu akses
  if (request.nextUrl.pathname.startsWith('/admin') && !isLoggedIn) {
    // Tendang (Redirect) kembali ke halaman rahasia Anda
    return NextResponse.redirect(new URL('/spreiwiwik', request.url));
  }

  // Jika aman, persilakan lewat
  return NextResponse.next();
}

// Beritahu satpam rute mana saja yang harus dijaga ketat
export const config = {
  matcher: '/admin/:path*', 
}