import { ReactElement, ReactNode } from "react";

// Page Layouts
export default function QuestionLayout({ children }: Readonly<{ children: ReactNode }>) : ReactElement {
    return(<section>{children}</section>);
}
