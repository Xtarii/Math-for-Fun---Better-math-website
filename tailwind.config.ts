import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        "slate-variant": "#0F1F25",
        "grayish": "#2a2e35",

        "blue-var": "#1181c4",
        "blue-var-hover": "#0d6091",
        "blu-var2": "#72c2f2",
        "blue-var3": "#4d64f4",

        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"},
      },
    },
  },
  plugins: [],
} satisfies Config;
