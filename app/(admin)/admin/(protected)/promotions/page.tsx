import type { Metadata } from "next";
import { PromotionsPage } from "@/components/admin/promotions/PromotionsPage";
import { loadAdminPromotions } from "@/lib/admin/load-admin-promotions";

export const metadata: Metadata = {
  title: "Promotions · Admin · AFW Marketplace",
};

export default async function AdminPromotionsRoute() {
  const data = await loadAdminPromotions();

  return (
    <PromotionsPage
      initialRows={data.rows}
      metrics={data.metrics}
      loadError={data.error}
    />
  );
}
