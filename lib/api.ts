import { NextResponse } from "next/server";
import { z } from "zod";

export const idParamSchema = z.object({
  id: z.uuid(),
});

export async function readJson(req: Request) {
  try {
    return await req.json();
  } catch {
    return null;
  }
}

export function invalidJsonResponse() {
  return NextResponse.json({ message: "Format JSON tidak valid." }, { status: 400 });
}

export function validateId(id: string) {
  return idParamSchema.safeParse({ id });
}

