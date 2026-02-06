export interface UserInputData {
    title: string
    clientName: string
    description: string
    files: File[]
    budget: string
    currency: string
    timeline: string
    communication: string
}

export type BasicInfoStepType = Pick<UserInputData, "title" | "description">
export type ConstraintsStepType = Pick<UserInputData, "budget" | "currency" | "timeline">
