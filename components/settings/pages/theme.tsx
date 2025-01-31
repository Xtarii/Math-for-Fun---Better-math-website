import ThemeSelector from "@/components/ui/theme/themeSelector";
import { ReactElement, useEffect, useState } from "react";

/**
 * Theme Page
 */
export default function ThemePage() : ReactElement {
    const [ isClient, setClient ] = useState<boolean>(false);
    useEffect(() => setClient(true), []);



    // Theme Page Content
    return(<div>
        {isClient && <ThemeSelector className="mx-2 mt-4" />}
    </div>);
}
