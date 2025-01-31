"use client"
import SettingsPageNavigator, { Pages } from "@/components/settings/settingsPageNavigator";
import { List, ListItemButton } from "@mui/material";
import { ReactElement, useState } from "react";

export default function Settings() : ReactElement {
    const [ page, setPage ] = useState<string>(Pages.general.id);



    // Settings Page
    return(<div className="w-full h-fit flex">
        <div className="w-2/12">
            <h1>Inställningar</h1>

            <List>
                <ListItemButton onClick={() => setPage(Pages.general.id)}>General</ListItemButton>
                <ListItemButton onClick={() => setPage(Pages.theme.id)}>Theme</ListItemButton>
                <ListItemButton onClick={() => setPage(Pages.account.id)}>Account</ListItemButton>
            </List>
        </div>
        <div className="w-10/12">
            <SettingsPageNavigator className="" page={page as keyof typeof Pages} />
        </div>
    </div>);
}
