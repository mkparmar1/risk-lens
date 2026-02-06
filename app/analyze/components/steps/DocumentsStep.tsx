
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X, File as FileIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DocumentsStepProps {
    files: File[]
    onUpdate: (files: File[]) => void
}

export function DocumentsStep({ files, onUpdate }: DocumentsStepProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onUpdate([...files, ...acceptedFiles])
    }, [files, onUpdate])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const removeFile = (index: number) => {
        const newFiles = [...files]
        newFiles.splice(index, 1)
        onUpdate(newFiles)
    }

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Project Documents</h2>
                <p className="text-sm text-muted-foreground">Upload any relevant files (briefs, specs, contracts).</p>
            </div>

            <div
                {...getRootProps()}
                className={`
          flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 text-center transition-colors
          ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"}
        `}
            >
                <input {...getInputProps()} />
                <div className="rounded-full bg-muted p-4">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="mt-4 text-sm font-medium">
                    {isDragActive ? "Drop the files here" : "Drag & drop files here, or click to select"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">PDF, DOCX, TXT, Images (Max 10MB)</p>
            </div>

            {files.length > 0 && (
                <div className="space-y-3">
                    <h3 className="text-sm font-medium">Attached Files ({files.length})</h3>
                    <div className="grid gap-2">
                        {files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between rounded-md border bg-card p-3 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <FileIcon className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium truncate max-w-[200px]">{file.name}</span>
                                    <span className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(0)} KB</span>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => removeFile(index)} className="h-6 w-6">
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
