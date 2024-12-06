import { GenerateFeedback } from "@/utils/api/gemini"



export default function InputTestField() {
    GenerateFeedback({
        system: {
            question: "Vad är 2 + 2",
            answer: "4"
        },

        user: "Det är 4"
    }).then((data) => {
        console.log(data);
    });
}
