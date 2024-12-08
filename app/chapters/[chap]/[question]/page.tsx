"use client";
import { useParams } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import MathTextEditor from "@/components/input/textEditor";
import SubmitPanel from "@/components/submit/panel";
import { generateFeedback } from "@/utils/api/gemini";
import LoadingWheel from "@/components/loading/wheel";
import { getQuestion } from "@/utils/supabase/supabase";
import { QuestionType } from "@/utils/supabase/types/types";



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
        {content && <div>
            {/* Site Content */}
            <p>{content.question}</p>

            {/* DEBUG */}
            <MathTextEditor onUpdateText={updateText} />

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
            {message && <p>
                {message}
            </p>}
        </div>}





        {/* Error */}
        {!content && <div>
            <p>Error, No such question</p>
        </div>}
    </div>);
}
