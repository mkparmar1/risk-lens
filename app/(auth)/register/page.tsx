
"use client"

import { useActionState } from "react"
import { register } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Loader2 } from "lucide-react"

const initialState = {
    error: "",
}

export default function RegisterPage() {
    const [state, formAction, isPending] = useActionState(register, initialState)

    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-background relative">
            <Link href="/" className="absolute top-8 left-8 text-sm text-muted-foreground hover:text-foreground">
                ← Back to Home
            </Link>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Create Account</CardTitle>
                    <CardDescription>
                        Enter your details below to create a new account.
                    </CardDescription>
                </CardHeader>
                <form action={formAction}>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" type="text" placeholder="John Doe" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required />
                        </div>
                        {state?.error && (
                            <div className="text-sm text-destructive">{state.error}</div>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button className="w-full" disabled={isPending}>
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Sign Up
                        </Button>
                        <div className="text-sm text-muted-foreground text-center">
                            Already have an account? <Link href="/login" className="text-primary hover:underline">Login</Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
