# 47 — Wire Customer Wishlist to `/public/wishlist*`

## Goal

Wire storefront wishlist hearts to the customer Bearer APIs:

- `GET /public/wishlist`
- `POST /public/wishlist/items` (`{ variantId }`)
- `DELETE /public/wishlist/items/{itemId}`

## Behavior

| Surface | Action |
| --- | --- |
| PDP heart (`ProductInfo`) | Toggle selected size `variantId` |
| Product card / mobile card heart | Toggle via slug → first public variant |
| Guest | Redirect to `/login?returnUrl=…` |

- Signed-in: load wishlist on auth hydrate; filled heart when saved
- Idempotent add (API); remove uses wishlist item id
- No dedicated wishlist account page in Figma yet — hearts only

## Out of Scope

- Account wishlist route / tab
- Guest local wishlist
- Order history

## Acceptance

1. Signed-in shopper can save/unsave from PDP; state survives reload
2. Product card heart reflects wishlist for that product
3. Guests are sent to login
4. Visual QA + TypeScript clean
