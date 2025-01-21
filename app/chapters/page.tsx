"use client"; // To use states
import LoginVerifier from "@/components/auth/loginVerifier";
import Loader from "@/components/ui/load/loader";
import { getChapters } from "@/utils/supabase/database/database";
import { ChapterType } from "@/utils/supabase/types/types";
import { Button } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export default function Chapters() : ReactElement {
    const [ load, setLoad ] = useState(true);
    const [ chapters, setChapters ] = useState<{[key: string]: ChapterType[]}>();


    // Fetches Chapter Data
    useEffect(() => {
        (async () => {
            const chapters = await getChapters();
            const list: {[key: string]: ChapterType[]} = {}

            // Sorts Chapters
            for(const chapter of chapters) {
                const parts = chapter.name.split(" ");
                const org = parts[0].toLowerCase();
                if(list[org]) list[org].push(chapter);
                else {
                    list[org] = [];
                    list[org].push(chapter);
                }
            }
            setChapters(list) // Loads Chapters
            setLoad(false); // Stops Loading Wheel
        })();
    }, []);



    return (<div className="h-full">
        {load && <Loader />}
        <div className="w-full mt-2 block md:hidden">
            <Button variant="text" href="/" color="info">
                <ChevronLeftIcon />
            </Button>
        </div>
        <LoginVerifier className="m-auto hidden md:block w-full h-fit">
            <div className="ml-10 mt-2 w-fit h-fit">
                <Button variant="outlined" href="/editor">Editeraren</Button>
            </div>
        </LoginVerifier>
        <div className="w-full h-fit grid grid-cols-1 md:grid-cols-4">
            {Object.keys(chapters || {}).map((value, index) => <div className="mx-auto my-4 w-11/12 md:w-96" key={index}>
                <div className="w-full h-8 rounded-t-md bg-slate-500 cursor-default flex border-b-2 border-slate-900">
                    <h1 className="text-lg w-full text-center my-auto">{value.toUpperCase()}</h1>
                </div>
                {chapters && chapters[value].sort((a, b) => Number.parseFloat(a.name.split(" ")[1]) - Number.parseFloat(b.name.split(" ")[1])).map((value, index) => <div className="w-full md:w-96 h-14 rounded bg-slate-800 hover:bg-slate-500 border-b-slate-600 border-b-2 md:border-none" key={index}>
                    <a href={`/chapters/${value.name}`} className="w-full h-full flex">
                        <h5 className="text-2xl m-auto text-white">Kapitel {value.name.split(" ")[1]}</h5>
                    </a>
                </div>)}
            </div>)}
        </div>
    </div>);
}
