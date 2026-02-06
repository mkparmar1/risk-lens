"use server"

import { Storage, Milestone } from "@/lib/storage"
import { requireAuth } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function togglePublic(projectId: string, isPublic: boolean) {
    const session = await requireAuth()
    const project = Storage.getProject(projectId)

    // Auth Check: Only owner can modify
    if (!project || project.userId !== session.userId) {
        throw new Error("Unauthorized")
    }

    Storage.togglePublicStatus(projectId, isPublic)
    revalidatePath(`/project/${projectId}`)
    revalidatePath("/community")
    revalidatePath("/dashboard")
}

export async function updateMilestones(projectId: string, milestones: Milestone[]) {
    const session = await requireAuth()
    const project = Storage.getProject(projectId)

    if (!project || project.userId !== session.userId) {
        throw new Error("Unauthorized")
    }

    Storage.updateMilestones(projectId, milestones)
    revalidatePath(`/project/${projectId}`)
}
