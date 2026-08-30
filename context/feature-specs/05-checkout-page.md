# 05 — Checkout Page

## Goal

Implement the checkout page matching Figma frame `Checkout Page` (`2:1516`).

## Figma Reference

- Frame: `checkout-page` — node `2:1516`, 1440×1683
- Metadata: `figma-cache/storefront/checkout-page/metadata.xml`
- Sections: announcement-bar (`18:379`), header (`18:381`), main (`2:1527`), footer (`2:1721`)

## Route

- `app/(storefront)/checkout/page.tsx`
- Requires non-empty cart (redirect to `/cart` if empty)

## Page Structure

Main section (`2:1527`) — read XML for exact fields. Expected areas:

- Shipping address form (or saved address selector for authenticated users)
- Delivery method selection
- Payment method section
- Order review / line items summary
- Place Order CTA

## Components

```
components/storefront/
  CheckoutPage.tsx
  ShippingAddressForm.tsx
  DeliveryMethodSelect.tsx
  PaymentSection.tsx
  CheckoutOrderSummary.tsx
```

## Auth Gate

- Guest checkout vs login-required — confirm with backend
- If auth required, redirect to `/login?returnUrl=/checkout`

## Implementation Steps

1. Read `checkout-page/sections/main.xml`
2. Create checkout page with cart guard
3. Implement shipping address form with validation
4. Implement order summary (read-only cart items)
5. Place order action — mock success navigates to confirmation
6. v2: wire to `POST /orders` (or equivalent)

## Acceptance Criteria

- [ ] `/checkout` redirects to `/cart` when cart is empty
- [ ] Shipping form validates required fields
- [ ] Order summary shows cart items and totals
- [ ] Place order (mock) navigates to `/order/[id]/confirmation`
- [ ] Layout matches Figma main section
