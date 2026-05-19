import { NextResponse } from "next/server";
import { db } from "@/db";
import { galeri } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { sanitizeText } from "@/lib/sanitize";
import { createSupabaseAdmin } from "@/lib/supabase";
import { safeFileName, validateImageFile } from "@/lib/upload";
import { uploadSchema } from "@/lib/validators";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ message: "Format form upload tidak valid." }, { status: 400 });
  }
  const file = formData.get("file");
  const title = sanitizeText(formData.get("judul")) || "Dokumentasi Mesjid";

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "File wajib diisi." }, { status: 422 });
  }

  const parsed = uploadSchema.safeParse({
    title,
    fileName: file.name,
    mimeType: file.type,
    size: file.size,
  });

  if (!parsed.success) {
    return NextResponse.json({ message: "Input upload tidak valid.", errors: parsed.error.flatten() }, { status: 422 });
  }

  try {
    validateImageFile(file);
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "File tidak valid." }, { status: 422 });
  }

  let supabase: ReturnType<typeof createSupabaseAdmin>;
  try {
    supabase = createSupabaseAdmin();
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Konfigurasi Supabase belum valid." },
      { status: 500 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const path = `galeri/${safeFileName(file.name)}`;

  const { error } = await supabase.storage.from("masjid-assets").upload(path, buffer, {
    contentType: file.type,
    upsert: false,
  });

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });

  const { data } = supabase.storage.from("masjid-assets").getPublicUrl(path);

  let created: typeof galeri.$inferSelect;
  try {
    [created] = await db
      .insert(galeri)
      .values({
        judul: parsed.data.title,
        gambarUrl: data.publicUrl,
        mimeType: file.type,
        size: file.size,
        createdBy: session.sub,
      })
      .returning();
  } catch {
    await supabase.storage.from("masjid-assets").remove([path]);
    return NextResponse.json({ message: "Gambar terupload, tetapi metadata gagal disimpan." }, { status: 500 });
  }

  return NextResponse.json({ ...created, url: data.publicUrl }, { status: 201 });
}
