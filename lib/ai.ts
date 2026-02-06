
import OpenAI from "openai"

const apiKey = process.env.OPENAI_API_KEY

if (!apiKey) {
    // We'll throw at runtime if called, but user must set this.
}

export const openai = new OpenAI({
    apiKey: apiKey || "dummy-key",
    dangerouslyAllowBrowser: false, // Ensure this only runs on server
})
