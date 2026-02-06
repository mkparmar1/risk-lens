
"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { togglePublic } from "@/app/actions/project"
import { useTransition } from "react"
import { Loader2 } from "lucide-react"

export function VisibilityToggle({ projectId, isPublic }: { projectId: string, isPublic: boolean }) {
    const [isPending, startTransition] = useTransition()

    const handleToggle = (checked: boolean) => {
        startTransition(() => {
            togglePublic(projectId, checked)
        })
    }

    return (
        <div className="flex items-center space-x-2 border rounded-full px-4 py-1.5 bg-background/50">
            {isPending && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
            <Switch id="public-mode" checked={isPublic} onCheckedChange={handleToggle} disabled={isPending} />
            <Label htmlFor="public-mode" className="text-sm font-medium cursor-pointer">
                {isPublic ? "Public" : "Private"}
            </Label>
        </div>
    )
}
