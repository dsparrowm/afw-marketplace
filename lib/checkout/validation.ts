import type { CheckoutAddress } from "@/lib/checkout/types";

export type CheckoutFieldErrors = Partial<Record<keyof CheckoutAddress, string>>;

export function validateCheckoutAddress(
  address: CheckoutAddress,
  options: { requireStreet?: boolean } = {},
): CheckoutFieldErrors {
  const requireStreet = options.requireStreet ?? true;
  const errors: CheckoutFieldErrors = {};

  if (!address.firstName.trim()) errors.firstName = "First name is required";
  if (!address.lastName.trim()) errors.lastName = "Last name is required";

  const email = address.email.trim();
  if (!email) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address";
  }

  if (!address.phone.trim()) errors.phone = "Phone number is required";

  if (requireStreet) {
    if (!address.streetAddress.trim()) {
      errors.streetAddress = "Street address is required";
    }
    if (!address.city.trim()) errors.city = "City is required";
    if (!address.province.trim()) errors.province = "Province is required";

    const postal = address.postalCode.trim();
    if (!postal) {
      errors.postalCode = "Postal code is required";
    } else if (!/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(postal)) {
      errors.postalCode = "Enter a valid Canadian postal code";
    }

    if (!address.country.trim()) errors.country = "Country is required";
  }

  return errors;
}

export function validatePaymentFields(fields: {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}): Partial<Record<keyof typeof fields, string>> {
  const errors: Partial<Record<keyof typeof fields, string>> = {};

  if (!fields.cardName.trim()) errors.cardName = "Name on card is required";
  if (!fields.cardNumber.replace(/\s/g, "").match(/^\d{16}$/)) {
    errors.cardNumber = "Enter a valid 16-digit card number";
  }
  if (!fields.expiry.match(/^\d{2}\/\d{2}$/)) {
    errors.expiry = "Use MM/YY format";
  }
  if (!fields.cvc.match(/^\d{3,4}$/)) {
    errors.cvc = "Enter a valid CVC";
  }

  return errors;
}
