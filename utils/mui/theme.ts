import { createTheme, Theme as T } from "@mui/material";
import { blueGrey, grey, teal } from "@mui/material/colors";

/**
 * Creates Theme Object
 *
 * @param dark Dark Theme
 * @returns Theme
 */
export function Theme(dark: boolean) : T {
    return createTheme({
        palette: {
            // Site Theme Mode
            mode: dark ? "dark" : "light",
            background: {
                default: dark ? blueGrey[900] : grey[50],
                paper: dark ? blueGrey[900] : grey[50]
            },



            // Color Configuration
            success: teal
        }
    })
}
