"use client" // This is a client component, but the parent element may not include this
import { ReactElement } from "react";
import MathCanvas from "./canvas/mathCanvas";



export default function MathTextEditor(props: { onUpdateText?: (arg: string) => void }) : ReactElement {
    // Editor Body
    return(<div className="h-screen w-2/5 absolute right-0">
        <MathCanvas
            className="border-solid border-l-2 border-gray-500 w-full h-full"
            onTextChange={props.onUpdateText}
        />
    </div>);
}
