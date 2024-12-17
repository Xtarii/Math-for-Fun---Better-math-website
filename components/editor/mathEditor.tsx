"use client";
import MathExtension from "@aarkue/tiptap-math-extension";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ReactElement, useEffect, useState } from "react";

// Style sheets
import "katex/dist/katex.min.css";
import "./tiptap.scss";

/**
 * Math Text Editor
 */
export default function MathEditor(props: { className?: string, onChange?: (arg: string) => void }) : ReactElement {
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
                addInlineMath: true
            }),
        ],
        content: "",
        immediatelyRender: false,


        // Updates text reference
        onUpdate: ({ editor }) => {
            // Parse editor text
            let str = "";
            for(const obj of editor.getJSON().content || []) {
                if(obj.content) for(const content of obj.content) {
                    let part = "";

                    // Gets part data
                    if(content.type === "text") part = content.text || ""
                    else if(content.type === "inlineMath") part = content.attrs?.latex;

                    // Appends to string
                    if(part.startsWith(" ")) // Same line
                        str += part;
                    else str += "\n" + part; // New Line
                } else str += "\n"; // New line for empty paragraphs
            }
            if(props.onChange) props.onChange(str); // Sets text to parsed string
        }
    });



    // Component
    if(!client) return (<div className={props.className}>Loading Editor...</div>);
    return(<div className={props.className}>
        <div className="w-full h-full shadow-md rounded-b-lg">
            <div className="bg-slate-900 h-1/6 w-full flex">
                <h1 className="text-center text-lg m-auto">MathEditor</h1>
            </div>
            <EditorContent className="bg-slate-800 w-full h-5/6" editor={editor} />
        </div>
    </div>);
}
