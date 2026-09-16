import { cn } from "@/lib/utils";
import type { ApiPublicAddress } from "@/types/api";

const NEW_ADDRESS = "new";

export function SavedAddressPicker({
  addresses,
  value,
  onChange,
  error,
}: {
  addresses: ApiPublicAddress[];
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
}) {
  if (addresses.length === 0 && !error) return null;

  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold text-foreground">Saved addresses</legend>
      {error ? <p className="text-sm text-primary">{error}</p> : null}
      <div className="space-y-2">
        {addresses.map((address) => {
          const selected = value === address.id;
          return (
            <label
              key={address.id}
              className={cn(
                "flex cursor-pointer gap-3 rounded-xl border px-4 py-3",
                selected ? "border-brand-green bg-brand-green/5" : "border-border bg-card",
              )}
            >
              <input
                type="radio"
                name="saved-address"
                className="mt-1 accent-brand-green"
                checked={selected}
                onChange={() => onChange(address.id)}
              />
              <span className="text-sm">
                <span className="font-medium text-foreground">
                  {address.label?.trim() || "Address"}
                  {address.isDefault ? " · Default" : ""}
                </span>
                <span className="mt-1 block text-muted-foreground">
                  {address.line1}, {address.city}, {address.province} {address.postalCode}
                </span>
              </span>
            </label>
          );
        })}
        <label
          className={cn(
            "flex cursor-pointer gap-3 rounded-xl border px-4 py-3",
            value === NEW_ADDRESS
              ? "border-brand-green bg-brand-green/5"
              : "border-border bg-card",
          )}
        >
          <input
            type="radio"
            name="saved-address"
            className="mt-1 accent-brand-green"
            checked={value === NEW_ADDRESS}
            onChange={() => onChange(NEW_ADDRESS)}
          />
          <span className="text-sm font-medium text-foreground">Use a new address</span>
        </label>
      </div>
    </fieldset>
  );
}

export const NEW_SAVED_ADDRESS = NEW_ADDRESS;
