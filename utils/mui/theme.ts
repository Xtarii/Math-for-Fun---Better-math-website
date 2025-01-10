import { createTheme } from "@mui/material";
import { blueGrey, teal } from "@mui/material/colors";

export const Theme = createTheme({
    palette: {
        // Site Theme Mode
        mode: "dark",
        background: {
            default: blueGrey[900],
            paper: blueGrey[900]
        },



        // Color Configuration
        success: teal
    }
})
