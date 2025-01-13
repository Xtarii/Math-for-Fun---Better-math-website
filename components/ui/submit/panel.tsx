"use client";
import { getQuestionByID, getQuestionsOfChapter } from "@/utils/supabase/database/database";
import { Button } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { MouseEvent, ReactElement } from "react";
import ScoreMeter from "../meter/scoreMeter";

/**
 * Submit Panel Element
 */
export default function SubmitPanel(props: {status: number, onClick?: (event: MouseEvent<Element>) => void}) : ReactElement {
    const router = useRouter();

    // Question Data
    const params = useParams();
    const chap = params.chap?.toString().replace("%20", " ") || "MA1a 1"; // The Chapter to Get content from
    const question = params.question?.toString() || "";



    // Panel Object
    return(<div className="flex flex-wrap w-96 m-auto">
        <div className="w-full inline-flex justify-center">
            <Button
                className="rounded-l-lg px-5 py-2.5 me-2 mb-2"
                variant="contained"
                color="error"

                onClick={(e) => {
                    e.preventDefault();
                    router.push(`/chapters/${chap}/`); // Back to home
                }}
            >
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9h13a5 5 0 0 1 0 10H7M3 9l4-4M3 9l4 4"/>
                </svg>
            </Button>
            <Button className="justify-center px-16 py-2.5 me-2 mb-2" variant="contained" color="info" onClick={props.onClick}>
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5"/>
                </svg>
            </Button>
            <Button
                className="rounded-r-lg px-5 py-2.5 me-2 mb-2"
                variant="contained"
                color="success"

                onClick={async (e) => {
                    e.preventDefault();
                    const data = await getQuestionByID(question);
                    const questions = await getQuestionsOfChapter(chap);

                    // Select random question
                    while(true && questions.length > 1) {
                        const randomQuestion = Math.floor(Math.random() * questions.length);
                        const question = questions[randomQuestion];

                        // Checks if question is not current and not to difficult
                        if(question.difficulty > (data?.identifier.difficulty || 2) - 3 && question.difficulty < (data?.identifier.difficulty || 2) + 3 && question.id != data?.identifier.id) {
                            router.push(`/chapters/${chap}/${question.id}/`);
                            break;
                        }
                    }
                }}
            >
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                </svg>
            </Button>
        </div>
        <ScoreMeter className="w-full h-2.5" value={props.status} />
    </div>);
}
