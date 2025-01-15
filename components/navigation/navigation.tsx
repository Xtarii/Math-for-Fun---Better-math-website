import DashboardIcon from '@mui/icons-material/Dashboard';
import { Navigation } from "@toolpad/core";

/**
 * Page Navigation
 */
export const Navigator: Navigation = [
    {
        kind: "header",
        title: "Navigering"
    },

    // Pages
    {
        segment: "",
        title: "Hem",
        icon: <DashboardIcon/>
    }
]
