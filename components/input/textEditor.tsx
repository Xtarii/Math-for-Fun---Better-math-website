"use client" // This is a client component, but the parent element may not include this
import { ReactElement } from "react";
import MathCanvas from "./canvas/mathCanvas";



/**
 * Math Text Editor Element
 */
export default function MathTextEditor(props: { className?: string, onUpdateText?: (arg: string) => void }) : ReactElement {
    // Editor Body
    return(<div className={props.className}>
        <MathCanvas
            className="border-solid border-l-2 border-gray-500 w-full h-full"
            onTextChange={props.onUpdateText}
        />
    </div>);
}
