import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout Successful",
            success: true,
        });

        // Setting a cookie correctly in Next.js middleware
        const cookie = new Response(null, { headers: response.headers });
        cookie.headers.append(
            "Set-Cookie",
            `token=; Path=/; Expires=${new Date(
                0
            ).toUTCString()}; HttpOnly; SameSite=Strict`
        );

        return new NextResponse(null, {
            headers: cookie.headers,
            status: 200,
            statusText: "OK",
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                error: error.message,
            },
            {
                status: 500,
            }
        );
    }
}
