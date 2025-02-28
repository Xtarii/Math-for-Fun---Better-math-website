"use client"
import { getUser, getUserProfile } from "@/utils/supabase/account/auth";
import { Session } from "@toolpad/core";
import { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from "react";

/**
 * Session Context
 *
 * Global Session Context
 */
const SessionContext = createContext<[ session: Session | null, setSession: (value: Session | null) => void ] | null>(null);



/**
 * Session Context
 *
 * Gets the global session context.
 *
 * @returns Session Context
 */
export function useSession() : [ session: Session | null, setSession: (value: Session | null) => void ] {
    const context = useContext(SessionContext);
    if(!context) throw new Error("There was no Session Provider so no session found");
    return context;
}



/**
 * Session Provider element
 *
 * This is used to create a global
 * session context. Therefore it should
 * be placed in the root layout.
 *
 * The session is used for the client
 * login session and the current user.
 */
export function SessionProvider({ children }: { children?: ReactNode }) : ReactElement {
    const [ session, setSession ] = useState<Session | null>(null);

    // Handles Auto sign in
    useEffect(() => {
        (async() => {
            if(session) return; // Returns if there is an session
            const user = await getUser();
            const userData = await getUserProfile();
            if(!user || !userData) return; // Returns if there is no account found

            // Sets User
            setSession({
                user: {
                    name: userData.username,
                    email: userData.email,
                    id: user.id,
                }
            })
        })()
    }, [])

    return(<SessionContext.Provider value={[session, setSession]}>{children}</SessionContext.Provider>);
}
