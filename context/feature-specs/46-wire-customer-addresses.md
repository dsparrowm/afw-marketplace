# 46 — Wire Account Addresses to `/public/addresses`

## Goal

Replace localStorage saved addresses on `/account/addresses` with the customer
Bearer APIs:

- `GET /public/addresses`
- `POST /public/addresses`
- `PATCH /public/addresses/{addressId}`
- `DELETE /public/addresses/{addressId}`

## Behavior

| UI field | API field |
| --- | --- |
| Full Name (display label) | `label` |
| Street | `line1` |
| City / Province / Postal / Country | same (`province` as ISO code; `country` `CA`) |
| Default checkbox | `isDefault` |

- Load list on mount via server action
- Create / edit / delete / set default mutate then refresh list
- Empty list shows honest empty state (no seeded mock addresses)
- Signed-out users remain gated by `AccountShell`

## Out of Scope

- Checkout address picker (still creates a new address on place order)
- Wishlist (`/public/wishlist*`) — follow-up spec
- Guest addresses

## Acceptance

1. `/account/addresses` lists live staging addresses for the signed-in customer
2. Add / edit / delete / set default persist across reload
3. No localStorage address seed shown when API returns empty
4. Visual QA + TypeScript clean
