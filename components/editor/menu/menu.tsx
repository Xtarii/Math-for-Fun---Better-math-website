import { Editor } from "@tiptap/react";
import { ReactElement } from "react";
import { MathEditorInsertTextButton } from "./buttons/mathButton";

/**
 * Math Editor Menu
 */
export default function MathEditorMenu(props: { editor?: Editor | null }) : ReactElement {
    if(!props.editor) return(<div className="bg-slate-900 h-1/6 w-full flex" />);
    return(<div className="bg-slate-700 h-1/6 w-full">
        <div className="w-full h-2/6 border-b-2 border-slate-500">
            <h5 className="ml-4 text-left text-lg m-auto">MathEditor</h5>
        </div>


        {/* Buttons */}
        <div className="w-full h-4/6 flex">
            <MathEditorInsertTextButton
                editor={props.editor}
                name="$\sqrt(x)$"
                inserts="\sqrt()"

                className="rounded-lg h-8 w-fit min-w-8 max-w-20 flex m-auto hover:bg-slate-600"

                steps={6}
                scrollIntoView
            />
            <MathEditorInsertTextButton
                editor={props.editor}
                name="$\frac{x}{x}$"
                inserts="\frac{}{}"

                className="rounded-lg h-8 w-fit min-w-8 max-w-20 flex m-auto hover:bg-slate-600"

                steps={6}
                scrollIntoView
            />
            <MathEditorInsertTextButton
                editor={props.editor}
                name="$x^{x}$"
                inserts="^{}"

                className="rounded-lg h-8 w-fit min-w-8 max-w-20 flex m-auto hover:bg-slate-600"

                steps={2}
                scrollIntoView
            />
            <MathEditorInsertTextButton
                editor={props.editor}
                name="$\int_a^b$"
                inserts="\int_"

                className="rounded-lg h-8 w-fit min-w-8 max-w-20 flex m-auto hover:bg-slate-600"

                steps={5}
                scrollIntoView
            />
        </div>
    </div>);
}
