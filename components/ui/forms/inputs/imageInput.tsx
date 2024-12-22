"use client"
import { ReactElement, useState } from "react";

/**
 * Image input
 *
 * A image input for forms
 */
export default function ImageInput(props: { onChange?: (arg: string) => void, className?: string }) : ReactElement {
    const [ error, setError ] = useState<string>();
    const [ image, setImage ] = useState<string>("");



    // Image handler
    const handleInput = async (input: File | null) => {
        setError(undefined); // Resets error
        if(!input) {
            setError("No file found");
            return;
        }

        // Parse Image
        try {
            // Parse Image to Base64
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    const base64 = reader.result.toString();
                    setImage(base64); // Set the image for display
                    if(props.onChange) props.onChange(base64); // Updates front end
                }
            };
            reader.readAsDataURL(input); // Convert file to Base64
        } catch (e) {
            setError("Failed to process image");
        }
    }

    // Handle remove
    const remove = () => {
        setImage("");
        if(props.onChange) props.onChange("");
    }



    // Image input
    return(<div className={props.className}>
        <div className="flex w-full h-full">
            <div className="flex flex-wrap items-center justify-center w-3/4">
                <label htmlFor="image" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input className="hidden" name="image" id="image" type="file" placeholder="Image" onChange={e => handleInput(e.target.files ? e.target.files[0] : null)} />
                </label>
                {error && <div className="w-full">
                    <p className="ml-2 mt-2 text-red-500">{error}</p>
                </div>}
            </div>


            <div className="w-1/4 ml-2">
                {image && <div className="relative w-24 h-24">
                    <img src={image} alt="Uploaded Image" className="rounded-lg" />
                    <div className="absolute right-0 top-0 bg-red-500 hover:bg-red-700 w-8 h-8 flex items-center justify-center rounded-lg" onClick={() => remove()}>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                        </svg>
                    </div>
                </div>}
            </div>
        </div>
    </div>);
}
