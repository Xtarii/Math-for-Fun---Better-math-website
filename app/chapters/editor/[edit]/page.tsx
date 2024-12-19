"use client"
import MathEditor from "@/components/editor/mathEditor";
import LoadingWheel from "@/components/loading/wheel";
import { getUser } from "@/utils/supabase/account/auth";
import { getQuestionByID, insertQuestion, updateQuestion } from "@/utils/supabase/database/database";
import { QuestionType } from "@/utils/supabase/types/types";
import { useRouter } from "next/navigation";
import { FormEvent, ReactElement, useEffect, useState } from "react";

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


        // Required data
        if(!question || !answer) return;


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
            <form className="flex" onSubmit={handleSubmit}>
                <div>
                    <h1>Required</h1>

                    {/* Inputs */}
                    <input className="text-gray-700" name="chapter" placeholder="Chapter" value={chapter} onChange={e => setChapter(e.target.value)} required />
                    <input className="text-gray-700" name="difficulty" type="number" placeholder="Difficulty" value={difficulty} onChange={e => setDifficulty(e.target.valueAsNumber)} required />
                    <input className="text-gray-700" name="number" type="number" placeholder="Number" value={number} onChange={e => setNumber(e.target.valueAsNumber)} required />


                    <MathEditor default={question} onChange={setQuestion} />
                    <MathEditor default={answer} onChange={setAnswer} />


                    <button type="submit">Upload</button>
                </div>

                <div>
                    <h1>Optional</h1>

                    <p>Do not use, under development</p>

                    <input className="text-gray-700" name="image" type="file" placeholder="Image" value={image} onChange={e => setImage(e.target.value)} />
                </div>


                {/* Error message */}
                {error && <div>
                    <p className="text-red-500">{error}</p>
                </div>}
            </form>


            {/* Message box */}
            {showMessage && <div>
                <p>Message Box</p>

                <a href="/chapters">Back</a>
            </div>}
        </div>}
    </div>);
}
