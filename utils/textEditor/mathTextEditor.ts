import BaseEditor from "./base/baseEditor";

/**
 * Math Text Editor Manager
 *
 * A simple editor for editing math
 * input on the canvas.
 */
export default class MathTextEditorManager extends BaseEditor {
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



        /**
         * Works Fine in multiline
         */

        // text[0] = "Hello line 1";
        // text.push("Hello World! line 2");
        // this.setText(text);


        console.log(event.key); // DEBUG


        // Handles Input
        if(event.key === "Backspace") {
            this.position.x -= 1; // Moves left without controls
            this.removeCharacterBefore(this.position.x, this.position.line);
            if(this.position.x < 0) this.position.x = 0; // Sets mouse bounds
        }
        if(event.key === "Delete") {
            this.removeCharacterAfter(this.position.x, this.position.line);
        }



        // Key Inputs
        if(event.key.length === 1 && !event.ctrlKey) {
            // this.text[this.position.line] += event.key;
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

        // New Line
        if(event.key === "Enter") this.insertNewLine(this.position.x, this.position.line);

        // Position
        if(event.key === "ArrowLeft") this.moveCursorLeft(1);
        if(event.key === "ArrowRight") this.moveCursorRight(1);
        if(event.key === "ArrowUp") this.moveCursorUp(1);
        if(event.key === "ArrowDown") this.moveCursorDown(1);



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
        if(!this.context) return;

        // Draws Line
        this.context.font = `${this.characterSize}px Arial`;
        this.context.fillStyle = "white";
        this.context.fillText(text, 10, (this.characterSize + 4) + line * this.characterSize);
    }
}
