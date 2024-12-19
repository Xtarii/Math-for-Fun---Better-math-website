"use client"
import LoadingWheel from "@/components/loading/wheel";
import { login } from "@/utils/supabase/account/auth";
import { useRouter } from "next/navigation";
import { FormEvent, ReactElement, useState } from "react";

export default function Login() : ReactElement {
    const router = useRouter();
    const [ load, setLoad ] = useState<boolean>(false);
    const [ error, setError ] = useState<string>();



    /// Handles Submit events
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoad(true); // Starts loading
        const data = new FormData(event.currentTarget);
        const email = data.get("email")?.toString();
        const password = data.get("password")?.toString();
        if(!email || !password) { // Error Message on login
            setError("Could not get account information");
            setLoad(false);
            return;
        }

        // Tries to login
        const res = await login(email, password);
        if(res === null) setError("Wrong account details");
        setLoad(false); // Stops loading
        router.push("/account"); // Goes to account page
    }



    // Login Form
    return(<div>
        {load && <LoadingWheel />}

        {/* Content */}
        <form onSubmit={handleSubmit}>
            <input
                className="text-gray-900"

                name="email"
                type="email"
                placeholder="Email"
                required
            >
            </input>
            <input
                className="text-gray-900"

                name="password"
                type="password"
                placeholder="password"
                required
            >
            </input>

            <button type="submit">Login</button>
            {error && <p className="text-red-500">
                {error}
            </p>}
        </form>
    </div>);
}
