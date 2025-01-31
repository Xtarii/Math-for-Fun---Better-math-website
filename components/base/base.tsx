"use client"
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ReactElement, ReactNode, Suspense, useMemo } from "react";
import Loader from '../ui/load/loader';
import { NextAppProvider } from '@toolpad/core/nextjs';
import { getTheme } from '@/utils/mui/theme';
import { DashboardLayout } from '@toolpad/core';
import { Navigator } from '../navigation/navigation';
import { signOut as logOut } from '@/utils/supabase/account/auth';
import { useRouter } from 'next/navigation';
import { useSession } from '../hooks/user/session';
import { dashboardSlots } from '../navigation/slots';

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
                <DashboardLayout slots={dashboardSlots} defaultSidebarCollapsed>
                    {children}
                </DashboardLayout>
            </NextAppProvider>
        </Suspense>
    </AppRouterCacheProvider>);
}
