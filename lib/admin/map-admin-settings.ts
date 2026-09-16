import type {
  AdminPaymentSettings,
  AdminStoreDetails,
  AdminTaxRate,
} from "@/lib/mocks/admin-settings";
import type {
  ApiPaymentSettings,
  ApiStoreSettings,
  ApiTaxRate,
  ApiUpdateStoreSettingsBody,
} from "@/types/api";

const UI_ONLY_DEFAULTS = {
  storeUrl: "https://afwmarketplace.ca",
  currency: "CAD ($) - Canadian Dollar",
  timezone: "Eastern Time (ET) - Toronto",
} as const;

function composeBusinessAddress(settings: ApiStoreSettings): string {
  return [
    settings.addressLine1,
    settings.addressLine2,
    [settings.city, settings.province].filter(Boolean).join(", "),
    settings.postalCode,
    settings.country,
  ]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join("\n");
}

export function mapApiStoreSettingsToDetails(
  settings: ApiStoreSettings,
): AdminStoreDetails {
  return {
    storeName: settings.businessName,
    storeUrl: UI_ONLY_DEFAULTS.storeUrl,
    contactEmail: settings.businessEmail,
    phoneNumber: settings.businessPhone,
    businessAddress: composeBusinessAddress(settings),
    currency: UI_ONLY_DEFAULTS.currency,
    timezone: UI_ONLY_DEFAULTS.timezone,
  };
}

/**
 * Freeform address → API fields. Whole body (minus trailing country code) goes in
 * `addressLine1` so the textarea round-trips; structured city/province/postal are
 * cleared because the UI does not edit them line-by-line.
 */
export function mapStoreDetailsToUpdateBody(
  details: AdminStoreDetails,
  previous: ApiStoreSettings,
): ApiUpdateStoreSettingsBody {
  const lines = details.businessAddress
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  let country = previous.country || "CA";
  const last = lines[lines.length - 1];
  if (last && /^[A-Za-z]{2}$/.test(last)) {
    country = last.toUpperCase();
    lines.pop();
  }

  return {
    businessName: details.storeName.trim(),
    businessEmail: details.contactEmail.trim(),
    businessPhone: details.phoneNumber.trim(),
    addressLine1: lines.join(", ") || previous.addressLine1,
    addressLine2: null,
    city: "",
    province: "",
    postalCode: "",
    country,
  };
}

function toRateNumber(value: number | string): number {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
}

/** API stores decimal fractions (0.13); UI shows percent (13). */
export function mapApiTaxRateToAdmin(rate: ApiTaxRate): AdminTaxRate {
  return {
    id: rate.id,
    province: rate.province,
    gstPercent: Math.round(toRateNumber(rate.gstRate) * 10000) / 100,
    pstPercent: Math.round(toRateNumber(rate.pstRate) * 10000) / 100,
    isActive: rate.isActive,
  };
}

export function mapApiPaymentSettingsToAdmin(
  settings: ApiPaymentSettings,
): AdminPaymentSettings {
  return {
    provider: settings.provider || "—",
    live: Boolean(settings.live),
  };
}

export function percentToDecimal(percent: number): number {
  return Math.round(percent * 100) / 10000;
}
