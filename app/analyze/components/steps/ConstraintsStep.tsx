
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { UserInputData } from "@/types/analysis"
// import { Select... } removed
// Actually, standard select or text input is fine.

interface ConstraintsStepProps {
    data: UserInputData
    onUpdate: (data: Partial<UserInputData>) => void
}

export function ConstraintsStep({ data, onUpdate }: ConstraintsStepProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Budget & Timeline</h2>
                <p className="text-sm text-muted-foreground">Define the constraints of the project.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="budget">Budget Amount</Label>
                    <div className="relative">
                        <span className="absolute left-3 top-2.5 text-sm text-muted-foreground">$</span>
                        <Input
                            id="budget"
                            className="pl-7"
                            placeholder="5000"
                            type="number"
                            value={data.budget}
                            onChange={(e) => onUpdate({ budget: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <select
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        value={data.currency}
                        onChange={(e) => onUpdate({ currency: e.target.value })}
                    >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="INR">INR (₹)</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="timeline">Timeline / Deadline</Label>
                <Input
                    id="timeline"
                    placeholder="e.g. 2 months, or specific date"
                    value={data.timeline}
                    onChange={(e) => onUpdate({ timeline: e.target.value })}
                />
            </div>
        </div>
    )
}
