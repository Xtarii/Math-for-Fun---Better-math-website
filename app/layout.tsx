import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { title } from "@/utils/config";
import Base from "@/components/base/base";
import { SessionProvider } from "@/components/hooks/user/session";

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

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (<html lang="en">
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
      <SessionProvider>
        <Base>
          {children}
        </Base>
      </SessionProvider>
    </body>
  </html>);
}
