"use client"; // To use states
import MathTextEditor from "@/components/input/textEditor";
import { generateFeedback } from "@/utils/api/gemini";
import { ReactElement, useState } from "react";

import json from "@/DEBUG.json"
import SubmitPanel from "@/components/submit/panel";



export default function Chapters() : ReactElement {
    const [ text, updateText ] = useState("");
    const [ score, setScore ] = useState<number>(0);



    return (<div>
        {/* DEBUG */}
        <MathTextEditor onUpdateText={updateText} />

        {/* Submit Panel : DEBUG */}
        <SubmitPanel status={score} onClick={e => {
            e.preventDefault();



            // Test Generation of Feedback
            const q = 0;
            const flags: string[] = [
                "{user} ska stämma överens med {system.answer}"
            ]
            for(const str of json["MA3c 4"][q].flags) { flags.push(str); }


            generateFeedback({
                system: { // DEBUG Question
                    question: json["MA3c 4"][q].question,
                    answer: json["MA3c 4"][q].answer,

                    flags
                },

                user: text
            }).then((data) => {
                console.log(data);


                setScore(data.score * 10); // Sets Score
            });

        }} />
    </div>);
}
