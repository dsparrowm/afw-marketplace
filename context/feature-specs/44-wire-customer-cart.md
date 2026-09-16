# 44 — Wire Customer Cart to `/public/cart*`

## Goal

When a customer is signed in, sync the storefront cart with staging:

- `GET /public/cart`
- `POST /public/cart/items`
- `PATCH /public/cart/items/{itemId}`
- `DELETE /public/cart/items/{itemId}`
- `POST/DELETE /public/cart/promo-code`

Guests keep the existing localStorage cart (API returns 401 without a customer JWT).

## Behavior

| State | Cart source |
| --- | --- |
| Signed in | Live `/public/cart*` via server actions |
| Guest | `localStorage` (unchanged) |

- PDP passes `variantId` (size option id) on add
- List/quick-add without `variantId` resolves the first variant via `/public/products/{slug}`
- Promo Apply uses live promo endpoints when signed in

## Out of Scope

- Checkout / Stripe (`POST /public/cart/checkout`)
- Merging guest local cart into server cart on login
- Guest session cart (API has none)

## Acceptance

1. Signed-in add/update/remove reflects on `/cart` after reload
2. Promo apply works when signed in (e.g. staging code)
3. Guest cart still works offline of the API
4. Visual QA + TypeScript clean
