import { ReactElement, useState } from "react";

/**
 * List Input field
 */
export default function ListInput(props: { placeholder?: string, default?: string[], onChange?: (args: string[]) => void, className?: string }) : ReactElement {
    const [ content, setContent ] = useState<string[]>(props.default || []);
    const [ input, setInput ] = useState<string>("");
    const [ error, setError ] = useState<string>();



    // Add content handler
    const handleAddContent = () => {
        setError(undefined); // Resets error
        if(!input) { // Error if there is not input
            setError("Can not add empty input");
            return;
        }


        // Adds input
        const list = [...content];
        list.push(input);
        setContent(list); // Overrides content list safely with new list
        if(props.onChange) props.onChange(list); // Sets parent ref to list
        setInput(""); // Resets input field
    }

    // Remove content handler
    const handleRemoveContent = (index: number) => {
        const list = [...content];
        list.splice(index, 1);
        setContent(list);
        if(props.onChange) props.onChange(list);
    }



    // Input field
    return(<div className={props.className}>
        <div className="flex flex-wrap w-full h-full m-auto rounded-lg bg-white dark:bg-slate-700">
            <div className="w-full">
                <div className="relative mb-1 w-full">
                    <input className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full ps-2 p-2.5 rounded-t-lg dark:bg-slate-700 dark:border-slate-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={props.placeholder} />
                    <div className="absolute bg-green-700 rounded-tr-lg inset-y-0 end-0 flex items-center ps-2 px-2 hover:bg-green-800 cursor-pointer" onClick={() => handleAddContent()}>
                        <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/>
                        </svg>
                    </div>
                </div>
                {error && <div className="ml-2 mb-2">
                    <p className="text-red-500">{error}</p>
                </div>}
            </div>



            {/* Input Content */}
            <div className="w-full h-fit">
                {content.map((value, index) => <div key={index} className="relative w-full h-fit rounded-b-lg hover:bg-gray-200 dark:hover:bg-slate-800 flex cursor-pointer">
                    <div className="w-11/12 h-fit flex">
                        <div className="min-w-8 w-fit h-8 mx-2 border-r border-gray-200 dark:border-slate-800">
                            <p className="text-gray-900 dark:text-white mr-2">{index + 1}</p>
                        </div>

                        <p className="text-gray-900 dark:text-gray-300 break-all">{value}</p>
                    </div>

                    <div className="absolute right-0 bg-red-500 hover:bg-red-700 w-8 h-8 flex items-center justify-center rounded-lg" onClick={() => handleRemoveContent(index)}>
                        <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                        </svg>
                    </div>
                </div>)}
            </div>
        </div>
    </div>);
}
