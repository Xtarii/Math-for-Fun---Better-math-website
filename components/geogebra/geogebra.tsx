"use client";
import Script from "next/script";
import { ReactElement } from "react";

/**
 * GeoGebra Element
 */
export default function GeoGebra(props: { className?: string }) : ReactElement {
    return(<div className={props.className + "flex"}>
        <div className="w-full h-full m-auto" id="ggb-element" />

        {/* Manipulator */}
        <Script src="https://www.geogebra.org/apps/deployggb.js"
            onLoad={() => {
                if(typeof window === "undefined" && !window.GGBApplet) return;
                const params = { // GeoGebra parameters
                    name: "graphing",
                    showToolbar: true,
                    showAlgebraInput: true,
                    showMenuBar: true
                }
                const applet = new window.GGBApplet(params, true);
                applet.inject('ggb-element'); // Inserts Instance to element
            }}
        />
    </div>);
}
