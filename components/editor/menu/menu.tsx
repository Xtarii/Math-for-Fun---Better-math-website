import { Editor } from "@tiptap/react";
import { ReactElement } from "react";
import { MathEditorInsertTextButton } from "./buttons/mathButton";

/**
 * Math Editor Menu
 */
export default function MathEditorMenu(props: { editor?: Editor | null }) : ReactElement {
    if(!props.editor) return(<div className="bg-slate-900 h-1/6 w-full flex" />);
    return(<div className="bg-slate-700 h-1/6 w-full">
        <div className="w-full h-2/6 border-b-2 border-slate-500 flex">
            <h5 className="justify-self-left ml-4 text-left text-lg m-auto">MathEditor</h5>

            <a href="/faq" target="_blank" className="justify-self-right mr-4 hover:bg-slate-800 hover:opacity-20">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.582V14m-.01 3.008H12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
            </a>
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
