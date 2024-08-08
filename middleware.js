import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

export default auth((req) => {
    // serving the image even if the user is not logged in
    if (req.nextUrl.pathname === "/homepage.jpg") {
        return NextResponse.next();
    }

    // if is not loggedIn and is also not at /login, then push to login
    if (!req.auth && req.nextUrl.pathname !== "/login") {
        const newUrl = new URL("/login", req.nextUrl.origin);
        return Response.redirect(newUrl);
    }

    // if is loggedIn and going to /login, then push back to the origin
    if (req.auth && req.nextUrl.pathname == "/login") {
        return Response.redirect(req.nextUrl.origin);
    }
});

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|public/images).*)",
    ],
};
