import type { SavedAddress } from "@/types/account";

const ADDRESSES_STORAGE_KEY = "afw-marketplace-addresses";

const defaultAddresses: SavedAddress[] = [
  {
    id: "addr-home",
    fullName: "Adaeze Okafor",
    street: "458 Spadina Ave, Apt 302",
    city: "Toronto",
    province: "ON",
    postalCode: "M5S 2G8",
    country: "Canada",
    isDefault: true,
  },
  {
    id: "addr-business",
    fullName: "Okafor Foods & Catering",
    street: "1280 Finch Ave West, Unit 12",
    city: "North York",
    province: "ON",
    postalCode: "M3J 3K9",
    country: "Canada",
    isDefault: false,
  },
];

function readAll(): SavedAddress[] {
  if (typeof window === "undefined") return defaultAddresses;

  try {
    const raw = localStorage.getItem(ADDRESSES_STORAGE_KEY);
    if (!raw) return defaultAddresses;
    const parsed = JSON.parse(raw) as SavedAddress[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultAddresses;
  } catch {
    return defaultAddresses;
  }
}

function writeAll(addresses: SavedAddress[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(addresses));
}

export function getSavedAddresses(): SavedAddress[] {
  return readAll();
}

export function saveAddress(address: Omit<SavedAddress, "id"> & { id?: string }): SavedAddress[] {
  const current = readAll();
  const next: SavedAddress = {
    ...address,
    id: address.id ?? `addr-${Date.now()}`,
  };

  let updated = address.id
    ? current.map((item) => (item.id === address.id ? next : item))
    : [...current, next];

  if (next.isDefault) {
    updated = updated.map((item) => ({
      ...item,
      isDefault: item.id === next.id,
    }));
  }

  writeAll(updated);
  return updated;
}

export function deleteAddress(id: string): SavedAddress[] {
  const current = readAll().filter((item) => item.id !== id);
  if (current.length > 0 && !current.some((item) => item.isDefault)) {
    current[0] = { ...current[0], isDefault: true };
  }
  writeAll(current);
  return current;
}

export function setDefaultAddress(id: string): SavedAddress[] {
  const updated = readAll().map((item) => ({
    ...item,
    isDefault: item.id === id,
  }));
  writeAll(updated);
  return updated;
}
