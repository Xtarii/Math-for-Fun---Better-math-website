"use client" // This is a client component, but the parent element may not include this
import { KeyboardEvent, ReactElement, useEffect, useRef, useState } from "react";



export default function MathTextEditor(props: { onUpdateText?: (arg: string) => void }) : ReactElement {
    const ref = useRef<HTMLCanvasElement>(null);
    const [ text, setText ] = useState("");



    const drawText = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.font = "16px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(text, 10, 30);
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLCanvasElement>) => {
        e.preventDefault();


        console.log(e.key); // DEBUG


        // Handles Input
        if(e.key === "Backspace") {
            setText((prev) => prev.slice(0, -1));
        }else if(e.key.length === 1) {
            setText((prev) => prev + e.key);
        }
    }
    const handleCanvasClick = () => { if(ref.current) ref.current.focus(); }



    // Updates Renderer
    useEffect(() => {
        // Updates Text
        if(props.onUpdateText) props.onUpdateText(text);


        // Render
        if (!ref.current) return;
        const canvas: HTMLCanvasElement = ref.current;
        const ctx = canvas.getContext("2d");
        if (ctx) drawText(ctx); // Draw text on canvas whenever `text` changes
    }, [text]);



    return(<div>
        <canvas
            ref={ref}
            tabIndex={0}

            className="border-solid border-2 border-sky-500"


            // Events
            onClick={handleCanvasClick}
            onKeyDown={handleKeyDown}
        />
    </div>);
}
