import crypto from "crypto";

const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
const maxSize = 2 * 1024 * 1024;

export function validateImageFile(file: File) {
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Tipe file harus JPG, PNG, atau WEBP.");
  }

  if (file.size > maxSize) {
    throw new Error("Ukuran file maksimal 2MB.");
  }
}

export function safeFileName(name: string) {
  const ext = name.split(".").pop()?.toLowerCase() ?? "jpg";
  const safeExt = ["jpg", "jpeg", "png", "webp"].includes(ext) ? ext : "jpg";
  return `${crypto.randomUUID()}-${Date.now()}.${safeExt}`;
}

