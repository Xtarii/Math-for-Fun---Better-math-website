import MathJaxComponent from "@/components/mathJax/mathJax";
import { Editor } from "@tiptap/react";
import { ReactElement } from "react";

/**
 * Math Editor Button
 */
export function MathEditorInsertTextButton(props: { name: string, inserts: string, editor: Editor, className?: string, scrollIntoView?: boolean, steps?: number }) : ReactElement {
    return(<div className={props.className}>
        <button
            className="w-full h-full flex"
            onClick={(e) => {
                e.preventDefault();
                if(!props.editor) return;
                const {from, to} = props.editor.state.selection;

                // Inserts text
                props.editor.commands.insertContent(props.inserts);
                props.editor.commands.focus(from + (props.steps || 0), { scrollIntoView: props.scrollIntoView });
            }}>
            <MathJaxComponent className="text-sm m-auto text-center" content={props.name} />
        </button>
    </div>);
}
