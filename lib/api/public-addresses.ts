import { marketplaceFetch } from "@/lib/api/client";
import type {
  ApiCreateAddressBody,
  ApiPublicAddress,
  ApiUpdateAddressBody,
} from "@/types/api";

/** GET /public/addresses */
export async function listPublicAddresses(): Promise<ApiPublicAddress[]> {
  return marketplaceFetch<ApiPublicAddress[]>("/public/addresses", {
    auth: "customer",
  });
}

/** POST /public/addresses */
export async function createPublicAddress(
  body: ApiCreateAddressBody,
): Promise<ApiPublicAddress> {
  return marketplaceFetch<ApiPublicAddress>("/public/addresses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    auth: "customer",
  });
}

/** PATCH /public/addresses/{addressId} */
export async function updatePublicAddress(
  addressId: string,
  body: ApiUpdateAddressBody,
): Promise<ApiPublicAddress> {
  return marketplaceFetch<ApiPublicAddress>(
    `/public/addresses/${encodeURIComponent(addressId)}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      auth: "customer",
    },
  );
}

/** DELETE /public/addresses/{addressId} */
export async function deletePublicAddress(addressId: string): Promise<void> {
  await marketplaceFetch<void>(
    `/public/addresses/${encodeURIComponent(addressId)}`,
    { method: "DELETE", auth: "customer" },
  );
}
