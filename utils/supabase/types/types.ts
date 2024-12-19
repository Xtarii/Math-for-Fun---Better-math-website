// /**
//  * Question Type
//  */
// export type QuestionType = {
//     /**
//      * Question ID
//      */
//     id: string
//     /**
//      * Question Number
//      */
//     number: number


//     /**
//      * Question
//      */
//     question: string
//     /**
//      * Answer
//      */
//     answer: string
//     /**
//      * Question Image
//      */
//     image?: string


//     /**
//      * Question Difficulty Level
//      */
//     difficulty: number

//     /**
//      * Question Flags
//      */
//     flags: string[]
// }

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
