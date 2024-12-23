import { createClient } from "@supabase/supabase-js";
import { ChapterType, QuestionType } from "./types/types";

// Supabase Data
const url = process.env.NEXT_PUBLIC_API_URL || "";
const key = process.env.NEXT_PUBLIC_API_KEY || "";


/**
 * Supabase Client Instance
 */
export const client = createClient(url, key);



/**
 * Tables names
 *
 * A List of all the tables names
 */
export const tables = {
    /**
     * Questions table
     */
    questions: "Questions",

    /**
     * Chapters table
     */
    chapters: "Chapters",
}

/**
 * Bucket names
 *
 * A list of all the buckets names
 */
export const buckets = {
    /**
     * Bucket for questions
     *
     * Stores question images
     */
    questions: "questions",
}





/**
 * Reads Chapters from Supabase database
 *
 * Gets chapters from table and converts the
 * data to Chapter Data List.
 *
 * @returns Chapters
 */
export async function getChapters() : Promise<ChapterType[]> {
    const { data: chapters, error } = await client.from("Chapters").select("*");
    if(error) console.error(error); // DEBUG Error

    // Converts Data to Chapter Data
    const data: ChapterType[] = chapters || [];
    return data;
}



/**
 * Gets Chapter Content
 *
 * Reads Chapter Content and converts it
 * to chapter data.
 *
 * @param chapter Chapter Name
 * @returns Chapter Content
 */
export async function getChapterContent(chapter: string) : Promise<{ id: string, number: number, difficulty: number }[]> {
    const { data, error } = await client.from(chapter).select("id,number,difficulty");
    if(error) console.error(error); // DEBUG Error

    // Converts Data
    const converted: { id: string, number: number, difficulty: number }[] = data || [];
    return converted;
}



/**
 * Gets Question Data
 *
 * @param chapter Chapter name
 * @param id Question ID
 * @returns Question Data
 */
export async function getQuestion(chapter: string, id: string) : Promise<QuestionType | null> {
    const data = await client.from(chapter).select("*");
    if(data.error) console.error(data.error);

    // Sorts Data
    const list: QuestionType[] = data.data || [];
    for(const item of list) if(item.identifier.id === id) return item;
    return null;
}
