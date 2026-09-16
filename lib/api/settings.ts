import "server-only";

import { marketplaceFetch } from "@/lib/api/client";
import type {
  ApiCreateTaxRateBody,
  ApiPaymentSettings,
  ApiStoreSettings,
  ApiTaxRate,
  ApiUpdateStoreSettingsBody,
  ApiUpdateTaxRateBody,
} from "@/types/api";

export async function getAdminStoreSettings() {
  return marketplaceFetch<ApiStoreSettings>("/admin/settings", {
    auth: "session",
    cache: "no-store",
  });
}

export async function updateAdminStoreSettings(
  body: ApiUpdateStoreSettingsBody,
) {
  return marketplaceFetch<ApiStoreSettings>("/admin/settings", {
    method: "PATCH",
    auth: "session",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
}

export async function getAdminPaymentSettings() {
  return marketplaceFetch<ApiPaymentSettings>("/admin/settings/payment", {
    auth: "session",
    cache: "no-store",
  });
}

export async function listAdminTaxRates() {
  return marketplaceFetch<ApiTaxRate[]>("/admin/settings/tax-rates", {
    auth: "session",
    cache: "no-store",
  });
}

export async function createAdminTaxRate(body: ApiCreateTaxRateBody) {
  return marketplaceFetch<ApiTaxRate>("/admin/settings/tax-rates", {
    method: "POST",
    auth: "session",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
}

export async function updateAdminTaxRate(
  id: string,
  body: ApiUpdateTaxRateBody,
) {
  return marketplaceFetch<ApiTaxRate>(`/admin/settings/tax-rates/${id}`, {
    method: "PATCH",
    auth: "session",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
}

export async function deleteAdminTaxRate(id: string) {
  return marketplaceFetch<void>(`/admin/settings/tax-rates/${id}`, {
    method: "DELETE",
    auth: "session",
    cache: "no-store",
  });
}
