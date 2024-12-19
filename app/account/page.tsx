"use client"
import LoadingWheel from "@/components/loading/wheel";
import { getUser, signOut } from "@/utils/supabase/account/auth";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";

export default function Account() : ReactElement {
    const router = useRouter();
    const [ load, setLoad ] = useState<boolean>(true);
    const [ user, setUser ] = useState<User>();


    // Account Data
    useEffect(() => {
        (async () => {
            const user = await getUser();
            if(!user) {
                router.push("/account/login"); // Redirects to login
                setLoad(false);
                return;
            }

            // Sets user data
            setUser(user);
            setLoad(false);
        })()
    })



    // Page Content
    return(<div>
        {load && <LoadingWheel />}


        {/* Page content */}
        <div className="w-screen h-screen flex">
            <h1>Welcome user : {user?.email}</h1>

            <button onClick={async () => {
                setLoad(true);
                await signOut()

                setLoad(false);
            }}>Sign Out</button>
        </div>
    </div>);
}
