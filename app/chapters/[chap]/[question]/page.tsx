"use client";
import { useParams } from "next/navigation";
import { ReactElement } from "react";

export default function Question() : ReactElement {
    const params = useParams();
    const question = params.question;



    return(<div>
    </div>);
}
