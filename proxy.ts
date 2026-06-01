import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Allow /admin/login through
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  // Check for Supabase session cookies (multiple formats)
  const hasSession =
    request.cookies.has('sb-access-token') ||
    request.cookies.has('sb-refresh-token') ||
    [...request.cookies.getAll()].some(
      (c) => c.name.startsWith('sb-') && c.name.endsWith('-auth-token')
    )

  if (!hasSession) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
