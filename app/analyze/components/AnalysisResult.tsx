"use client"

import { AlertTriangle, CheckCircle, HelpCircle, FileText, Printer, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RiskAnalysisResult } from "@/prompts/risk-analysis"
import { cn } from "@/lib/utils"
import { ContractClauses } from "./ContractClauses"
import { DownloadReportButton } from "@/components/reports/DownloadReportButton"

interface AnalysisResultProps {
    result: RiskAnalysisResult
    onReset: () => void
}

export function AnalysisResult({ result, onReset }: AnalysisResultProps) {

    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="space-y-6 animate-in fade-in zoom-in duration-500 max-w-5xl mx-auto print:space-y-2 print:animate-none">

            {/* Header Card */}
            <Card className={cn("border-2 print:border-none print:shadow-none",
                result.riskLevel === "High" ? "border-destructive/50 bg-destructive/5" :
                    result.riskLevel === "Medium" ? "border-orange-500/50 bg-orange-500/5" :
                        "border-green-500/50 bg-green-500/5"
            )}>
                <CardHeader className="text-center print:pb-2">
                    <div className="print:hidden mb-2 flex justify-center">
                        {result.riskLevel === "High" ? <AlertTriangle className="h-12 w-12 text-destructive" /> :
                            result.riskLevel === "Medium" ? <HelpCircle className="h-12 w-12 text-orange-500" /> :
                                <CheckCircle className="h-12 w-12 text-green-500" />
                        }
                    </div>
                    <CardTitle className="text-4xl font-bold">{result.riskScore}/100</CardTitle>
                    <CardDescription className="text-xl font-bold tracking-wide uppercase text-foreground">
                        {result.riskLevel} Risk &mdash; {result.recommendation}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-lg bg-background/50 p-6 shadow-sm border text-center max-w-3xl mx-auto print:border print:bg-white">
                        <h3 className="font-semibold mb-2 text-lg">Executive Summary</h3>
                        <p className="text-muted-foreground leading-relaxed">{result.summary}</p>
                    </div>
                </CardContent>
            </Card>

            {/* Main Analysis Grid */}
            <div className="grid gap-6 md:grid-cols-2 print:grid-cols-2">
                {/* Red Flags Module */}
                <Card className="border-destructive/20 print:border">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center text-destructive text-lg">
                            <AlertTriangle className="h-5 w-5 mr-2" />
                            Critical Red Flags
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {result.redFlags.map((flag, i) => (
                                <li key={i} className="flex items-start text-sm">
                                    <span className="mr-2 text-destructive">•</span>
                                    {flag}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* Detailed Assessment Module */}
                <Card className="print:border">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center text-primary text-lg">
                            <FileText className="h-5 w-5 mr-2" />
                            Detailed Assessment
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <div>
                            <span className="font-semibold block mb-1">Scope & Technical:</span>
                            <p className="text-muted-foreground">{result.technicalAnalysis}</p>
                        </div>
                        <div>
                            <span className="font-semibold block mb-1">Budget & Pricing:</span>
                            <p className="text-muted-foreground">{result.budgetAnalysis}</p>
                        </div>
                        <div>
                            <span className="font-semibold block mb-1">Client Signals:</span>
                            <p className="text-muted-foreground">{result.clientAnalysis}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Action Plan Grid - Module 4 Content */}
            <div className="grid gap-6 md:grid-cols-2 print:grid-cols-2 print:break-inside-avoid">
                {/* Negotiation Strategy */}
                <Card className="bg-blue-50/50 dark:bg-blue-950/10 border-blue-100 dark:border-blue-900 print:bg-white print:border">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-blue-700 dark:text-blue-400">Negotiation Strategy</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {result.negotiationPoints.map((point, i) => (
                                <li key={i} className="flex items-start text-sm">
                                    <span className="mr-2 text-blue-500 font-bold">→</span>
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* Questions to Ask */}
                <Card className="bg-purple-50/50 dark:bg-purple-950/10 border-purple-100 dark:border-purple-900 print:bg-white print:border">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-purple-700 dark:text-purple-400">Clarifying Questions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {result.questionsToAsk.map((q, i) => (
                                <li key={i} className="flex items-start text-sm">
                                    <span className="mr-2 text-purple-500 font-bold">?</span>
                                    {q}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>

            {/* Contract Clauses - NEW */}
            <div className="print:break-inside-avoid">
                <ContractClauses clauses={result.contractClauses} />
            </div>

            {/* Footer Actions - Hidden on Print */}
            <div className="flex justify-center pt-8 print:hidden">
                <div className="flex gap-4">
                    <Button onClick={onReset} variant="outline" size="lg">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Analyze New Project
                    </Button>
                    <DownloadReportButton result={result} />
                </div>
            </div>

            {/* Print Footer */}
            <div className="hidden print:block text-center text-xs text-muted-foreground mt-8 border-t pt-4">
                Generated by RiskLens - AI Freelance Risk Analyzer
            </div>
        </div>
    )
}
