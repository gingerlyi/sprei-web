import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Fungsi ini akan dijalankan Next.js setiap kali ada perpindahan halaman
export function middleware(request: NextRequest) {
  // 1. Mengecek apakah pengguna sedang mencoba mengakses folder /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    // 2. Mengecek apakah mereka punya tiket (cookie) bernama 'admin_logged_in'
    let cookie = request.cookies.get('admin_logged_in')
    
    // 3. Jika tidak punya tiket, usir kembali ke halaman /login
    if (!cookie || cookie.value !== 'true') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
}

// Menentukan halaman mana saja yang dijaga oleh satpam ini
export const config = {
  matcher: '/admin/:path*',
}