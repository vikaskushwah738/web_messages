import { NextRequest, NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt"
export { default } from "next-auth/middleware"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const url = request.nextUrl
  if (token &&
    (
      url.pathname.startsWith('/sing-in') ||
      url.pathname.startsWith('/sign-up') ||
      url.pathname.startsWith('/verify') ||
      url.pathname.startsWith('/')
    )
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  if(!token && url.pathname.startsWith('./dashboard')){
    return  NextResponse.redirect(new URL('/sing-in', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/sing-in',
    '/sing-up',
    '/',
    '/dashboard/:path*',
    '/verify/:path*'
  ]
}