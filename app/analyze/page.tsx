
import { AnalysisWizard } from "./components/AnalysisWizard";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function AnalyzePage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-30" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl opacity-30" />
            </div>

            <div className="container relative z-10 max-w-4xl px-4 py-8 md:py-12">
                {/* Navigation */}
                <div className="mb-8">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-muted/50"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back to Dashboard
                    </Link>
                </div>

                {/* Header */}
                <div className="mb-10 text-center space-y-3">
                    <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                        New Project Analysis
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Provide project details to identify potential risks and get AI-powered recommendations.
                    </p>
                </div>

                {/* Wizard Container */}
                <AnalysisWizard />
            </div>
        </div>
    );
}
