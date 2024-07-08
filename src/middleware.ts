import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl; // Extract the pathname from the request URL

    // Check if the user is authenticated
    const isAuth = await getToken({ req });

    // Identify if the current route is the login page
    const isLoginPage = pathname === "/login";

    // Define the sensitive routes that require authentication
    const sensitiveRoutes = ["/emails"];
    const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
      pathname.startsWith(route)
    );

    // Explicit handling for root path ('/')
    if (pathname === "/") {
      if (!isAuth) {
        return NextResponse.redirect(new URL("/login", req.url));
      } else {
        return NextResponse.redirect(new URL("/emails", req.url));
      }
    }

    // If the user is on the login page and is already authenticated, redirect to /emails
    if (isLoginPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/emails", req.url));
      }
      return NextResponse.next(); // Allow access to the login page
    }

    // If the user is not authenticated and is trying to access a sensitive route, redirect to /login
    if (!isAuth && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Allow access to other pages or proceed as intended
    return NextResponse.next();
  },
  {
    // Ensure the middleware function is always called to check authentication status
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/", "/login", "/emails/:path*"], // Apply the middleware to these routes
};
