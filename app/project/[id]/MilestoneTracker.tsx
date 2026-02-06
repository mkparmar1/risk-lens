
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Check, Circle, DollarSign, Calendar } from "lucide-react"
import { Milestone } from "@/lib/storage"
import { updateMilestones } from "@/app/actions/project"
import { cn } from "@/lib/utils"

interface MilestoneTrackerProps {
    projectId: string
    initialMilestones?: Milestone[]
}

export function MilestoneTracker({ projectId, initialMilestones = [] }: MilestoneTrackerProps) {
    const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones)
    const [isSaving, setIsSaving] = useState(false)

    // New milestone form state
    const [newTitle, setNewTitle] = useState("")
    const [newAmount, setNewAmount] = useState("")
    const [newDate, setNewDate] = useState("")

    const handleAdd = () => {
        if (!newTitle || !newAmount) return

        const newItem: Milestone = {
            id: crypto.randomUUID(),
            title: newTitle,
            amount: parseFloat(newAmount),
            dueDate: newDate,
            status: "pending"
        }

        const updated = [...milestones, newItem]
        setMilestones(updated)
        // Auto-save
        save(updated)

        // Reset form
        setNewTitle("")
        setNewAmount("")
        setNewDate("")
    }

    const handleDelete = (id: string) => {
        const updated = milestones.filter(m => m.id !== id)
        setMilestones(updated)
        save(updated)
    }

    const toggleStatus = (id: string) => {
        const updated = milestones.map(m =>
            m.id === id ? { ...m, status: m.status === "pending" ? "paid" as const : "pending" as const } : m
        )
        setMilestones(updated)
        save(updated)
    }

    const save = async (data: Milestone[]) => {
        setIsSaving(true)
        try {
            await updateMilestones(projectId, data)
        } catch (error) {
            console.error("Failed to save milestones", error)
        } finally {
            setIsSaving(false)
        }
    }

    const totalAmount = milestones.reduce((sum, m) => sum + m.amount, 0)
    const paidAmount = milestones.filter(m => m.status === "paid").reduce((sum, m) => sum + m.amount, 0)
    const progress = totalAmount > 0 ? (paidAmount / totalAmount) * 100 : 0

    return (
        <Card className="border shadow-none">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-primary" />
                            Milestone Tracker
                        </CardTitle>
                        <CardDescription>Track payments and deliverables</CardDescription>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold">${paidAmount.toLocaleString()} <span className="text-sm text-muted-foreground font-normal">/ {totalAmount.toLocaleString()}</span></div>
                        <div className="text-xs text-muted-foreground">{Math.round(progress)}% Paid</div>
                    </div>
                </div>
                {/* Progress Bar */}
                <div className="h-2 w-full bg-secondary rounded-full mt-4 overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* List */}
                    {milestones.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground text-sm border-dashed border rounded-lg">
                            No milestones added yet. Add clear deliverables to ensure you get paid.
                        </div>
                    )}

                    {milestones.map((m) => (
                        <div key={m.id} className={cn(
                            "flex items-center gap-3 p-3 rounded-lg border transition-colors",
                            m.status === "paid" ? "bg-green-500/5 border-green-500/20" : "bg-card hover:bg-muted/50"
                        )}>
                            <button
                                onClick={() => toggleStatus(m.id)}
                                className={cn(
                                    "flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors",
                                    m.status === "paid"
                                        ? "bg-green-500 border-green-500 text-white"
                                        : "border-muted-foreground/30 hover:border-primary"
                                )}
                            >
                                {m.status === "paid" && <Check className="w-3.5 h-3.5" />}
                            </button>

                            <div className="flex-1 min-w-0">
                                <div className={cn("font-medium truncate", m.status === "paid" && "line-through text-muted-foreground")}>
                                    {m.title}
                                </div>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                                    {m.dueDate && (
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(m.dueDate).toLocaleDateString()}
                                        </span>
                                    )}
                                    <span className={cn(
                                        "capitalize",
                                        m.status === "paid" ? "text-green-600" : "text-yellow-600"
                                    )}>{m.status}</span>
                                </div>
                            </div>

                            <div className="font-semibold tabular-nums">
                                ${m.amount.toLocaleString()}
                            </div>

                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive/50 hover:text-destructive" onClick={() => handleDelete(m.id)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}

                    {/* Add Form */}
                    <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t mt-4">
                        <Input
                            placeholder="Deliverable (e.g. 50% Deposit)"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="flex-1"
                        />
                        <div className="flex gap-2">
                            <div className="relative w-24 sm:w-32">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                <Input
                                    type="number"
                                    placeholder="Amount"
                                    value={newAmount}
                                    onChange={(e) => setNewAmount(e.target.value)}
                                    className="pl-6"
                                />
                            </div>
                            <Input
                                type="date"
                                className="w-auto sm:w-36"
                                value={newDate}
                                onChange={(e) => setNewDate(e.target.value)}
                            />
                            <Button onClick={handleAdd} disabled={!newTitle || !newAmount}>
                                <Plus className="w-4 h-4 sm:mr-2" />
                                <span className="hidden sm:inline">Add</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
