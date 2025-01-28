import MathEditor from "@/components/editor/mathEditor";
import MathParagraph from "@/components/mathParagraph/mathParagraph";
import { ReactElement } from "react";

export default function FAQ() : ReactElement {
    return(<div className="w-full h-fit">
        <h1 className="text-center mx-auto mt-4">Hjälp med Editeraren</h1>

        <div className="w-2/4 h-fit m-auto mt-2 border-slate-500 border-b-2">
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

            <MathEditor className="w-[42rem] h-[32rem] mb-6" />
        </div>
        <div className="w-2/4 h-fit m-auto mt-24">
            <p>
                För att skriva en Latex sträng
            </p>
            <MathParagraph content="$x^2$" />
            <p>
                Skriver man $ x^2 $.

                Detta kommer att översättas och skrivas om
                till en matte sträng.
            </p>

            <MathEditor className="w-[42rem] h-[32rem] mb-6" />
        </div>
    </div>);
}
