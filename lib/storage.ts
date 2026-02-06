
import fs from "fs"
import path from "path"
import { RiskAnalysisResult } from "@/prompts/risk-analysis"
import { UserInputData } from "@/types/analysis"

// --- Data Types ---

// --- Data Types ---

export type AnalysisStatus = "draft" | "completed" | "failed"

export interface Milestone {
    id: string
    title: string
    amount: number
    dueDate: string
    status: "pending" | "paid"
}

export interface User {
    id: string
    email: string
    passwordHash: string // In a real app, use bcrypt. Here simple hash or just storing for MVP (NOT SECURE)
    name: string
    credits: number
    avatar?: string
}

export interface AnalysisRecord {
    id: string
    userId: string // Link to User
    isPublic: boolean
    createdAt: string
    updatedAt: string
    projectTitle: string
    clientName?: string
    status: AnalysisStatus
    riskScore?: number
    riskLevel?: "Low" | "Medium" | "High"
    data: UserInputData
    result?: RiskAnalysisResult
    milestones?: Milestone[]
    error?: string
}

export interface ClientProfile {
    name: string
    totalProjects: number
    avgRiskScore: number
    riskLevelDistribution: {
        Low: number
        Medium: number
        High: number
    }
    lastProjectDate: string
    flags: string[]
}

// --- Storage Class ---

const DATA_DIR = path.join(process.cwd(), "data")
const DB_FILE = path.join(DATA_DIR, "db.json")

interface DB {
    users: User[]
    records: AnalysisRecord[]
}

export class Storage {
    private static initDB() {
        if (!fs.existsSync(DATA_DIR)) {
            fs.mkdirSync(DATA_DIR, { recursive: true })
        }
        if (!fs.existsSync(DB_FILE)) {
            fs.writeFileSync(DB_FILE, JSON.stringify({ users: [], records: [] }, null, 2))
        }
    }

    private static readDB(): DB {
        this.initDB()
        const data = fs.readFileSync(DB_FILE, "utf-8")
        try {
            const parsed = JSON.parse(data)
            // Migration for old structure if needed
            if (!parsed.users) parsed.users = []
            return parsed
        } catch (e) {
            return { users: [], records: [] }
        }
    }

    private static writeDB(db: DB) {
        fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2))
    }

    // --- User Methods ---

    static createUser(user: Omit<User, "id" | "credits">): User | null {
        const db = this.readDB()
        if (db.users.find(u => u.email === user.email)) {
            return null // User exists
        }
        const newUser: User = {
            ...user,
            id: crypto.randomUUID(),
            credits: 5 // Start with 5 free credits (Strategy: 1 project = 5$, giving 1 free) -> Let's give 1 free credit/project
        }
        db.users.push(newUser)
        this.writeDB(db)
        return newUser
    }

    static getUser(email: string): User | undefined {
        return this.readDB().users.find(u => u.email === email)
    }

    static getUserById(id: string): User | undefined {
        return this.readDB().users.find(u => u.id === id)
    }

    static updateUserCredits(userId: string, amount: number) {
        const db = this.readDB()
        const user = db.users.find(u => u.id === userId)
        if (user) {
            user.credits += amount
            this.writeDB(db)
        }
    }

    // --- Analysis Methods ---

    static saveAnalysis(userId: string, data: UserInputData, result?: RiskAnalysisResult, status: AnalysisStatus = "completed", error?: string, existingId?: string): AnalysisRecord {
        const db = this.readDB()

        let record: AnalysisRecord;

        if (existingId) {
            const index = db.records.findIndex(r => r.id === existingId)
            if (index !== -1) {
                // Update existing
                record = {
                    ...db.records[index],
                    updatedAt: new Date().toISOString(),
                    projectTitle: data.title,
                    clientName: this.extractClientName(data),
                    status,
                    data,
                    riskScore: result?.riskScore,
                    riskLevel: result?.riskLevel,
                    result,
                    error
                }
                db.records[index] = record;
            } else {
                record = this.createNewRecord(userId, data, result, status, error, existingId)
                db.records.unshift(record)
            }
        } else {
            record = this.createNewRecord(userId, data, result, status, error)
            db.records.unshift(record)
        }

        this.writeDB(db)
        return record
    }

    private static createNewRecord(userId: string, data: UserInputData, result?: RiskAnalysisResult, status: AnalysisStatus = "completed", error?: string, id?: string): AnalysisRecord {
        return {
            id: id || crypto.randomUUID(),
            userId,
            isPublic: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            projectTitle: data.title,
            clientName: this.extractClientName(data),
            status,
            riskScore: result?.riskScore,
            riskLevel: result?.riskLevel,
            data,
            result,
            error
        }
    }

    static getHistory(userId: string): AnalysisRecord[] {
        return this.readDB().records.filter(r => r.userId === userId)
    }

    static getProject(id: string): AnalysisRecord | undefined {
        return this.readDB().records.find(r => r.id === id)
    }

    static getPublicProjects(): AnalysisRecord[] {
        return this.readDB().records.filter(r => r.isPublic && r.status === "completed")
    }

    static togglePublicStatus(id: string, isPublic: boolean) {
        const db = this.readDB()
        const record = db.records.find(r => r.id === id)
        if (record) {
            record.isPublic = isPublic
            this.writeDB(db)
        }
    }

    static updateMilestones(id: string, milestones: Milestone[]) {
        const db = this.readDB()
        const record = db.records.find(r => r.id === id)
        if (record) {
            record.milestones = milestones
            this.writeDB(db)
        }
    }

    static getClientHistory(clientName: string): AnalysisRecord[] {
        if (!clientName) return []
        const records = this.readDB().records
        // For client history, we might want to see global data or just user's data? 
        // For privacy, maybe just global stats but anonymized? 
        // For now, let's keep it global to help everyone, or restrict to user. 
        // Let's restrict to completed projects globally for "Intelligence" sharing.
        return records.filter(r =>
            r.clientName && r.clientName.toLowerCase().includes(clientName.toLowerCase()) && r.status === "completed"
        )
    }

    // Helper to guess client name from inputs if not explicitly separated
    // In a real app, Client Name would be a specific input field.
    private static extractClientName(data: UserInputData): string | undefined {
        return data.clientName || undefined
    }
}
