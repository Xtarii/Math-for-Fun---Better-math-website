"use client"
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ReactElement, ReactNode, Suspense, useEffect, useMemo } from "react";
import Loader from '../ui/load/loader';
import { NextAppProvider } from '@toolpad/core/nextjs';
import { getTheme } from '@/utils/mui/theme';
import { DashboardLayout } from '@toolpad/core';
import { Navigator } from '../navigation/navigation';
import { getUser, getUserProfile, signOut as logOut } from '@/utils/supabase/account/auth';
import { useRouter } from 'next/navigation';
import { useSession } from '../hooks/user/session';

/**
 * Base Element
 *
 * A wrapper of the MUI toolpad core.
 * This will wrap global MUI configuration
 * elements for layout components.
 */
export default function Base({ children }: { children?: ReactNode }) : ReactElement {
    const router = useRouter();
    const [ session, setSession ] = useSession();



    // Auth
    const authentication = useMemo(() => {
        return{
            signIn: () => router.push("account/login"),
            signOut: async () => {
                await logOut();
                setSession(null);
            }
        }
    }, [])



    // Handles Auto sign in
    useEffect(() => {
        (async() => {
            // if(session) return; // Returns if there is an session
            const user = await getUser();
            const userData = await getUserProfile();
            if(!user || !userData) return; // Returns if there is no account found

            // Sets User
            setSession({
                user: {
                    name: userData.username,
                    email: userData.email,
                }
            })
        })()
    }, [])



    // Base Content
    return(<AppRouterCacheProvider options={{ enableCssLayer: false }}>
        <Suspense fallback={<Loader/>}>
            <NextAppProvider
                theme={getTheme()}
                navigation={Navigator}
                branding={{
                    logo: <div className="w-full h-full flex"><img className="size-8 m-auto" src="/logo.png" alt="MathSpire Logo" /></div>,
                    title: "MathSpire",
                    homeUrl: "/"
                }}

                session={session}
                authentication={authentication}
            >
                <DashboardLayout defaultSidebarCollapsed>
                    {children}
                </DashboardLayout>
            </NextAppProvider>
        </Suspense>
    </AppRouterCacheProvider>);
}
