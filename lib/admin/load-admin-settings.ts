import "server-only";

import {
  getAdminPaymentSettings,
  getAdminStoreSettings,
  listAdminTaxRates,
} from "@/lib/api/settings";
import {
  mapApiPaymentSettingsToAdmin,
  mapApiStoreSettingsToDetails,
  mapApiTaxRateToAdmin,
} from "@/lib/admin/map-admin-settings";
import type {
  AdminPaymentSettings,
  AdminStoreDetails,
  AdminTaxRate,
} from "@/lib/mocks/admin-settings";
import type { ApiStoreSettings } from "@/types/api";

const EMPTY_DETAILS: AdminStoreDetails = {
  storeName: "",
  storeUrl: "https://afwmarketplace.ca",
  contactEmail: "",
  phoneNumber: "",
  businessAddress: "",
  currency: "CAD ($) - Canadian Dollar",
  timezone: "Eastern Time (ET) - Toronto",
};

export type AdminSettingsLoadResult = {
  details: AdminStoreDetails;
  payment: AdminPaymentSettings | null;
  taxRates: AdminTaxRate[];
  storeError: string | null;
  paymentError: string | null;
  taxError: string | null;
  raw?: ApiStoreSettings;
};

export async function loadAdminSettings(): Promise<AdminSettingsLoadResult> {
  const [storeResult, paymentResult, taxResult] = await Promise.allSettled([
    getAdminStoreSettings(),
    getAdminPaymentSettings(),
    listAdminTaxRates(),
  ]);

  const result: AdminSettingsLoadResult = {
    details: EMPTY_DETAILS,
    payment: null,
    taxRates: [],
    storeError: null,
    paymentError: null,
    taxError: null,
  };

  if (storeResult.status === "fulfilled") {
    result.raw = storeResult.value;
    result.details = mapApiStoreSettingsToDetails(storeResult.value);
  } else {
    result.storeError =
      storeResult.reason instanceof Error
        ? storeResult.reason.message
        : "Unable to load store settings.";
  }

  if (paymentResult.status === "fulfilled") {
    result.payment = mapApiPaymentSettingsToAdmin(paymentResult.value);
  } else {
    result.paymentError =
      paymentResult.reason instanceof Error
        ? paymentResult.reason.message
        : "Unable to load payment settings.";
  }

  if (taxResult.status === "fulfilled") {
    result.taxRates = taxResult.value.map(mapApiTaxRateToAdmin);
  } else {
    result.taxError =
      taxResult.reason instanceof Error
        ? taxResult.reason.message
        : "Unable to load tax rates.";
  }

  return result;
}
