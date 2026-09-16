import { marketplaceFetch } from "@/lib/api/client";
import type { ApiDashboardSummary } from "@/types/api";

type AuthOptions = { auth?: boolean | "session" | "machine" };

export async function getDashboardSummary(
  options?: AuthOptions,
): Promise<ApiDashboardSummary> {
  return marketplaceFetch<ApiDashboardSummary>("/admin/dashboard", {
    auth: options?.auth ?? "session",
  });
}
