import { ClipboardEvent } from "react";

/**
 * Base Editor Class
 *
 * A base class for text editors
 */
export default abstract class BaseEditor {
    /**
     * Paste Event Handler
     */
    protected pasteEventHandler: (...args: any) => void;
    /**
     * Key Event Handler
     */
    protected keyEventHandler: (...args: any) => void;
    /**
     * Render Event Handler
     */
    protected renderEventHandler: (...args: any) => void;
    /**
     * Update Text Event Handler
     *
     * For external text storage
     */
    protected onUpdateText?: (text: string) => void;
    /**
     * On Focus Event handler
     */
    protected onFocusEventHandler: (...args: any) => void;
    /**
     * On Blur Event handler
     */
    protected onBlurEventHandler: (...args: any) => void;
    /**
     * Is canvas on focus
     */
    protected isFocused = false;
    /**
     * Canvas background color
     */
    protected backgroundColor: string = "#2a2e35";



    /**
     * Line Width
     */
    protected lineWidth: number = 500;
    /**
     * Line Height
     */
    protected lineHeight: number = 500;
    /**
     * Editor Character Size
     */
    protected characterSize: number = 16;
    /**
     * Text
     */
    protected text: string[] = [""];
    /**
     * Editing Position
     */
    protected position: { x: number, line: number } = { x: 0, line: 0 };
    /**
     * Mouse Color
     */
    protected mouseColor: string = "#ffffff71";



    /**
     * Editor Canvas
     */
    protected canvas: HTMLCanvasElement;
    /**
     * Editor Context
     */
    protected context: CanvasRenderingContext2D | null;





    /**
     * Creates new Base Editor Instance
     *
     * @param canvas Canvas
     * @param onUpdateText Update text event handler
     */
    constructor(canvas: HTMLCanvasElement, onUpdateText?: (text: string) => void) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.onUpdateText = onUpdateText;

