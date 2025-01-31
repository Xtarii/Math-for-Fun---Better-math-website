"use client"
import LoginVerifier from "@/components/auth/loginVerifier";
import { useSession } from "@/components/hooks/user/session";
import MessageBox from "@/components/ui/forms/messages/messageBox";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { ReactElement, useState } from "react";

export default function Account() : ReactElement {
    const router = useRouter();
    const [ session, setSession ] = useSession();
    const [ error, setError ] = useState<boolean>(false);



    // Page Content
    return(<div>
        <LoginVerifier />
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
        <div className="w-full h-full flex flex-wrap">
            <h1>Välkommen : {session?.user?.name}</h1>
        </div>
    </div>);
}
