import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const cookie = request.cookies.get("studio_auth");
    const authenticated = cookie?.value === "authenticated";
    return NextResponse.json({ authenticated });
}
