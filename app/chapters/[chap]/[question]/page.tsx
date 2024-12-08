"use client";
import { useParams } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import MathTextEditor from "@/components/input/textEditor";
import SubmitPanel from "@/components/submit/panel";
import { generateFeedback } from "@/utils/api/gemini";
import LoadingWheel from "@/components/loading/wheel";
import { getQuestion } from "@/utils/supabase/supabase";
import { QuestionType } from "@/utils/supabase/types/types";
import ErrorMessage from "@/components/errors/message";



export default function Question() : ReactElement {
    const params = useParams();
    const chap = params.chap?.toString().replace("%20", " ") || "MA1a 1"; // The Chapter to Get content from
    const question = params.question?.toString() || "";

    // States
    const [ load, setLoad ] = useState(true);
    const [ content, setContent ] = useState<QuestionType>();

    const [ text, updateText ] = useState("");
    const [ score, setScore ] = useState<number>(0);
    const [ message, setMessage ] = useState<string>();



    // Content Fetch Effect
    useEffect(() => {
        (async () => {
            const res = await getQuestion(chap, question);
            setContent(res || undefined);
            setLoad(false);
        })();
    }, [question]);



    // Question Content Page
    return(<div>
        {load && <LoadingWheel />}


        {/* Content */}
        {content && <div className="flex w-screen">
            <div className="flex flex-wrap w-3/5 h-screen">
                {/* Site Content */}
                <p className="text-lg text-center w-full h-16">{content.question}</p>

                {/* Submit Panel : DEBUG */}
                <SubmitPanel status={score} onClick={e => {
                    e.preventDefault();
                    setLoad(true); // Starts Spinning Wheel



                    // Test Generation of Feedback
                    generateFeedback({
                        system: { // DEBUG Question
                            question: content.question,
                            answer: content.answer,

                            flags: content.flags
                        },

                        user: text
                    }).then((data) => {
                        setScore(data.score * 10); // Sets Score
                        setMessage(data.feedback);
                        setLoad(false); // Stops Spinning Wheel
                    });
                }} />



                {/* DEBUG Message */}
                {message && <div className="absolute bottom-2 right-2 flex w-fit h-16 bg-sky-900 rounded">
                    <p className="m-auto pl-8 pr-8">
                        {message}
                    </p>
                </div>}
            </div>
            <MathTextEditor onUpdateText={updateText} />
        </div>}



        {/* Error */}
        {(!content && !load) && <ErrorMessage title="No such question!" message="The question was not found" />}
    </div>);
}
