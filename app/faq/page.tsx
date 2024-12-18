import MathEditor from "@/components/editor/mathEditor";
import MathParagraph from "@/components/mathParagraph/mathParagraph";
import { ReactElement } from "react";

export default function FAQ() : ReactElement {
    return(<div className="w-screen">
        <h1>Hjälp med Editeraren</h1>

        <div className="w-3/6 m-8">
            <p>
                Editeraren använder Latex för att hitta matte
                bitar i det som användaren skriver.


                För att skapa latex strängar börjar man med att
                skriva
            </p>
            <p className="text-slate-500">$</p>
            <p>
                Lika väl ska en Latex sträng sluta med $ teknet.
            </p>

            <MathEditor className="w-full h-[32rem] m-auto" />
        </div>

        <div className="w-3/6 m-8">
            <p>
                För att skriva en Latex sträng
            </p>
            <MathParagraph content="$x^2$" />
            <p>
                Skriver man $ x^2 $.

                Detta kommer att översättas och skrivas om
                till en matte sträng.
            </p>

            <MathEditor className="w-full h-[32rem] m-auto" />
        </div>
    </div>);
}
