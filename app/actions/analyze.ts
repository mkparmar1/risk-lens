
"use server"

import { UserInputData } from "@/types/analysis"
import { openai } from "@/lib/ai"
import { zodResponseFormat } from "openai/helpers/zod"
import { RiskAnalysisSchema, SYSTEM_PROMPT, formatUserPrompt, RiskAnalysisResult } from "@/prompts/risk-analysis"
import { Storage } from "@/lib/storage"

import { requireAuth } from "@/lib/auth"

export async function analyzeProject(data: UserInputData, projectId?: string): Promise<{ success: boolean; data?: RiskAnalysisResult; error?: string; recordId?: string }> {
    const session = await requireAuth()
    const user = Storage.getUserById(session.userId)

    if (!user) {
        return { success: false, error: "User not found." }
    }

    if (user.credits < 1) {
        return { success: false, error: "Insufficient credits. Please purchase a pack." }
    }

    // 1. Save Initial/Draft State
    let recordId = projectId;
    try {
        const record = Storage.saveAnalysis(session.userId, data, undefined, "draft", undefined, projectId)
        recordId = record.id
    } catch (e) {
        console.error("Failed to save draft:", e)
    }

    if (!process.env.OPENAI_API_KEY) {
        // Update status to failed
        if (recordId) Storage.saveAnalysis(session.userId, data, undefined, "failed", "OpenAI API Key is missing on the server.", recordId)
        return { success: false, error: "OpenAI API Key is missing on the server.", recordId }
    }

    try {
        // --- Client Memory Check ---
        let memoryContext = ""
        if (data.clientName) {
            const history = Storage.getClientHistory(data.clientName)
            if (history.length > 0) {
                const highRiskCount = history.filter(h => h.riskLevel === "High").length
                const avgScore = history.reduce((acc, curr) => acc + (curr.riskScore || 0), 0) / history.length

                memoryContext = `
            \n--- CLIENT HISTORY ALERT ---
            This client (${data.clientName}) has ${history.length} previous analysis records.
            Average Risk Score: ${avgScore.toFixed(0)}
            High Risk Projects: ${highRiskCount}
            
            CONSIDER THIS HISTORY IN YOUR RISK ASSESSMENT. IF THEY HAVE A HISTORY OF HIGH RISK, INCREASE THE RISK SCORE.
            `
            }
        }

        const userContent = formatUserPrompt(data) + memoryContext

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-2024-08-06",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: userContent },
            ],
            response_format: zodResponseFormat(RiskAnalysisSchema, "risk_analysis"),
        })

        const content = completion.choices[0].message.content
        const result = content ? JSON.parse(content) : null

        if (!result) {
            if (recordId) Storage.saveAnalysis(session.userId, data, undefined, "failed", "No analysis generated from AI provider.", recordId)
            return { success: false, error: "No analysis generated.", recordId }
        }

        // --- Save Success to Persistence ---
        try {
            Storage.saveAnalysis(session.userId, data, result, "completed", undefined, recordId)
            // Deduct Credit
            Storage.updateUserCredits(session.userId, -1)
        } catch (e) {
            console.error("Failed to save analysis history:", e)
        }

        return { success: true, data: result, recordId }

    } catch (error: any) {
        console.error("OpenAI Analysis Error:", error)
        if (recordId) Storage.saveAnalysis(session.userId, data, undefined, "failed", error.message || "Unknown error", recordId)
        return { success: false, error: error.message || "Failed to analyze project.", recordId }
    }
}
