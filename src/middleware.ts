import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedPaths = [
  '/news/write',
  '/contents/notice/write',
  '/business/activities/write',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuthenticated = request.cookies.has('auth_token')

  const isProtected =
    protectedPaths.some((path) => pathname === path || pathname.startsWith(path + '/')) ||
    pathname.endsWith('/edit')

  if (isProtected && !isAuthenticated) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|_next/data|favicon.ico).*)'],
}
