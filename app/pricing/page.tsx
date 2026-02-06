
import { purchaseCredits } from "@/app/actions/billing"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
    return (
        <div className="container py-10 relative">
            <Link href="/dashboard" className="absolute top-10 left-4 md:left-10 text-sm text-muted-foreground hover:text-foreground">
                ← Back to Dashboard
            </Link>
            <div className="text-center mb-10 mt-8">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Simple, credit-based pricing</h1>
                <p className="text-muted-foreground mt-4 text-lg">
                    Pay only for the analyses you need. No monthly subscriptions.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Basic Tier */}
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-2xl">Single Project</CardTitle>
                        <CardDescription>Perfect for a one-off analysis.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <div className="text-4xl font-bold mb-4">$5</div>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> 1 Project Credit</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Full Risk Report</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Export to PDF</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <form action={purchaseCredits.bind(null, "basic")} className="w-full">
                            <Button className="w-full" variant="outline">Buy Now</Button>
                        </form>
                    </CardFooter>
                </Card>

                {/* Pro Tier */}
                <Card className="flex flex-col border-primary relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                        MOST POPULAR
                    </div>
                    <CardHeader>
                        <CardTitle className="text-2xl">Pro Pack</CardTitle>
                        <CardDescription>For freelancers and consultants.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <div className="text-4xl font-bold mb-4">$19</div>
                        <div className="text-sm text-green-500 font-semibold mb-2">Save 20%</div>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> 5 Project Credits</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Full Risk Report</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Priority Support</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <form action={purchaseCredits.bind(null, "pro")} className="w-full">
                            <Button className="w-full">Buy Now</Button>
                        </form>
                    </CardFooter>
                </Card>

                {/* Agency Tier */}
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-2xl">Agency Pack</CardTitle>
                        <CardDescription>For agencies managing multiple clients.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <div className="text-4xl font-bold mb-4">$99</div>
                        <div className="text-sm text-green-500 font-semibold mb-2">Best Value</div>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> 25 Project Credits</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Full Risk Report</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Data Export API</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <form action={purchaseCredits.bind(null, "agency")} className="w-full">
                            <Button className="w-full" variant="outline">Buy Now</Button>
                        </form>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
