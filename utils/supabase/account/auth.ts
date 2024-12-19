import { AuthError, User } from "@supabase/supabase-js";
import { client } from "../supabase";

/**
 * Gets User data
 *
 * If there was an error getting the data
 * this will return the error message. If
 * the user is signed in and no errors,
 * then this will return the user data.
 *
 * @returns User
 */
export async function getUser() : Promise<User | null> {
    const res = await client.auth.getUser();
    return res.data.user; // Returns only the user data
}



/**
 * Login to User account
 *
 * Attempts to login to user
 * account. If there is no
 * such account or an error
 * was thrown this will return
 * null.
 *
 * @param email User email
 * @param password User password
 * @returns User
 */
export async function login(email: string, password: string) : Promise<User | null> {
    const res = await client.auth.signInWithPassword({ email, password });
    return res.data.user; // Returns User Data
}



/**
 * Attempts to sign out of the user session
 *
 * ```local``` scope is this device - to
 * logout others or all users ```scope```
 * should be set to ```global``` or ```others```
 *
 * ```ts
 * signOut();           // Default
 * signOut("local");    // Local device
 *
 *
 * signOut("global");   // All users
 * signOut("others");   // Other devices
 * ```
 *
 * @param scope How to sign out
 * @returns Error message
 */
export async function signOut(scope?: "global" | "local" | "others") : Promise<AuthError | null> {
    const res = await client.auth.signOut({ scope: scope });
    return res.error;
}
