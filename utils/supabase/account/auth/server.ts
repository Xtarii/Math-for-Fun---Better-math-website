import { createClient, User } from "@supabase/supabase-js";



// Supabase Data
const url = process.env.NEXT_PUBLIC_API_URL || "";
const key = process.env.SERVICE_ROLE || "";

/// Admin Instance
const admin = createClient(url, key);





/**
 * Deletes Account
 *
 * This is a server side function
 * and uses ```SUDO``` permission
 * to edit accounts.
 *
 * Therefore this should only be
 * called on the server side.
 *
 * @param id Account ID
 */
export async function deleteAccount(id: string) : Promise<User | null> {
    const res = await admin.auth.admin.deleteUser(id);
    if(res.error) console.error(res.error);
    return res.data.user;
}
