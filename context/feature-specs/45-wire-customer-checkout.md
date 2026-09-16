# 45 — Wire Customer Checkout (`/public/cart/checkout`)

## Goal

Replace mock place-order with the live customer checkout API for signed-in shoppers:

- Ensure a delivery address via `/public/addresses` (required unless pickup)
- `POST /public/cart/checkout` with `deliveryMethod` + optional `deliveryAddressId`
- Confirm Stripe payment when `clientSecret` is returned
- Navigate to `/order/[id]/confirmation` with the real `orderId`

## Behavior

| State | Checkout |
| --- | --- |
| Signed in | Live address + checkout APIs |
| Guest | Redirect to `/login?returnUrl=/checkout` (API requires customer JWT) |

### Delivery method map (UI → API)

| UI (`ShippingMethodId`) | API |
| --- | --- |
| `courier` | `ship` |
| `local` | `local_delivery` |
| `pickup` | `pickup` |

### Address

- Create (or reuse listed default) via `POST /public/addresses`
- Map form `streetAddress` → `line1`; province full name → ISO code; country `Canada` → `CA`
- Pickup: contact fields only for confirmation display; no address id required

### Payment

- Call checkout only on **Place Order** (checkout empties the cart)
- If response includes `clientSecret` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set → confirm via Stripe Elements
- If `clientSecret` is null (current staging) → treat order as placed / payment pending and continue to confirmation without fake card capture

## Out of Scope

- Guest checkout without auth
- Guest→server cart merge on login
- Saved-address picker UI polish beyond create-on-checkout
- Wishlist

## Acceptance

1. Signed-in shopper with cart can complete pickup or ship checkout end to end
2. Confirmation URL uses backend `orderId`; session payload includes `orderNumber` when present
3. Guests hitting `/checkout` are sent to login
4. Visual QA + TypeScript clean
