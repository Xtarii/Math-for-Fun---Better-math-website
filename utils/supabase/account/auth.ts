import { AuthError, User } from "@supabase/supabase-js";
import { client, tables } from "../supabase";
import { AccountType } from "../types/types";

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
 * Get User Profile Data
 *
 * @returns Account / Profile Data
 */
export async function getUserProfile() : Promise<AccountType | null> {
    const { data, error } = await client.from(tables.account).select("*");
    if(error) console.error(error);

    // Converts Data, the user only has one account so item 0 of list is user
    const converted: AccountType | null = data ? data[0] : null;
    return converted;
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
 * Sign up to new User account
 *
 * @param username Username
 * @param email Email
 * @param password Password
 * @returns User
 */
export async function signUp(username: string, email: string, password: string) : Promise<User | null> {
    const res = await client.auth.signUp({
        email, password,
        options: {
            data: {
                username
            },
        },
    });
    if(res.error) console.error(res.error);
    return res.data.user;
}



/**
 * Verifies User Email
 *
 * @param email Email
 * @param token Verify Token
 * @returns User
 */
export async function verify(email: string, token: string) : Promise<User | null> {
    const res = await client.auth.verifyOtp({ email, token, type: "signup" });
    if(res.error) console.error(res.error);
    return res.data.user;
}



/**
 * Resend Verification Code to Account
 *
 * @param email Account Email
 */
export async function resendVerification(email: string) {
    const { error } = await client.auth.resend({
        type: 'signup',
        email
    });
    if(error) console.error(error);
}



/**
 * Attempts to sign out of the user session
 *
 * ```local``` scope is this device - to
 * logout others or all users, the ```scope```
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
