"use client";
import { useParams } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import SubmitPanel from "@/components/ui/submit/panel";
import { generateFeedback } from "@/utils/api/gemini";
import { QuestionType } from "@/utils/supabase/types/types";
import ErrorMessage from "@/components/ui/errors/message";
import GeoGebra from "@/components/geogebra/geogebra";
import { title } from "@/utils/config";
import MathEditor from "@/components/editor/mathEditor";
import MathParagraph from "@/components/mathParagraph/mathParagraph";
import { getQuestionByID } from "@/utils/supabase/database/database";
import Loader from "@/components/ui/load/loader";
import DifficultyMeter from "@/components/ui/meter/difficultyMeter";

export default function Question() : ReactElement {
    const params = useParams();
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
            const res = await getQuestionByID(question);
            setContent(res || undefined);

            // Parses the question text
            const format: string[] = [];
            for(const part of res?.question.split("\n") || []) {
                format.push(part);
            }
            setContentText(format);
            setLoad(false);
        })();
    }, [question]);



    // Question Content Page
    return(<div className="min-h-screen">
        {load && <Loader />}
        {content && <div className="flex w-screen h-fit">
            <div className="w-3/5 h-fit">
                <div className="relative flex">
                    <div className="flex m-auto mt-4">
                        <div className="absolute right-2 top-2 flex w-40">
                            <p className="m-auto ml-4">Upg. {content.identifier.number}</p>
                            <DifficultyMeter className="m-auto mr-4 justify-self-right size-7" value={content.identifier.difficulty} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap w-full h-fit">
                    <div className="w-full flex">
                        <div className="flex mt-4 w-full">
                            <div className="ml-4">
                                {contentText?.map((value, index) =>
                                    <div className="h-fit min-h-8" key={index}>
                                        <MathParagraph className="text-lg text-left w-full" content={value} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="justify-end mt-12 mx-4">
                            {content.image && <img className="m-auto mt-4 w-96 max-h-96 rounded" src={content.image} alt={content.image} />}
                        </div>
                    </div>
                    <div className="w-full h-fit">
                        <div className="flex flex-wrap w-full h-fit">
                            <div className="w-full h-fit">
                                <div className="h-fit mb-20">
                                    <MathEditor className="w-full h-[35rem]" onChange={setText} />
                                </div>

                                <div className="w-full h-40 bg-slate-800 m-auto flex">
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
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full h-full">
                        {message && <div className="absolute bottom-2 right-2 flex w-fit max-w-96 min-h-16 bg-sky-900 rounded border border-2xl hover:opacity-20">
                            <MathParagraph content={message} className="m-auto p-10 pl-8 pr-8" />
                        </div>}
                    </div>
                </div>
            </div>



            <div className="sticky h-fit w-2/5 top-0 end-0">
                <GeoGebra className="h-screen w-full flex" width={window.innerWidth * 0.38} />
            </div>
        </div>}



        {/* Error */}
        {(!content && !load) && <ErrorMessage title="No such question!" message="The question was not found" />}
    </div>);
}
