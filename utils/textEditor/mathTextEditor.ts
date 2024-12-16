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
        if(!this.context) return;

        // Draws Line
        this.context.font = `${this.characterSize}px Arial`;
        this.context.fillStyle = "white";
        this.context.fillText(text, 10, (this.characterSize + 4) + line * this.characterSize);
    }
}
