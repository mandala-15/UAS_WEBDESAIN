import { NextResponse, type NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { AUTH_COOKIE } from "@/lib/auth";
import { getJwtSecret } from "@/lib/env";

export function proxy(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE)?.value;
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isLogin = req.nextUrl.pathname === "/login";

  if (!isDashboard && !isLogin) return NextResponse.next();

  if (!token && isDashboard) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!token) return NextResponse.next();

  try {
    jwt.verify(token, getJwtSecret());

    if (isLogin) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  } catch {
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete(AUTH_COOKIE);
    return res;
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
