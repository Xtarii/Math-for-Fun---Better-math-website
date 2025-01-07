import { deleteAccount } from "@/utils/supabase/account/auth/server";

/// Deletes User Account
export async function DELETE(request: Request) {
    const data: { id: string } = await request.json();
    const res = await deleteAccount(data.id);

    // API Status
    if(res) return Response.json({ message: "success" });
    else return Response.json({ message: "error" });
}
