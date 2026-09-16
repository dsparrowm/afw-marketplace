import { listPromotions } from "@/lib/api/promotions";
import {
  buildAdminPromotionMetrics,
  mapApiPromotionToAdminRow,
} from "@/lib/admin/map-admin-promotion";
import type {
  AdminPromotionMetric,
  AdminPromotionRow,
} from "@/lib/mocks/admin-promotions";

export type AdminPromotionsLoadResult = {
  rows: AdminPromotionRow[];
  metrics: AdminPromotionMetric[];
  error: string | null;
};

/** Loads promotions for the admin Promotions screen via staff session. */
export async function loadAdminPromotions(): Promise<AdminPromotionsLoadResult> {
  try {
    const first = await listPromotions(
      { page: 1, limit: 50 },
      { auth: "session" },
    );
    const promotions = [...first.data];
    const totalPages = first.meta.totalPages || 1;

    for (let page = 2; page <= totalPages; page += 1) {
      const next = await listPromotions(
        { page, limit: 50 },
        { auth: "session" },
      );
      promotions.push(...next.data);
    }

    promotions.sort(
      (a, b) =>
        new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime(),
    );

    const rows = promotions.map(mapApiPromotionToAdminRow);

    return {
      rows,
      metrics: buildAdminPromotionMetrics(promotions, rows),
      error: null,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load promotions.";
    return {
      rows: [],
      metrics: buildAdminPromotionMetrics([], []),
      error: message,
    };
  }
}
