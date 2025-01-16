"use client";
import { useParams, useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { title } from "@/utils/config";
import { getUser } from "@/utils/supabase/account/auth";
import { QuestionIdentifierType } from "@/utils/supabase/types/types";
import { getQuestionsOfChapter } from "@/utils/supabase/database/database";
import Loader from "@/components/ui/load/loader";
import DifficultyMeter from "@/components/ui/meter/difficultyMeter";

export default function Content() : ReactElement {
    const router = useRouter();
    const params = useParams();
    const chap = params.chap?.toString().replace("%20", " ") || "MA1a 1"; // The Chapter to Get content from

    // States
    const [ load, setLoad ] = useState<boolean>(true);
    const [ auth, setAuth ] = useState<boolean>(false);
    const [ content, setContent ] = useState<{ [key: string]: QuestionIdentifierType[] }>();


    // Fetches Chapter Data
    useEffect(() => {
        // Title
        document.title = title + " | " + chap;

        // Content fetching
        (async () => {
            const items = await getQuestionsOfChapter(chap);
            const sorted: { [key: string]: QuestionIdentifierType[] } = {};

            // Sorts Content and sets to page content
            for(const item of items) {
                if(!sorted[item.difficulty]) sorted[item.difficulty] = []; // Creates new List
                sorted[item.difficulty].push(item);

                // Sorts List after question number
                sorted[item.difficulty].sort((a, b) => a.number - b.number);
            }
            setContent(sorted);


            // Authentication
            const user = await getUser();
            if(user) setAuth(true);
            setLoad(false); // Stops Loading Wheel
        })();
    }, []);



    // Chapter Content Page
    return(<div className="h-full">
        {load && <Loader />}
        <div className="flex flex-wrap md:flex-nowrap w-full h-fit">
            {content && Object.values(content).map((value, index) => <div key={index} className="my-4 mx-auto md:mx-2 w-11/12 md:w-96">
                <div className="w-full" key={index}>
                    <div className="w-full h-8 bg-slate-700 rounded cursor-default">
                        <p className="text-center text-2xl">Level: {Object.keys(content)[index]}</p>
                    </div>


                    {value.map((value, index) => <div className="flex w-full bg-slate-800 h-16 rounded hover:bg-slate-500" key={index}>
                        <a href={`/chapters/${chap}/${value.id}/`} className="flex w-full h-full">
                            <div className="m-auto ml-4">
                                <p>Upg. {value.number}</p>
                            </div>
                        </a>
                        <div className="m-auto h-full max-w-[8rem] w-fit justify-self-right flex">
                            {auth && <div className="m-auto ml-4">
                                <button onClick={async () => {
                                    setLoad(true);
                                    router.push(`/editor/${value.id}`);
                                    setLoad(false);
                                }} className="hover:bg-slate-500 hover:opacity-20 rounded-lg">
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                                    </svg>
                                </button>
                            </div>}
                            <DifficultyMeter className="m-auto mx-4 size-7" value={value.difficulty} />
                        </div>
                    </div>)}
                </div>
            </div>)}
        </div>
    </div>);
}
