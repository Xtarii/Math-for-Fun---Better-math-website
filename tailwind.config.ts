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
      },
    },
  },
  plugins: [],
} satisfies Config;
