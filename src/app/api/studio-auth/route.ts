import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { username, password } = body;

    const validUsername = process.env.STUDIO_USERNAME || "admin";
    const validPassword = process.env.STUDIO_PASSWORD || "aslanhan2024";

    if (username === validUsername && password === validPassword) {
        const response = NextResponse.json({ success: true });
        response.cookies.set("studio_auth", "authenticated", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 24 hours
            path: "/studio",
        });
        return response;
    }

    return NextResponse.json(
        { success: false, error: "Geçersiz kullanıcı adı veya şifre" },
        { status: 401 }
    );
}
