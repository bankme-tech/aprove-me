import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("user_token")?.value;

  const signInURL = new URL("/login", request.url);
  const isLoginPage = request.nextUrl.pathname === "/login";

  if (!token) {
    if (isLoginPage) {
      return NextResponse.next();
    }
    return NextResponse.redirect(signInURL);
  }

  if (isLoginPage) {
    return NextResponse.redirect(new URL("/list-payable", request.url));
  }
}

export const config = {
  matcher: ["/login", "/list-payable/:path*", "/assignor/:path*", ],
};
