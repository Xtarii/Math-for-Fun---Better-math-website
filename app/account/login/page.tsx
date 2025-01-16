import Login from "@/components/ui/auth/account/login";
import Loader from "@/components/ui/load/loader";
import { ReactElement, Suspense } from "react";

export default function Page() : ReactElement {
    return(<div className="w-full h-full flex">
        <Suspense fallback={<Loader />}>
            <Login className="m-auto w-[32rem] h-[32rem]" />
        </Suspense>
    </div>);
}
