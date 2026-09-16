# AFW Marketplace Storefront

## Overview

AFW Marketplace is a public e-commerce storefront for authentic African food products.
It targets retail and wholesale buyers in Canada, with products sourced directly from
farms and producers across Nigeria and Africa.

The storefront covers product discovery, catalog browsing, cart management, checkout,
order confirmation, and a signed-in customer account area (orders, addresses, reorders,
profile).

Staff **admin** UI (overview dashboard, catalog ops, orders, financials) is also in
scope for this repo, under `/admin/*`, matching the Figma Admin canvas (`71:2`). It
wires to staging `/admin/*` APIs via server-side proxies — never expose staff tokens to
the browser.

## Goals

1. Deliver a polished, design-faithful shopping experience from the Figma Storefront canvas
2. Support retail and wholesale buyer journeys (personal vs business accounts)
3. Integrate with the marketplace backend for products, cart, checkout, and orders
4. Provide a responsive experience — desktop-first, with dedicated mobile frames
5. Keep the frontend aligned with backend API contracts (no invented endpoints)

## Brand Positioning

- **Tagline:** Authentic African Food. Naturally Sourced.
- **Value prop:** 100% organic products sourced directly from farms and producers across
  Nigeria and Africa, delivered fresh to your door in Canada.
- **Promo:** Free shipping on orders over $150 (announcement bar)
- **Locale defaults:** CAD currency, Canada delivery (design shows Toronto, ON)

## Primary Areas

| Area | Purpose |
| --- | --- |
| Storefront shell | Announcement bar, header (nav, search, locale), footer |
| Homepage | Hero, categories, featured/trending/recently-added product sections |
| Shop catalog | Product grid with filters and sorting |
| Product detail | Product images, pricing, variants, add-to-cart |
| Cart | Line items, quantities, order summary |
| Checkout | Shipping, payment, order review |
| Order confirmation | Post-purchase summary and next steps |
| Mobile storefront | Mobile homepage and shop catalog with bottom nav |
| Auth | Login and signup (personal + business/wholesale) |
| Account dashboard | Orders, order detail, addresses, reorder list, profile |
| Admin (staff) | Sidebar shell, overview metrics, catalog/orders ops (Figma Admin canvas) |

## Planned Route Map

Routes below are the target structure. Create route files only when the matching
feature spec is being implemented.

### Public shopping

- `/` — Homepage
- `/shop` — Shop catalog (category/filter query params TBD)
- `/shop/[slug]` or `/products/[slug]` — Product detail (confirm with backend)
- `/cart` — Cart page
- `/checkout` — Checkout page
- `/order/[id]/confirmation` — Order confirmation
- `/privacy`, `/terms`, `/shipping`, `/returns`, `/faq` — operational policy pages (legal review still required)

### Auth

- `/login` — Login (tab on auth card)
- `/signup` — Signup with personal / business toggle
- `/forgot-password` — Password reset request (generic success, no account enumeration)
- `/reset-password` — Password reset confirm (`?token=`)

### Account (authenticated)

- `/account` — Redirect to orders or profile default
- `/account/orders` — Order history
- `/account/orders/[id]` — Order detail
- `/account/addresses` — Saved addresses
- `/account/reorder` — Reorder list
- `/account/profile` — Profile settings

### Admin (staff)

- `/admin` — Overview dashboard
- `/admin/login` — Staff sign in (HTTP-only session cookies)
- `/admin/products` — Products list
- `/admin/inventory` — Inventory
- `/admin/orders` — Orders & delivery
- `/admin/financials` — Financials
- `/admin/promotions` — Promotions
- `/admin/customers` — Customers
- `/admin/access` — Access / roles
- `/admin/settings` — Settings
- Additional detail routes (product form, delivery tracking, receipts) per
  `figma-cache/manifest.json` → `adminBuildOrder` when those specs are built

## Figma Frame Map

See `figma-cache/manifest.json` for node IDs. Summary:

| Slug | Figma frame | Node ID | Platform |
| --- | --- | --- | --- |
| homepage | Homepage | `2:4` | desktop 1440px |
| shop-catalog | Shop Catalog | `2:239` | desktop |
| product-detail | Product Detail | `2:870` | desktop |
| cart-page | Cart Page | `2:1184` | desktop |
| checkout-page | Checkout Page | `2:1516` | desktop |
| order-confirmation | Order Confirmation | `2:1734` | desktop |
| footer | Footer | `18:70` | shared |
| mobile-homepage | Mobile Homepage | `2:1928` | mobile 375px |
| mobile-shop-catalog | Mobile Shop Catalog | `3:2189` | mobile |
| auth-login | auth-login-signup | `29:15` | account |
| auth-signup | auth-login-signup | `28:1161` | account |
| dashboard-orders | dashboard-orders | `29:86` | account |
| order-detail | order-detail | `29:192` | account |
| dashboard-addresses | dashboard-addresses | `29:279` | account |
| dashboard-reorder-list | dashboard-reorder-list | `29:329` | account |
| dashboard-profile | dashboard-profile | `29:433` | account |

## Product Categories (from design)

Homepage "Shop by Category" carousel includes:

- Fresh Produce
- Frozen Proteins
- Grains & Flour
- Spices & Seasonings
- (additional categories in Figma metadata — confirm full list during implementation)

## Success Criteria

1. Desktop shopping flow matches Figma frames end to end (homepage → confirmation)
2. Shared shell components (header, footer, announcement bar) are reused across pages
3. Cart and checkout integrate with backend APIs when available
4. Auth supports personal and business account types per signup design
5. Account dashboard pages match Figma account frames
6. Mobile layouts match mobile Figma frames at 375px width
