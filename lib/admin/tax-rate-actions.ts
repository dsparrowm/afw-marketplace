"use server";

import { revalidatePath } from "next/cache";

import {
  createAdminTaxRate,
  deleteAdminTaxRate,
  updateAdminTaxRate,
} from "@/lib/api/settings";
import { percentToDecimal } from "@/lib/admin/map-admin-settings";

export type TaxRateMutationResult =
  | { ok: true }
  | { ok: false; error: string };

export async function createTaxRateAction(input: {
  province: string;
  gstPercent: number;
  pstPercent: number;
}): Promise<TaxRateMutationResult> {
  const province = input.province.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(province)) {
    return { ok: false, error: "Province must be a 2-letter code." };
  }
  if (!Number.isFinite(input.gstPercent) || input.gstPercent < 0) {
    return { ok: false, error: "GST/HST percent must be a non-negative number." };
  }
  if (!Number.isFinite(input.pstPercent) || input.pstPercent < 0) {
    return { ok: false, error: "PST percent must be a non-negative number." };
  }

  try {
    await createAdminTaxRate({
      province,
      gstRate: percentToDecimal(input.gstPercent),
      pstRate: percentToDecimal(input.pstPercent),
      isActive: true,
    });
    revalidatePath("/admin/settings");
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "Unable to create tax rate.",
    };
  }
}

export async function setTaxRateActiveAction(input: {
  id: string;
  isActive: boolean;
}): Promise<TaxRateMutationResult> {
  try {
    await updateAdminTaxRate(input.id, { isActive: input.isActive });
    revalidatePath("/admin/settings");
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "Unable to update tax rate.",
    };
  }
}

export async function deleteTaxRateAction(
  id: string,
): Promise<TaxRateMutationResult> {
  try {
    await deleteAdminTaxRate(id);
    revalidatePath("/admin/settings");
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "Unable to delete tax rate.",
    };
  }
}
