import { LinearProgress } from "@mui/material";
import { ReactElement } from "react";

/**
 * Loading Line
 *
 * Loading line that will cover the screen,
 * this will make the user unable to use
 * any elements on the page.
 */
export default function Loader() : ReactElement {
    return(<div className="fixed inset-0 bg-black bg-opacity-50 pointer-events-auto z-50">
        <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
            <LinearProgress className="w-96" color="info" />
        </div>
    </div>);
}
