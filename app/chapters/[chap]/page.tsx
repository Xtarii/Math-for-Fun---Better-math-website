"use client";
import { useParams } from "next/navigation";
import { ReactElement } from "react";

import json from "@/DEBUG.json"; // DEBUG for questions



export default function Content() : ReactElement {
    const params = useParams();
    const c = params.chap; // The Chapter to Get content from


    // DEBUG
    const chap: "MA3c 4" | "MA3c 3" = "MA3c 3";
    const content = json[chap];



    // Chapter Content Page
    return(<div>
        {content.map((value, index) => <div key={index}>
            <a href={`/chapters/${chap}/${index}/`} key={index}>{value.question}</a>
        </div>)}
    </div>);
}
