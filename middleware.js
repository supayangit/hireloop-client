// middleware.js
import { NextResponse } from "next/server";

export async function middleware(request) {
  // Check for the production cookie first, then fall back to local
  const sessionToken = 
    request.cookies.get("__Secure-better-auth.session_token")?.value || 
    request.cookies.get("better-auth.session_token")?.value;

  // If no session token exists, redirect to login
  if (!sessionToken) {
    const originalUrl = `${request.nextUrl.pathname}${request.nextUrl.search}`;
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", originalUrl);

    return NextResponse.redirect(loginUrl);
  }

  // If a token exists, let them pass (the page will handle deep validation)
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/jobs/:id/apply",
  ],
};