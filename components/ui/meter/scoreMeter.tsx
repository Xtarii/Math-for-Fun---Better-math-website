import { blue, cyan, pink, red } from "@mui/material/colors";
import { ReactElement } from "react";

/**
 * Line Meter
 */
export default function ScoreMeter({ className, value }: { className?: string, value: number }) : ReactElement {
    const getColor = (status: number): string => {
        if (status <= 25) return red[900];
        if (status <= 40) return pink.A200;
        if (status <= 50) return pink[300];
        if (status <= 65) return blue[800];
        if (status <= 80) return blue[400];
        if (status <= 90) return cyan[600];
        return cyan.A200;
    };
    const color = getColor(value);



    // Content
    return(<div className={className}>
        <div className="w-full rounded-full h-full bg-gray-200 dark:bg-gray-700">
            <div className="h-2.5 rounded-full transition-all duration-700 ease-in-out" style={{
                width: `${value}%`,
                backgroundColor: color,
                transitionProperty: "width, background-color"
            }}></div>
        </div>
    </div>);
}
