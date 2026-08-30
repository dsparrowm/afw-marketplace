# Feature Specs

Route-level implementation specs for the AFW Marketplace storefront. Each spec maps to
one or more Figma frames in `figma-cache/manifest.json`.

## Build Order

| # | Spec | Figma slug(s) | Route(s) |
| --- | --- | --- | --- |
| 00 | `00-storefront-shell.md` | footer + shared header/announcement sections | (layout) |
| 01 | `01-homepage.md` | homepage | `/` |
| 02 | `02-shop-catalog.md` | shop-catalog | `/shop` |
| 03 | `03-product-detail.md` | product-detail | `/shop/[slug]` |
| 04 | `04-cart-page.md` | cart-page | `/cart` |
| 05 | `05-checkout-page.md` | checkout-page | `/checkout` |
| 06 | `06-order-confirmation.md` | order-confirmation | `/order/[id]/confirmation` |
| 07 | `07-mobile-storefront.md` | mobile-homepage, mobile-shop-catalog | responsive |
| 08 | `08-auth.md` | auth-login, auth-signup | `/login`, `/signup` |
| 09 | `09-account-dashboard.md` | dashboard-* frames | `/account/*` |

## Usage

1. Read the spec before implementing
2. Cross-reference Figma cache: `figma-cache/storefront/<slug>/`
3. Implement one **section** or **component group** at a time
4. Mark completion in `context/progress-tracker.md`
5. Update `figma-cache/manifest.json` frame `status` when design context is fetched

## Figma Cache Status Key

| Status | Meaning |
| --- | --- |
| `metadata-only` | XML metadata extracted; no screenshot or design-context yet |
| `partial` | Screenshot and/or some sections have design-context |
| `complete` | All sections have screenshots and design-context |
