import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  console.log('middleware ~ ', );
  return NextResponse.redirect(new URL('/home', request.url))
}

export const config = {
  matcher: '/api/upload',
}
