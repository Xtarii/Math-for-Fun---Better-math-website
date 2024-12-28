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

/**
 * Math Text Editor
 */
export default function MathEditor(props: { className?: string, onChange?: (arg: string) => void, default?: string }) : ReactElement {
    const [client, setClient] = useState<boolean>(false);
    useEffect(() => {
        setClient(true);
    }, []);



    // Editor Config
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder,
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
        content: props.default,
        immediatelyRender: false,


        // Updates text reference
        onUpdate: ({ editor }) => {
            const str = Parse.json(editor.getJSON());
            if(props.onChange) props.onChange(str); // Sets text to parsed string
        }
    });



    // Component
    return(<div className={props.className}>
        <div className="w-full h-full shadow-md">
            <MathEditorMenu editor={editor} />
            {client && <EditorContent className="bg-slate-800 shadow-md w-full h-5/6 rounded-b-lg" editor={editor} />}
            {!client && <div className="bg-slate-800 shadow-md w-full h-5/6 rounded-b-lg flex">
                <p className="text-slate-400 m-auto text-center text-2xl">Loading Editor...</p>
            </div>}
        </div>
    </div>);
}
