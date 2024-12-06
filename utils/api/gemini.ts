import { GoogleGenerativeAI } from "@google/generative-ai";
import { InputFormat, OutputFormat, schema } from "./types/types";



const genAI = new GoogleGenerativeAI(process.env.TOKEN || "");
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
export async function GenerateFeedback(prompt: InputFormat) : Promise<OutputFormat> {
    const result = await model.generateContent(JSON.stringify(prompt));
    return JSON.parse(result.response.text());
}
