"use client";
import { getQuestionByID, getQuestionsOfChapter } from "@/utils/supabase/database/database";
import { Button } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { MouseEvent, ReactElement, useState } from "react";
import ScoreMeter from "../meter/scoreMeter";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MathParagraph from "@/components/mathParagraph/mathParagraph";

/**
 * Submit Panel Element
 */
export default function SubmitPanel(props: {status: number, onClick?: (event: MouseEvent<Element>) => void, message?: string}) : ReactElement {
    const router = useRouter();

    // Question Data
    const params = useParams();
    const chap = params.chap?.toString().replace("%20", " ") || "MA1a 1"; // The Chapter to Get content from
    const question = params.question?.toString() || "";

    // Panel States
    const [ showMessage, setShowMessage ] = useState<boolean>(true);



    // Panel Object
    return(<div className="flex w-full m-auto">
        <div className="flex flex-wrap w-96 m-auto">
            <div className="w-full inline-flex justify-center">
                <Button
                    style={{
                        borderTopLeftRadius: "0.5rem",
                        borderBottomLeftRadius: "0.5rem",

                        padding: "0.625rem 1.25rem",
                        marginInlineEnd: "0.5rem",
                        marginBottom: "0.5rem"
                    }}
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
                <Button style={{
                    justifyContent: "center",
                    padding: "0.625rem 4rem",
                    marginInlineEnd: "0.5rem",
                    marginBottom: "0.5rem"

                }} variant="contained" color="info" onClick={(e) => {
                    if(props.onClick) props.onClick(e);
                    setShowMessage(true); // Shows Message
                }}>
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5"/>
                    </svg>
                </Button>
                <Button
                    style={{
                        borderTopRightRadius: "0.5rem",
                        borderBottomRightRadius: "0.5rem",

                        padding: "0.625rem 1.25rem",
                        marginInlineEnd: "0.5rem",
                        marginBottom: "0.5rem"
                    }}
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
            <ScoreMeter className="w-full md:w-96 h-2.5 m-auto" value={props.status} />
        </div>
        <div className="absolute end-0 md:end-2">
            <div className="me-0 md:me-2 mb-2 mr-0 md:mr-2">
                <Button style={{
                    width: "100%",
                    height: "100%"
                }} onClick={() => setShowMessage(prev => !prev)}>
                    {!showMessage && <ExpandLessIcon />}
                    {showMessage && <ExpandMoreIcon />}
                </Button>
            </div>
            <div className="absolute bottom-14 right-0 md:right-2 w-fit h-fit">
                {(props.message && showMessage) && <div className="flex w-fit min-h-16 bg-sky-900 rounded border border-2xl">
                    <MathParagraph content={props.message} className="m-auto p-10 px-8 w-screen md:w-96" />
                </div>}
            </div>
        </div>
    </div>);
}
