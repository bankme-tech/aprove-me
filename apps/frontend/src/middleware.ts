import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import api from "./lib/api";

export default async function middleware (request: NextRequest) {
	const pathname = request.nextUrl.pathname

	if (config.ignore.includes(pathname)) return

	const token = cookies().get("token")?.value;

	if (!token) return NextResponse.redirect(new URL("/login", request.url))

	const user = await api("integrations/auth").then(t => t.json())

	if (!user?.data?.id) return NextResponse.redirect(new URL("/login", request.url))

	return NextResponse.next(	)
}

export const config = {
	// Matcher ignoring `/_next/` and `/api/`
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|img|logo|icon|og.png|rive|site.webmanifest).*)"],
	
	ignore: ["/login", "/register"]
}