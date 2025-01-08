import LoadingWheel from "@/components/loading/wheel";
import Login from "@/components/ui/auth/account/login";
import { ReactElement, Suspense } from "react";

export default function Page() : ReactElement {
    return(<div className="w-screen h-screen flex">
        <Suspense fallback={<LoadingWheel />}>
            <Login className="m-auto w-[32rem] h-[32rem]" />
        </Suspense>
    </div>);
}
