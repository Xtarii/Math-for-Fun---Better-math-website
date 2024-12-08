"use client";
import { useParams } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import LoadingWheel from "@/components/loading/wheel";
import { getChapterContent } from "@/utils/supabase/supabase";



export default function Content() : ReactElement {
    const params = useParams();
    const chap = params.chap?.toString().replace("%20", " ") || "MA1a 1"; // The Chapter to Get content from

    // States
    const [ load, setLoad ] = useState(true);
    const [ content, setContent ] = useState<{ id: string, question: string }[]>();


    // Fetches Chapter Data
    useEffect(() => {
        (async () => {
            setContent(await getChapterContent(chap));
            setLoad(false); // Stops Loading Wheel
        })();
    }, []);



    // Chapter Content Page
    return(<div>
        {load && <LoadingWheel />}


        {/* Actual Site Content */}
        {content?.map((value, index) => <div key={index}>
            <a href={`/chapters/${chap}/${value.id}/`} key={index}>{value.question}</a>
        </div>)}
    </div>);
}
