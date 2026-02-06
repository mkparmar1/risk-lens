
import { Storage } from "@/lib/storage"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CommunityPage() {
    // In a real app, you would fetch User avatars/names too.
    const publicProjects = Storage.getPublicProjects()

    return (
        <div className="min-h-screen bg-background p-8 pt-12">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight">Community Feed</h1>
                        <p className="text-muted-foreground mt-2 text-lg">
                            Explore public risk analyses shared by the RiskLens community.
                        </p>
                    </div>
                    <Link href="/dashboard">
                        <Button variant="outline">My Dashboard</Button>
                    </Link>
                </div>

                {publicProjects.length === 0 ? (
                    <div className="text-center py-20 bg-muted/30 rounded-xl border border-dashed">
                        <h3 className="text-xl font-semibold mb-2">No public projects yet</h3>
                        <p className="text-muted-foreground">Be the first to share your analysis!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {publicProjects.map((project) => (
                            <Link href={`/project/${project.id}`} key={project.id} className="group">
                                <Card className="h-full transition-all group-hover:border-primary/50 group-hover:shadow-lg">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="truncate pr-4">{project.projectTitle}</CardTitle>
                                            <Badge variant={
                                                project.riskLevel === "High" ? "destructive" :
                                                    project.riskLevel === "Medium" ? "default" : // Default is usually primary/dark, maybe orange needed
                                                        "secondary" // Green ish?
                                            } className={
                                                project.riskLevel === "Medium" ? "bg-orange-500 hover:bg-orange-600" :
                                                    project.riskLevel === "Low" ? "bg-green-600 hover:bg-green-700" : ""
                                            }>
                                                {project.riskLevel} Risk
                                            </Badge>
                                        </div>
                                        <CardDescription>{new Date(project.createdAt).toLocaleDateString()}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold mb-1">{project.riskScore}</div>
                                        <div className="text-xs text-muted-foreground uppercase tracking-wide">Risk Score</div>

                                        {project.result && (
                                            <p className="mt-4 text-sm text-foreground/80 line-clamp-3">
                                                {project.result.summary}
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
