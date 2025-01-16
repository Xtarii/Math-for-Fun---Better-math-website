import EditNoteIcon from '@mui/icons-material/EditNote';
import MenuBookIcon from '@mui/icons-material/MenuBook';
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
        icon: <DashboardIcon />
    },
    {
        segment: "chapters",
        title: "Kapitel",
        icon: <MenuBookIcon />,
        pattern: "chapters{/:chap}*"
    },
    { kind: "divider" },



    // Account Pages
    {
        kind: "header",
        title: "Användare"
    },
    {
        segment: "editor",
        title: "Editerare",
        icon: <EditNoteIcon />,
        pattern: "editor{/:edit}*"
    },
]
