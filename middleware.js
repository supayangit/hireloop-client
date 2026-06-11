// middleware.js
import { NextResponse } from "next/server";
import { getUserSession } from "@/lib/core/session"; // Importing your direct session helper

export async function middleware(request) {
  // 1. Await your custom function to get the user data
  const user = await getUserSession();

  // 2. If no user object is returned, handle the protected route logic
  if (!user) {
    // Capture the route they were trying to visit (e.g., /jobs/123/apply)
    const originalUrl = `${request.nextUrl.pathname}${request.nextUrl.search}`;
    
    // Create the destination URL pointing to your login page
    const loginUrl = new URL("/login", request.url);
    
    // Append the '?next=/jobs/123/apply' search parameter safely
    loginUrl.searchParams.set("next", originalUrl);

    return NextResponse.redirect(loginUrl);
  }

  // If the user object exists, let them pass right through to the page
  return NextResponse.next();
}

// Specify exactly which paths should trigger this middleware security check
export const config = {
  matcher: [
    // This protects any job application URL pattern matching /jobs/[id]/apply
    "/jobs/:id/apply",
  ],
};