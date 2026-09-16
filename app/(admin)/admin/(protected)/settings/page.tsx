import type { Metadata } from "next";
import { SettingsPage } from "@/components/admin/settings/SettingsPage";
import { loadAdminSettings } from "@/lib/admin/load-admin-settings";

export const metadata: Metadata = {
  title: "Settings · Admin · AFW Marketplace",
};

export default async function AdminSettingsRoute() {
  const result = await loadAdminSettings();

  return (
    <SettingsPage
      initialDetails={result.details}
      payment={result.payment}
      taxRates={result.taxRates}
      storeError={result.storeError}
      paymentError={result.paymentError}
      taxError={result.taxError}
    />
  );
}
