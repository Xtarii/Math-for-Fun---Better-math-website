/**
 * Account Type
 *
 * This is not the Supabase User type.
 * This type is for profile data that
 * is stored in the profile database.
 */
export type AccountType = {
    /**
     * User ID, this will match the Auth.ID
     * for the user.
     */
    id: string

    /**
     * User Email Address
     */
    email: string

    /**
     * Username
     */
    username: string
}



/**
 * Chapter Type
 */
export type ChapterType = {
    /**
     * Chapter ID
     */
    id: string

    /**
     * Chapter Name
     */
    name: string
}



/**
 * Base data type for Questions
 *
 * This is only the necessary data
 * to identify a question.
 */
export type QuestionIdentifierType = {
    /**
     * Question ID
     */
    id: string
    /**
     * Question Number
     */
    number: number
    /**
     * Question Difficulty level
     */
    difficulty: number
    /**
     * Question Chapter
     *
     * The chapter that this question
     * belongs to.
     */
    chapter: string
}



/**
 * Question Type
 */
export type QuestionType = {
    /**
     * Question Identifier
     */
    identifier: QuestionIdentifierType


    /**
     * Question
     */
    question: string
    /**
     * Answer
     */
    answer: string
    /**
     * Question Image
     */
    image?: string

    /**
     * Question Flags
     */
    flags: string[]
}
