import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Initialize the NextResponse object that will be returned,
  // allowing Supabase to modify cookies as needed.
  const res = NextResponse.next();
  
  // 1. Initialize the @supabase/ssr middleware client.
  const supabase = createMiddlewareClient({ req, res });

  // Retrieve the user session. This call also refreshes the session cookie
  // if it's close to expiring, ensuring cookie refreshing works
  // exactly as outlined in the official Supabase SSR docs.
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');

  // 3. Auth Check: If the requested path starts with `/admin` AND the user is not logged in,
  // immediately redirect to `/login`.
  if (isAdminRoute && !session) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/login';
    // Optionally add a `redirectedFrom` search parameter to return to the original page after login.
    redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // 4. Role Check: If the user is logged in, but their `user.user_metadata.is_admin` is NOT true,
  // redirect them to `/` (Home) if they try to access `/admin`.
  // Ensure session, user, and user_metadata exist before checking `is_admin`.
  if (isAdminRoute && session) {
    if (session.user && session.user.user_metadata && !session.user.user_metadata.is_admin) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // 5. Ensure cookie refreshing works: This is inherently handled by
  // `await supabase.auth.getSession()` and the `res` object being passed
  // to `createMiddlewareClient`. Supabase internally updates the cookies on `res`.
  return res;
}

// 2. Matcher: Configure the config matcher to run on all routes EXCEPT
// `_next/static`, `_next/image`, `favicon.ico`, and public assets.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (Next.js static files)
     * - _next/image (Next.js image optimization files)
     * - favicon.ico (Favicon file)
     * - Any file in the public folder that includes a file extension
     *   (e.g., .svg, .png, .jpg, .jpeg, .gif, .webp, .css, .js)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)',
  ],
};