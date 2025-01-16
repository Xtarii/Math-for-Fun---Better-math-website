import { createTheme, Theme as T } from "@mui/material";
import { teal } from "@mui/material/colors";

/**
 * Creates Theme Object
 *
 * @param dark Dark Theme
 * @returns Theme
 */
export function getTheme() : T {
    return createTheme({
        defaultColorScheme: "dark",
        colorSchemes: { dark: true, light: true },

        // Color Configuration
        palette: {
            success: teal
        }
    })
}
