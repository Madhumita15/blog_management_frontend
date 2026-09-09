import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // console.log(pathname)
  const accessToken = request.cookies.get("accessToken")?.value;
  const role = request.cookies.get("role")?.value;

  if ((pathname === "/login" || pathname === "forgotPasswordLink" || pathname.startsWith("/account/forgotPassword")) && accessToken) {
    if (role === "admin" || role === "writer") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    if (role === "user") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith("/admin")) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (accessToken && role === "user") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/admin/:path*", "/forgotPasswordLink", "/account/forgotPassword/:path*"],
};
