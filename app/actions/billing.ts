"use server"

import { Storage } from "@/lib/storage"
import { requireAuth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function purchaseCredits(pack: "basic" | "pro" | "agency") {
    const session = await requireAuth()

    let creditsToAdd = 0
    // Mock Payment Processing
    switch (pack) {
        case "basic":
            creditsToAdd = 1
            break
        case "pro":
            creditsToAdd = 5
            break
        case "agency":
            creditsToAdd = 25
            break
    }

    Storage.updateUserCredits(session.userId, creditsToAdd)

    revalidatePath("/pricing")
    revalidatePath("/dashboard")
    redirect("/dashboard")
}
