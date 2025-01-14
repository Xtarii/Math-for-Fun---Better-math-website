import { LinearProgress } from "@mui/material";
import { ReactElement } from "react";

/**
 * Loading bar element
 *
 * A loading bar, the user will still be
 * able to interact with site content.
 *
 * This will only cover the parent
 * object and make the parent object
 * non-interactive.
 */
export default function LocalLoader() : ReactElement {
    return(<div className="relative w-full h-full inset-0 bg-black bg-opacity-50 pointer-events-auto z-10 flex items-center justify-center">
        <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
            <LinearProgress className="md:w-96 w-52" color="info" />
        </div>
    </div>);
}
