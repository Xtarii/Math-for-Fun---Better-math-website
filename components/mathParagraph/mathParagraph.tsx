"use client"
import katex from "katex";
import { ReactElement } from "react";



/**
 * Math JAX Component
 */
export default function MathParagraph(props: { content: string, className?: string }) : ReactElement {
    // Parses the content text
    const render = (text: string) => {
        const inlineMathRegex = /\$(.+?)\$/g;
        const blockMathRegex = /\$\$(.+?)\$\$/g;

        // Block Math
        text = text.replace(blockMathRegex, (match, math) => katex.renderToString(math, {
            displayMode: true,
            throwOnError: true
        }));

        // Inline math
        text = text.replace(inlineMathRegex, (match, math) => katex.renderToString(math, {
            displayMode: false,
            throwOnError: true
        }));
        return text; // Returns result
    }
    const html = render(props.content); // Parses content to Math HTML



    // Math Text
    return(<div className="h-full w-full" dangerouslySetInnerHTML={{ __html: html }} />);
}
