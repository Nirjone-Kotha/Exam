import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Allow public static assets and files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/icons") ||
    pathname.startsWith("/api/auth") ||
    pathname === "/manifest.json" ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const userId = request.cookies.get("bcs_user_id")?.value;
  const isAuthenticated = Boolean(userId && userId.trim() !== "");

  const isAuthRoute = pathname.startsWith("/auth/signin") || pathname.startsWith("/auth/signup");

  // 2. If user is NOT authenticated and trying to access any protected page, redirect to signin
  if (!isAuthenticated && !isAuthRoute) {
    const signInUrl = new URL("/auth/signin", request.url);
    // Preserve the original requested path so user can return after login
    signInUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // 3. If user IS authenticated and visits /auth/signin or /auth/signup, redirect to home
  if (isAuthenticated && isAuthRoute) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
