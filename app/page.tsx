"use client"
import LoadingWheel from "@/components/loading/wheel";
import MessageBox from "@/components/ui/forms/messages/messageBox";
import { verify } from "@/utils/supabase/account/auth";
import { Button } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactElement, Suspense, useEffect, useState } from "react";

/// Home Page
export default function Home() {
    return (<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <Suspense fallback={<LoadingWheel />}>
            <Content />
        </Suspense>
    </div>);
}



/// Home Page Content
function Content() : ReactElement {
    const router = useRouter();
    const params = useSearchParams();
    const token = params.get("token");
    const email = params.get("email");

    // Page States
    const [ error, setError ] = useState<boolean>(false);



    // Verifies user
    useEffect(() => {
        (async() => {
            if(!email || !token) return;

            // Verify user and changes page to login
            const res = await verify(email, token);
            if(res) router.push("/account/login");
            setError(true); // There is only one possible error on this page
        })()
    }, []);



    // Content
    return(<div>
        {error && <MessageBox
            className="relative w-96 bg-white rounded-lg shadow dark:bg-gray-700"
            title="Invalid Token"
            message={"The verification token was invalid"}>
          <Button variant="outlined" href="/">Close</Button>
        </MessageBox>}

        {/* Main Content */}
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <a href="/chapters" className="bg-blue-800 hover:bg-blue-900 text-center w-64 h-8 rounded-2xl m-auto">
            {"-->"} Kapitel Listan
          </a>
        </main>
    </div>);
}
