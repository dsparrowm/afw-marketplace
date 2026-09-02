function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getMarketplaceApiBaseUrl(): string {
  return requiredEnv("MARKETPLACE_API_BASE_URL").replace(/\/$/, "");
}

export function getStaffCredentials(): { email: string; password: string } {
  return {
    email: requiredEnv("MARKETPLACE_STAFF_EMAIL"),
    password: requiredEnv("MARKETPLACE_STAFF_PASSWORD"),
  };
}

/** When true (default), empty or failed API catalog reads fall back to mocks. */
export function catalogFallbackToMockEnabled(): boolean {
  const raw = process.env.CATALOG_FALLBACK_TO_MOCK?.trim().toLowerCase();
  return raw !== "false" && raw !== "0";
}
