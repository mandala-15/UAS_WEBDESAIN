export function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET wajib diatur dan minimal 32 karakter.");
  }

  return secret;
}

export function isDemoLoginEnabled() {
  return process.env.NODE_ENV !== "production" && Boolean(process.env.DEMO_ADMIN_EMAIL && process.env.DEMO_ADMIN_PASSWORD);
}

