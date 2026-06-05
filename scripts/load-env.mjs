import { existsSync, readFileSync } from "node:fs";

export function cleanEnvValue(value) {
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

export function loadLocalEnv() {
  if (!existsSync(".env.local")) return;

  for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([^#][^=]+)=(.*)$/);
    if (!match) continue;
    process.env[match[1].trim()] ??= cleanEnvValue(match[2]);
  }
}

export function postgresOptions(connectionString) {
  return {
    ssl: connectionString.includes("localhost") || connectionString.includes("127.0.0.1") ? false : "require",
    prepare: false,
  };
}
