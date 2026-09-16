"use server";

import {
  createPublicAddress,
  deletePublicAddress,
  listPublicAddresses,
  updatePublicAddress,
} from "@/lib/api/public-addresses";
import { mapApiAddressToSaved } from "@/lib/account/map-public-address";
import { toCountryCode, toProvinceCode } from "@/lib/checkout/province";
import type { SavedAddress } from "@/types/account";

export type AddressesActionResult =
  | { ok: true; addresses: SavedAddress[] }
  | { ok: false; error: string };

function friendlyError(error: unknown, fallback: string): string {
  if (!(error instanceof Error)) return fallback;
  const message = error.message;
  if (message.includes("Customer session required") || message.includes("(401)")) {
    return "Please sign in to manage addresses.";
  }
  if (message.includes("(400)")) {
    return "That address could not be saved. Check the fields and try again.";
  }
  return fallback;
}

async function loadMappedAddresses(): Promise<SavedAddress[]> {
  const addresses = await listPublicAddresses();
  return addresses
    .map(mapApiAddressToSaved)
    .sort((a, b) => Number(b.isDefault) - Number(a.isDefault));
}

export async function listCustomerAddressesPageAction(): Promise<AddressesActionResult> {
  try {
    return { ok: true, addresses: await loadMappedAddresses() };
  } catch (error) {
    return {
      ok: false,
      error: friendlyError(error, "Unable to load saved addresses."),
    };
  }
}

export async function createCustomerAddressPageAction(input: {
  fullName: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}): Promise<AddressesActionResult> {
  try {
    await createPublicAddress({
      label: input.fullName.trim() || "Address",
      line1: input.street.trim(),
      city: input.city.trim(),
      province: toProvinceCode(input.province),
      postalCode: input.postalCode.trim().toUpperCase().replace(/\s+/g, " "),
      country: toCountryCode(input.country),
      isDefault: input.isDefault,
    });
    return { ok: true, addresses: await loadMappedAddresses() };
  } catch (error) {
    return {
      ok: false,
      error: friendlyError(error, "Unable to save address."),
    };
  }
}

export async function updateCustomerAddressPageAction(input: {
  id: string;
  fullName: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}): Promise<AddressesActionResult> {
  try {
    await updatePublicAddress(input.id, {
      label: input.fullName.trim() || "Address",
      line1: input.street.trim(),
      city: input.city.trim(),
      province: toProvinceCode(input.province),
      postalCode: input.postalCode.trim().toUpperCase().replace(/\s+/g, " "),
      country: toCountryCode(input.country),
      isDefault: input.isDefault,
    });
    return { ok: true, addresses: await loadMappedAddresses() };
  } catch (error) {
    return {
      ok: false,
      error: friendlyError(error, "Unable to update address."),
    };
  }
}

export async function deleteCustomerAddressPageAction(
  id: string,
): Promise<AddressesActionResult> {
  try {
    await deletePublicAddress(id);
    return { ok: true, addresses: await loadMappedAddresses() };
  } catch (error) {
    return {
      ok: false,
      error: friendlyError(error, "Unable to delete address."),
    };
  }
}

export async function setDefaultCustomerAddressPageAction(
  id: string,
): Promise<AddressesActionResult> {
  try {
    await updatePublicAddress(id, { isDefault: true });
    return { ok: true, addresses: await loadMappedAddresses() };
  } catch (error) {
    return {
      ok: false,
      error: friendlyError(error, "Unable to set default address."),
    };
  }
}
