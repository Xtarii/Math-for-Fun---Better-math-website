import { createTheme, Theme as T } from "@mui/material";
import { teal } from "@mui/material/colors";

/**
 * Creates Theme Object
 *
 * @param dark Dark Theme
 * @returns Theme
 */
export function Theme(dark: boolean) : T {
    return createTheme({
        colorSchemes: {
            dark
        },

        // Color Configuration
        palette: {
            success: teal
        }
    })
}
