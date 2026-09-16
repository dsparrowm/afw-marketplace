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
| 10 | `10-admin-shell-overview.md` | admin overview (+ shared sidebar) | `/admin` |
| 11 | `11-admin-products.md` | admin products | `/admin/products` |
| 12 | `12-admin-inventory.md` | admin inventory | `/admin/inventory` |
| 13 | `13-admin-orders.md` | admin orders-and-delivery | `/admin/orders` |
| 14 | `14-admin-financials.md` | admin financials | `/admin/financials` |
| 15 | `15-admin-promotions.md` | admin promotions | `/admin/promotions` |
| 16 | `16-admin-customers.md` | admin customers | `/admin/customers` |
| 17 | `17-admin-access.md` | admin access | `/admin/access` |
| 18 | `18-admin-settings.md` | admin settings | `/admin/settings` |
| 19 | `19-admin-product-detail.md` | admin product-detail-admin | `/admin/products/[id]` |
| 20 | `20-admin-product-form.md` | admin add-edit-product-form | `/admin/products/new`, `/admin/products/[id]/edit` |
| 21 | `21-admin-delivery-tracking.md` | admin delivery-tracking | `/admin/orders/[id]` |
| 22 | `22-admin-transaction-receipt.md` | admin transaction-receipt | `/admin/financials/transactions/[id]` |
| 23 | `23-admin-staff-auth.md` | (no Figma frame) | `/admin/login` + middleware gate |
| 24 | `24-seed-staging-catalog.md` | (integration) | staging `POST /admin/categories` + products |
| 25 | `25-wire-admin-products.md` | admin products (live) | `/admin/products` ← `GET /admin/products` |
| 26 | `26-wire-admin-product-detail.md` | admin product-detail-admin (live) | `/admin/products/[id]` ← `GET /admin/products/{id}` |
| 27 | `27-wire-admin-inventory.md` | admin inventory (live) | `/admin/inventory` ← product stock |
| 28 | `28-wire-admin-product-form.md` | admin add/edit form (live) | `/admin/products/new`, `/admin/products/[id]/edit` |
| 29 | `29-wire-admin-orders.md` | admin orders (live) | `/admin/orders` ← `GET /admin/orders` |
| 30 | `30-wire-admin-customers.md` | admin customers (live) | `/admin/customers` ← `GET /admin/customers` |
| 31 | `31-wire-admin-promotions.md` | admin promotions (live) | `/admin/promotions` ← `GET /admin/promotions` |
| 32 | `32-wire-admin-delivery-tracking.md` | admin delivery tracking (live) | `/admin/orders/[id]` ← `GET /admin/orders/{id}` |
| 33 | `33-wire-admin-dashboard.md` | admin overview (live) | `/admin` ← `GET /admin/dashboard` |
| 34 | `34-wire-admin-settings.md` | admin settings (live) | `/admin/settings` ← `GET/PATCH /admin/settings` |
| 35 | `35-wire-admin-access.md` | admin access (live) | `/admin/access` ← `GET /admin/staff`, `/admin/staff/roles` |
| 36 | `36-wire-admin-staff-mutations.md` | admin access mutations | Invite / Edit Role / Revoke via `POST|PATCH /admin/staff` |
| 37 | `37-wire-admin-settings-payments-taxes.md` | admin settings payments/taxes | `/admin/settings` ← payment + tax-rates |
| 38 | `38-wire-admin-order-delivery-mutations.md` | admin order delivery mutations | status + shipments on `/admin/orders/[id]` |
| 39 | `39-wire-admin-promotion-crud.md` | admin promotion CRUD | create/edit/delete on `/admin/promotions` |
| 40 | `40-wire-admin-financials-reports.md` | admin financials (live) | `/admin/financials` ← `GET /admin/reports/sales` + export |
| 41 | `41-admin-self-revoke-guard.md` | admin access guard | prevent self-revoke on `/admin/access` |
| 42 | `42-wire-customer-auth.md` | customer auth (live) | `/login` `/signup` ← `/auth/customer/*` |
| 43 | `43-wire-public-catalog.md` | storefront catalog (public) | `/` `/shop` ← `/public/products` + categories |
| 44 | `44-wire-customer-cart.md` | customer cart (live) | signed-in cart ← `/public/cart*` |
| 45 | `45-wire-customer-checkout.md` | customer checkout (live) | `/checkout` ← addresses + `/public/cart/checkout` (+ Stripe when secret) |
| 46 | `46-wire-customer-addresses.md` | customer addresses (live) | `/account/addresses` ← `/public/addresses*` |
| 47 | `47-wire-customer-wishlist.md` | customer wishlist (live) | PDP + cards ← `/public/wishlist*` |
| 48 | `48-wire-public-announcement.md` | announcement bar (public) | shell ← `GET /public/announcement` |

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
