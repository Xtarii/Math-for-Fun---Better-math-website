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
import GeoGebra from "@/components/geogebra/geogebra";



export default function Question() : ReactElement {
    const params = useParams();
    const chap = params.chap?.toString().replace("%20", " ") || "MA1a 1"; // The Chapter to Get content from
    const question = params.question?.toString() || "";

    // States
    const [ load, setLoad ] = useState(true);
    const [ content, setContent ] = useState<QuestionType>();
    const [ contentText, setContentText ] = useState<string[]>();

    const [ text, updateText ] = useState("");
    const [ score, setScore ] = useState<number>(0);
    const [ message, setMessage ] = useState<string>();



    // Content Fetch Effect
    useEffect(() => {
        (async () => {
            const res = await getQuestion(chap, question);
            setContent(res || undefined);

            // Parses the question text
            const format: string[] = [];
            for(const part of res?.question.split("\n") || []) {
                format.push(part || " ");
            }
            setContentText(format);
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
                <div className="flex mt-4">
                    <div className="ml-4 flex flex-wrap h-full">
                        {contentText?.map((value, index) =>
                            <p className="text-lg text-left w-full" key={index}>{value}</p>
                        )}
                    </div>
                    {content.image && <img className="m-auto w-96 max-h-96 rounded" src={content.image} alt={content.image} />}
                </div>

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

            <div className="absolute right-0 h-screen w-2/5">
                <MathTextEditor className="h-2/4 w-full" onUpdateText={updateText} />
                <GeoGebra className="h-2/4 w-full" />
            </div>
        </div>}



        {/* Error */}
        {(!content && !load) && <ErrorMessage title="No such question!" message="The question was not found" />}
    </div>);
}
