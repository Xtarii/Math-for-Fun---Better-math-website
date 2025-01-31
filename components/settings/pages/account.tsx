import LoginVerifier from "@/components/auth/loginVerifier";
import { useSession } from "@/components/hooks/user/session";
import MessageBox from "@/components/ui/forms/messages/messageBox";
import { signOut } from "@/utils/supabase/account/auth";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { ReactElement, useState } from "react";

/**
 * Account Page
 */
export default function AccountPage() : ReactElement {
    const router = useRouter();
    const [ session, setSession ] = useSession();

    const [ error, setError ] = useState<boolean>(false);



    // Content
    return(<div className="my-4">
        <LoginVerifier redirect="this" />
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
        <div className="w-fit mx-4 flex">
            <div className="mr-2">
                <Button variant="outlined" color="warning" onClick={async () => {
                    await signOut();
                    setSession(null);
                }}>Sign Out</Button>
            </div>
            <div className="ml-2">
                <Button variant="contained" color="error" onClick={async (e) => {
                    e.preventDefault();
                    if(!session || !session.user?.id) {
                        setError(true);
                        return;
                    }

                    // Deletes user
                    const response: { message: "success" | "error" } = await (await fetch('/api/account', {
                        method: 'DELETE',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id: session.user.id }),
                    })).json();
                    if(response.message === "success") {
                        await signOut("global");
                        setSession(null);
                    }
                    setError(true);
                }}>Delete Account</Button>
            </div>
        </div>
    </div>);
}
