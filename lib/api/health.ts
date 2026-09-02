import { marketplaceFetch } from "@/lib/api/client";
import type { ApiHealthResponse } from "@/types/api";

export async function getApiHealth(): Promise<ApiHealthResponse> {
  return marketplaceFetch<ApiHealthResponse>("/health", { auth: false });
}
