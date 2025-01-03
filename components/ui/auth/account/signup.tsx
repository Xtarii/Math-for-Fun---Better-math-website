"use client"
import LoadingWheel from "@/components/loading/wheel";
import { useRouter } from "next/navigation";
import { ReactElement, useState } from "react";

/**
 * Sign Up Element for Supabase Authentication
 */
export default function SignUp({ className } : { className?: string }) : ReactElement {
    const router = useRouter();

    // States
    const [ load, setLoad ] = useState<boolean>(false);
    const [ error, setError ] = useState<string>();

    const [ username, setUsername ] = useState<string>("");
    const [ email, setEmail ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");



    // Sign Up Handler
    const handleSignUp = async () => {
        setLoad(true);
        setError(undefined);

        // Sign Up to new account

        // Redirect
        router.push("/account");
    }



    // Sign Up Content
    return(<div className={className}>
        {load && <LoadingWheel />}
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create account
                </h1>
                <form action={handleSignUp} className="space-y-4 md:space-y-6">
                    <div className="flex">
                        <div className="mr-1">
                            <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input type="text" name="text" id="text" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required />
                        </div>
                        <div className="ml-1">
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
