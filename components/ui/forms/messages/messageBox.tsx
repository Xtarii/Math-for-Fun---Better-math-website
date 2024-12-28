import { ReactElement } from "react";

/**
 * Message Box
 *
 * Custom controllers can be added to the bottom of
 * the message box
 *
 * The message box will cover the background and make
 * the page unusable by the user - only the
 * message box can be interacted with.
 */
export default function MessageBox({ children, className, title, message }: { children?: ReactElement, className?: string, title?: string, message?: string }) : ReactElement {
    return(<div className="relative">
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-900 dark:bg-slate-900 opacity-50" />

            <div className="relative z-10">
                <div className={className}>
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {title}
                        </h3>
                    </div>
                    {/* Content */}
                    <div className="p-4 md:p-5 space-y-4">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {message}
                        </p>
                    </div>

                    {/* Custom content */}
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </div>);
}
