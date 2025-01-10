"use client"
import AuthenticationVerification from "@/components/auth/authVerification";
import Loader from "@/components/ui/load/loader";
import { Suspense } from "react";

/// Home Page
export default function Home() {
    return (<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <Suspense fallback={<Loader />}>
            <AuthenticationVerification />
        </Suspense>



        {/* Main Content */}
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <a href="/chapters" className="bg-blue-800 hover:bg-blue-900 text-center w-64 h-8 rounded-2xl m-auto">
                {"-->"} Kapitel Listan
            </a>



            {/* Contact info */}
            <div>
                <p>Några problem eller buggar på hemsidan?</p>
                <p>Ta gärna kontakt med mig, <span className="text-blue-500">alvin.hansen@elev.ga.ntig.se</span></p>
            </div>
        </main>
    </div>);
}
