"use client"
import { getChapters, insertChapter } from "@/utils/supabase/database/database";
import { ChapterType } from "@/utils/supabase/types/types";
import { ReactElement, useState } from "react";
import LoadingWheelLocal from "../../loadingbars/localWheel";

/**
 * Selection Menu for selecting chapters
 */
export default function ChapterSelector(props: { default?: string, onChange?: (arg: string) => void, readOnly?: boolean }) : ReactElement {
    const [ load, setLoad ] = useState<boolean>(true);
    const [ open, setOpen ] = useState<boolean>(false);

    const [ content, setContent ] = useState<ChapterType[]>();
    const [ selected, setSelected ] = useState<string>(props.default || "");

    const [ search, setSearch ] = useState<string>("");
    const [ searchError, setSearchError ] = useState<string>();



    // Selection Change
    const handleSelect = (value: string) => {
        setSelected(value);
        if(props.onChange) props.onChange(value);
        handleOpen(false);
    }

    // Search
    const handleSetSearch = async (value: string) => {
        setSearch(value);
        setSearchError(undefined); // Removes any Error

        // Search for value in content list
        setLoad(true);
        const result: ChapterType[] = [];
        for(const chapter of await getChapters()) if(chapter.name.toLowerCase().includes(value.toLowerCase())) result.push(chapter);
        setContent(result);
        setLoad(false);
    }

    // Add chapter
    const handleAddChapter = async () => {
        setLoad(true);
        if(!search) {
            setSearchError("This can not be empty");
            return;
        }

        // Adds chapter
        const result = await insertChapter(search);

        // Updates Content List
        if(result) {
            const list = [...content ? content : []];
            list.push(result);
            setContent(list);
            handleSelect(result.name); // Sets Selection Item
        }
        setLoad(false);
    }

    // Open selection menu handle
    const handleOpen = async (value: boolean) => {
        if(props.readOnly) return; // Can't open if readonly

        setOpen(value);
        setSearchError(undefined); // Removes any Error
        if(!value) return;
        handleSetSearch(search); // Sets content, if search is null then all items are shown
    }



    // Selection Menu
    return(<div className="relative">
        <div className="bg-gray-50 border border-gray-300 rounded-md block w-full p-2.5 hover:bg-gray-100 dark:hover:bg-slate-600 dark:bg-slate-500 dark:border-slate-600 cursor-pointer" onClick={() => handleOpen(!open)}>
            {!selected && <p className="text-gray-900 text-sm dark:text-gray-200 opacity-50">Chapters</p>}
            {selected && <p className="text-gray-900 text-sm dark:text-white opacity-80">{selected}</p>}
        </div>

        {/* Modal */}
        {open && <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-900 dark:bg-slate-900 opacity-50" onClick={() => handleOpen(false)} />

            {/* Main Modal */}
            <div className="relative w-2/4 h-3/4 bg-gray-200 dark:bg-slate-800 rounded-md shadow-lg z-10 flex flex-wrap">
                <div className="flex flex-wrap w-full h-fit">
                    <div className="bg-gray-100 dark:bg-slate-700 w-full h-14 m-0 rounded-t-md flex items-center justify-between px-4">
                        <h1 className="text-gray-800 dark:text-white text-xl font-semibold text-center">Chapters</h1>

                        <button className="bg-red-500 text-white rounded px-2 py-1 text-sm" onClick={() => handleOpen(false)}>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                            </svg>
                        </button>
                    </div>

                    <div className="w-full p-0">
                        <div className="relative mb-1">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-1.5 pointer-events-none">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input value={search} onChange={(e) => handleSetSearch(e.target.value)} type="text" className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" />
                        </div>

                        {searchError && <div className="m-0 ml-2">
                            <p className="text-red-500">{searchError}</p>
                        </div>}
                    </div>
                </div>


                {/* Content */}
                <div className="relative w-full h-fit max-h-5/6 flex flex-wrap overflow-y-auto">
                    {load && <LoadingWheelLocal />}
                    {content?.map((value, index) => <div className="w-full h-16 m-auto mb-0 rounded bg-white dark:bg-slate-500 flex hover:bg-gray-100 dark:hover:bg-slate-400 cursor-pointer" key={index} onClick={(e) => handleSelect(value.name)}>
                        <h1 className="m-auto ml-4 text-gray-900 dark:text-white text-center">{value.name}</h1>
                    </div>)}


                    <div className="w-full h-16 m-auto mt-4 mb-0 rounded bg-white dark:bg-slate-500 flex hover:bg-gray-100 dark:hover:bg-slate-400 cursor-pointer" onClick={handleAddChapter}>
                        <div className="m-auto mr-2 bg-green-500 size-9 flex rounded-lg">
                            <svg className="m-auto w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/>
                            </svg>
                        </div>
                        <p className="m-auto ml-4 text-gray-900 dark:text-white text-center">Add chapter</p>
                    </div>
                </div>
            </div>
        </div>}
    </div>);
}
