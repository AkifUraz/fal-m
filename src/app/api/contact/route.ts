import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, contact, topic, message } = body;

        if (!name || !contact || !topic) {
            return NextResponse.json(
                { success: false, error: "Lütfen gerekli alanları doldurun." },
                { status: 400 }
            );
        }

        const token = process.env.SANITY_API_WRITE_TOKEN;

        if (!token) {
            console.error("SANITY_API_WRITE_TOKEN is missing. Please add it to your .env.local file.");
            // Optionally, fallback to simple success or return 500.
            return NextResponse.json(
                { success: false, error: "Sunucu ayarlarında eksiklik var. Sanity Token bulunamadı." },
                { status: 500 }
            );
        }

        const sanityWriteClient = client.withConfig({
            token,
            useCdn: false
        });

        await sanityWriteClient.create({
            _type: "contactSubmission",
            name,
            contact,
            topic,
            message: message || "",
            status: "yeni",
            submittedAt: new Date().toISOString(),
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { success: false, error: "Bir hata oluştu. Lütfen tekrar deneyin." },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    const cookie = request.cookies.get("studio_auth");
    if (cookie?.value !== "authenticated") {
        return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    try {
        const rawSubmissions = await client.fetch(`*[_type == "contactSubmission"] | order(submittedAt desc)`);
        const submissions = rawSubmissions.map((sub: any) => ({
            ...sub,
            id: sub._id,
        }));
        return NextResponse.json({ submissions });
    } catch (error) {
        console.error("Fetch submissions error:", error);
        return NextResponse.json({ submissions: [] });
    }
}
