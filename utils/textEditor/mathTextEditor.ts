import BaseEditor from "./base/baseEditor";

/**
 * Math Text Editor Manager
 *
 * A simple editor for editing math
 * input on the canvas.
 */
export default class MathTextEditorManager extends BaseEditor {
    /**
     * Text Sizes for different math inputs
     */
    private textSize = {
        /**
         * Small size
         *
         * used for power of and other
         * inputs where the input text
         * is smaller than normal
         */
        small: (this.characterSize - this.characterSize / 4)
    }





    /**
     * Creates new Math Editor Instance
     *
     * @param canvas Canvas
     * @param onUpdateText Update Text event
     */
    constructor(canvas: HTMLCanvasElement, onUpdateText?: (text: string) => void) {
        super(canvas, onUpdateText); // Creates Base Text Manager
    }



    protected onKeyDown(self: MathTextEditorManager, event: KeyboardEvent) : void {
        event.preventDefault();
        super.onKeyDown(self, event); // Parent Key Events





        // Handles events
        console.log(event.key); // DEBUG



        // Key Inputs
        if(event.key.length === 1 && !event.ctrlKey) {
            // Inserts new line if reached end
            if(this.text[this.position.line].length >= this.lineWidth)
                this.insertNewLine(this.text[this.position.line].length, this.position.line);

            // Inserts string
            this.insertString(event.key, this.position.x, this.position.line);
            this.moveCursorRight(1);
        }
        if(!event.ctrlKey && event.key.startsWith("^")) {
            let str = "^"; // Formatter string
            if(event.key[1] !== "(") str += "(";
            str += event.key.slice(1, event.key.length) + ")"; // Appends the input with end parentheses

            // Appends to text
            this.insertString(str, this.position.x, this.position.line);
            this.moveCursorRight(str.length - 1); // Sets mouse position to be before the end parentheses
        }



        // Updates canvas
        const text = this.text.join("\n");
        this.onUpdateText?.(text);
        self.render(); // Updates canvas
    }





    public render() : void {
        super.render(); // DEFAULT Rendering

        // Renders Text
        for(var line = 0; line < this.text.length; line++) this.drawLine(this.text[line], line);
        if(this.isFocused) this.drawMouse();
    }





    public drawLine(text: string, line: number) : void {
        let x = 10; // Start x position
        const y = line * this.characterSize; // Start y position
        if(!this.context) return;

        // Draws Line Setup
        this.context.fillStyle = "white";

        // Parsing and drawing content
        for(let i = 0; i < text.length; i++) {
            const char = text[i]; // Current character

            // Power-off parsing
            if(char === "^") {
                const parentheses: "("[] = []; // List of parentheses

                // Loops characters but skips "^"
                for(let ix = i + 1; ix < text.length; ix++) {
                    const oChar = text[ix];

                    if(oChar === "(") {
                        parentheses.push(oChar);
                        continue; // Skip parentheses
                    }
                    if(oChar === ")") {
                        parentheses.pop(); // Removes matching parentheses
                        if(parentheses.length === 0) { // End of parentheses
                            i = ix;
                            break;
                        }
                        continue; // Skips end parentheses
                    }


                    // Draws character
                    this.context.font = `${this.textSize.small}px Arial`;
                    this.context.fillText(oChar, x, (this.textSize.small + 4) + y);
                    x += this.context.measureText(oChar).width; // Appends character width to x
                }
                continue; // Continues without printing character
            }

            // Draws character
            this.context.font = `${this.characterSize}px Arial`;
            this.context.fillText(char, x, (this.characterSize + 4) + y);
            x += this.context.measureText(char).width; // Appends character width to x
        }
    }





    public parseParentheses(text: string) : string {
        return "";
    }





    public drawMouse(): void {
        let x = 10; // Start position
        const y = (this.characterSize + 6) + this.position.line * this.characterSize;
        const yOffset = this.characterSize;
        let size = this.characterSize;
        if(!this.context) return; // Returns if there is no canvas, else calculates x position


        // Parsing the line for special math inputs
        for(var i = 0; i < this.position.x; i++) if(this.text[this.position.line][i]) {
            const char = this.text[this.position.line][i];

            // Power-off parsing
            if(char === "^") {
                const parentheses: "("[] = []; // List of parentheses

                // Loops characters but skips "^"
                for(let ix = i + 1; ix < this.text[this.position.line].length; ix++) {
                    const oChar = this.text[this.position.line][ix];

                    // Parentheses parsing
                    if(oChar === "(") {
                        parentheses.push(oChar);
                        continue; // Skip parentheses
                    }
                    if(oChar === ")") {
                        parentheses.pop(); // Removes matching parentheses
                        if(parentheses.length === 0) { // End of parentheses
                            i = ix;
                            break;
                        }
                        continue; // Skips end parentheses
                    }

                    // Appends character width to x
                    this.context.font = `${this.textSize.small}px Arial`;
                    size = this.textSize.small;
                    x += this.context.measureText(oChar).width;
                }
                continue; // Continues without printing character
            }

            // Appends text width
            this.context.font = `${this.characterSize}px Arial`;
            size = this.characterSize;
            x += this.context.measureText(char).width;
        }


        // Draws Mouse
        this.context.fillStyle = this.mouseColor;
        this.context.fillRect(x, y - yOffset, 2, size);
    }
}
