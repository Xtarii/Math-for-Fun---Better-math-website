import Login from "@/components/ui/auth/account/login";
import { ReactElement } from "react";

export default function Page() : ReactElement {
    return(<div className="w-screen h-screen flex">
        <Login className="m-auto w-[32rem] h-[32rem]" />
    </div>);
}
