import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { client } from "@/sanity/lib/client";

export async function DELETE(request: NextRequest) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    try {
        const { id } = await request.json();
        
        const token = process.env.SANITY_API_WRITE_TOKEN;
        if (!token) {
            return NextResponse.json({ error: "Token bulunamadı" }, { status: 500 });
        }

        const sanityWriteClient = client.withConfig({ token, useCdn: false });

        await sanityWriteClient.delete(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json({ error: "Silme başarısız" }, { status: 500 });
    }
}
