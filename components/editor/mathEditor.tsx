"use client";
import MathExtension from "@aarkue/tiptap-math-extension";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ReactElement, useEffect, useState } from "react";
import { MathInputRules } from "./input/input";
import MathEditorMenu from "./menu/menu";

// Style sheets
import "katex/dist/katex.min.css";
import "./tiptap.scss";
import { Parse } from "./input/parser";
import LocalLoader from "../ui/load/localLoader";

/**
 * Math Text Editor
 */
export default function MathEditor(props: { className?: string, onChange?: (arg: string) => void, default?: string, readonly?: boolean }) : ReactElement {
    const canEdit = props.readonly === false || props.readonly === undefined;
    const [client, setClient] = useState<boolean>(false);
    useEffect(() => {
        setClient(true);
    }, []);



    // Editor Config
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: "Skriv här ..."
            }),
            MathExtension.configure({
                // evaluation: true, // Solves the math problem
                addInlineMath: true
            }).extend({
                // Input rules for math
                addInputRules() {
                    return MathInputRules(this.editor.state.schema.nodes.paragraph);
                }
            }),
        ],
        content: Parse.toParagraphText(props.default),
        immediatelyRender: false,
        editable: canEdit,


        // Updates text reference
        onUpdate: ({ editor }) => {
            const str = Parse.json(editor.getJSON());
            if(props.onChange) props.onChange(str); // Sets text to parsed string
        }
    });



    // Component
    return(<div className={props.className}>
        {!props.readonly && <MathEditorMenu editor={editor} />}

        <div className="w-full h-full shadow-md">
            {client && <EditorContent className="bg-white dark:bg-slate-800 shadow-md w-full h-full rounded-b-lg" editor={editor} />}
            {!client && <div className="bg-white dark:bg-slate-800 shadow-md w-full h-full rounded-b-lg flex"><LocalLoader /></div>}
        </div>
    </div>);
}
