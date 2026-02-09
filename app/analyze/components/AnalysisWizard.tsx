"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronRight, AlertTriangle, Loader2 } from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { BasicInfoStep } from "./steps/BasicInfoStep"
import { UserInputData } from "@/types/analysis"
import { DocumentsStep } from "./steps/DocumentsStep"
import { ConstraintsStep } from "./steps/ConstraintsStep"
import { CommunicationStep } from "./steps/CommunicationStep"
import { analyzeProject } from "@/app/actions/analyze"
import { RiskAnalysisResult } from "@/prompts/risk-analysis"
import { AnalysisResult } from "./AnalysisResult"

const steps = [
    { id: 1, name: "Basic Info" },
    { id: 2, name: "Documents" },
    { id: 3, name: "Budget & Time" },
    { id: 4, name: "Communication" },
]

export function AnalysisWizard({ initialData, projectId }: { initialData?: UserInputData, projectId?: string }) {
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState<UserInputData>(initialData || {
        title: "",
        clientName: "",
        description: "",
        files: [],
        budget: "",
        currency: "USD",
        timeline: "",
        communication: "",
    })

    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [result, setResult] = useState<RiskAnalysisResult | null>(null)
    const [error, setError] = useState<string | null>(null)

    const isStepValid = () => {
        switch (currentStep) {
            case 1:
                return formData.title.length > 3 && formData.description.length > 10;
            case 2:
                return true;
            case 3:
                return formData.budget.length > 0 && formData.timeline.length > 0;
            case 4:
                return true;
            default:
                return true;
        }
    }

    const handleNext = () => {
        if (currentStep < steps.length && isStepValid()) {
            setCurrentStep(prev => prev + 1)
        } else if (currentStep === steps.length) {
            startAnalysis()
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1)
        }
    }

    const startAnalysis = async () => {
        setIsAnalyzing(true)
        setError(null)

        try {
            const response = await analyzeProject(formData, projectId)
            if (response.success && response.data) {
                setResult(response.data)
            } else {
                setError(response.error || "Analysis failed")
            }
        } catch (err) {
            setError("An unexpected error occurred.")
        } finally {
            setIsAnalyzing(false)
        }
    }

    const updateFormData = (data: Partial<UserInputData>) => {
        setFormData(prev => ({ ...prev, ...data }))
    }

    // Result View
    if (result) {
        return (
            <AnalysisResult
                result={result}
                onReset={() => {
                    setResult(null)
                    setCurrentStep(1)
                    setFormData({
                        title: "",
                        clientName: "",
                        description: "",
                        files: [],
                        budget: "",
                        currency: "USD",
                        timeline: "",
                        communication: "",
                    })
                }}
                projectTitle={formData.title}
                clientName={formData.clientName}
            />
        )
    }

    return (
        <div className="space-y-8 w-full">
            {/* Stepper Header */}
            <div className="relative flex w-full justify-between items-center mb-12">
                <div className="absolute top-1/2 left-0 -z-10 h-0.5 w-full -translate-y-1/2 bg-muted rounded-full" />
                {steps.map((step) => {
                    const isCompleted = currentStep > step.id
                    const isCurrent = currentStep === step.id

                    return (
                        <div key={step.id} className="flex flex-col items-center bg-background px-4">
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: isCurrent ? 1.1 : 1,
                                    borderColor: isCompleted || isCurrent ? "var(--primary)" : "var(--muted)",
                                    backgroundColor: isCompleted || isCurrent ? "var(--background)" : "var(--background)"
                                }}
                                className={cn(
                                    "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors z-10",
                                    isCompleted ? "border-primary text-primary" :
                                        isCurrent ? "border-primary text-primary shadow-lg shadow-primary/20" :
                                            "border-muted text-muted-foreground"
                                )}
                            >
                                {isCompleted ? <Check className="h-5 w-5" /> : step.id}
                            </motion.div>
                            <span className={cn(
                                "mt-3 text-xs font-medium tracking-wide transition-colors",
                                isCurrent ? "text-primary" : "text-muted-foreground"
                            )}>
                                {step.name}
                            </span>
                        </div>
                    )
                })}
            </div>

            {/* Step Content */}
            <Card className="min-h-[450px] p-8 border-border/50 shadow-xl bg-card/50 backdrop-blur-sm relative overflow-hidden">
                {isAnalyzing && (
                    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm transition-opacity">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full blur-xl bg-primary/20 animate-pulse" />
                            <Loader2 className="h-12 w-12 animate-spin text-primary relative z-10" />
                        </div>
                        <h3 className="text-xl font-bold mt-6 mb-2">Analyzing Project Risks...</h3>
                        <p className="text-muted-foreground text-sm max-w-xs text-center">
                            Our AI is reviewing your project details against thousands of risk patterns.
                        </p>
                    </div>
                )}

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive flex items-center gap-3"
                    >
                        <AlertTriangle className="h-5 w-5" />
                        {error}
                    </motion.div>
                )}

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="h-full"
                    >
                        {currentStep === 1 && (
                            <BasicInfoStep data={formData} onUpdate={updateFormData} />
                        )}
                        {currentStep === 2 && (
                            <DocumentsStep files={formData.files} onUpdate={(files) => updateFormData({ files })} />
                        )}
                        {currentStep === 3 && (
                            <ConstraintsStep data={formData} onUpdate={updateFormData} />
                        )}
                        {currentStep === 4 && (
                            <CommunicationStep value={formData.communication} onUpdate={(val) => updateFormData({ communication: val })} />
                        )}
                    </motion.div>
                </AnimatePresence>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4">
                <Button
                    variant="ghost"
                    onClick={handleBack}
                    disabled={currentStep === 1 || isAnalyzing}
                    className="hover:bg-muted/50"
                >
                    Back
                </Button>
                <Button
                    onClick={handleNext}
                    disabled={!isStepValid() || isAnalyzing}
                    className="px-8 shadow-lg shadow-primary/20 transition-all hover:scale-105"
                >
                    {currentStep === steps.length ? "Analyze Project" : "Next Step"}
                    {currentStep !== steps.length && <ChevronRight className="ml-2 h-4 w-4" />}
                </Button>
            </div>
        </div>
    )
}
