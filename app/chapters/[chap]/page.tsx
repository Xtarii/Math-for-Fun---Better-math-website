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
                <div className="w-96 h-8 bg-slate-700 rounded">
                    <p className="text-center text-2xl">Level: {Object.keys(content)[index]}</p>
                </div>


                {value.map((value, index) => <div className="flex w-96 bg-slate-800 h-16 rounded hover:bg-slate-500" key={index}>
                    <a href={`/chapters/${chap}/${value.id}/`} className="flex w-full h-full">
                        <div className="m-auto ml-4">
                            <p>Upg. {value.number}</p>
                        </div>

                        <div className="m-auto mr-4 justify-self-right rounded-full size-7 flex shadow" style={{
                            backgroundColor: value.difficulty === 1 ? "#00B4A3" :
                            value.difficulty === 2 ? "#00CC99" :
                            value.difficulty === 3 ? "#008080" : "#603990"
                        }}>
                            <p className="m-auto text-center text-gray-900">{value.difficulty}</p>
                        </div>
                    </a>
                </div>)}
            </div>
        </div>)}
    </div>);
}
