"use client";
import MathTextEditorManager from "@/utils/textEditor/mathTextEditor";
import { ReactElement, useEffect, useRef } from "react";

/**
 * Props for the math canvas
 */
type MathCanvasProps = {
    /**
     * Canvas Class
     */
    className?: string

    /**
     * Event for text changes
     */
    onTextChange?: (text: string) => void
}



/**
 * Math canvas Element
 */
export default function MathCanvas(props: MathCanvasProps) : ReactElement {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const managerRef = useRef<MathTextEditorManager>(null);


    // Canvas logic
    useEffect(() => {
        if(canvasRef.current) {
            managerRef.current = new MathTextEditorManager(canvasRef.current, props.onTextChange);
            managerRef.current.render();
        }


        // Cleanup
        return () => {
            managerRef.current?.close();
        }
    }, [props.onTextChange]);


    // Canvas Object
    return(<canvas ref={canvasRef} tabIndex={0} className={props.className} />);
}
