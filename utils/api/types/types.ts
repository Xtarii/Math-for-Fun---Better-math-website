import { ResponseSchema, SchemaType } from "@google/generative-ai";



/**
 * User Input Correction Schema
 *
 * This is the gemini schema for
 * the correction of the users
 * input.
 */
export const correction: ResponseSchema = {
    description: "Check if {user} match {answer} and follows the {flags} if so return true.",
    type: SchemaType.BOOLEAN,
    example: "true only if {user} matches {answer}"
}



/**
 * Schema type for the output response
 */
export const schema: ResponseSchema = {
    description: "User Input Feedback",
    type: SchemaType.OBJECT,

    properties: {
        score: {
            type: SchemaType.NUMBER,
            description: "A value between 1.0 - 10.0 of how good the {prompt.user} is and how well it matches {prompt.system.answer}",
            nullable: false,
        },
        feedback: {
            type: SchemaType.STRING,
            description: "A short comment on what is correct or not in the {prompt.user}",
            example: "12.0 is correct for 12, but you forgot to use to the power of in the equation",
            nullable: false,
        },
    },
    required: ["score", "feedback"],
}



/**
 * Output Format Type
 */
export type OutputFormat = {
    /**
     * A score between 0 - 10
     * on how good the user input was.
     */
    score: number
    /**
     * A short feedback on what
     * the user can think about to
     * the next time.
     */
    feedback: string
}



/**
 * Input Format
 */
export type InputFormat = {
    /**
     * System Input
     *
     * Background data for the
     * user input
     */
    system: {
        /**
         * Question string
         */
        question: string,
        /**
         * Answer string
         */
        answer: string

        /**
         * Special Input Flags
         *
         * This is used for custom answers
         */
        flags?: string[]
    },



    /**
     * User Input string
     */
    user: string
}
