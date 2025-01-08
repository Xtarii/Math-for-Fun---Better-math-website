import { GoogleGenerativeAI } from "@google/generative-ai";
import { InputFormat, OutputFormat, schema } from "./types/types";
import { Flags } from "./flags/flags";



const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_TOKEN || "");
/**
 * Model Instance
 */
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",
    generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema
    },
});





/**
 * Generates Feedback prompt
 *
 * @param prompt Prompt
 * @returns Result
 */
export async function generateFeedback(prompt: InputFormat) : Promise<OutputFormat> {
    // Adds format flags from question
    const flags = [...Flags];
    if(prompt.system.flags) for(const flag of prompt.system.flags) flags.push(flag);
    prompt.system.flags = flags; // Overrides flags

    // Sends Prompt to Gemini API and returns the text
    const result = await model.generateContent(JSON.stringify(prompt));
    return JSON.parse(result.response.text());
}
