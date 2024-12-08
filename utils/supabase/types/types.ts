/**
 * Question Type
 */
export type QuestionType = {
    /**
     * Question ID
     */
    id: string


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
     * Question Difficulty Level
     */
    difficulty: number

    /**
     * Question Flags
     */
    flags: string[]
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