        // Events
        this.pasteEventHandler = this.onPaste.bind(this);
        this.keyEventHandler = (e) => this.onKeyDown(this, e);
        this.renderEventHandler = this.render.bind(this);
        this.onFocusEventHandler = () => this.onFocus(true);
        this.onBlurEventHandler = () => this.onFocus(false);
        this.setup(); // Creates Event handlers
    }

    /**
     * Setup for Canvas Events
     */
    private setup() : void {
        this.canvas.addEventListener("paste", this.pasteEventHandler);
        this.canvas.addEventListener("keydown", this.keyEventHandler);
        this.canvas.addEventListener("resize", this.renderEventHandler); // Updates Canvas
        this.canvas.addEventListener("focus", this.onFocusEventHandler);
        this.canvas.addEventListener("blur", this.onBlurEventHandler);
    }

    /**
     * Focus Event Handler
     */
    protected onFocus(status: boolean) {
        this.isFocused = status;
        this.render(); // Rerenders
    }

    /**
     * Paste Event Handler
     */
    public onPaste(event: ClipboardEvent<HTMLCanvasElement>) : void {
        event.preventDefault();

        // Gets Paste value
        const value = event.clipboardData?.getData("text") || "";
        this.insertString(value, this.position.x, this.position.line);
        this.position.x += value.length; // Updates Position
        this.render(); // Renders Again
    }

    /**
     * Key Event Handler Function
     */
    protected onKeyDown(self: BaseEditor, event: KeyboardEvent) : void {
        // Handles input
        switch(event.key) {
            // Arrow Inputs
            case "ArrowLeft": {
                this.moveCursorLeft(1);
                break;
            }
            case "ArrowRight": {
                this.moveCursorRight(1);
                break;
            }
            case "ArrowUp": {
                this.moveCursorUp(1);
                break;
            }
            case "ArrowDown": {
                this.moveCursorDown(1);
                break;
            }


            // Default Inputs
            case "Enter": {
                this.insertNewLine(this.position.x, this.position.line);
                break;
            }
            case "Backspace": {
                this.position.x -= 1; // Moves left without controls
                this.removeCharacterBefore(this.position.x, this.position.line);
                if(this.position.x < 0) this.position.x = 0; // Sets mouse bounds
                break;
            }
            case "Delete": {
                this.removeCharacterAfter(this.position.x, this.position.line);
                break;
            }
        }
    }

    /**
     * Render function
     *
     * Updates the content of the canvas
     */
    protected render() : void {
        // Context and render setup
        this.setScale();
        this.context?.reset();
        this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clears context

        // Background color
        if(this.context) this.context.fillStyle = this.backgroundColor; // Fill Color
        this.context?.fillRect(0, 0, this.canvas.width, this.canvas.height); // Fills background


        // Default render
        if(this.text.length == 1 && this.text[0] == "")
            this.drawText("Skriv här...", this.mouseColor, 10, this.characterSize + 4);
    }



    /**
     * Draws text on the context
     *
     * @param text Text
     * @param color Text color
     * @param x Position x
     * @param y Position y
     */
    public drawText(text: string, color: string, x: number, y: number): void {
        if(!this.context) return;

        // Draws Text
        this.context.font = `${this.characterSize}px Arial`;
        this.context.fillStyle = color;
        this.context.fillText(text, x, y);
    }



    /**
     * Draws Mouse on canvas
     *
     * This will draw the mouse on the canvas
     * where the mouse is currently editing the
     * text.
     */
    public drawMouse() : void {
        let x = 10; // Start position
        const y = (this.characterSize + 6) + this.position.line * this.characterSize;
        if(!this.context) return; // Returns if there is no canvas, else calculates x position
        for(var i = 0; i < this.position.x; i++) if(this.text[this.position.line][i])
            x += this.context.measureText(this.text[this.position.line][i]).width; // Appends text width

        // Draws Mouse
        this.context.fillStyle = this.mouseColor;
        this.context.fillRect(x, y - this.characterSize, 2, this.characterSize);
    }





    /**
     * Inserts Character into the text string on ```line```
     *
     * @param str Character
     * @param x Position on line
     * @param line Editing line
     */
    protected insertString(str: string, x: number, line: number) : void {
        // Checks if line is valid
        if(!this.validateLine(line)) return;

        // Main Insertion
        const text = this.text[line];
        const p1 = text.slice(0, x);
        const p2 = text.slice(x);
        this.text[line] = p1 + str + p2;
    }

    /**
     * Inserts new line
     *
     * This will copy the text from where the cursor is
     * and paste it onto the new line
     *
     * @param x Position on current line
     * @param line Current line
     */
    protected insertNewLine(x: number, line: number) : void {
        // Checks if line is valid
        if(!this.validateLine(line)) return;

        // Character Insertion
        const text = this.text[line];
        const p1 = text.slice(0, x);
        const p2 = (x < 0 || x >= text.length - 1) ? "" : text.slice(x);

        // Line Insertion
        const newText: string[] = [];
        for(var i = 0; i < this.text.length; i++) {
            newText.push(this.text[i]); // Adds old lines
            if(i === line) { // Inserts Line under
                newText.push(p2); // Pushes left over stack
            }
        }
        newText[line] = p1; // Sets parent lines new text
        this.text = newText; // Overrides new text

        // Sets editing position
        this.moveCursorDown(1);
        this.position.x = 0;
    }

    /**
     * Removes Character on ```line``` at position ```x```
     *
     * this will remove a character from the left side
     * while {@link removeCharacterAfter} will remove
     * from the right.
     *
     * @param x Position on line
     * @param line Line
     */
    protected removeCharacterBefore(x: number, line: number) : void {
        // Checks if line is valid
        if(!this.validateLine(line)) return;

        // Validates line
        const text = this.text[line];
        if(!this.validatePosition(text, x)) return;

        // Slices the text for removing
        const p1 = text.slice(0, x);
        const p2 = text.slice(x + 1);


        // Appends data to the new line
        if(text === "" || this.position.x < 0 && this.position.line > 0) {
            this.removeLine(line); // Deletes Line if empty

            // Inserts old string onto the upper line
            this.text[this.position.line] += p2;
        }else this.text[line] = p1 + p2;
    }

    /**
     * Removes Character on the right side
     *
     * @param x Position in line
     * @param line Line
     */
    protected removeCharacterAfter(x: number, line: number) : void {
        // Checks if line is valid
        if(!this.validateLine(line)) return;

        // Validates line
        const text = this.text[line];
        if(!this.validatePosition(text, x)) return;

        // Slices the text for removing
        const p1 = text.slice(0, x);
        const p2 = text.slice(x + 1, text.length);


        // Appends data from the line under
        if(x >= (p1 + p2).length && line < this.text.length) {
            const text = (this.text[line + 1] || "");
            this.removeLine(line + 1);
            this.text[line] = p1 + p2 + text;

        }else this.text[line] = p1 + p2;
    }

    /**
     * Removes line from text
     *
     * @param line Line to remove
     */
    protected removeLine(line: number) : void {
        if(line === 0) return; // Can't remove first line
        const newText: string[] = [];
        for(var x = 0; x < this.text.length; x++) {
            if(x === line) {
                this.moveCursorUp(1); // Moves up one line
                this.position.x = this.text[this.position.line].length;
            }else newText.push(this.text[x]);
        }
        this.text = newText; // Overrides old text
    }



    /**
     * Validates line
     *
     * Returns true if the entered line is
     * is within the amount of lines
     * in the text.
     *
     * @param line Line
     * @returns Valid status
     */
    protected validateLine(line: number) : boolean {
        return(line >= 0 || line < this.text.length);
    }

    /**
     * Validates position
     *
     * Returns true if the entered position x
     * is within the text lines length.
     *
     * @param textLine Text Line
     * @param x Position on line
     * @returns Valid status
     */
    protected validatePosition(textLine: string, x: number) : boolean {
        return (x >= 0 || x < textLine.length);
    }



    /**
     * Moves Editing Position up
     *
     * @param lines The amount of lines to move up
     */
    public moveCursorUp(lines: number) : void {
        if(this.position.line > 0) this.position.line -= lines;
    }

    /**
     * Moves Editing Position down
     *
     * @param lines The amount of lines to move down
     */
    public moveCursorDown(lines: number) : void {
        if(this.position.line < this.text.length - 1) this.position.line += lines;
    }

    /**
     * Moves Editing Position left
     *
     * @param x The amount to move left
     */
    public moveCursorLeft(x: number) : void {
        if(this.position.x >= 0) this.position.x -= x;

        // Changes Line
        if(this.position.x < 0 && this.position.line > 0) {
            this.moveCursorUp(1);
            this.position.x = this.text[this.position.line].length;
        }
    }

    /**
     * Moves Editing Position right
     *
     * @param x The amount to move right
     */
    public moveCursorRight(x: number) : void {
        if(this.position.x <= this.text[this.position.line].length) this.position.x += x;

        // Changes Line : if position is more than the line edge and line is not grater than text length Y
        if(this.position.x > this.lineWidth || this.position.x > this.text[this.position.line].length && this.position.line < this.text.length - 1) {
            this.position.x = 0;
            this.moveCursorDown(1);
        }
    }





    /**
     * Sets Canvas render scale
     *
     * @param scale Scale
     */
    public setScale(scale: number) : void;
    /**
     * Sets Canvas render scale to canvas size
     */
    public setScale() : void;
    public setScale(scale?: number) {
        const size = scale || window.devicePixelRatio || 1;
        const width = this.canvas.offsetWidth;
        const height = this.canvas.offsetHeight;
        this.canvas.width = width * size;
        this.canvas.height = height * size;

        // Line Width and Height
        this.lineWidth = Math.round(this.canvas.width * 0.10727969348);     //- / this.characterSize) - 1;
        this.lineHeight = Math.round(this.canvas.height * 0.10727969348);   //- / this.characterSize) - 1;

        this.context?.scale(size, size); // Updates Context, this will minimize blur
    }





    /**
     * Cleanup Method for the Editor
     */
    public close() : void {
        this.canvas.removeEventListener("paste", this.pasteEventHandler);
        this.canvas.removeEventListener("keydown", this.keyEventHandler);
        this.canvas.removeEventListener("resize", this.renderEventHandler);
        this.canvas.removeEventListener("focus", this.onFocusEventHandler);
        this.canvas.removeEventListener("blur", this.onBlurEventHandler);
    }
}
