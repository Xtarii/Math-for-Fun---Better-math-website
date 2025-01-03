import SignUp from "@/components/ui/auth/account/signup";
import { ReactElement } from "react";

export default function Page() : ReactElement {
    return(<div className="w-screen h-screen flex">
        <SignUp className="m-auto w-[32rem] h-[32rem]" />
    </div>);
}
