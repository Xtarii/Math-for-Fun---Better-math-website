"use client";
import { ReactElement, useEffect } from "react";

/**
 * GeoGebra Element
 */
export default function GeoGebra(props: { className?: string }) : ReactElement {
    // Loads GeoGebra
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.geogebra.org/apps/deployggb.js"
        script.async = true;

        // Appends GeoGebra on script load
        script.onload = () => {
            if(typeof window === "undefined" && !window.GGBApplet) return;
            const params = { // GeoGebra parameters
                name: "graphing",
                showToolbar: true,
                showAlgebraInput: true,
                showMenuBar: true
            }
            const applet = new window.GGBApplet(params, true);
            applet.inject('ggb-element'); // Inserts Instance to element
        };

        // Adds to body and returns Dispose function
        document.body.appendChild(script);
        return () => { document.body.removeChild(script); }
    }, []); // Hooks to mount, default is rendering


    // Holder
    return(<div className={props.className + "flex"}>
        <div className="w-full h-full m-auto" id="ggb-element" />
    </div>);
}
