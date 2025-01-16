import SignUp from "@/components/ui/auth/account/signup";
import { ReactElement } from "react";

export default function Page() : ReactElement {
    return(<div className="w-full h-full flex">
        <SignUp className="m-auto w-[40rem] h-[32rem]" />
    </div>);
}
