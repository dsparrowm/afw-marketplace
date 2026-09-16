"use server";

import { revalidatePath } from "next/cache";

import {
  createPromotion,
  deletePromotion,
  updatePromotion,
} from "@/lib/api/promotions";
import type {
  ApiCreatePromotionBody,
  ApiUpdatePromotionBody,
} from "@/types/api";

export type PromotionMutationResult =
  | { ok: true }
  | { ok: false; error: string };

export type PromotionFormInput = {
  code: string;
  discountType: "percentage" | "fixed" | "free_shipping";
  discountValue: number;
  startsAt: string;
  endsAt: string;
  usageLimit?: number | null;
};

function toIsoStart(dateInput: string): string {
  return new Date(`${dateInput}T00:00:00.000Z`).toISOString();
}

function toIsoEnd(dateInput: string): string {
  return new Date(`${dateInput}T23:59:59.999Z`).toISOString();
}

function buildBody(input: PromotionFormInput): ApiCreatePromotionBody {
  const code = input.code.trim().toUpperCase();
  const discountValue =
    input.discountType === "free_shipping" ? 0 : input.discountValue;

  return {
    code,
    discountType: input.discountType,
    discountValue,
    scope: "store_wide",
    startsAt: toIsoStart(input.startsAt),
    endsAt: toIsoEnd(input.endsAt),
    ...(input.usageLimit != null && input.usageLimit > 0
      ? { usageLimit: input.usageLimit }
      : {}),
  };
}

function validate(input: PromotionFormInput): string | null {
  if (!input.code.trim()) return "Promotion code is required.";
  if (!input.startsAt || !input.endsAt) {
    return "Start and end dates are required.";
  }
  if (input.endsAt < input.startsAt) {
    return "End date must be on or after the start date.";
  }
  if (
    input.discountType !== "free_shipping" &&
    (!Number.isFinite(input.discountValue) || input.discountValue <= 0)
  ) {
    return "Discount value must be greater than zero.";
  }
  if (
    input.discountType === "percentage" &&
    (input.discountValue < 1 || input.discountValue > 100)
  ) {
    return "Percentage discount must be between 1 and 100.";
  }
  return null;
}

export async function createPromotionAction(
  input: PromotionFormInput,
): Promise<PromotionMutationResult> {
  const error = validate(input);
  if (error) return { ok: false, error };

  try {
    await createPromotion(buildBody(input));
    revalidatePath("/admin/promotions");
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error:
        err instanceof Error ? err.message : "Unable to create promotion.",
    };
  }
}

export async function updatePromotionAction(input: {
  id: string;
  form: PromotionFormInput;
}): Promise<PromotionMutationResult> {
  const error = validate(input.form);
  if (error) return { ok: false, error };

  const body = buildBody(input.form) as ApiUpdatePromotionBody;

  try {
    await updatePromotion(input.id, body);
    revalidatePath("/admin/promotions");
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error:
        err instanceof Error ? err.message : "Unable to update promotion.",
    };
  }
}

export async function deletePromotionAction(
  id: string,
): Promise<PromotionMutationResult> {
  try {
    await deletePromotion(id);
    revalidatePath("/admin/promotions");
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error:
        err instanceof Error ? err.message : "Unable to delete promotion.",
    };
  }
}
