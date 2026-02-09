
import { z } from "zod"
import { UserInputData } from "@/types/analysis"

// Define the schema for the AI's response
export const RiskAnalysisSchema = z.object({
  riskScore: z.number().min(0).max(100).describe("Overall risk score from 0-100"),
  riskLevel: z.enum(["Low", "Medium", "High"]).describe("Overall risk classification"),
  recommendation: z.enum(["Accept", "Negotiate", "Reject"]).describe("Primary recommendation"),
  summary: z.string().describe("Executive summary of the analysis (max 3 sentences)"),
  redFlags: z.array(z.string()).describe("List of critical risks identified"),
  technicalAnalysis: z.string().describe("Assessment of technical feasibility and clarity"),
  budgetAnalysis: z.string().describe("Assessment of budget vs scope"),
  clientAnalysis: z.string().describe("Assessment of client communication and signals"),
  negotiationPoints: z.array(z.string()).describe("List of suggested points to negotiate"),
  questionsToAsk: z.array(z.string()).describe("List of clarifying questions to ask the client"),
  contractClauses: z.array(z.object({
    title: z.string(),
    clause: z.string(),
    explanation: z.string()
  })).describe("Suggested contract clauses to mitigate identified risks"),
})

export type RiskAnalysisResult = z.infer<typeof RiskAnalysisSchema>

// System Prompt
export const SYSTEM_PROMPT = `
You are an expert Freelance Business Consultant and Risk Analyst. 
Your job is to protect freelancers from bad projects, scope creep, and profit loss.

Analyze the provided project details strictly and skeptically.
Do not be optimistic. Look for hidden risks. 

Factors to score:
- Scope Clarity: Is it vague? (High Risk)
- Budget Adequacy: Is it too low for the work? (High Risk)
- Client Signals: Are they demanding, disorganized, or urgent? (High Risk)
- Timeline: Is it unrealistic? (High Risk)

If the data is missing, assume higher risk for that section.

Also provide specific contract clauses that the freelancer should include to protect themselves against the specific risks you identified.
`

// Helper to format user input
export function formatUserPrompt(data: UserInputData, fileContents: string = ""): string {
  const filesList = data.files.map(f => f.name).join(", ") || "None"

  return `
    PROJECT TITLE: ${data.title}
    
    DESCRIPTION:
    ${data.description}
    
    BUDGET: ${data.currency} ${data.budget}
    TIMELINE: ${data.timeline}
    
    CLIENT COMMUNICATION / NOTES:
    ${data.communication || "None provided"}
    
    ATTACHED FILES (Names: ${filesList}):
    ${fileContents ? `\n--- ANALYZED FILE CONTENTS ---\n${fileContents}\n------------------------------` : "No file content analyzed (or files were empty/unreadable)."}
  `
}
