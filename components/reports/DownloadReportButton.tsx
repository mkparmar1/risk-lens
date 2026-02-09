"use client"

import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Printer, Loader2 } from "lucide-react"
import { RiskAnalysisResult } from "@/prompts/risk-analysis"
import { RiskReportPDF } from "./RiskReportPDF"

// Dynamically import PDFDownloadLink to avoid SSR issues with @react-pdf/renderer
const PDFDownloadLink = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
        ssr: false,
        loading: () => (
            <Button disabled variant="outline">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading PDF...
            </Button>
        ),
    }
)

export function DownloadReportButton({ result, projectTitle, clientName }: { result: RiskAnalysisResult, projectTitle?: string, clientName?: string }) {
    return (
        <PDFDownloadLink
            document={<RiskReportPDF result={result} projectTitle={projectTitle || "Project"} clientName={clientName} />}
            fileName={`RiskAnalysis_${(projectTitle || "Report").replace(/[^a-z0-9]/gi, '_')}.pdf`}
        >
            {({ blob, url, loading, error }) => (
                <Button disabled={loading} variant="outline" size="lg">
                    {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Printer className="mr-2 h-4 w-4" />
                    )}
                    {loading ? "Generating Report..." : "Download Report"}
                </Button>
            )}
        </PDFDownloadLink>
    )
}
