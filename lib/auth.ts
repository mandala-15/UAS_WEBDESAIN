import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getJwtSecret } from "./env";

export const AUTH_COOKIE = "masjid_session";

export type SessionPayload = {
  sub: string;
  email: string;
  role: "admin";
};

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function secondsUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return Math.max(60, Math.floor((midnight.getTime() - now.getTime()) / 1000));
}

export function signSession(payload: SessionPayload) {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: secondsUntilMidnight(),
  });
}

export function verifySessionToken(token: string) {
  return jwt.verify(token, getJwtSecret()) as SessionPayload;
}

export async function setAuthCookie(token: string) {
  const jar = await cookies();

  jar.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: secondsUntilMidnight(),
  });
}

export async function clearAuthCookie() {
  const jar = await cookies();
  jar.delete(AUTH_COOKIE);
}

export async function getSession() {
  const jar = await cookies();
  const token = jar.get(AUTH_COOKIE)?.value;
  if (!token) return null;

  try {
    return verifySessionToken(token);
  } catch {
    return null;
  }
}
