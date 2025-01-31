import { ReactElement, ReactNode } from "react";
import ThemePage from "./pages/Theme";
import AccountPage from "./pages/account";

/**
 * Settings Pages
 */
export const Pages = {
    general: { id: "general", page: <div></div> },
    theme: { id: "theme", page: <ThemePage /> },
    account: { id: "account", page: <AccountPage /> }
}

/**
 * Page Parameter Type
 */
type PageType = keyof typeof Pages;



/**
 * Settings Page Navigator
 *
 * Holds and gets settings pages
 * based on the current page props.
 */
export default function SettingsPageNavigator({ className, page } : { className?: string, page: PageType }) : ReactElement {
    return(<div className={className}>
        {Pages[page].page}
    </div>);
}
