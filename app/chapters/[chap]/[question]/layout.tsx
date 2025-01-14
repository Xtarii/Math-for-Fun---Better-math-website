import Theme from "@/components/theme/theme";
import { title } from "@/utils/config";
import { StyledEngineProvider } from "@mui/material";
import { Metadata } from "next";
import localFont from "next/font/local";
import { ReactElement, ReactNode } from "react";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: title,
    description: "A more interactive way of learning math",
};



// Page Layouts
export default function QuestionLayout({ children }: Readonly<{ children: ReactNode }>) : ReactElement {
    return(<html lang="sv">
        <StyledEngineProvider injectFirst>
            <Theme>
                {children}
            </Theme>
        </StyledEngineProvider>
    </html>);
}
