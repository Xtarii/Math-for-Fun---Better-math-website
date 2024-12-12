import { MouseEvent, ReactElement } from "react";

/**
 * Submit Panel Element
 */
export default function SubmitPanel(props: {status: number, onClick?: (event: MouseEvent<Element>) => void}) : ReactElement {
    // Color Picker
    const getColor = (status: number): string => {
        if (status <= 25) return "#9b0000";
        if (status <= 40) return "#de0c78";
        if (status <= 50) return "#bb2693";
        if (status <= 65) return "#0c26ca";
        if (status <= 80) return "#4d64f4";
        if (status <= 90) return "#1181c4";
        return "#72c2f2";
    };

    const color = getColor(props.status);



    // Panel Object
    return(<div className="flex flex-wrap w-96 m-auto">
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
                backgroundColor: color,

                transitionProperty: "width, background-color"
            }}></div>
        </div>
    </div>);
}
