"use client"; // To use states
import LoadingWheel from "@/components/loading/wheel";
import { getChapters } from "@/utils/supabase/supabase";
import { ReactElement, useEffect, useState } from "react";



export default function Chapters() : ReactElement {
    const [ load, setLoad ] = useState(true);
    const [ chapters, setChapters ] = useState<{ id: string, name: string }[]>();


    // Fetches Chapter Data
    useEffect(() => {
        (async () => {
            setChapters(await getChapters()) // Loads Chapters
            setLoad(false); // Stops Loading Wheel
        })();
    }, []);



    return (<div>
        {load && <LoadingWheel />}


        {/* Page Content */}
        {chapters?.map((value, index) => <div key={index}>
            <p><a href={`/chapters/${value.name}`}>{value.name}</a></p>
        </div>)}
    </div>);
}
