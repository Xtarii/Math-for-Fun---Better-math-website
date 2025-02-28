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
import { Button } from "@mui/material";

export default function Question() : ReactElement {
    const params = useParams();
    const question = params.question?.toString() || "";

    // States
    const [ load, setLoad ] = useState(true);

    const [ showGeoGebra, setShowGeoGebra ] = useState<boolean>(false);
    const [ compactMode, setCompactMode ] = useState<boolean>(false);

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
        setShowGeoGebra(window.innerWidth < 768);
        setCompactMode(window.innerWidth < 768);
    }, [question]);



    // Question Content Page
    return(<div className="w-full h-full flex-[1]">
        {load && <Loader />}
        {content && <div className="flex flex-wrap md:flex-nowrap w-full h-fit">
            <div className="w-full md:w-3/5 h-fit">
                <div className="relative flex">
                    <div className="md:hidden justify-start mx-2 my-2">
                        <Button variant={!showGeoGebra ? "contained" : "text"} onClick={() => setShowGeoGebra(prev => !prev)}>GeoGebra</Button>
                    </div>
                    <div className="flex m-auto mt-4">
                        <div className="absolute right-2 top-2 flex w-40">
                            <p className="m-auto ml-4">Upg. {content.identifier.number}</p>
                            <DifficultyMeter className="m-auto mr-4 justify-self-right size-7" value={content.identifier.difficulty} />
                        </div>
                    </div>
                </div>
                {(showGeoGebra || !compactMode) && <div className="flex flex-wrap w-full h-fit">
                    <div className="w-full flex flex-wrap md:flex-nowrap">
                        <div className="flex mt-4 w-full">
                            <div className="ml-4">
                                {contentText?.map((value, index) =>
                                    <div className="h-fit min-h-8" key={index}>
                                        <MathParagraph className="text-lg text-left w-full" content={value} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="md:justify-end m-auto md:mx-4 my-12 z-10">
                            <div className="relative w-fit h-fit m-auto md:mt-4">
                                {content.image && <img className="border-2 border-slate-500 w-96 max-h-96 rounded shadow-md md:hover:scale-[2.3] md:hover:transform md:hover:-translate-x-1/2 md:hover:translate-y-2/4 transition-all duration-500 ease-in-out" src={content.image} alt={content.image} />}
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-fit">
                        <div className="flex flex-wrap w-full h-fit">
                            <div className="relative w-full h-fit">
                                <div className="h-fit">
                                    <MathEditor className="w-full h-[20rem] md:h-[35rem]" onChange={setText} default={text} />
                                </div>
                                <div className="sticky w-full h-40 bg-slate-800 m-auto flex bottom-0">
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
                                    }} message={message} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
            <div hidden={showGeoGebra} className="absolute md:sticky h-fit w-full md:w-2/5 mt-[5rem] md:mt-0 top-6 md:top-0 end-0">
                <GeoGebra className="h-full md:mt-4 w-full flex" width={window.innerWidth >= 768 ? window.innerWidth * 0.38 : window.innerWidth} height={window.innerWidth >= 768 ? window.innerHeight * 0.97 : window.innerHeight * 0.88} />
            </div>
        </div>}



        {/* Error */}
        {(!content && !load) && <ErrorMessage title="No such question!" message="The question was not found" />}
    </div>);
}
