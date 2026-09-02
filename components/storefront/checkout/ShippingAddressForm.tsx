import Link from "next/link";
import type { CheckoutAddress } from "@/lib/checkout/types";
import { CANADIAN_PROVINCES } from "@/lib/checkout/types";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type ShippingAddressFormProps = {
  address: CheckoutAddress;
  errors: Partial<Record<keyof CheckoutAddress, string>>;
  onChange: (field: keyof CheckoutAddress, value: string) => void;
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-medium text-foreground">{children}</label>;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-primary">{message}</p>;
}

export function ShippingAddressForm({
  address,
  errors,
  onChange,
}: ShippingAddressFormProps) {
  const inputClass = "h-[54px] rounded-xl";

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div>
        <FieldLabel>First Name</FieldLabel>
        <Input
          className={cn(inputClass, "mt-2")}
          value={address.firstName}
          onChange={(event) => onChange("firstName", event.target.value)}
          autoComplete="given-name"
        />
        <FieldError message={errors.firstName} />
      </div>
      <div>
        <FieldLabel>Last Name</FieldLabel>
        <Input
          className={cn(inputClass, "mt-2")}
          value={address.lastName}
          onChange={(event) => onChange("lastName", event.target.value)}
          autoComplete="family-name"
        />
        <FieldError message={errors.lastName} />
      </div>
      <div className="sm:col-span-2">
        <FieldLabel>Email Address</FieldLabel>
        <Input
          type="email"
          className={cn(inputClass, "mt-2")}
          value={address.email}
          onChange={(event) => onChange("email", event.target.value)}
          autoComplete="email"
        />
        <FieldError message={errors.email} />
      </div>
      <div className="sm:col-span-2">
        <FieldLabel>Phone Number</FieldLabel>
        <Input
          type="tel"
          className={cn(inputClass, "mt-2")}
          value={address.phone}
          onChange={(event) => onChange("phone", event.target.value)}
          autoComplete="tel"
          placeholder="+1 (647) 000-0000"
        />
        <FieldError message={errors.phone} />
      </div>
      <div className="sm:col-span-2">
        <FieldLabel>Street Address</FieldLabel>
        <Input
          className={cn(inputClass, "mt-2")}
          value={address.streetAddress}
          onChange={(event) => onChange("streetAddress", event.target.value)}
          autoComplete="street-address"
        />
        <FieldError message={errors.streetAddress} />
      </div>
      <div>
        <FieldLabel>City</FieldLabel>
        <Input
          className={cn(inputClass, "mt-2")}
          value={address.city}
          onChange={(event) => onChange("city", event.target.value)}
          autoComplete="address-level2"
        />
        <FieldError message={errors.city} />
      </div>
      <div>
        <FieldLabel>Province</FieldLabel>
        <select
          className={cn(
            inputClass,
            "mt-2 flex w-full border border-input bg-background px-4 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
          value={address.province}
          onChange={(event) => onChange("province", event.target.value)}
          autoComplete="address-level1"
        >
          {CANADIAN_PROVINCES.map((province) => (
            <option key={province} value={province}>{province}</option>
          ))}
        </select>
        <FieldError message={errors.province} />
      </div>
      <div>
        <FieldLabel>Postal Code</FieldLabel>
        <Input
          className={cn(inputClass, "mt-2")}
          value={address.postalCode}
          onChange={(event) => onChange("postalCode", event.target.value)}
          autoComplete="postal-code"
          placeholder="M5V 2L7"
        />
        <FieldError message={errors.postalCode} />
      </div>
      <div>
        <FieldLabel>Country</FieldLabel>
        <Input
          className={cn(inputClass, "mt-2")}
          value={address.country}
          onChange={(event) => onChange("country", event.target.value)}
          autoComplete="country-name"
          readOnly
        />
        <FieldError message={errors.country} />
      </div>
    </div>
  );
}

export function CheckoutGuestBanner() {
  return (
    <p className="text-sm text-muted-foreground">
      Already have an account?{" "}
      <Link
        href="/login?returnUrl=/checkout"
        className="font-semibold text-brand-green hover:text-brand-green/90"
      >
        Sign in
      </Link>
      <span className="mx-2 text-border">|</span>
      Checking out as a guest
    </p>
  );
}
