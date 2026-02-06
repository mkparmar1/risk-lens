"use server"

import { Storage } from "@/lib/storage"
import { createSession, deleteSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function login(prevState: { error: string }, formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // 1. Validate input (basic)
    if (!email || !password) {
        return { error: "Please fill in all fields." }
    }

    // 2. Find user
    const user = Storage.getUser(email)
    if (!user) {
        return { error: "Invalid credentials." }
    }

    // 3. Verify password (Mock - simple check)
    // In prod, comparing hashed passwords
    if (user.passwordHash !== password) {
        return { error: "Invalid credentials." }
    }

    // 4. Create session
    await createSession(user.id, user.email, user.name)

    redirect("/dashboard")
}

export async function register(prevState: { error: string }, formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!name || !email || !password) {
        return { error: "Please fill in all fields." }
    }

    // 1. Check existing
    const existing = Storage.getUser(email)
    if (existing) {
        return { error: "Email already registered." }
    }

    // 2. Create user (storing plain password as hash for MVP - INSECURE)
    const newUser = Storage.createUser({
        name,
        email,
        passwordHash: password,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`
    })

    if (!newUser) {
        return { error: "Failed to create user." }
    }

    // 3. Create session
    await createSession(newUser.id, newUser.email, newUser.name)

    redirect("/dashboard")
}

export async function logout() {
    await deleteSession()
    redirect("/login")
}
