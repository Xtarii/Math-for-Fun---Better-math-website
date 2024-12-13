"use client";
import { getChapterContent, getQuestion } from "@/utils/supabase/supabase";
import { useParams, useRouter } from "next/navigation";
import { MouseEvent, ReactElement } from "react";

/**
 * Submit Panel Element
 */
export default function SubmitPanel(props: {status: number, onClick?: (event: MouseEvent<Element>) => void}) : ReactElement {
    // Color Picker
    const getColor = (status: number): string => {
        if (status <= 25) return "#9b0000";
        if (status <= 40) return "#de0c78";
        if (status <= 50) return "#bb2693";
        if (status <= 65) return "#0c26ca";
        if (status <= 80) return "#4d64f4";
        if (status <= 90) return "#1181c4";
        return "#72c2f2";
    };
    const color = getColor(props.status);

    // Router
    const router = useRouter();

    // Question Data
    const params = useParams();
    const chap = params.chap?.toString().replace("%20", " ") || "MA1a 1"; // The Chapter to Get content from
    const question = params.question?.toString() || "";



    // Panel Object
    return(<div className="flex flex-wrap w-96 m-auto">
        <div className="w-full inline-flex justify-center">
            <button
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-l-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                onClick={(e) => {
                    e.preventDefault();
                    router.push(`/chapters/${chap}/`); // Back to home
                }}
            >
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9h13a5 5 0 0 1 0 10H7M3 9l4-4M3 9l4 4"/>
                </svg>
            </button>
            <button
                type="button"
                className="justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"

                // Events
                onClick={props.onClick}
            >
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5"/>
                </svg>
            </button>
            <button
                type="button"
                className="text-white bg-blue-var3 hover:bg-blue-var focus:ring-4 focus:ring-blue-var2 font-medium rounded-r-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-var dark:hover:bg-blue-var-hover focus:outline-none dark:focus:ring-blue-var3"

                onClick={async (e) => {
                    e.preventDefault();
                    const data = await getQuestion(chap, question);
                    const questions = await getChapterContent(chap);

                    // Select random question
                    while(true) {
                        const randomQuestion = Math.floor(Math.random() * questions.length);
                        const question = questions[randomQuestion];

                        // Checks if question is not current and not to difficult
                        if(question.difficulty > (data?.difficulty || 2) - 3 && question.difficulty < (data?.difficulty || 2) + 3 && question.id != data?.id) {
                            router.push(`/chapters/${chap}/${question.id}/`);
                            break;
                        }
                    }
                }}
            >
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                </svg>
            </button>
        </div>

        {/* Score Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="h-2.5 rounded-full transition-all duration-700 ease-in-out" style={{
                width: `${props.status}%`,
                backgroundColor: color,

                transitionProperty: "width, background-color"
            }}></div>
        </div>
    </div>);
}
