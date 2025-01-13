import { green, purple, teal } from "@mui/material/colors";
import { ReactElement } from "react";

/**
 * Difficulty Meter
 */
export default function DifficultyMeter({ className, value }: { className?: string, value: number }) : ReactElement {
    return(<div className={className}>
        <div className="w-full h-full rounded-full flex shadow cursor-default" style={{
            backgroundColor: value === 1 ? teal[300] :
            value === 2 ? green.A200 :
            value === 3 ? teal[600] : purple[600]
        }}>
            <p className="m-auto text-center text-gray-900">{value}</p>
        </div>
    </div>);
}
