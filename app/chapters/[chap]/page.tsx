"use client";
import { useParams, useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import LoadingWheel from "@/components/loading/wheel";
import { getChapterContent } from "@/utils/supabase/supabase";
import { title } from "@/utils/config";
import { getUser } from "@/utils/supabase/account/auth";



export default function Content() : ReactElement {
    const router = useRouter();
    const params = useParams();
    const chap = params.chap?.toString().replace("%20", " ") || "MA1a 1"; // The Chapter to Get content from

    // States
    const [ load, setLoad ] = useState<boolean>(true);
    const [ auth, setAuth ] = useState<boolean>(false);
    const [ content, setContent ] = useState<{ [key: string]: { id: string, number: number, difficulty: number }[] }>();


    // Fetches Chapter Data
    useEffect(() => {
        // Title
        document.title = title + " | " + chap;

        // Content fetching
        (async () => {
            const items = await getChapterContent(chap);
            const sorted: { [key: string]: { id: string, number: number, difficulty: number }[] } = {};

            // Sorts Content and sets to page content
            for(const item of items) {
                if(!sorted[item.difficulty]) sorted[item.difficulty] = []; // Creates new List
                sorted[item.difficulty].push(item);
            }
            setContent(sorted);


            // Authentication
            const user = await getUser();
            if(user) setAuth(true);
            setLoad(false); // Stops Loading Wheel
        })();
    }, []);



    // Chapter Content Page
    return(<div className="min-h-screen">
        {load && <LoadingWheel />}


        {/* Top Menu */}
        <div className="w-full h-24 mb-2 bg-slate-500 flex">
            <a href="/chapters" className="justify-self-left m-auto ml-8 hover:bg-slate-500 hover:opacity-25">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9h13a5 5 0 0 1 0 10H7M3 9l4-4M3 9l4 4"/>
                </svg>
            </a>


            {/* Menu content */}
            <div className="h-full flex m-auto ml-8">
                <h2 className="text-center text-xl m-auto">Kapitel</h2>
            </div>
        </div>


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

                        <div className="m-auto mr-4 h-full w-[16rem] justify-self-right flex">
                            {auth && <div className="m-auto mr-4">
                                <button onClick={() => {router.push(`/chapters/editor/${value.id}`)}} className="hover:bg-slate-500 hover:opacity-20 rounded-lg">
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                                    </svg>
                                </button>
                            </div>}

                            <div className="m-auto mx-0 rounded-full size-7 flex shadow" style={{
                                backgroundColor: value.difficulty === 1 ? "#00B4A3" :
                                value.difficulty === 2 ? "#00CC99" :
                                value.difficulty === 3 ? "#008080" : "#603990"
                            }}>
                                <p className="m-auto text-center text-gray-900">{value.difficulty}</p>
                            </div>
                        </div>
                    </a>
                </div>)}
            </div>
        </div>)}
    </div>);
}
