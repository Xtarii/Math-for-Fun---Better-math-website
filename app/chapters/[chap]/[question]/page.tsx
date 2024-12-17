"use client";
import { useParams } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import SubmitPanel from "@/components/submit/panel";
import { generateFeedback } from "@/utils/api/gemini";
import LoadingWheel from "@/components/loading/wheel";
import { getQuestion } from "@/utils/supabase/supabase";
import { QuestionType } from "@/utils/supabase/types/types";
import ErrorMessage from "@/components/errors/message";
import GeoGebra from "@/components/geogebra/geogebra";
import { title } from "@/utils/config";
import MathEditor from "@/components/editor/mathEditor";



export default function Question() : ReactElement {
    const params = useParams();
    const chap = params.chap?.toString().replace("%20", " ") || "MA1a 1"; // The Chapter to Get content from
    const question = params.question?.toString() || "";

    // States
    const [ load, setLoad ] = useState(true);
    const [ content, setContent ] = useState<QuestionType>();
    const [ contentText, setContentText ] = useState<string[]>();

    const [ text, setText ] = useState("");
    const [ score, setScore ] = useState<number>(0);
    const [ message, setMessage ] = useState<string>();



    // Content Fetch Effect
    useEffect(() => {
        // Title
        document.title = title + " | Learn";

        // Content fetching
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
    return(<div className="min-h-screen">
        {load && <LoadingWheel />}


        {/* Content */}
        {content && <div className="flex w-screen">
            <div className="relative flex flex-wrap w-3/5 h-screen">
                {/* Site Content */}
                <div className="flex mt-4 w-full">
                    <div className="ml-4">
                        {contentText?.map((value, index) =>
                            <div className="h-fit min-h-8" key={index}>
                                <p className="text-lg text-left w-full" key={index}>{value}</p>
                            </div>
                        )}
                    </div>

                    <div className="flex m-auto mt-4">
                        <div className="absolute right-2 top-2 flex w-40">
                            <p className="m-auto ml-4">Upg. {content.number}</p>
                            <div className="m-auto mr-4 justify-self-right rounded-full size-7 flex shadow" style={{
                                backgroundColor: content.difficulty === 1 ? "#00B4A3" :
                                content.difficulty === 2 ? "#00CC99" :
                                content.difficulty === 3 ? "#008080" : "#603990"
                            }}>
                                <p className="m-auto text-lg text-center text-gray-900">{content.difficulty}</p>
                            </div>
                        </div>
                        {content.image && <img className="m-auto mt-4 w-96 max-h-96 rounded" src={content.image} alt={content.image} />}
                    </div>
                </div>

                {/* Submit Panel : DEBUG */}
                <div className="w-full h-40 absolute bottom-0 left-0 bg-slate-800 m-auto flex border-t-8 border-slate-500">
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
                </div>



                {/* DEBUG Message */}
                {message && <div className="absolute bottom-2 right-2 flex w-fit max-w-96 min-h-16 bg-sky-900 rounded border border-2xl hover:opacity-20">
                    <p className="m-auto p-10 pl-8 pr-8">
                        {message}
                    </p>
                </div>}
            </div>



            {/* Tool bar */}
            <div className="bg-grayish absolute right-0 h-screen w-2/5 border-solid border-l-2 border-slate-500">
                <MathEditor className="h-2/4 w-full" onChange={setText} />
                <GeoGebra className="h-2/4 w-full" />
            </div>
        </div>}



        {/* Error */}
        {(!content && !load) && <ErrorMessage title="No such question!" message="The question was not found" />}
    </div>);
}
