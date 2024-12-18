import { InputRule } from "@tiptap/react"

export const MathInputRules = (mathType: any) => [
    new InputRule({
        find: /(\^)([a-zA-Z0-9]+)$/,
        handler: ({ state, range, match }) => {
        }
    })
]
