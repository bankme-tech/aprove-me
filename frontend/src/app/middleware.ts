import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = localStorage.getItem("token");

  if (!currentUser && request.nextUrl.pathname !== "/") {
    return Response.redirect(new URL("/", request.url));
  }
}

export const config = {};
