import { client, tables } from "../supabase";
import { ChapterType, QuestionIdentifierType, QuestionType } from "../types/types";



/**
 * Gets all the questions
 *
 * @returns A list of all the questions
 */
export async function getQuestions() : Promise<QuestionIdentifierType[]> {
    const { data, error } = await client.from(tables.questions).select("id,number,difficulty,chapter");
    if(error) console.error(error); // DEBUG Error

    // Converts Data
    const converted: QuestionIdentifierType[] = data || [];
    return converted;
}

/**
 * Gets Questions of chapter
 *
 * All the questions in the provided
 * chapter will be returned.
 *
 * @param chapter Chapter
 * @returns Questions in the chapter
 */
export async function getQuestionsOfChapter(chapter: string) : Promise<QuestionIdentifierType[]> {
    const { data, error } = await client.from(tables.questions).select("id,number,difficulty,chapter")
    .eq("chapter", chapter);
    if(error) console.error(error); // DEBUG Error

    const converted: QuestionIdentifierType[] = data || [];
    return converted;
}



/**
 * Gets Question with ID
 *
 * @param id Question ID
 * @returns Question
 */
export async function getQuestionByID(id: string) : Promise<QuestionType | null> {
    const { data, error } = await client.from(tables.questions).select("*")
    .eq("id", id);
    if(error) console.error(error); // DEBUG Error
    const parse = data ? data[0] : null;
    if(!parse) return null;


    // Manually converts data
    const converted: QuestionType = {
        identifier: {
            id: parse.id,
            chapter: parse.chapter,
            difficulty: parse.difficulty,
            number: parse.number
        },

        question: parse.question,
        answer: parse.answer,

        image: parse.image,
        flags: parse.flags
    }
    return converted;
}





/**
 * Updates question object in table
 *
 * @param question Question
 */
export async function updateQuestion(question: QuestionType) {
    const { data, error } = await client.from(tables.questions).update({
        question: question.question,
        answer: question.answer,
        image: question.image,
        flags: question.flags,

        difficulty: question.identifier.difficulty,
        number: question.identifier.number,
        chapter: question.identifier.chapter
    }).eq("id", question.identifier.id);
    if(error) console.error(error); // DEBUG Error
}


export async function insertQuestion(number: number, difficulty: number, chapter: string, question: string, answer: string, flags: string[], image?: string) {
    const { data, error } = await client.from(tables.questions).insert([
        {question, answer, image, flags, difficulty, number, chapter}
    ]).select();
    if(error) console.error(error); // DEBUG Error

    console.log(data);
}





/**
 * Gets a list of all the chapters
 *
 * @returns Chapters List
 */
export async function getChapters() : Promise<ChapterType[]> {
    const { data, error } = await client.from(tables.chapters).select("*");
    if(error) console.error(error); // DEBUG Error

    const converted: ChapterType[] = data || [];
    return converted;
}



/**
 * Inserts new Chapter into the chapters table
 *
 * @param name Chapter Name
 * @returns Returns the new chapter
 */
export async function insertChapter(name: string) : Promise<ChapterType | null> {
    const { data, error } = await client.from(tables.chapters).insert([{ name }]).select();
    if(error) console.error(error);

    // Converts data
    const converted: ChapterType | null = data ? data[0] : null;
    return converted;
}
