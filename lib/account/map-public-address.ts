import {
  fromCountryCode,
  fromProvinceCode,
} from "@/lib/checkout/province";
import type { ApiPublicAddress } from "@/types/api";
import type { SavedAddress } from "@/types/account";

export function mapApiAddressToSaved(address: ApiPublicAddress): SavedAddress {
  return {
    id: address.id,
    fullName: address.label?.trim() || "Address",
    street: address.line1,
    city: address.city,
    province: fromProvinceCode(address.province),
    postalCode: address.postalCode,
    country: fromCountryCode(address.country),
    isDefault: Boolean(address.isDefault),
  };
}
