
import { notFound } from "next/navigation"
import { Storage } from "@/lib/storage"
import { AnalysisResult } from "../../analyze/components/AnalysisResult"
import { AnalysisWizard } from "../../analyze/components/AnalysisWizard"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, AlertTriangle } from "lucide-react"
import { VisibilityToggle } from "./VisibilityToggle"
import { MilestoneTracker } from "./MilestoneTracker"

export const dynamic = 'force-dynamic'

interface Props {
    params: Promise<{ id: string }>
}

export default async function ProjectPage({ params }: Props) {
    const { id } = await params
    const record = Storage.getProject(id)

    if (!record) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-background p-4 md:p-8 pt-24">
            <div className="mx-auto max-w-5xl">
                <div className="mb-6">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="sm" className="pl-0 hover:pl-2 transition-all">
                            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                        </Button>
                    </Link>
                </div>

                {record.status === "completed" && record.result ? (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">{record.projectTitle}</h1>
                                <p className="text-muted-foreground">
                                    Analysis completed on {new Date(record.updatedAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <VisibilityToggle projectId={record.id} isPublic={record.isPublic} />
                                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80">
                                    Completed
                                </span>
                            </div>
                        </div>
                        <AnalysisResult result={record.result} onReset={() => { }} />

                        <div className="mt-8">
                            <MilestoneTracker projectId={record.id} initialMilestones={record.milestones} />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">{record.projectTitle || "Untitled Project"}</h1>
                                <p className="text-muted-foreground">
                                    Status: <span className="capitalize text-foreground font-medium">{record.status}</span>
                                    {record.error && ` - ${record.error}`}
                                </p>
                            </div>
                            {record.status === "failed" && (
                                <div className="flex items-center gap-2 text-destructive bg-destructive/10 px-3 py-1 rounded-full text-sm font-medium">
                                    <AlertTriangle className="h-4 w-4" />
                                    Failed
                                </div>
                            )}
                        </div>

                        {record.status === "failed" && (
                            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
                                <h3 className="font-semibold mb-1">Analysis Failed</h3>
                                <p className="text-sm opacity-90">{record.error || "An unknown error occurred."}</p>
                                <p className="text-sm mt-2 font-medium">You can edit the details below and retry.</p>
                            </div>
                        )}

                        <div className="border rounded-xl p-6 bg-card/50 backdrop-blur-sm">
                            <h2 className="text-xl font-semibold mb-6">Retry Analysis</h2>
                            <AnalysisWizard initialData={record.data} projectId={record.id} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
