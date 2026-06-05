import { NextResponse, type NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { AUTH_COOKIE, AUTH_COOKIE_PATH } from "@/lib/auth";
import { getJwtSecret } from "@/lib/env";

function noStore(res: NextResponse) {
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.headers.set("Pragma", "no-cache");
  res.headers.set("Expires", "0");
  return res;
}

function expireAuthCookie(res: NextResponse) {
  res.cookies.set(AUTH_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: AUTH_COOKIE_PATH,
    maxAge: 0,
    expires: new Date(0),
  });
}

export function proxy(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE)?.value;
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isLogin = req.nextUrl.pathname === "/login";

  if (!isDashboard && !isLogin) return NextResponse.next();

  if (!token && isDashboard) {
    return noStore(NextResponse.redirect(new URL("/login", req.url)));
  }

  if (!token) return noStore(NextResponse.next());

  try {
    jwt.verify(token, getJwtSecret());

    if (isLogin) {
      return noStore(NextResponse.redirect(new URL("/dashboard", req.url)));
    }

    return noStore(NextResponse.next());
  } catch {
    const res = NextResponse.redirect(new URL("/login", req.url));
    expireAuthCookie(res);
    return noStore(res);
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
