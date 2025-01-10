"use client"
import { resendVerification, signUp } from "@/utils/supabase/account/auth";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import MessageBox from "../../forms/messages/messageBox";
import { Button } from "@mui/material";
import Loader from "../../load/loader";

/**
 * Sign Up Element for Supabase Authentication
 */
export default function SignUp({ className } : { className?: string }) : ReactElement {
    const router = useRouter();

    // States
    const [ load, setLoad ] = useState<boolean>(false);
    const [ showMessage, setShowMessage ] = useState<boolean>(false);
    const [ error, setError ] = useState<string>();

    const [ canResend, setCanResend ] = useState<boolean>(false);
    const [ timeLeft, setTimeLeft ] = useState<number>(60); // Count down is 60 sec or 1 min
    const [ countDown, setCountDown ] = useState<boolean>(false);

    const [ username, setUsername ] = useState<string>("");
    const [ email, setEmail ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");



    // Count Down Handler
    useEffect(() => {
        if(!countDown) return; // Can only pass if there is an countdown
        if(timeLeft <= 0) {
            setCanResend(true);
            setCountDown(false); // Stops countdown
            return;
        }
        const timer = setTimeout(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        // Cleanup
        return () => clearTimeout(timer);
    }, [timeLeft, canResend, countDown])

    // Sign Up Handler
    const handleSignUp = async () => {
        setLoad(true);
        setError(undefined);

        // Sign Up to new account
        const res = await signUp(username, email, password);
        if(!res) {
            setError("Could not complete sign up");
            setLoad(false);
            return;
        }


        // Sign up message
        setShowMessage(true);
        setCanResend(false);
        setCountDown(true); // Starts Count Down
        setTimeLeft(60); // Reset to 1 min
        setLoad(false);
    }



    // Sign Up Content
    return(<div className={className}>
        {load && <Loader />}
        {showMessage && <MessageBox
            className="relative w-96 bg-white rounded-lg shadow dark:bg-gray-700"
            title="Confirm Email"
            message='A verification mail has been sent to your email,
                please verify your email address and login to your new account.'>

            <div className="flex">
                <p className="my-auto mr-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{timeLeft} Sec</p>
                <Button disabled={!canResend} onClick={async (e) => {
                    e.preventDefault();
                    setLoad(true);

                    // Resend verification mail
                    await resendVerification(email);

                    // Resets countdown
                    setCanResend(false);
                    setCountDown(true); // Starts Count Down
                    setTimeLeft(60); // Reset to 1 min
                    setLoad(false);
                }}>
                    Resend mail
                </Button>
            </div>
        </MessageBox>}
        <div className="w-full h-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-full">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create account
                </h1>
                <form action={handleSignUp} className="space-y-4 md:space-y-6 w-full">
                    <div className="flex w-full">
                        <div className="mr-1 w-2/4">
                            <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input type="text" name="text" id="text" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required />
                        </div>
                        <div className="ml-1 w-2/4">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
                            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
                        {error && <p className="mt-2 ml-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
                    </div>

                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account? <a href="/account/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</a>
                    </p>
                </form>
            </div>
        </div>
    </div>);
}
