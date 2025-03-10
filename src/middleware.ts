import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export default function middleware(request: NextRequest) {
    //get which path we are in
    const path = request.nextUrl.pathname;

    //get if the path is public path
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail';

    //get the token
    const token = request.cookies.get('token')?.value || '';

    //redirect if public path and has token
    if(isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    //redirect if not public path and dont have token
    if(!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/profile/:id',
    '/login',
    '/signup',
    '/verifyemail',
  ]
}