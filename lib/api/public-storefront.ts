import { marketplaceFetch } from "@/lib/api/client";
import type { ApiPublicAnnouncement } from "@/types/api";

/** GET /public/announcement — no auth */
export async function getPublicAnnouncement(): Promise<ApiPublicAnnouncement> {
  return marketplaceFetch<ApiPublicAnnouncement>("/public/announcement", {
    auth: false,
  });
}
