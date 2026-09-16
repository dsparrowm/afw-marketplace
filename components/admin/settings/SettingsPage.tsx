"use client";

import { useState } from "react";
import { SettingsHeader } from "@/components/admin/settings/SettingsHeader";
import { SettingsNav } from "@/components/admin/settings/SettingsNav";
import { StoreDetailsPanel } from "@/components/admin/settings/StoreDetailsPanel";
import { PaymentsPanel } from "@/components/admin/settings/PaymentsPanel";
import { TaxesPanel } from "@/components/admin/settings/TaxesPanel";
import { SettingsPlaceholderPanel } from "@/components/admin/settings/SettingsPlaceholderPanel";
import {
  adminSettingsNav,
  type AdminPaymentSettings,
  type AdminSettingsSection,
  type AdminStoreDetails,
  type AdminTaxRate,
} from "@/lib/mocks/admin-settings";

type SettingsPageProps = {
  initialDetails: AdminStoreDetails;
  payment: AdminPaymentSettings | null;
  taxRates: AdminTaxRate[];
  storeError?: string | null;
  paymentError?: string | null;
  taxError?: string | null;
};

/** Settings — Figma `72:1734` / main `72:1792` */
export function SettingsPage({
  initialDetails,
  payment,
  taxRates,
  storeError = null,
  paymentError = null,
  taxError = null,
}: SettingsPageProps) {
  const [section, setSection] =
    useState<AdminSettingsSection>("store-details");

  const activeLabel =
    adminSettingsNav.find((item) => item.id === section)?.label ?? "Settings";

  return (
    <div className="mx-auto max-w-[1180px] px-8 py-8">
      <SettingsHeader />

      <div className="mt-6 flex flex-col gap-6 lg:flex-row">
        <SettingsNav
          items={adminSettingsNav}
          active={section}
          onChange={setSection}
        />
        {section === "store-details" ? (
          <StoreDetailsPanel
            initialDetails={initialDetails}
            loadError={storeError}
          />
        ) : section === "payments" ? (
          <PaymentsPanel payment={payment} loadError={paymentError} />
        ) : section === "taxes" ? (
          <TaxesPanel initialRates={taxRates} loadError={taxError} />
        ) : (
          <SettingsPlaceholderPanel title={activeLabel} />
        )}
      </div>
    </div>
  );
}
