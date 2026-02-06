
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { UserInputData } from "@/types/analysis"

interface BasicInfoStepProps {
    data: UserInputData
    onUpdate: (data: Partial<UserInputData>) => void
}

export function BasicInfoStep({ data, onUpdate }: BasicInfoStepProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Project Basics</h2>
                <p className="text-sm text-muted-foreground">Start by giving your project a title and a brief description.</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Project Title</Label>
                    <Input
                        id="title"
                        placeholder="e.g. E-commerce Website Redesign"
                        value={data.title}
                        onChange={(e) => onUpdate({ title: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="clientName">Client Name</Label>
                    <Input
                        id="clientName"
                        placeholder="e.g. Acme Corp (Optional but recommended)"
                        value={data.clientName || ""}
                        onChange={(e) => onUpdate({ clientName: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                        id="description"
                        placeholder="Describe the project goal, scope, and key deliverables..."
                        className="min-h-[150px]"
                        value={data.description}
                        onChange={(e) => onUpdate({ description: e.target.value })}
                    />
                </div>
            </div>
        </div>
    )
}
