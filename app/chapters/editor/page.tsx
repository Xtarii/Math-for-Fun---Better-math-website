"use client"
import Loader from "@/components/ui/load/loader";
import { getUser } from "@/utils/supabase/account/auth";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";

export default function Editor() : ReactElement {
    const router = useRouter();
    const [ load, setLoad ] = useState<boolean>(true);



    // Checks account
    useEffect(() => {
        (async () => {
            // Anonyms users can't add content
            if(!await getUser()) router.push("/account/login");
            setLoad(false);
        })()
    }, [router]);



    // Content
    return(<div>
        {load && <Loader />}
        <button onClick={() => router.push("/chapters/editor/new")}>New</button>
    </div>);
}
