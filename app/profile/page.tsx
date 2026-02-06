
import { requireAuth } from "@/lib/auth"
import { Storage } from "@/lib/storage"
import { logout } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { CreditCard, History, User, Settings, LogOut, Home, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default async function ProfilePage() {
    const session = await requireAuth()
    const user = Storage.getUserById(session.userId)
    const records = Storage.getHistory(session.userId)

    if (!user) return <div>User not found</div>

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Navigation Header */}
            <div className="border-b bg-muted/20">
                <div className="container flex h-16 items-center px-4">
                    <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                        <Home className="h-4 w-4" />
                        Back to Home
                    </Link>
                </div>
            </div>

            <main className="container py-10 px-4 md:px-6">
                <div className="flex flex-col md:flex-row gap-8 items-start">

                    {/* Sidebar / User Card */}
                    <div className="w-full md:w-1/3 lg:w-1/4 space-y-6">
                        <Card className="overflow-hidden border-border/50 shadow-lg">
                            <div className="h-24 bg-gradient-to-r from-primary/20 to-purple-500/20"></div>
                            <div className="px-6 relative">
                                <Avatar className="h-20 w-20 border-4 border-background absolute -top-10 shadow-md">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="px-6 pt-12 pb-6">
                                <h2 className="text-2xl font-bold tracking-tight">{user.name}</h2>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                <div className="mt-4 flex items-center gap-2">
                                    <Badge variant="secondary" className="font-mono text-xs">
                                        ID: {user.id.slice(0, 8)}...
                                    </Badge>
                                </div>
                            </div>
                            <CardFooter className="bg-muted/30 border-t p-4 flex flex-col gap-2">
                                <Link href="/dashboard" className="w-full">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Zap className="mr-2 h-4 w-4" /> Dashboard
                                    </Button>
                                </Link>
                                <form action={logout} className="w-full">
                                    <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
                                        <LogOut className="mr-2 h-4 w-4" /> Sign Out
                                    </Button>
                                </form>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 space-y-6">

                        {/* Credits Widget */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card className="bg-gradient-to-br from-primary/10 via-background to-background border-primary/20">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">Available Credits</CardTitle>
                                    <CreditCard className="h-4 w-4 text-primary" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-bold text-primary mb-1">{user.credits}</div>
                                    <p className="text-xs text-muted-foreground mb-4">
                                        Analysis credits remaining for use.
                                    </p>
                                    <Link href="/pricing">
                                        <Button size="sm" className="w-full">Top Up Credits</Button>
                                    </Link>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Analyses</CardTitle>
                                    <History className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-bold text-foreground mb-1">{records.length}</div>
                                    <p className="text-xs text-muted-foreground">
                                        Projects analyzed since account creation.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Activity / History */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>Your latest project risk assessments.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {records.length === 0 ? (
                                    <div className="text-center py-8 text-muted-foreground text-sm">
                                        No activity yet. Start your first analysis!
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {records.slice(0, 5).map((record) => (
                                            <div key={record.id} className="flex items-center justify-between p-4 rounded-lg border bg-muted/10 hover:bg-muted/20 transition-colors">
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium leading-none">{record.projectTitle || "Untitled Project"}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {new Date(record.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <Badge variant={record.riskLevel === "High" ? "destructive" : "outline"}>
                                                        {record.riskLevel || record.status}
                                                    </Badge>
                                                    <Link href={`/project/${record.id}`} className="text-sm text-primary hover:underline">
                                                        View
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="border-t bg-muted/10 p-4">
                                <Link href="/dashboard" className="text-xs font-medium text-muted-foreground hover:text-foreground">
                                    View full history on Dashboard &rarr;
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
