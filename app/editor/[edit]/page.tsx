"use client"
import MathEditor from "@/components/editor/mathEditor";
import ChapterSelector from "@/components/ui/forms/inputs/chapterSelector";
import { getQuestionByID, insertQuestion, updateQuestion } from "@/utils/supabase/database/database";
import { useRouter } from "next/navigation";
import { FormEvent, ReactElement, useEffect, useState } from "react";
import ListInput from "@/components/ui/forms/inputs/listInput";
import ImageInput from "@/components/ui/forms/inputs/imageInput";
import MessageBox from "@/components/ui/forms/messages/messageBox";
import { Button } from "@mui/material";
import Loader from "@/components/ui/load/loader";
import DeviceSupport from "@/components/devices/deviceSupport";
import LoginVerifier from "@/components/auth/loginVerifier";

export default function Edit({params} : { params: Promise<{ edit: "new" | string }> }) : ReactElement {
    const router = useRouter();
    const [ load, setLoad ] = useState<boolean>(true);
    const [ newEdit, setNewEdit ] = useState<boolean>(true);
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
            // if(!await getUser()) router.push("/account/login"); // Redirects non login users
            const edit = (await params).edit; // Gets the edit
            if(edit === "new") {
                setNewEdit(true);
                setLoad(false);
                return;
            }
            setNewEdit(false); // Indicates that this question is being updated

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
        setError(undefined);
        setLoad(true);


        // Checks Required data
        if(!question || !answer || !chapter || !number || !difficulty) {
            setLoad(false);
            setError("Can not upload empty data");
            return;
        }


        // Submit data
        if(newEdit) {
            // Uploads new question
            await insertQuestion(number, difficulty, chapter, question, answer, flags, image);
            setShowMessage(true);
            setLoad(false);
            return;
        }

        // Updates old question
        await updateQuestion({ identifier: { id: (await params).edit, difficulty, number, chapter }, question, answer, image, flags });
        setShowMessage(true);
        setLoad(false);
    }



    // Editor Page
    return(<div className="w-full h-fit">
        {load && <Loader />}
        <LoginVerifier redirect="this" />
        <DeviceSupport className="w-full h-fit">
            {!load && <div className="hidden w-full h-fit md:flex">
                <form className="m-auto flex flex-wrap w-full h-fit" onSubmit={handleSubmit}>
                    {/* Required inputs */}
                    <div className="w-fit h-fit mx-auto">
                        {/* Header */}
                        <div className="h-14 pt-4 mx-auto mb-4 border-b-2 border-slate-500">
                            <h1 className="text-xl text-center mx-auto">Required</h1>
                        </div>



                        {/* Inputs */}
                        <div className="flex">
                            <div className="w-fit h-fit mt-7 mr-16">
                                <div className="max-w-sm mr-auto ml-4 my-4">
                                    <ChapterSelector default={chapter} onChange={setChapter} readOnly={!newEdit} />

                                    <div className="grid gap-6 mb-6 md:grid-cols-2 mt-4">
                                        <div className="mb-5">
                                            <label htmlFor="difficulty" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Difficulty</label>
                                            <input className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="difficulty" id="difficulty" type="number" placeholder="Difficulty" value={difficulty} readOnly={!newEdit} onChange={e => setDifficulty(e.target.valueAsNumber)} required />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="number" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Number</label>
                                            <input className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="number" id="number" type="number" placeholder="Number" value={number} readOnly={!newEdit} onChange={e => setNumber(e.target.valueAsNumber)} required />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-fit h-fit">
                                <div className="max-w-sm mr-auto ml-4 my-4">
                                    <h5 className="text-lg">Question</h5>
                                    <MathEditor className="w-[40rem] h-96 mb-16" default={question} onChange={setQuestion} />

                                    <h5 className="text-lg mt-16">Answer</h5>
                                    <MathEditor className="w-[40rem] h-96" default={answer} onChange={setAnswer} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Optional */}
                    <div className="w-fit h-fit ml-auto">
                        {/* Header */}
                        <div className="bg-slate-900 h-14 pt-4 mb-4 rounded-bl-lg">
                            <h1 className="text-xl text-center mx-auto">Optional</h1>
                        </div>

                        {/* Inputs */}
                        <div className="mr-4">
                            <ImageInput default={image} className="w-[32rem]" onChange={setImage} readOnly={!newEdit} />
                            <div className="mt-10">
                                <label htmlFor="flags" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Flags</label>
                                <ListInput name="flags" id="flags" className="overflow-hidden max-w-[32rem]" default={flags} onChange={setFlags} placeholder="Flags" />
                            </div>
                        </div>
                    </div>



                    {/* Submit panel */}
                    <div className="w-11/12 m-auto mt-0 mb-8 flex">
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">Upload</button>

                        {/* Message box */}
                        {showMessage && <MessageBox
                            className="relative bg-white rounded-lg shadow dark:bg-gray-700"

                            title="Uploaded question"
                            message="The question was uploaded and can now be viewed"
                        >
                            <div className="flex">
                                <Button href="/chapters" color="info" className="mr-2" variant="outlined">Back</Button>
                                <Button href="/editor/new" color="inherit">New</Button>
                            </div>
                        </MessageBox>}

                        {/* Error message */}
                        {error && <div className="m-auto ml-4">
                            <p className="text-red-500 text-center">{error}</p>
                        </div>}
                    </div>
                </form>
            </div>}
        </DeviceSupport>
    </div>);
}
