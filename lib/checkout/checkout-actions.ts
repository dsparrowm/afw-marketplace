"use server";

import {
  createPublicAddress,
  listPublicAddresses,
} from "@/lib/api/public-addresses";
import {
  checkoutPublicCart,
  retryPublicOrderPayment,
} from "@/lib/api/public-cart";
import { toCountryCode, toProvinceCode } from "@/lib/checkout/province";
import type {
  ApiCheckoutResult,
  ApiCreateAddressBody,
  ApiDeliveryMethod,
  ApiPublicAddress,
} from "@/types/api";

export type AddressActionResult =
  | { ok: true; address: ApiPublicAddress }
  | { ok: false; error: string };

export type CheckoutActionResult =
  | {
      ok: true;
      orderId: string;
      orderNumber: number;
      total: number;
      clientSecret: string | null;
    }
  | { ok: false; error: string };

function friendlyError(error: unknown, fallback: string): string {
  if (!(error instanceof Error)) return fallback;
  const message = error.message;
  if (message.includes("Customer session required") || message.includes("(401)")) {
    return "Please sign in to check out.";
  }
  if (message.includes("(400)")) {
    return "Checkout could not be completed. Check your delivery details and cart.";
  }
  if (message.includes("(409)") || message.includes("(422)")) {
    return "Checkout could not be completed with the current cart.";
  }
  return fallback;
}

function parseMoney(value: number | string | null | undefined): number {
  if (value == null) return 0;
  const parsed = typeof value === "number" ? value : Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export async function listCustomerAddressesAction(): Promise<
  | { ok: true; addresses: ApiPublicAddress[] }
  | { ok: false; error: string }
> {
  try {
    const addresses = await listPublicAddresses();
    return { ok: true, addresses };
  } catch (error) {
    return {
      ok: false,
      error: friendlyError(error, "Unable to load saved addresses."),
    };
  }
}

export async function createCustomerAddressAction(input: {
  label?: string;
  line1: string;
  line2?: string;
  city: string;
  province: string;
  postalCode: string;
  country?: string;
  isDefault?: boolean;
}): Promise<AddressActionResult> {
  const body: ApiCreateAddressBody = {
    label: input.label?.trim() || "Delivery",
    line1: input.line1.trim(),
    line2: input.line2?.trim() || undefined,
    city: input.city.trim(),
    province: toProvinceCode(input.province),
    postalCode: input.postalCode.trim().toUpperCase().replace(/\s+/g, " "),
    country: toCountryCode(input.country ?? "CA"),
    isDefault: input.isDefault ?? true,
  };

  if (!body.line1 || !body.city || !body.province || !body.postalCode) {
    return { ok: false, error: "Address is incomplete." };
  }

  try {
    const address = await createPublicAddress(body);
    return { ok: true, address };
  } catch (error) {
    return {
      ok: false,
      error: friendlyError(error, "Unable to save delivery address."),
    };
  }
}

export async function checkoutCartAction(input: {
  deliveryMethod: ApiDeliveryMethod;
  deliveryAddressId?: string;
}): Promise<CheckoutActionResult> {
  if (
    input.deliveryMethod !== "pickup" &&
    !input.deliveryAddressId?.trim()
  ) {
    return { ok: false, error: "A delivery address is required." };
  }

  try {
    const result: ApiCheckoutResult = await checkoutPublicCart({
      deliveryMethod: input.deliveryMethod,
      deliveryAddressId:
        input.deliveryMethod === "pickup"
          ? undefined
          : input.deliveryAddressId?.trim(),
    });

    return {
      ok: true,
      orderId: result.orderId,
      orderNumber: result.orderNumber,
      total: parseMoney(result.total),
      clientSecret: result.clientSecret,
    };
  } catch (error) {
    return {
      ok: false,
      error: friendlyError(error, "Unable to place your order."),
    };
  }
}

export async function retryOrderPaymentAction(
  orderId: string,
): Promise<
  | { ok: true; clientSecret: string | null }
  | { ok: false; error: string }
> {
  try {
    const result = await retryPublicOrderPayment(orderId);
    return { ok: true, clientSecret: result.clientSecret };
  } catch (error) {
    return {
      ok: false,
      error: friendlyError(error, "Unable to restart payment."),
    };
  }
}
