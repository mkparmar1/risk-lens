"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, FileText, Shield } from "lucide-react"
import { useState } from "react"


interface Clause {
    title: string
    clause: string
    explanation: string
}

interface ContractClausesProps {
    clauses?: Clause[]
}

export function ContractClauses({ clauses }: ContractClausesProps) {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

    if (!clauses || clauses.length === 0) return null

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text)
        setCopiedIndex(index)
        setTimeout(() => setCopiedIndex(null), 2000)
    }

    return (
        <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <CardTitle className="text-xl">Recommended Contract Clauses</CardTitle>
                </div>
                <CardDescription>
                    Based on the risks identified, we suggest adding these clauses to your contract to protect yourself.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {clauses.map((item, index) => (
                    <div key={index} className="bg-card border border-border/50 rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-foreground flex items-center gap-2">
                                {index + 1}. {item.title}
                            </h4>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-xs text-muted-foreground hover:text-foreground"
                                onClick={() => handleCopy(item.clause, index)}
                            >
                                {copiedIndex === index ? (
                                    <span className="text-green-500 font-medium">Copied!</span>
                                ) : (
                                    <>
                                        <Copy className="h-3 w-3 mr-1" /> Copy Clause
                                    </>
                                )}
                            </Button>
                        </div>

                        <div className="bg-muted/50 p-3 rounded-md border border-border/50 text-sm font-mono text-muted-foreground mb-3 relative group">
                            {item.clause}
                        </div>

                        <p className="text-sm text-foreground/80 italic border-l-2 border-primary/30 pl-3">
                            <span className="font-medium not-italic text-xs uppercase tracking-wide text-primary/70 block mb-1">Why this helps:</span>
                            {item.explanation}
                        </p>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
