"use client"; // To use states
import LoadingWheel from "@/components/loading/wheel";
import { getChapters } from "@/utils/supabase/database/database";
import { ChapterType } from "@/utils/supabase/types/types";
import { ReactElement, useEffect, useState } from "react";



export default function Chapters() : ReactElement {
    const [ load, setLoad ] = useState(true);
    const [ chapters, setChapters ] = useState<ChapterType[]>();


    // Fetches Chapter Data
    useEffect(() => {
        (async () => {
            setChapters(await getChapters()) // Loads Chapters
            setLoad(false); // Stops Loading Wheel
        })();
    }, []);



    return (<div className="min-h-screen">
        {load && <LoadingWheel />}


        {/* Page Content */}
        {chapters?.map((value, index) => <div className="w-96 h-14 rounded bg-slate-800 hover:bg-slate-500" key={index}>
            <a href={`/chapters/${value.name}`} className="w-full h-full flex">
                <h5 className="text-2xl m-auto text-white">{value.name}</h5>
            </a>
        </div>)}
    </div>);
}
