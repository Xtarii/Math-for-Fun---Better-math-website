import { MathJax, MathJaxContext } from "better-react-mathjax";
import { ReactElement } from "react";

const mathJaxConfig = {
    tex: {
        inlineMath: [['$', '$']],
        displayMath: [['$$', '$$']],
    },
}



/**
 * Math JAX Component
 */
export default function MathJaxComponent(props: { content: string }) : ReactElement {
    return(<div className="h-full w-full">
        <MathJaxContext config={mathJaxConfig}>
            <MathJax className="text-lg text-left w-full">{props.content}</MathJax>
        </MathJaxContext>
    </div>);
}
