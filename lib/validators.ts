import { z } from "zod";

const dateOnly = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal harus YYYY-MM-DD");

export const loginSchema = z.object({
  email: z.email().max(160),
  password: z.string().min(8).max(72),
});

export const kasMasukSchema = z.object({
  tanggal: dateOnly,
  sumber: z.string().min(2).max(120),
  keterangan: z.string().min(2).max(1000),
  jumlah: z.coerce.number().positive().max(999_999_999_999),
});

export const kasKeluarSchema = z.object({
  tanggal: dateOnly,
  kategori: z.string().min(2).max(120),
  keterangan: z.string().min(2).max(1000),
  jumlah: z.coerce.number().positive().max(999_999_999_999),
});

export const kegiatanSchema = z.object({
  judul: z.string().min(3).max(180),
  deskripsi: z.string().min(10).max(4000),
  tanggalMulai: z.coerce.date(),
  tanggalSelesai: z.coerce.date().optional().nullable(),
  lokasi: z.string().min(2).max(180),
  gambarUrl: z.url().optional().nullable().or(z.literal("")),
});

export const uploadSchema = z.object({
  title: z.string().min(2).max(180),
  fileName: z.string().min(1).max(180),
  mimeType: z.enum(["image/jpeg", "image/png", "image/webp"]),
  size: z.number().positive().max(2 * 1024 * 1024),
});
