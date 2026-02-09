
// @ts-ignore
const pdf = require("pdf-parse");
import * as mammoth from "mammoth";

export async function parseFileContent(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        try {
            const data = await pdf(buffer);
            return data.text;
        } catch (error) {
            console.error("Error parsing PDF:", error);
            return `[Error reading PDF file: ${file.name}]`;
        }
    } else if (
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.name.endsWith(".docx")
    ) {
        try {
            const result = await mammoth.extractRawText({ buffer });
            return result.value;
        } catch (error) {
            console.error("Error parsing DOCX:", error);
            return `[Error reading DOCX file: ${file.name}]`;
        }
    } else if (file.type.startsWith("text/") || file.name.endsWith(".txt")) {
        return buffer.toString("utf-8");
    }

    return `[Unsupported file type: ${file.name}]`;
}
