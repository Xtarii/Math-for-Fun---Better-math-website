"use client"
import LoadingWheel from "@/components/loading/wheel";
import MessageBox from "@/components/ui/forms/messages/messageBox";
import { getUser, signOut } from "@/utils/supabase/account/auth";
import { Button } from "@mui/material";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";

export default function Account() : ReactElement {
    const router = useRouter();
    const [ load, setLoad ] = useState<boolean>(true);
    const [ user, setUser ] = useState<User>();
    const [ error, setError ] = useState<boolean>(false);


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
        {error && <MessageBox
            className="relative bg-white rounded-lg shadow dark:bg-gray-700"
            title="Invalid Request"
            message='Could not delete your account, an error occurred! Try again later.'>
                <Button variant="outlined" color="error" onClick={(e) => {
                    e.preventDefault();
                    setError(false);
                    router.refresh();
                }}>Close</Button>
        </MessageBox>}


        {/* Page content */}
        <div className="w-screen h-screen flex flex-wrap">
            <h1>Welcome user : {user?.email}</h1>



            <div className="w-full mx-4 flex">
                <div className="mr-2">
                    <Button variant="outlined" color="warning" onClick={async () => {
                        setLoad(true);
                        await signOut();
                        router.push("/account/login");
                        setLoad(false);
                    }}>Sign Out</Button>
                </div>
                <div className="ml-2">
                    <Button variant="contained" color="error" onClick={async (e) => {
                        e.preventDefault();
                        if(!user) {
                            setError(true);
                            return;
                        }
                        setLoad(true);

                        // Deletes user
                        const response: { message: "success" | "error" } = await (await fetch('/api/account', {
                            method: 'DELETE',
                            headers: {
                            'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ id: user.id }),
                        })).json();
                        if(response.message === "success") {
                            await signOut("global");
                            router.push("/account/login");
                        }
                        setError(true);
                        setLoad(false);
                    }}>Delete Account</Button>
                </div>
            </div>
        </div>
    </div>);
}
