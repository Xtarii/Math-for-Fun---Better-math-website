import { MouseEvent, ReactElement } from "react";

/**
 * Submit Panel Element
 */
export default function SubmitPanel(props: {status: number, onClick?: (event: MouseEvent<Element>) => void}) : ReactElement {
    const color = props.status < 35 ? "red" : props.status < 65 ? "yellow" : "lime"; // Dynamic Colors



    // Panel Object
    return(<div className="flex flex-wrap w-96">
        {/* Controls */}
        <div className="w-full flex justify-center">
            <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"

                // Events
                onClick={props.onClick}
            >
                Svara
            </button>
        </div>

        {/* Score Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="h-2.5 rounded-full" style={{
                width: `${props.status}%`,
                backgroundColor: color
            }}></div>
        </div>
    </div>);
}
