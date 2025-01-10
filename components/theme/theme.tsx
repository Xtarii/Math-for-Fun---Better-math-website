"use client"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ReactElement, ReactNode } from "react";
import { Theme as theme } from "@/utils/mui/theme";

/**
 * Custom Theme Provider
 */
export default function Theme({ children }: { children: ReactNode }) : ReactElement {
    return(<ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>);
}
