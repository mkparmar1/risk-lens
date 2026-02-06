
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, User as UserIcon, LogOut, Coins, Globe, Search, ArrowUpRight, ShieldAlert, Activity, LayoutDashboard, FileText } from "lucide-react"
import { Storage } from "@/lib/storage"
import { requireAuth } from "@/lib/auth"
import { logout } from "@/app/actions/auth"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default async function DashboardPage() {
    const session = await requireAuth()
    const user = Storage.getUserById(session.userId)
    const records = Storage.getHistory(session.userId)

    const totalProjects = records.length
    const highRiskProjects = records.filter(r => r.riskLevel === "High").length
    const avgScore = totalProjects > 0 ? (records.reduce((acc, r) => acc + (r.riskScore || 0), 0) / (records.filter(r => r.riskScore).length || 1)).toFixed(0) : 0

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            {/* Navigation is handled by layout or included here if specific to dashboard. 
               The user asked for navigation earlier, let's keep a consistent top bar 
               but make it look premium. */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
                <div className="w-full px-4 md:px-8 flex h-16 items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                <Activity className="h-5 w-5 text-primary" />
                            </div>
                            <span className="font-bold text-lg hidden sm:inline-block">RiskLens</span>
                        </Link>
                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                            <Link href="/dashboard" className="text-primary transition-colors">Dashboard</Link>
                            <Link href="/community" className="text-muted-foreground hover:text-foreground transition-colors">Community</Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-muted rounded-full border border-border/50">
                            <Coins className="h-3.5 w-3.5 text-yellow-500" />
                            <span className="text-xs font-medium">{user?.credits || 0} Credits</span>
                            <Link href="/pricing">
                                <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-[10px] cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                                    + Add
                                </Badge>
                            </Link>
                        </div>

                        <Link href="/analyze">
                            <Button size="sm" className="hidden sm:flex shadow-sm shadow-primary/20">
                                <Plus className="mr-2 h-4 w-4" /> New Analysis
                            </Button>
                            <Button size="icon" className="sm:hidden h-8 w-8">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </Link>

                        <div className="ml-2 flex items-center gap-2 border-l pl-4 border-border/50">
                            <Link href="/profile">
                                <Avatar className="h-8 w-8 border border-border transition-all hover:ring-2 hover:ring-primary/20 ring-offset-background">
                                    <AvatarImage src={user?.avatar} />
                                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 w-full py-8 px-4 md:px-8">
                <div className="flex flex-col gap-8">

                    {/* Welcome Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                            <p className="text-muted-foreground mt-1">
                                Welcome back, {user?.name}. Here's an overview of your projects.
                            </p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card className="bg-card hover:bg-accent/5 transition-colors border-border/50 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
                                <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{totalProjects}</div>
                                <p className="text-xs text-muted-foreground mt-1">Lifetime analyses ran</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-card hover:bg-accent/5 transition-colors border-border/50 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Risk Score</CardTitle>
                                <Activity className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{avgScore}<span className="text-sm text-muted-foreground font-normal">/100</span></div>
                                <p className="text-xs text-muted-foreground mt-1">Average complexity score</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-card hover:bg-accent/5 transition-colors border-border/50 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">High Risk</CardTitle>
                                <ShieldAlert className="h-4 w-4 text-destructive" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-destructive">{highRiskProjects}</div>
                                <p className="text-xs text-muted-foreground mt-1">Projects needing attention</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Project History */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold tracking-tight">Recent Analyses</h2>
                            <div className="relative w-full max-w-sm hidden md:block">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="search"
                                    placeholder="Search projects..."
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-9"
                                />
                            </div>
                        </div>

                        <Card className="border-border/50 shadow-sm overflow-hidden">
                            <CardContent className="p-0">
                                {records.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-16 text-center">
                                        <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                                            <FileText className="h-6 w-6 text-muted-foreground" />
                                        </div>
                                        <h3 className="text-lg font-medium">No analyses yet</h3>
                                        <p className="text-muted-foreground max-w-sm mt-2 mb-6">
                                            Start your first project analysis to see insights and risk scores here.
                                        </p>
                                        <Link href="/analyze">
                                            <Button>Start Analysis</Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <Table>
                                        <TableHeader className="bg-muted/30">
                                            <TableRow className="hover:bg-transparent">
                                                <TableHead>Project Name</TableHead>
                                                <TableHead className="hidden md:table-cell">Client</TableHead>
                                                <TableHead className="hidden md:table-cell">Date</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Risk Score</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {records.map((record) => (
                                                <TableRow key={record.id} className="group cursor-pointer hover:bg-muted/30">
                                                    <TableCell className="font-medium">
                                                        <div className="flex flex-col">
                                                            <Link href={`/project/${record.id}`} className="hover:underline decoration-primary underline-offset-4">
                                                                {record.projectTitle || "Untitled Project"}
                                                            </Link>
                                                            <div className="flex items-center gap-2 mt-1 md:hidden">
                                                                <span className="text-xs text-muted-foreground">{new Date(record.createdAt).toLocaleDateString()}</span>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell text-muted-foreground">{record.clientName || "—"}</TableCell>
                                                    <TableCell className="hidden md:table-cell text-muted-foreground">{new Date(record.createdAt).toLocaleDateString()}</TableCell>
                                                    <TableCell>
                                                        <div className="flex gap-2">
                                                            {record.status === "completed" ? (
                                                                <Badge variant="outline" className={
                                                                    record.riskLevel === "High" ? "border-destructive/50 text-destructive bg-destructive/5" :
                                                                        record.riskLevel === "Medium" ? "border-orange-500/50 text-orange-500 bg-orange-500/5" :
                                                                            "border-green-500/50 text-green-500 bg-green-500/5"
                                                                }>
                                                                    {record.riskLevel} Risk
                                                                </Badge>
                                                            ) : (
                                                                <Badge variant="secondary">
                                                                    {record.status === "failed" ? "Failed" : "Draft"}
                                                                </Badge>
                                                            )}
                                                            {record.isPublic && (
                                                                <Badge variant="outline" className="border-blue-500/30 text-blue-500 bg-blue-500/5">
                                                                    <Globe className="mr-1 h-3 w-3" /> Public
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {record.riskScore ? (
                                                            <div className="flex items-center gap-2">
                                                                <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                                                                    <div
                                                                        className={`h-full rounded-full ${record.riskScore >= 75 ? "bg-destructive" :
                                                                            record.riskScore >= 40 ? "bg-orange-500" : "bg-green-500"
                                                                            }`}
                                                                        style={{ width: `${record.riskScore}%` }}
                                                                    />
                                                                </div>
                                                                <span className="text-xs font-medium">{record.riskScore}</span>
                                                            </div>
                                                        ) : (
                                                            <span className="text-muted-foreground text-xs">—</span>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Link href={`/project/${record.id}`}>
                                                            {record.status === "failed" ? (
                                                                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10">
                                                                    Retry <ArrowUpRight className="ml-2 h-3 w-3" />
                                                                </Button>
                                                            ) : (
                                                                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    View <ArrowUpRight className="ml-2 h-3 w-3" />
                                                                </Button>
                                                            )}
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
