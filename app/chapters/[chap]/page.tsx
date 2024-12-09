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
    const [ content, setContent ] = useState<{ [key: string]: { id: string, number: number, difficulty: number }[] }>();


    // Fetches Chapter Data
    useEffect(() => {
        (async () => {
            const items = await getChapterContent(chap);
            const sorted: { [key: string]: { id: string, number: number, difficulty: number }[] } = {};

            // Sorts Content and sets to page content
            for(const item of items) {
                if(!sorted[item.difficulty]) sorted[item.difficulty] = []; // Creates new List
                sorted[item.difficulty].push(item);
            }
            setContent(sorted);
            setLoad(false); // Stops Loading Wheel
        })();
    }, []);



    // Chapter Content Page
    return(<div>
        {load && <LoadingWheel />}


        {/* Actual Site Content */}
        {content && Object.values(content).map((value, index) => <div key={index}>
            <div className="w-24" key={index}>
                <div className="h-8 bg-blue-500 rounded">
                    <p className="text-center">Level: {Object.keys(content)[index]}</p>
                </div>


                {value.map((value, index) => <div className="flex" key={index}>
                    <a href={`/chapters/${chap}/${value.id}/`} key={index}>Upg. {value.number}</a>
                    <p className="m-auto justify-self-right">{value.difficulty}</p>
                </div>)}
            </div>
        </div>)}
    </div>);
}
