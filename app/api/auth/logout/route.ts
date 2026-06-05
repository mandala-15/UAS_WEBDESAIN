import { NextResponse } from "next/server";
import { AUTH_COOKIE, AUTH_COOKIE_PATH, clearAuthCookie } from "@/lib/auth";

function clearResponseCookie(res: NextResponse) {
  res.cookies.set(AUTH_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: AUTH_COOKIE_PATH,
    maxAge: 0,
    expires: new Date(0),
  });
}

export async function POST(req: Request) {
  await clearAuthCookie();
  const res = NextResponse.redirect(new URL("/login", req.url), { status: 303 });
  clearResponseCookie(res);
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  return res;
}

export async function GET(req: Request) {
  await clearAuthCookie();
  const res = NextResponse.redirect(new URL("/login", req.url), { status: 303 });
  clearResponseCookie(res);
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  return res;
}
