import { ReactElement } from "react";

export default function ErrorMessage(props: { title: string, message: string }) : ReactElement {
    return(<div className="m-auto w-screen h-screen flex flex-wrap">
        <h1 className="m-auto mb-2 text-center w-full text-red-500 text-5xl">[ Error ]: {props.title}</h1>
        <p className="m-auto mt-2 text-gray-900 dark:text-white">{props.message}</p>
    </div>);
}
