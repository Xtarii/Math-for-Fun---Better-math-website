"use client"
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ReactElement, ReactNode, Suspense } from "react";
import Loader from '../ui/load/loader';
import { NextAppProvider } from '@toolpad/core/nextjs';
import { Theme } from '@/utils/mui/theme';
import { useMediaQuery } from '@mui/material';
import { DashboardLayout } from '@toolpad/core';
import { Navigator } from '../navigation/navigation';

/**
 * Base Element
 *
 * A wrapper of the MUI toolpad core.
 * This will wrap global MUI configuration
 * elements for layout components.
 */
export default function Base({ children }: { children?: ReactNode }) : ReactElement {
    return(<AppRouterCacheProvider options={{ enableCssLayer: false }}>
        <Suspense fallback={<Loader/>}>
            <NextAppProvider
                theme={Theme(useMediaQuery("(prefers-color-scheme: dark)"))}
                navigation={Navigator}
                branding={{
                    logo: <div className="w-full h-full mr-4 flex"><img className="size-7 m-auto" src="/logo.png" alt="MathSpire Logo" /></div>,
                    title: "MathSpire",
                    homeUrl: "/"
                }}
            >
                <DashboardLayout defaultSidebarCollapsed>
                    {children}
                </DashboardLayout>
            </NextAppProvider>
        </Suspense>
    </AppRouterCacheProvider>);
}
