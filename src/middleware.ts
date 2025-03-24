import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 아무 검증도 하지 않고, 그냥 모든 요청 통과시킴
  return NextResponse.next()
}

// matcher는 그대로 둬도 되고, 아예 지워도 됨
export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
}
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// const publicPaths = ['/', '/login', '/api', '/sitemap.xml', '/robots.txt']
//
// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl
//   const isPublicPath = publicPaths.some(
//     (path) => pathname === path || pathname.startsWith(path)
//   )
//   const isAuthenticated = request.cookies.has('auth_token')
//
//   console.log('🔥 middleware 실행:', pathname, '| 인증됨:', isAuthenticated)
//
//   if (!isAuthenticated && !isPublicPath) {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }
//
//   if (isAuthenticated && pathname === '/login') {
//     return NextResponse.redirect(new URL('/', request.url))
//   }
//
//   return NextResponse.next()
// }

// const publicPaths = ['/login', '/api', '/sitemap.xml', '/robots.txt']
//
// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl
//   const isPublicPath = publicPaths.some(
//     (path) => pathname.startsWith(path) || pathname === path,
//   )
//   const isAuthenticated = request.cookies.has('auth_token')
//
//   if (!isAuthenticated && !isPublicPath) {
//     const homeUrl = new URL('/', request.url)
//     return NextResponse.redirect(homeUrl)
//     // const loginUrl = new URL('/login', request.url)
//     // return NextResponse.redirect(loginUrl)
//   }
//
//   if (isAuthenticated && pathname === '/login') {
//     const homeUrl = new URL('/', request.url)
//     return NextResponse.redirect(homeUrl)
//   }
//
//   return NextResponse.next()
// }
//
// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|_next/data|favicon.ico).*)'],
// }
