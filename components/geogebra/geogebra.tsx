"use client";
import { ReactElement, useEffect } from "react";

/**
 * GeoGebra Element
 */
export default function GeoGebra(props: { className?: string, width?: number, height?: number }) : ReactElement {
    // Loads GeoGebra
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.geogebra.org/apps/deployggb.js"
        script.async = true;

        // Appends GeoGebra on script load
        script.onload = () => {
            if(typeof window === "undefined" || !window.GGBApplet) return;
            const params = { // GeoGebra parameters
                name: "graphing",
                showToolbar: true,
                showAlgebraInput: true,
                showMenuBar: true,

                width: props.width || window.innerWidth,
                height: props.height || window.innerHeight
            }
            const applet = new window.GGBApplet(params, true);
            applet.inject("ggb-element"); // Inserts Instance to element
        };

        // Adds to body and returns Dispose function
        document.body.appendChild(script);
        return () => { document.body.removeChild(script); }
    }, []); // Hooks to mount, default is rendering


    // Holder
    return(<div className={props.className}>
        <div className="max-w-full max-h-full m-auto" id="ggb-element" />
    </div>);
}
