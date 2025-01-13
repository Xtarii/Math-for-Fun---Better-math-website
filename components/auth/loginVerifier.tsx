"use client"
import { getUser } from "@/utils/supabase/account/auth";
import { usePathname, useRouter } from "next/navigation";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import Loader from "../ui/load/loader";

/**
 * Login Verifier Element
 *
 * If the client is not logged in
 * then this will redirect the client
 * to the ```login``` page.
 *
 * If redirect is not null the login
 * page will redirect to what page the
 * redirect is pointing to.
 * If redirect is ```this``` then it
 * will be redirected back to the page
 * that had this element.
 *
 * ```tsx
 * <LoginVerifier redirect="/my/page" /> // Redirects to page
 *
 * <LoginVerifier redirect="this" /> // Will be redirected to this page
 * ```
 */
export default function LoginVerifier({ children, className, loader, redirect }: { children?: ReactNode, className?: string, loader?: boolean, redirect?: string }) : ReactElement;
/**
 * Login Verifier Element
 *
 * If the client is not logged in
 * then this will redirect the client
 * to the ```login``` page.
 *
 * If redirect is not null the login
 * page will redirect to what page the
 * redirect is pointing to.
 * If redirect is ```this``` then it
 * will be redirected back to the page
 * that had this element.
 *
 * ```tsx
 * <LoginVerifier redirect="/my/page" /> // Redirects to page
 *
 * <LoginVerifier redirect="this" /> // Will be redirected to this page
 * ```
 */
export default function LoginVerifier({ children, className, loader, redirect }: { children?: ReactNode, className?: string, loader?: boolean, redirect?: "this" }) : ReactElement;
export default function LoginVerifier({ children, className, loader, redirect }: { children?: ReactNode, className?: string, loader?: boolean, redirect?: "this" | string }) : ReactElement {
    const router = useRouter();
    const [ load, setLoad ] = useState<boolean>(loader || false);
    const urlRedirect = redirect ? "?redirect=" + (redirect === "this" ? usePathname() : redirect) : "";


    // Login Verifier
    useEffect(() => {
        (async () => {
            const user = await getUser();
            if(!user) {
                router.push("/account/login" + urlRedirect);
                return;
            }
            setLoad(false);
        })()
    }, [])



    // Content
    return(<div className={className}>
        {load && <Loader />}
        {!load && children}
    </div>);
}
