import { ReactElement, ReactNode } from "react";

export default function DeviceSupport({ children, className } : { children?: ReactNode, className?: string }) : ReactElement {
    return(<div className={className}>
        <div className="md:hidden w-full h-full">
            <div className="w-full h-fit flex flex-wrap">
                <h2 className="w-full text-center mb-4 mt-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
                    Din enhet stödjs inte.
                </h2>
                <div className="w-full">
                    <p className="text-center">Din enhets skärm är för liten för denna sidan, använd en enhet med större skärm.</p>
                </div>
            </div>
        </div>
        <div className="hidden md:block w-full h-full">
            {children}
        </div>
    </div>);
}
