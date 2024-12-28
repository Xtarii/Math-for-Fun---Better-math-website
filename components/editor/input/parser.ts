import { JSONContent } from "@tiptap/react";



/**
 * Parsing functions for text parsing
 *
 * Holds functions for parsing the
 * text input from the editor.
 */
export namespace Parse {
    /**
     * Parse json text content to text
     *
     * Any math in the json content will
     * be parsed as latex.
     *
     * @param text JSON Text content
     * @returns Text
     */
    export function json(text: JSONContent) : string {
        if(!text.content) return ""; // Returns empty if content is empty


        // Parse editor text
        let str = "";
        for(const obj of text.content) {
            switch(obj.type) { // Switches the line type
                case "paragraph": {
                    // Parse paragraph
                    if(obj.content) str += paragraph(obj.content);
                    else str += "\n";
                    break;
                }
            }
        }
        return str;
    }





    /**
     * Parses paragraph content to text
     *
     * Each paragraph ends with new line
     *
     * @param paragraph Paragraph
     * @returns Paragraph as text
     */
    export function paragraph(paragraph: JSONContent[]) : string {
        let text: string = "";
        for(const content of paragraph) text += paragraphContent(content);
        return text + "\n"; // Each paragraph ends with new line
    }



    /**
     * Parses paragraph content as text
     *
     * @param content Paragraph Content
     * @returns Content as text
     */
    export function paragraphContent(content: JSONContent) : string {
        switch(content.type) {
            case "text": {
                return content.text || "";
            }
            case "inlineMath": {
                return inlineMath(content.attrs);
            }
        }
        return ""; // Empty line
    }



    /**
     * Parses inline math to latex text
     *
     * @param math Math line
     * @returns Math as latex text
     */
    export function inlineMath(math: Record<string, any> | undefined) : string {
        if(!math) return "";

        // Inline or Display math
        if(math.display === "yes")
            return `\n$$${math.latex}$$\n`;
        else
            return `$${math.latex}$`;
    }
}
