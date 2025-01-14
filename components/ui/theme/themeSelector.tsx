"use client"
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, useColorScheme } from "@mui/material";
import { ReactElement } from "react";

/**
 * Theme Selector Element
 *
 * This will throw an Error if not
 * loaded on client side. It will
 * not load on server side.
 */
export default function ThemeSelector({ className }: { className?: string }) : ReactElement {
    const { mode, setMode } = useColorScheme();



    // Theme Switch Function
    const switchTheme = (theme: "system" | "light" | "dark") => { setMode(theme) }



    // Content
    return(<div className={className}>
        <FormControl>
            <FormLabel id="theme-toggle">Theme</FormLabel>
            <RadioGroup
            aria-labelledby="theme-toggle"
            name="theme-toggle"
            row
            value={mode}
            onChange={(event) => switchTheme(event.target.value as "system" | "light" | "dark")}>
                <FormControlLabel value="system" control={<Radio />} label="System" />
                <FormControlLabel value="light" control={<Radio />} label="Light" />
                <FormControlLabel value="dark" control={<Radio />} label="Dark" />
            </RadioGroup>
        </FormControl>
    </div>);
}
