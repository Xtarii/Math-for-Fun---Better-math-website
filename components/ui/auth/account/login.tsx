"use client"
import { getUserProfile, login } from "@/utils/supabase/account/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactElement, useState } from "react";
import Loader from "../../load/loader";
import { useSession } from "@/components/hooks/user/session";

/**
 * Login Element for Supabase Authentication
 *
 * If there is a ```redirect``` parameter
 * in the search url this login will result
 * in a redirection to that page.
 * ##### Example URL:
 * ```account/login?redirect=/chapters```
 */
export default function Login({ className } : { className?: string }) : ReactElement {
    const router = useRouter();
    const params = useSearchParams();
    const [ session, setSession ] = useSession();

    // Search Params for login
    const redirect = params.get("redirect");

    // States
    const [ load, setLoad ] = useState<boolean>(false);
    const [ error, setError ] = useState<string>();
    const [ email, setEmail ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");



    // Login Handler
    const handleLogin = async () => {
        setLoad(true);
        setError(undefined);

        // Login to the account
        const user = await login(email, password);
        const userData = await getUserProfile();
        if(!user || !userData) {
            setError("Could not complete login");
            setLoad(false);
            return;
        }

        // Redirect to redirect or account as default
        setSession({
            user: {
                name: userData.username,
                email: userData.email,
                id: user.id
            }
        });
        router.push(redirect || "/account");
    }



    // Login Content
    return(<div className={className}>
        {load && <Loader />}
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Logga in till ditt konto
                </h1>
                <form action={handleLogin} className="space-y-4 md:space-y-6">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lösenord</label>
                        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Logga in</button>
                        {error && <p className="mt-2 ml-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
                    </div>

                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Inget konto än? <a href="/account/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Skapa konto</a>
                    </p>
                </form>
            </div>
        </div>
    </div>);
}
