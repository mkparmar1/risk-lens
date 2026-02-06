
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface CommunicationStepProps {
    value: string
    onUpdate: (value: string) => void
}

export function CommunicationStep({ value, onUpdate }: CommunicationStepProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Communication History</h2>
                <p className="text-sm text-muted-foreground">Paste recent emails, chat logs, or meeting notes. This helps detect behavioral red flags.</p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="communication">Client Messages / Interaction Logs</Label>
                <Textarea
                    id="communication"
                    placeholder="Client: 'We need this done ASAP but have no budget...'"
                    className="min-h-[200px]"
                    value={value}
                    onChange={(e) => onUpdate(e.target.value)}
                />
            </div>
        </div>
    )
}
