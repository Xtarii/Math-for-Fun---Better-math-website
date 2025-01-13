"use client"
import LoginVerifier from "@/components/auth/loginVerifier";
import { Button } from "@mui/material";
import { ReactElement } from "react";

export default function Editor() : ReactElement {
    return(<div>
        <LoginVerifier redirect="this" />

        <div className="flex w-screen h-fit min-h-96">
            <Button className="m-auto" variant="outlined" href="/chapters/editor/new">Ny Uppgift</Button>
        </div>
    </div>);
}
