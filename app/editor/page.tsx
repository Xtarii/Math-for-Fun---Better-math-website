"use client"
import LoginVerifier from "@/components/auth/loginVerifier";
import { Button } from "@mui/material";
import { ReactElement } from "react";

export default function Editor() : ReactElement {
    return(<div>
        <LoginVerifier redirect="this" />

        <div className="flex w-full h-full min-h-96">
            <Button style={{
                margin: "auto"
            }} variant="outlined" href="/editor/new">Ny Uppgift</Button>
        </div>
    </div>);
}
