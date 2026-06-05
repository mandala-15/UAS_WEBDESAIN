export function cleanEnvValue(value: string | undefined) {
  const cleanValue = value?.trim();
  if (!cleanValue) return "";

  if (
    (cleanValue.startsWith('"') && cleanValue.endsWith('"')) ||
    (cleanValue.startsWith("'") && cleanValue.endsWith("'"))
  ) {
    return cleanValue.slice(1, -1).trim();
  }

  return cleanValue;
}

export function getDatabaseUrl() {
  return cleanEnvValue(process.env.DATABASE_URL);
}

export function getJwtSecret() {
  const secret = cleanEnvValue(process.env.JWT_SECRET);

  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET wajib diatur dan minimal 32 karakter.");
  }

  return secret;
}

export function isDemoLoginEnabled() {
  return process.env.NODE_ENV !== "production" && Boolean(cleanEnvValue(process.env.DEMO_ADMIN_EMAIL) && cleanEnvValue(process.env.DEMO_ADMIN_PASSWORD));
}
