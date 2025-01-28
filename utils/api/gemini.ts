import { GoogleGenerativeAI, ResponseSchema } from "@google/generative-ai";
import { correction, InputFormat, OutputFormat, schema } from "./types/types";
import { Flags } from "./flags/flags";



const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_TOKEN || "");

/**
 * Gets Gemini Model Object
 *
 * @param schema Model Response Schema
 * @param model Model Type
 * @returns Model Object
 */
const getModel = (schema: ResponseSchema, model: string = "gemini-2.0-flash-exp") => {
    return genAI.getGenerativeModel({ model,
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema
        },
    });
}





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



    // First AI correction check on the answer
    const correct: boolean = (await getModel(correction).generateContent(JSON.stringify({
        flags: prompt.system.flags,
        answer: prompt.system.answer,
        user: prompt.user
    }))).response.text() === "true";

    // Sends Prompt to Gemini API and returns the text
    const result = await getModel(schema).generateContent(JSON.stringify({
        isCorrect: correct,
        prompt: prompt
    }));
    return JSON.parse(result.response.text());
}
