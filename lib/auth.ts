
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const SESSION_COOKIE = "risklens_session"

export interface Session {
    userId: string
    email: string
    name: string
}

export async function createSession(userId: string, email: string, name: string) {
    const session: Session = { userId, email, name }
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

    // In a real app, you'd sign/encrypt this cookie (JWT/Verify)
    // For this MVP, we store a simple JSON string (INSECURE for prod)
    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE, JSON.stringify(session), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires,
        sameSite: "lax",
        path: "/",
    })
}

export async function getSession(): Promise<Session | null> {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get(SESSION_COOKIE)
    if (!sessionCookie?.value) return null
    try {
        return JSON.parse(sessionCookie.value)
    } catch {
        return null
    }
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete(SESSION_COOKIE)
}

export async function requireAuth() {
    const session = await getSession()
    if (!session) {
        redirect("/login")
    }
    return session
}
