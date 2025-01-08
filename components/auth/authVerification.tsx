"use client"
import { ReactElement, ReactNode, useEffect, useState } from "react";
import MessageBox from "../ui/forms/messages/messageBox";
import { Button } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { verify } from "@/utils/supabase/account/auth";

/**
 * Authentication Verification Element
 */
export default function AuthenticationVerification({ children, className } : { children?: ReactNode, className?: string }) : ReactElement {
    const router = useRouter();
    const params = useSearchParams();
    const token = params.get("token");
    const email = params.get("email");

    // Page States
    const [ error, setError ] = useState<boolean>(false);
    useEffect(() => {
        (async() => {
            if(!email || !token) return;

            // Verify user and changes page to login
            const res = await verify(email, token);
            if(res) router.push("/account/login");
            setError(true); // There is only one possible error on this page
        })()
    }, []);



    /// Element Content
    return(<div className={className}>
        {children}
        {error && <MessageBox
            className="relative w-96 bg-white rounded-lg shadow dark:bg-gray-700"
            title="Invalid Token"
            message={"The verification token was invalid"}>
          <Button variant="outlined" href="/">Close</Button>
        </MessageBox>}
    </div>);
}
