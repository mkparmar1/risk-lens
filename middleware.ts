
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const session = request.cookies.get("risklens_session")
    const { pathname } = request.nextUrl

    // Protected Routes
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/analyze") || pathname.startsWith("/profile")) {
        if (!session) {
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }

    // Auth Routes (Redirect if already logged in)
    if (pathname === ("/login") || pathname === ("/register")) {
        if (session) {
            return NextResponse.redirect(new URL("/dashboard", request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
