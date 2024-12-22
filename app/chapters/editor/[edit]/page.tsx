"use client"
import MathEditor from "@/components/editor/mathEditor";
import ChapterSelector from "@/components/ui/forms/inputs/chapterSelector";
import LoadingWheel from "@/components/loading/wheel";
import { getUser } from "@/utils/supabase/account/auth";
import { getQuestionByID, insertQuestion, updateQuestion } from "@/utils/supabase/database/database";
import { useRouter } from "next/navigation";
import { FormEvent, ReactElement, useEffect, useState } from "react";
import ListInput from "@/components/ui/forms/inputs/listInput";
import ImageInput from "@/components/ui/forms/inputs/imageInput";

export default function Edit({params} : { params: Promise<{ edit: "new" | string }> }) : ReactElement {
    const router = useRouter();
    const [ load, setLoad ] = useState<boolean>(true);
    const [ showMessage, setShowMessage ] = useState<boolean>(false);
    const [ error, setError ] = useState<string>();

    // Question Data
    const [ question, setQuestion ] = useState<string>();
    const [ answer, setAnswer ] = useState<string>();

    const [ chapter, setChapter ] = useState<string>("");
    const [ number, setNumber ] = useState<number>(0);
    const [ difficulty, setDifficulty ] = useState<number>(0);
    const [ image, setImage ] = useState<string>("");
    const [ flags, setFlags ] = useState<string[]>([]);



    // Data fetching
    useEffect(() => {
        (async () => {
            if(!await getUser()) router.push("/account/login"); // Redirects non login users
            const edit = (await params).edit; // Gets the edit
            if(edit === "new") {
                setLoad(false);
                return;
            }

            // Fetches old question data
            const data = await getQuestionByID(edit);
            if(!data) {
                router.push("/chapters/editor/new"); // Redirects to new question instead of old
                setLoad(false);
                return;
            }

            // Parse question data
            let quest = "";
            for(const line of data?.question.split("\n") || []) quest += `<p>${line}</p>`;
            setQuestion(quest);

            // Parse Answer Data
            let answer = "";
            for(const line of data?.answer.split("\n") || []) answer += `<p>${line}</p>`;
            setAnswer(answer);

            setChapter(data.identifier.chapter);
            setNumber(data.identifier.number);
            setDifficulty(data.identifier.difficulty);
            setImage(data.image || "");
            setFlags(data.flags);


            // Shows Editor
            setLoad(false);
        })()
    }, []);

    // Handles Editor submit request
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoad(true);


        // Checks Required data
        if(!question || !answer || !chapter || !number || !difficulty) {
            setLoad(false);
            setError("Can not upload empty data");
            return;
        }


        // Submit data
        const edit = (await params).edit;
        if(edit === "new") {
            // Uploads new question
            await insertQuestion(number, difficulty, chapter, question, answer, flags, image);
            setShowMessage(true);
            setLoad(false);
            return;
        }

        // Updates old question
        await updateQuestion({ identifier: { id: edit, difficulty, number, chapter }, question, answer, image, flags });
        setShowMessage(true);
        setLoad(false);
    }



    // Editor Page
    return(<div>
        {load && <LoadingWheel />}
        {!load && <div>
            <form className="flex flex-wrap" onSubmit={handleSubmit}>
                <div className="w-fit h-screen mx-2">
                    <h1 className="text-xl text-center mx-auto">Required</h1>

                    {/* Inputs */}
                    <div className="max-w-sm mr-auto ml-4 my-4">
                        <ChapterSelector default={chapter} onChange={setChapter} />

                        <div className="grid gap-6 mb-6 md:grid-cols-2 mt-4">
                            <div className="mb-5">
                                <label htmlFor="difficulty" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Difficulty</label>
                                <input className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="difficulty" id="difficulty" type="number" placeholder="Difficulty" value={difficulty} onChange={e => setDifficulty(e.target.valueAsNumber)} required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="number" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Number</label>
                                <input className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="number" id="number" type="number" placeholder="Number" value={number} onChange={e => setNumber(e.target.valueAsNumber)} required />
                            </div>
                        </div>
                    </div>
                    <div className="max-w-sm mr-auto ml-4 my-4">
                        <h5 className="text-lg">Question</h5>
                        <MathEditor className="w-full h-64 mb-16" default={question} onChange={setQuestion} />

                        <h5 className="text-lg mt-16">Answer</h5>
                        <MathEditor className="w-full h-64" default={answer} onChange={setAnswer} />
                    </div>
                </div>

                <div className="w-fit h-screen mx-2">
                    <h1 className="text-xl text-center mx-auto">Optional</h1>


                    <ImageInput className="w-[32rem]" />
                    <div className="mt-10">
                        <label htmlFor="flags" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Flags</label>
                        <ListInput name="flags" id="flags" className="overflow-hidden max-w-[32rem]" default={flags} onChange={setFlags} placeholder="Flags" />
                    </div>
                </div>


                <div className="w-11/12 m-auto mt-0 mb-8 flex">
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">Upload</button>

                    {/* Message box */}
                    {showMessage && <div className="m-auto ml-4">
                        <p>Message Box</p>

                        <a href="/chapters">Back</a>
                    </div>}

                    {/* Error message */}
                    {error && <div className="m-auto ml-4">
                        <p className="text-red-500 text-center">{error}</p>
                    </div>}
                </div>
            </form>
        </div>}
    </div>);
}
