# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

Phase 1 frontend trust — legal routes, honest confirmation, saved-address
checkout, password reset, and guest checkout copy. Stripe is still out of
scope. Order history is still blocked on `GET /public/orders`.

## Current Goal

Phase 2 storefront honesty: stop catalog mock fallback, hide seed products,
and wire hero slides / weekly deals only when staging returns items.

## Completed

- **Phase 1 storefront trust (2026-09-16)** — `/privacy`, `/terms`, `/shipping`,
  `/returns`, `/faq`; footer and signup consent wired; confirmation no longer
  claims an email was sent; checkout reuses saved addresses; password reset
  request/confirm; guest checkout CTA says sign-in is required
- Figma Storefront canvas cached under `figma-cache/` (16 frames, metadata XML, section breakdown)
- Figma cache helper script (`figma-cache/cache.py`) for metadata extraction and pending fetch tracking
- Screenshots cached for Homepage and Product Detail frames
- Agent context system scaffolded (`AGENTS.md`, `context/` folder, feature specs)
- Feature specs written for all major frame groups
- **Next.js 15 app bootstrapped** — TypeScript, Tailwind v4, TanStack Query, shadcn-style Button/Input
- **Storefront shell (spec 00)** — `AnnouncementBar`, `StorefrontHeader`, `StorefrontFooter`, `StorefrontShell`
- **Design asset registry** — `context/design-assets.md`, `figma-cache/assets/manifest.json`, `fetch-assets.py`, `lib/brand/assets.ts`; shell components wired to Figma export paths
- **Visual QA pass (spec 00)** — tokens aligned to Figma (orange CTAs, green chrome, charcoal footer); header cart/account/layout fixes
- Route group `app/(storefront)/` with placeholder homepage at `/`
- Design tokens in `app/globals.css` (provisional AFW green palette)
- Site config in `lib/storefront/site.ts` (nav links, footer columns, category quick links)
- **Homepage hero (spec 01)** — `HeroSection` per Figma `2:8`; copy from `hero.xml`; CTAs wired to `/shop` and `/signup`
- **Spec 00/01 layout QA fixes (2026-08-30)** — 2-line hero headline (120px), mixed-case badge 122×26, dark gradient only, search 65×307, Wholesale green pill, nav nowrap
- **Homepage trust bar (spec 01)** — `TrustBar` per Figma `6:2690`; copy from `main-content.xml`; tokens `#231F1E` / `#363130`
- **Shop by category (spec 01)** — `CategoryCarousel` + `CategoryTile` per Figma `2:41`; six tiles; scroll arrows; links `/shop?category=<slug>`
- **Homepage product sections (spec 01)** — `ProductCard` + `ProductSection`; featured `6:3169`, trending `7:3466`, recently added `7:3954`; mock data `lib/mocks/products.ts`
- **Homepage promo banners (spec 01)** — `PromoBannerRow` per Figma `7:3458`–`7:3461`
- **Homepage testimonials (spec 01)** — `TestimonialsSection` per Figma `6:2981`
- **Homepage newsletter (spec 01)** — `NewsletterSection` per Figma `6:3063`
- **Shop catalog (spec 02)** — `/shop` with breadcrumb, search, category pills, filter sidebar, sort, grid, pagination; mock `lib/mocks/catalog-products.ts`; placeholder `/shop/[slug]`
- **Product detail (spec 03)** — `/shop/[slug]` with gallery, size options, pricing, qty + add to cart, accordions, related products; mock `lib/mocks/product-details.ts`; `lib/cart/cart-context.tsx` updates header cart badge
- **Cart page (spec 04)** — `/cart` with line items, qty controls, remove, bulk alerts, order summary, shipping options, promo UI, checkout CTA; `lib/cart/calculations.ts`; localStorage persistence
- **Checkout page (spec 05)** — `/checkout` 3-step wizard (delivery, payment, confirm); shipping form validation; order summary sidebar; mock place order → `/order/[id]/confirmation`; empty cart redirects to `/cart`
- **Order confirmation (spec 06)** — `/order/[id]/confirmation` with status timeline, delivery/payment cards, Items in Order summary, Paid Total, CTAs; `cardLast4` on placed orders
- **Mobile homepage (spec 07)** — `MobileHeader`, `MobileBottomNav`, `MobileHomepage` + sections; design review deviations applied (Cart tab, 100% Organic badge, 2×3 categories, testimonials carousel, 4 trust items)
- **Mobile shop catalog (spec 07)** — `MobileCatalogPage` with search, horizontal pills, filter drawer, 2-col grid, load more, catalog footer; reuses `filterCatalogProducts`
- **Auth login + signup (spec 08)** — `AuthProvider`, login/signup forms, mock session in localStorage, `/login` + `/signup` routes, account guard at `/account/orders` placeholder
- **Account dashboard (spec 09)** — `AccountHeader`, `AccountTabNav`, orders list + detail, addresses CRUD (localStorage), reorder list → cart, profile edit; routes under `/account/*`
- **Mobile shopping flow (spec 07)** — `MobileProductDetailPage`, `MobileCartPageContent`, sticky checkout bars, responsive checkout + order confirmation below `lg`
- **Asset manifest sync (2026-09-02)** — marked 15 on-disk assets as exported in `figma-cache/assets/manifest.json` (17/26 total)
- **Backend API documented (2026-09-02)** — `context/backend-api.md`, `context/backend-openapi.json`, `.env.local` + `.env.example`
- **Icon fallbacks (2026-09-02)** — `SocialIcon`, `AuthProviderIcon`; Lucide for chevron/carousel/logout; manifest 9 assets → `lucide-fallback`
- **Shell motion polish (2026-09-07)** — relocated desktop search to category bar; removed location chip; GSAP announcement marquee; Framer Motion product/category/promo hover + `MotionReveal` section enters
- **Homepage categories fix (2026-09-07)** — ignore timestamped staging seed categories; Shop by Category always uses curated Figma tiles (Fresh Produce, Frozen Proteins, etc.) with distinct images
- **Admin Figma canvas indexed (2026-09-07)** — page `71:2`, 13 frames under `figma-cache/admin/`
- **Admin sections mapped (2026-09-08)** — every frame has `sidebar` + `main` node IDs in
  `sections/*.json` and `manifest.json` → `adminFrames`
- **Admin screenshots complete (2026-09-08)** — all 13 frames cached under
  `figma-cache/admin/<slug>/screenshot.png` via user upload (MCP rate-limited)
- **Admin metadata XML complete (2026-09-10)** — `admin/metadata.xml` + extracted
  per-frame/section XML (13 frames, 26 sections); statuses `partial`
- **Admin shell + overview (spec 10, 2026-09-10)** — `/admin` with `AdminShell` /
  `AdminSidebar`, overview metrics/tables/recent sales from Figma copy; other nav
  routes are placeholders; mock data in `lib/mocks/admin-overview.ts`
- **Admin products list (spec 11, 2026-09-10)** — `/admin/products` table, filters,
  search, pagination, Add Product CTA; mock rows from Figma `main.xml`
- **Admin inventory (spec 12, 2026-09-10)** — `/admin/inventory` tabs, stock table,
  Restock actions, Lagos Port shipment banner; mock from Figma `main.xml`
- **Admin orders & delivery (spec 13, 2026-09-10)** — `/admin/orders` fulfillment tabs,
  orders table, Active Delivery Shipments panel; mock from Figma `main.xml`
- **Admin financials (spec 14, 2026-09-10)** — `/admin/financials` metrics, revenue chart,
  recent transactions, payout history; mock from Figma `main.xml`
- **Admin promotions (spec 15, 2026-09-10)** — `/admin/promotions` status tabs, promo table,
  Create Promotion CTA, summary metrics; mock from Figma `main.xml`
- **Admin customers (spec 16, 2026-09-10)** — `/admin/customers` metrics, searchable table,
  Active/Inactive status, pagination “1–7 of 1,842 clients”; mock from Figma `main.xml`
- **Admin access (spec 17, 2026-09-10)** — `/admin/access` Team & Access table, Invite Member,
  Access Roles Definition; mock from Figma `main.xml`
- **Admin settings (spec 18, 2026-09-10)** — `/admin/settings` secondary nav + Store Details
  form; other sections placeholders; mock from Figma `main.xml`
- **Admin primary sidebar complete (2026-09-10)** — Overview → Settings all implemented
- **Admin product detail (spec 19, 2026-09-10)** — `/admin/products/[id]` gallery, info,
  wholesale tiers, inventory/shipping, edit/archive actions; mock from Figma `main.xml`
- **Admin add/edit product form (spec 20, 2026-09-10)** — `/admin/products/new` +
  `/admin/products/[id]/edit`; 7 sections, commercial model, tiers, sticky footer; mock
  defaults from Figma `main.xml`
- **Admin delivery tracking (spec 21, 2026-09-10)** — `/admin/orders/[id]` customer/
  method/address cards, courier tracking + timeline, fulfillment actions; mock Order
  #AFW-10482 from Figma `main.xml`
- **Admin transaction receipt (spec 22, 2026-09-10)** — `/admin/financials/transactions/[id]`
  receipt card, line items, totals, print/PDF/send/refund actions; mock TXN-10482;
  Recent Transactions rows link to receipt
- **Admin staff auth gate (spec 23, 2026-09-10)** — `/admin/login`, HTTP-only cookies,
  middleware redirect for `/admin/*`, sidebar logout; machine `staff-auth.ts` unchanged
- **Staging catalog seed (spec 24, 2026-09-10)** — `pnpm seed:catalog` idempotent script;
  6 homepage categories + featured products/variants/tiers; create helpers in `lib/api/*`
- **Wire admin products list (spec 25, 2026-09-10)** — `/admin/products` loads live
  `GET /admin/products` via interactive session (`auth: "session"`); mapped rows + filters
- **Wire admin product detail (spec 26, 2026-09-10)** — `/admin/products/[id]` from live
  `GET /admin/products/{id}` + price tiers; stock/status badges; missing logistics as "—"
- **Wire admin inventory (spec 27, 2026-09-10)** — `/admin/inventory` from live product
  variants; tab counts from data; Restock → product detail
- **Wire admin product form (spec 28, 2026-09-10)** — Add/Edit save via session auth:
  create product → variant → tiers; edit patch + stock delta; live categories; redirect to detail
- **Wire admin orders list (spec 29, 2026-09-10)** — `/admin/orders` from live
  `GET /admin/orders`; tab counts; payment Pending/Paid/Failed; shipments empty when none
- **Wire admin customers (spec 30, 2026-09-10)** — `/admin/customers` from live
  `GET /admin/customers` + order aggregates; metrics from loaded set
- **Wire admin promotions (spec 31, 2026-09-10)** — `/admin/promotions` from live
  `GET /admin/promotions`; status from date window; metrics from usage counts
- **Wire admin delivery tracking (spec 32, 2026-09-10)** — `/admin/orders/[id]` from live
  `GET /admin/orders/{id}` + optional shipment; timeline from order status
- **Wire admin dashboard (spec 33, 2026-09-10)** — `/admin` from live `GET /admin/dashboard`
  + active product count; attention / low-stock / recent sales mapped
- **Wire admin settings (spec 34, 2026-09-10)** — `/admin/settings` Store Details from live
  `GET/PATCH /admin/settings`; URL/currency/timezone UI-only (not in API DTO)
- **Wire admin access (spec 35, 2026-09-10)** — `/admin/access` from live
  `GET /admin/staff` + `GET /admin/staff/roles`; last-active "—"; invite/edit deferred
- **Wire admin staff mutations (spec 36, 2026-09-10)** — Invite / Edit Role /
  Revoke / Reactivate via `POST/PATCH /admin/staff`
- **Wire admin settings payments/taxes (spec 37, 2026-09-10)** — Payments read-only
  from `GET /admin/settings/payment`; Taxes CRUD via tax-rates endpoints
- **Wire admin order delivery mutations (spec 38, 2026-09-10)** — Update Status,
  Add/Edit Tracking, shipment status via order + shipment APIs
- **Wire admin promotion CRUD (spec 39, 2026-09-10)** — Create / Edit / Delete
  store-wide promotions via `/admin/promotions*`
- **Wire admin financials from reports (spec 40, 2026-09-10)** — `/admin/financials`
  from `GET /admin/reports/sales` (+ CSV export proxy); no txn/payout APIs
- **Admin self-revoke guard (spec 41, 2026-09-10)** — hide Revoke for signed-in staff;
  server action rejects self-deactivate; React `cache()` for session token refresh
- **Wire customer auth (spec 42, 2026-09-11)** — `/login` `/signup` →
  `/auth/customer/*` with HTTP-only cookies; OpenAPI refreshed (117 paths)
- **Wire public catalog (spec 43, 2026-09-11)** — homepage/shop/PDP from
  `/public/products` + `/public/categories` (no staff Bearer)
- **Wire customer cart (spec 44, 2026-09-11)** — signed-in cart via `/public/cart*`;
  guests stay on localStorage; promo apply/remove when authenticated
- **Wire customer checkout (spec 45, 2026-09-11)** — signed-in `/checkout` via
  addresses + `POST /public/cart/checkout`; Stripe Elements when `clientSecret` +
  publishable key present; guests redirected to login
- **Wire customer addresses (spec 46, 2026-09-11)** — `/account/addresses` ←
  `/public/addresses*` (list/create/edit/delete/set default)
- **Wire customer wishlist (spec 47, 2026-09-11)** — PDP + product card hearts ←
  `/public/wishlist*`; guests redirected to login
- **Wire public announcement (spec 48, 2026-09-11)** — shell marquee ←
  `GET /public/announcement` with Figma `siteConfig` fallback when `text` is null

## In Progress

- **Admin design-context** — optional polish (`figma-cache/admin/PENDING.md`)

### Figma asset export (2026-09-02)

| Item | Detail |
| --- | --- |
| Status | **Complete with fallbacks** — 17 PNG exports + 9 Lucide/SVG fallbacks |
| PNG exports | logos, hero, header icons (search/cart/user/flag/location), trust (×4), categories (×6), products (×4) |
| Lucide/SVG fallbacks | chevron-down, carousel arrows, logout, social (×3), auth (×2) — see `components/icons/` |

## Next Steps (ordered)

1. **Phase 2 catalog hygiene** — disable `CATALOG_FALLBACK_TO_MOCK` and hide seed products
2. **Hero slides / weekly deals** — wire only when staging returns items
3. **Order history** — blocked until `GET /public/orders` (or equivalent) exists
4. **Stripe live intent** — backend-owned; confirm PaymentElement when staging returns `clientSecret`
5. **Free-shipping threshold** — from admin settings when exposed publicly or via announcement
6. **Guest→server cart merge** — deferred until product decision (API is auth-only)
7. **Account wishlist page** — when Figma adds a dedicated wishlist dashboard frame
8. **Counsel review** of `/privacy`, `/terms`, `/shipping`, `/returns`, `/faq` before launch

## Design Reviews

- **Mobile homepage (2026-09-02)** — `context/design-reviews/mobile-homepage.md` — ✅ Implemented per resolved decisions.

## Open Questions

- **Policy pages (2026-09-16)** — operational copy is live. Counsel must review
  before launch. Do not invent a refund window or a privacy processor list.
- **Password reset email URL** — confirm must land on `/reset-password?token=`.
  Confirm returns tokens with no email and no profile endpoint, so the
  storefront does not store them; the customer signs in with the new password.
- **Backend API contract** — **Updated (2026-09-11):** live OpenAPI has **117 paths**
  including `/auth/customer/*` and `/public/*`. Cached in `context/backend-openapi.json`.
  Remaining gaps: no customer order-history list; guest cart has no public API
  (signed-in only); staging checkout returns `clientSecret: null` until Stripe is
  configured on the backend.
- **Product detail route** — **Resolved:** keep `/shop/[slug]` — backend `CreateProductDto` uses `slug`.
- **Auth provider** — Design shows Apple/Google social auth; confirm which OAuth providers the
  backend supports before wiring.
- **Wholesale flow** — "Shop Wholesale" CTA and business signup: does wholesale use different
  pricing API or approval gate before checkout?
- **Figma design tokens** — Approximated from homepage screenshot (orange + forest green). Refine when `get_design_context` is cached.
- **Currency/location switcher** — CAD chip remains in header (static). **Location
  indicator (Toronto, ON) removed from desktop/mobile chrome (2026-09-07)** until
  backend-backed geo/currency switching exists. Do not re-add a decorative location chip.
- **Category data source** — Homepage carousel uses curated Figma tiles when staging
  categories look like seed data (timestamped names/slugs). Proper API categories merge
  onto those tiles by slug/name; otherwise API roots map with cleaned labels + keyword
  images. Empty/error → static `homepageCategories`.
- **Wholesale nav icon** — Green pill is implemented per homepage screenshot. Leading icon in `header.xml` `2:203` (25px indent) is not in the export manifest; add when Figma export is available. Do not substitute Lucide/emoji.
- **Admin staff auth** — **Resolved (2026-09-10):** HTTP-only cookies `afw_staff_at` /
  `afw_staff_rt` via `/admin/login` (`POST /auth/login`); `middleware.ts` gates `/admin/*`;
  env machine auth (`lib/api/staff-auth.ts`) remains for catalog SSR only. See spec 23.
- **Admin scope in repo** — Resolved (2026-09-10): Admin canvas is in-scope under
  `/admin/*` (updated `project-overview.md` / architecture). Previously noted as
  out-of-scope for a separate RokswoodHive admin.

## Architecture Decisions

- Spec-driven incremental build aligned with `rokswood-hive-web` context pattern
- Figma cache is design reference only — not imported at runtime
- Desktop-first build order per `figma-cache/manifest.json` → `buildOrder`
- Large frames built section-by-section to stay within Figma MCP context limits
- Stack mirrors `rokswood-hive-web` (Next.js 15, Tailwind v4, shadcn, TanStack Query)
- Hero headline wraps as two lines (`Authentic African Food.` / `Naturally Sourced.`) to match the homepage screenshot and 120px heading box `2:16`, not the three-line `hero.xml` text-node extraction
- Wholesale main-nav item is plain text after a vertical rule; Deals uses orange accent (`accent` on `NavLink`)
- **Mobile homepage (2026-09-02)** — Bottom nav: Home · Categories · Cart · Account (Cart replaces Figma Wishlist). Hero badge unified to "100% Organic". Categories: 2×3 grid from `homepageCategories`. Testimonials carousel added post–Best Sellers. Trust: 4 items from desktop TrustBar. Wholesale CTA kept full-width. See `context/design-reviews/mobile-homepage.md`.

## Session Notes

- Sales report `to` date is exclusive of that calendar day on staging — omit
  from/to (or use next-day exclusive end) when loading/exporting financials.
- Staff access-token refresh is request-memoized with React `cache()` to avoid
  parallel refresh-token rotation races in RSC loaders.

## Visual QA Log

#### Phase 1 — Storefront trust (2026-09-16)

- **Method:** Cursor browser @ `/privacy`, `/shipping`, `/faq`, `/signup`, `/login`,
  `/forgot-password`, `/reset-password?token=qa-preview`, `/checkout`
- **Pass:** Footer Support/legal links point at real routes; About, Careers, and
  Store Locator stay `#`. Shipping copy matches cart prices ($12.50 / $8 / free
  pickup at 420 Queen St W). Signup consent links to `/terms` and `/privacy`.
  Login “Forgot password?” goes to `/forgot-password`. Reset confirm hides the
  token field when `?token=` is present. Signed-in checkout lists saved
  addresses (Office default, Home) and hides the street form until “Use a new
  address”. Checkout note links Terms and Privacy and says sign-in is required.
  TypeScript clean.
- **Deferred:** password-reset request submit (Next overlay blocked the button;
  not submitted). Guest cart CTA not visually checked — browser session was
  already signed in, so checkout said “Proceed to Checkout”. Counsel review of
  policy body. Backend email link must use `/reset-password?token=`.

#### Spec 48 — Wire public announcement (2026-09-11)

- **Method:** Cursor browser @ `/` + staging `GET /public/announcement` → `{ text: null }`
- **Pass:** Fallback marquee shows FREE SHIPPING / ORGANIC / NEW ARRIVALS; layout
  fetch wires messages into shell; TypeScript clean; parse helper splits `•`/`|`
- **Deferred:** live custom announcement copy (staging text null); hero-slides /
  weekly-deals (empty arrays); admin announcement editor
- **Sign-off:** pass for spec 48 announcement wiring (fallback path)

#### Spec 47 — Wire customer wishlist (2026-09-11)

- **Method:** Cursor browser @ `/shop/nigerian-jollof-rice-mix`
- **Pass:** Save heart → `aria-pressed=true` / Remove label; reload keeps saved after
  hydrate; unsave restores Save; TypeScript clean; guests would hit login redirect
- **Deferred:** dedicated account wishlist page (no Figma tab); guest local wishlist
- **Sign-off:** pass for spec 47 live wishlist

#### Spec 46 — Wire customer addresses (2026-09-11)

- **Method:** Cursor browser @ `/account/addresses`
- **Pass:** Lists live `Home` (420 Queen St W); edit label Home QA→Home persists;
  create `Office` (100 King St W); Set Default moves Office first; reload keeps
  both; TypeScript clean; localStorage address seed removed
- **Deferred:** browser delete click (API DELETE verified in probe); checkout
  saved-address picker
- **Sign-off:** pass for spec 46 live addresses

#### Spec 45 — Wire customer checkout (2026-09-11)

- **Method:** Cursor browser @ `/checkout` → pickup → confirmation
- **Pass:** Signed-in checkout; pickup contact-only form; deferred payment copy;
  Place Order → `POST /public/cart/checkout`; confirmation
  `/order/2148ba9e-…/confirmation` shows **Order #1335**, Store Pickup, Payment
  pending; cart cleared; TypeScript clean; `@stripe/react-stripe-js` installed for
  when staging returns a client secret
- **Gaps fixed:** pickup confirmation contact vs street address display
- **Deferred:** live Stripe PaymentElement (staging `clientSecret` is null); ship
  path re-QA with address create; guest checkout (auth required)
- **Sign-off:** pass for spec 45 live checkout (pending-payment path)

#### Spec 44 — Wire customer cart (2026-09-11)

- **Method:** Cursor browser @ `/shop/nigerian-jollof-rice-mix` → `/cart`
- **Pass:** Signed-in add → cart shows Jollof line + badge; qty 1→2 updates
  ($12.99→$25.98, badge 2); promo `QA15OFF` applies (`Discount (QA15OFF) -$3.90`,
  Remove control); remove clears cart; reload stays empty (server cart); TypeScript clean
- **Gaps fixed:** mobile sticky checkout total ignored live promo discount
  (verified sticky shows `$24.55` with `QA15OFF` vs `$26.59` without)
- **Deferred:** checkout/Stripe; guest→server merge; sticky bar still assumes courier
  shipping (local CartSummary method state)
- **Sign-off:** pass for spec 44 live customer cart

#### Spec 43 — Wire public catalog (2026-09-11)

- **Method:** Cursor browser @ `/shop` + `/shop/nigerian-jollof-rice-mix`
- **Pass:** Shop shows 7 public products (Jollof $12.99 / $9.49 bulk); PDP loads
  description “Seasoning blend”, prices, Add to Cart; no staff token for catalog SSR;
  TypeScript clean
- **Deferred:** cart still localStorage; announcement/hero-slides; seed “Cart Product”
  still visible in staging catalog
- **Sign-off:** pass for spec 43 public catalog

#### Spec 42 — Wire customer auth (2026-09-11)

- **Method:** Cursor browser @ `/signup` → `/account/orders` → logout → `/login`
- **Pass:** Signup `qa-shopper-0911a@example.com` lands on Order History with
  “No orders yet” (honest empty — no list API); Hi, QA; logout → `/`; login restores
  session to `/account/orders`; TypeScript clean; OpenAPI refreshed to 117 paths
- **Deferred:** Google OAuth; password reset UI; live order history; cart/addresses
- **Sign-off:** pass for spec 42 customer auth

#### Spec 41 — Admin self-revoke guard (2026-09-10)

- **Method:** Cursor browser @ `http://localhost:3000/admin/access`
- **Pass:** Signed-in row shows `Admin (you)` with Edit Role + muted `You` (no Revoke);
  QA Access Tester still Reactivate; JWT `sub` matches staff id; TypeScript clean
- **Gaps fixed:** React `cache()` around staff access-token refresh (parallel RSC
  refreshes were racing and dropping identity)
- **Deferred:** active other-member Revoke re-click (only inactive peer on staging);
  self Edit Role still allowed by design
- **Sign-off:** pass for spec 41 self-revoke guard

#### Spec 40 — Wire admin financials from reports (2026-09-10)

- **Method:** Cursor browser @ `http://localhost:3000/admin/financials`
- **Pass:** After session refresh: Total Revenue $25.98 / Orders 1 / Retail $25.98 /
  Wholesale $0.00; Sep bar highlighted 100%; Recent transactions row
  `Sales · 1 order` +$25.98 (no receipt link); Payout empty state; Download Ledger
  → 200 CSV `sales-report.csv` (97 bytes); TypeScript clean
- **Gaps fixed:** omit sales `from`/`to` (staging `to` is exclusive of that day —
  `to=today` dropped today’s $25.98)
- **Deferred:** expenses / net profit / pending payouts / txn receipts (no APIs);
  period picker still display-only
- **Sign-off:** pass for spec 40 financials via sales reports

#### Spec 39 — Wire admin promotion CRUD (2026-09-10)

- **Method:** Cursor browser @ `http://localhost:3000/admin/promotions`
- **Pass:** Create QATEST10 (10%) → Edit to 12% → Delete; metrics 1→2→1 Campaign Rule;
  fixed `scopeIds` omit for store-wide (API 400 if empty array); TypeScript clean
- **Deferred:** category/product scope pickers; promo revenue metric
- **Sign-off:** pass for spec 39 promotion CRUD

#### Spec 38 — Wire admin order delivery mutations (2026-09-10)

- **Method:** Cursor browser @ `/admin/orders/57c2447c-…` (AFW-906)
- **Pass:** Update Status → Processing (timeline + badge); Add Tracking → Store Counter /
  PICKUP-AFW-906; button becomes Edit Tracking; TypeScript clean
- **Deferred:** live carrier deep-links; packing slip; Save Delivery Details shipment-status
  menu not re-clicked after create (UI present)
- **Staging note:** AFW-906 left Processing with pickup tracking
- **Sign-off:** pass for spec 38 order delivery mutations

#### Spec 37 — Wire admin settings payments & taxes (2026-09-10)

- **Method:** Cursor browser @ `http://localhost:3000/admin/settings`
- **Pass:** Payments shows Provider Mock / Mode Test·mock; Taxes empty → Add ON 13%/0%
  → row Active with Deactivate/Delete; TypeScript clean
- **Deferred:** shipping/notifications/legal; payment credential editing (env-only by design);
  deactivate/delete toggles not re-verified after create (create path covered)
- **Staging note:** left Ontario 13% HST tax rate Active
- **Sign-off:** pass for spec 37 payments + taxes

#### Spec 36 — Wire admin staff mutations (2026-09-10)

- **Method:** Cursor browser @ `http://localhost:3000/admin/access`
- **Pass:** Invite QA Access Tester (Order Manager) → Edit Role to Full Admin →
  Revoke → Inactive/Reactivate shown; Admin row unchanged; TypeScript clean
- **Deferred:** email invite (API requires password); self-revoke guard; multi-role assign
- **Staging note:** left `qa-access-tester@example.com` Inactive for hygiene
- **Sign-off:** pass for spec 36 staff mutations

#### Spec 35 — Wire admin access (2026-09-10)

- **Method:** Cursor browser @ `http://localhost:3000/admin/access`
- **Pass:** Team row Admin / admin@africafoodwarehouse.local / Full Admin / — / Active;
  roles Full Admin (20 perms) + Order Manager (11 perms); TypeScript clean
- **Deferred:** Invite / Edit Role / Revoke; last-active (no API field); Figma Owner/Admin/Manager/Staff copy replaced by live roles
- **Sign-off:** pass for spec 35 live staff/roles list

#### Spec 34 — Wire admin settings (2026-09-10)

- **Method:** Cursor browser @ `http://localhost:3000/admin/settings` + staging
  `GET/PATCH /admin/settings`
- **Pass:** Store Details prefills (Africa Food Warehouse, phone, address+CA);
  Save Changes → “Store details saved.”; TypeScript clean
- **Deferred:** Store URL / currency / timezone UI-only (not in UpdateStoreSettingsDto);
  payments/shipping/taxes/notifications/legal still placeholders; staging contact email
  remains prior QA value (`ops-settings-…@example.com`)
- **Sign-off:** pass for spec 34 Store Details live wiring

#### Spec 33 — Wire admin dashboard (2026-09-10)

- **Method:** Cursor browser @ `http://localhost:3000/admin`
- **Pass:** Metrics Today’s Sales $25.98 / Orders 1 / Active Products 8 / Low Stock 1;
  attention + recent sale for AFW-906 (E2E Cart B); low-stock Yam row; TypeScript clean
- **Deferred:** greeting profile still mock Adaeze; no yesterday %; recent sales lack line
  items (API omits them); Export Daily Summary still UI-only
- **Sign-off:** pass for spec 33 live dashboard

#### Spec 32 — Wire admin delivery tracking (2026-09-10)

- **Method:** Cursor browser @ `/admin/orders/57c2447c-…` (AFW-906)
- **Pass:** Breadcrumb Orders / AFW-906 / Delivery; customer E2E Cart B; Store Pickup;
  address “Store pickup”; tracking summary for no consignment; timeline Pending current
  with created timestamp; TypeScript clean
- **Deferred:** Update Status / Add Tracking / Save still mock; no live shipment on pickup
- **Sign-off:** pass for spec 32 live delivery tracking

#### Spec 31 — Wire admin promotions (2026-09-10)

- **Method:** Cursor browser @ `http://localhost:3000/admin/promotions`
- **Pass:** Live row `QA15OFF` Discount Code 15% Off, Sep 09–Oct 10, Active; metrics
  1 Campaign Rule / 0 Uses / revenue "—"; Active tab shows row, Expired empty;
  TypeScript clean
- **Seed note:** created `QA15OFF` on staging (list was empty)
- **Deferred:** create/edit mutations; promo revenue not in API; name = code
- **Sign-off:** pass for spec 31 live promotions

#### Spec 30 — Wire admin customers (2026-09-10)

- **Method:** Cursor browser @ `http://localhost:3000/admin/customers`
- **Pass:** Metrics Total 2 / New 2 / Repeat 0% / AOV $25.98; rows E2E Cart A (Inactive,
  $0) + E2E Cart B (Active, 1 order $25.98, last Today); Showing 1–2 of 2; TypeScript clean
- **Deferred:** Export List; location "—" (no addresses); customer detail route
- **Sign-off:** pass for spec 30 live customers

#### Spec 29 — Wire admin orders (2026-09-10)

- **Method:** Cursor browser @ `http://localhost:3000/admin/orders`
- **Pass:** Live tabs All 1 / Pending 1; row `#AFW-906` E2E Cart B, Jollof × 2, $25.98,
  payment Pending, fulfillment Pending; Manage → `/admin/orders/[id]`; shipments empty
  state; TypeScript clean
- **Seed note:** created one pickup order on staging for QA (was empty)
- **Deferred:** delivery tracking detail still mock; date-range chip still static;
  financials lack list APIs
- **Sign-off:** pass for spec 29 live orders list

#### Spec 28 — Wire admin product form (2026-09-10)

- **Method:** Cursor browser @ `/admin/products/new` + edit; staff session re-login
- **Figma reference:** add-edit-product-form (UI shell from spec 20); live API mutations
- **Pass:** Live categories on add; create “QA Form Test Honey” → redirect detail
  (`b343fa1f-…`, SKU AFW-QA-FORM-TEST-3FBK, $14.99 / $11.49, stock 25); edit name + stock
  → “QA Form Test Honey Edited”, **30 units**; TypeScript clean
- **Fixed:** interactive token refresh during RSC no longer fails when cookie write is
  disallowed (still returns refreshed access token for the request)
- **Deferred:** warehouse/dims/shipping UI-only; image upload; sizeWeight parsed into
  weight when weightKg empty (shows “500 kg” for “500g” label)
- **Sign-off:** pass for spec 28 product form mutations

#### Spec 27 — Wire admin inventory (2026-09-10)

- **Method:** Cursor browser @ `http://localhost:3000/admin/inventory`
- **Pass:** Live tabs All 7 / In Stock 4 / Low Stock 1 / Out of Stock 2; seeded SKUs
  (AFW-PRD-1048, Honey Beans, etc.); Lagos banner retained; TypeScript clean
- **Deferred:** Restock/Update Stock mutations; banner still mock copy
- **Sign-off:** pass for spec 27 live inventory

#### Spec 26 — Wire admin product detail (2026-09-10)

- **Method:** Cursor browser @ `/admin/products/c7fcdd11-…` (Nigerian Jollof Rice Mix)
- **Pass:** Breadcrumb Products / Condiments & Spices / name; Published; SKU AFW-PRD-1048;
  retail $12.99; wholesale $9.49 (Min. 24); 342 In Stock; weight 1.2 kg; TypeScript clean
- **Fixed:** staging price tiers use `price` (not `unitPrice`) — mapper + storefront bulk map
- **Deferred:** warehouse/dimensions/shipping not in API (show "—"); form still mock save
- **Sign-off:** pass for spec 26 live product detail

#### Spec 25 — Wire admin products list (2026-09-10)

- **Method:** Cursor browser — staff login → `http://localhost:3000/admin/products`
- **Pass:** Live rows (7): Honey Beans, Yellow Garri, White Puna Yam (Low Stock), Jollof Mix,
  Red Palm Oil Active $16.50 / orphan $0.00, cart-product Draft; categories/origins from API;
  “Showing 1-7 of 7 products”; TypeScript clean
- **Deferred:** product detail still mock; catalog orphans; server-side filter query params
- **Sign-off:** pass for spec 25 admin products live list

#### Spec 24 — Seed staging catalog (2026-09-10)

- **Method:** `pnpm seed:catalog` against staging + Cursor browser @ `/shop`
- **Pass:** 6 categories created; honey-beans / yellow-garri / white-puna-yam / red-palm-oil /
  nigerian-jollof-rice-mix with variants + tiers; re-run skips existing; `/shop` shows
  **7 Products** including seeded names; TypeScript clean for create helpers
- **Gaps:** `red-palm-oil` slug create returned 500 when row already existed (lookup fixed);
  temporary `red-palm-oil-v2` (+ empty images) and pre-existing `cart-product-*` still in list
- **Sign-off:** pass for spec 24 seed unit

#### Spec 23 — Admin staff auth gate (2026-09-10)

- **Method:** Cursor browser — unauthenticated `/admin` → login; staging credentials sign-in;
  overview loads; logout → `/admin/login`
- **Pass:** Middleware redirect with `returnUrl`; staff login card (logo + email/password);
  successful `POST /auth/login` sets cookies (303 → `/admin`); Log out clears session;
  TypeScript clean
- **Deferred:** refresh-on-request for interactive proxies; profile name from JWT vs mock
- **Sign-off:** pass for spec 23 staff auth gate

#### Spec 22 — Admin transaction receipt (2026-09-10)

- **Method:** Cursor browser @ `http://localhost:3000/admin/financials/transactions/txn-10482`
  CDP 1440 vs `figma-cache/admin/transaction-receipt/screenshot.png` + `sections/main.xml`
- **Pass:** Financials nav active; breadcrumb Transactions / TXN-10482; title + settled copy;
  Print/Download; receipt card (AFW + Paid, Amara Osei, Visa •••• 4821, #AFW-10482);
  3 line items; totals Subtotal/$71.94 through Total Paid/$79.58; Send/Export/Refund;
  TypeScript clean
- **Deferred:** real print/PDF/email/refund; live financials API
- **Sign-off:** pass for spec 22 transaction receipt unit

#### Spec 21 — Admin delivery tracking (2026-09-10)

- **Method:** Cursor browser @ `http://localhost:3000/admin/orders/afw-10482` CDP 1440×900 vs
  `figma-cache/admin/delivery-tracking/screenshot.png` + `sections/main.xml`
- **Pass:** Orders & Delivery nav active; breadcrumb Orders / AFW-10482 / Delivery; title;
  Track Shipment; 3 info cards (Amara Osei / DHL / Accra); Courier Dispatch panel with
  Shipped badge, waybill DHL-7829301845 + copy; timeline Pending→Delivered; Update Status /
  Add Tracking / Save Delivery Details; TypeScript clean
- **Deferred:** live carrier tracking; status mutations; per-order API data (Figma mock for any id)
- **Sign-off:** pass for spec 21 delivery tracking unit

#### Spec 20 — Admin add/edit product form (2026-09-10)

- **Method:** Cursor browser @ `http://localhost:3000/admin/products/new` CDP 1440×900 vs
  `figma-cache/admin/add-edit-product-form/screenshot.png` + `sections/main.xml`
- **Pass:** Products nav active; breadcrumb Products / Add Product; title + subtitle;
  2-col layout (images/info/pricing | classification/pack/inventory/shipping); dropzone +
  thumb; Figma defaults (Jollof Mix, AFW-PRD-1048, Both, tiers, organic, Warehouse A);
  Cancel / Save as Draft / Save Product; TypeScript clean
- **Deferred:** real image upload; persist draft/save to API; Figma product photography
- **Sign-off:** pass for spec 20 product form unit

#### Spec 19 — Admin product detail (2026-09-10)

- **Method:** Cursor browser @ `http://localhost:3000/admin/products/jollof-spice` vs
  `figma-cache/admin/product-detail-admin/screenshot.png` + `sections/main.xml`
- **Pass:** Products nav active; breadcrumb; Published + last updated; Edit Product;
  Nigerian Jollof Rice Mix info (SKU AFW-PRD-1048); pricing tiers; 342 units In Stock;
  shipping logistics; Edit details / Update Stock / Archive; TypeScript clean
- **Deferred:** Figma product photography (storefront image stand-ins); Archive mutation;
  add/edit form screen
- **Sign-off:** pass for spec 19 product detail unit

#### Spec 18 — Admin settings (2026-09-10)

- **Method:** Cursor browser @ `http://localhost:3000/admin/settings` vs
  `figma-cache/admin/settings/screenshot.png` + `sections/main.xml`
- **Pass:** Settings nav active; secondary nav (Store Details active); form fields match
  Figma defaults (name, URL, email, phone, address, CAD, ET Toronto); Save Changes;
  Payments/etc. placeholders; TypeScript clean
- **Deferred:** Persist settings to API; full Payments/Shipping/Taxes/Notifications/Legal UIs
- **Sign-off:** pass for spec 18 settings unit (Store Details)

#### Spec 17 — Admin access / Team & Access (2026-09-10)

- **Method:** Cursor browser @ `http://localhost:3000/admin/access` vs
  `figma-cache/admin/access/screenshot.png` + `sections/main.xml`
- **Pass:** Access nav active; Team & Access title; Invite Member; 5 members with
  Active/Invited badges; Edit Role ×4 + Revoke; Access Roles Definition (Owner/Admin/Manager/Staff)
- **Deferred:** Invite/Edit/Revoke flows; live RBAC API
- **Sign-off:** pass for spec 17 access unit

#### Spec 16 — Admin customers (2026-09-10)

- **Method:** Cursor browser @ `http://localhost:3000/admin/customers` vs
  `figma-cache/admin/customers/screenshot.png` + `sections/main.xml`
- **Pass:** Customers nav active; search + Export List; 4 metrics; 7 table rows with
  Active/Inactive badges; “Showing 1-7 of 1,842 clients” + pagination; TypeScript clean
- **Deferred:** Export List action; live customers API; pages 2+ content
- **Sign-off:** pass for spec 16 customers unit

#### Spec 15 — Admin promotions (2026-09-10)

- **Method:** Cursor browser @ `http://localhost:3000/admin/promotions` vs
  `figma-cache/admin/promotions/screenshot.png` + `sections/main.xml`
- **Pass:** Promotions nav active; Create Promotion; Active/Scheduled/Expired/All tabs;
  5 promo rows on All; Active filters to 2; status chips; edit/more; 3 metric cards;
  TypeScript clean
- **Deferred:** Create/Edit promo forms; more-menu actions; live promotions API
- **Note:** Default tab is All (full Figma table). Screenshot shows Active selected with
  mixed rows — recorded as design inconsistency; filtering works as expected.
- **Sign-off:** pass for spec 15 promotions unit

#### Spec 14 — Admin financials (2026-09-10)

- **Method:** Cursor browser @ `http://localhost:3000/admin/financials` CDP 1440 vs
  `figma-cache/admin/financials/screenshot.png` + `sections/main.xml`
- **Pass:** Financials nav active; September 2025 + Download Ledger; 4 metrics; 8-bar
  revenue trend with Aug highlighted brand-green; 4 transactions; 3 payout history rows;
  TypeScript clean
- **Deferred:** date picker; ledger download; live financials API / chart library
- **Sign-off:** pass for spec 14 financials unit

#### Spec 13 — Admin orders & delivery (2026-09-10)

- **Method:** Cursor browser @ `http://localhost:3000/admin/orders` CDP 1440 vs
  `figma-cache/admin/orders-and-delivery/screenshot.png` + `sections/main.xml`
- **Pass:** Orders & Delivery nav active; search + Sept 1–30 date chip; underline tabs with
  Figma counts; 6 order rows (payment Paid/Failed, fulfillment badges, Manage);
  Active Delivery Shipments (Canada Post / FedEx / DHL); Pending tab filters to 1 row;
  TypeScript clean
- **Deferred:** date-range picker; Manage → delivery-tracking detail; live orders API
- **Sign-off:** pass for spec 13 orders unit

#### Spec 12 — Admin inventory (2026-09-10)

- **Method:** Cursor browser @ `http://localhost:3000/admin/inventory` CDP 1440×960 vs
  `figma-cache/admin/inventory/screenshot.png` + `sections/main.xml`
- **Pass:** Inventory nav active; title/subtitle; search + Update Stock; tabs All/In/Low/Out
  with Figma counts; 7 table rows (SKU, stock, reorder, status, last updated, Restock);
  Lagos Port banner + Dismiss/Process Shipment; Low Stock tab filters to 2 rows; TypeScript clean
- **Deferred:** Update Stock / Restock / Process Shipment mutations; live inventory API
- **Sign-off:** pass for spec 12 inventory unit

#### Spec 11 — Admin products list (2026-09-10)

- **Method:** Cursor browser @ `http://localhost:3000/admin/products` CDP 1440×960 vs
  `figma-cache/admin/products/screenshot.png` + `sections/main.xml`
- **Pass:** Products nav active; title/subtitle; search + Add Product; Category/Status/Origin
  filters + Reset; 8 Figma rows with status chips (Active / Low Stock / Draft / Out of Stock);
  edit/more actions; "Showing 1-8 of 284 products" + pagination 1–3; TypeScript clean
- **Deferred:** live `GET /admin/products`; more-menu actions; add/edit form screens;
  product thumbnails are storefront asset stand-ins (not Figma crops)
- **Sign-off:** pass for spec 11 products list unit

#### Spec 10 — Admin shell + overview (2026-09-10)

- **Method:** Cursor browser @ `http://localhost:3000/admin` CDP viewport 1440×960 vs
  `figma-cache/admin/overview/screenshot.png` + `sections/sidebar.xml` / `main.xml`
- **Pass:** 260px sidebar with logo + 9 nav items + Help + profile; Overview active green
  pill; greeting + Live Storefront / Export actions; 4 metric cards (267px) in a row;
  orders table + low stock table + recent sales column; Figma copy/amounts/status labels;
  placeholder routes for other nav items; TypeScript clean
- **Gaps fixed:** none during QA (layout measured via CDP: cards/sections match Figma widths)
- **Deferred:** staff auth gate; profile photo (initials placeholder); Export action;
  design-context token fine-tuning when MCP allows
- **Sign-off:** pass for spec 10 shell + overview unit (screenshot + metadata reference)

#### Spec 00 — Storefront shell (2026-08-30)

- **Method:** Live page audit @ `http://localhost:3001` (1440px target) vs Figma `homepage/screenshot.png` + `sections/header.xml` (`2:185`), `announcement-bar.xml` (`2:5`), `footer/metadata.xml` (`18:70`). Cursor browser MCP unavailable this session.
- **Pass:** announcement copy ($150), all main nav + category link labels, search placeholder, CAD + Toronto ON, footer columns/legal/social, charcoal footer, green announcement + cart chrome
- **Fixed during QA:** circular logo placeholder (105×62); icon-only account button (no label); cart shows icon + `$0.00` only; main nav visible at `lg`; category row left padding `pl-20` per Figma x=80
- **Gaps remaining:** PNG files not yet committed (MCP rate limit) — paths wired in `AfwLogo`, `StorefrontHeader`, `StorefrontFooter`; re-run visual QA after `fetch-assets.py apply`

#### Spec 01 — Homepage hero layout (2026-08-30)

- **Method:** Implementation vs Figma `sections/hero.xml` (`2:8`) + homepage screenshot; MCP blocked for background `2:9`
- **Pass:** 600px section, centered badge/headline/subtext/CTAs, Figma copy, gradient overlay, Shop Now → `/shop`, Shop Wholesale → `/signup`
- **Deferred:** hero photography export (`2:9` → `public/images/hero/background.jpg`); full browser QA after asset download

#### Spec 00 + 01 — Cursor browser pass (2026-08-30)

- **Method:** Cursor browser @ `http://localhost:3000/` with CDP viewport 1440×900 vs `figma-cache/storefront/homepage/screenshot.png`, `sections/header.xml` (`2:185`), `announcement-bar.xml` (`2:5`), `sections/hero.xml` (`2:8`), `footer/metadata.xml` (`18:70`)
- **Pass:**
  - Announcement bar: 40px, forest green, copy `FREE SHIPPING ON ORDERS OVER $150`
  - Header logos (`logo-header.png` / `logo-footer.png`) render at 105×62
  - Nav labels, category row labels, search placeholder, CAD + Toronto ON, cart `$0.00` at 112×44, `Shop All` green
  - Hero photography (`hero_bg_image.png`) live; section 600px; badge + subtext copy; Shop Now 152×60 orange; Shop Wholesale 207×62 white outline
  - Footer charcoal, Shop / Company / Support columns + legal copy match Figma
  - Shop Now navigates to `/shop` (404 expected — catalog not built)
- **Gaps (block sign-off):**
  - **10 broken icons** — all `public/icons/header/*` and `public/icons/social/*` 404 (broken-image placeholders on search, chevrons, flag, pin, user, cart, Facebook/Instagram/Twitter)
  - Hero headline renders **three lines**; Figma screenshot + 120px heading box (`2:16`) read as **two lines**
  - Extra `bg-brand-green/30 mix-blend-multiply` overlay is not in Figma (`2:10` is a dark gradient only) — live hero is greener/darker than the screenshot
  - Search field is 48×287 vs Figma input 65×307
  - Wholesale is a plain text nav link; screenshot shows a filled green pill with a leading icon
  - Badge is CSS `uppercase` (`100% ORGANIC`); Figma text is `100% Organic`
- **Out of scope (not implemented yet):** Shop by Category, Best Sellers, Trending, Recently Added, testimonials, newsletter
- **Deferred routes:** `/shop`, `/cart`, `/login`, `/signup` 404 by design until those specs are built
- **Sign-off:** not passed — export remaining icons, then fix listed layout gaps and re-QA

#### Spec 00 + 01 — Layout gap fix (2026-08-30)

- **Method:** Cursor browser @ `http://localhost:3000/` CDP 1440×900 vs homepage screenshot + `hero.xml` `2:8` / `header.xml` `2:185`
- **Fixed:**
  - Headline two lines, 56px / 60px leading, **120px** block (matches `2:16`)
  - Badge mixed case `100% Organic`, **122×26** (matches `2:13`)
  - Removed green multiply overlay; dark left-to-right gradient only
  - Search input **65×307** (matches `2:207`)
  - Wholesale filled green pill **98×36**, `/signup`
  - Nav links `whitespace-nowrap` so New Arrivals stays one line (20px)
- **Still open:** 10 missing Figma icons (broken placeholders); Wholesale leading icon not exported
- **Sign-off:** layout gaps closed; icon export still blocks full visual QA sign-off

#### Spec 01 — Hero restyle vs Figma crop (2026-08-30)

- **Method:** Cursor browser hero-only vs user-provided Figma `2:8` crop
- **Fixed to match crop:**
  - Badge: solid brand-green pill, uppercase `100% ORGANIC` (not frosted glass)
  - CTAs: `rounded-full` pills; Shop Now orange; Shop Wholesale frosted `bg-white/20` + blur (not white outline)
  - Overlay: lighter scrim `from-black/45 via-black/35 to-black/20` so shelf photography reads
  - Vertical stack from `hero.xml` y-offsets (badge 95, heading 144, subtext 318, CTAs 428)
- **Remaining:** missing header icons
- **Token:** hero badge `#3F8F5B` → `--hero-badge` (Figma `2:13`)

#### Spec 01 — Shop by category (2026-08-30)

- **Method:** Cursor browser @ `http://localhost:3000/` vs `shop-by-category.xml` (`2:41`)
- **Pass:** heading "Shop by Category", prev/next controls, six tile labels (Fresh Produce through Beauty), links to `/shop?category=<slug>`
- **Deferred:** category photography + carousel chevron PNGs (24 assets pending export); full visual QA after `fetch-assets.py apply`

#### Spec 01 — Product sections (2026-08-30)

- **Method:** Cursor browser @ `http://localhost:3000/` vs `featured-products.xml` (`6:3169`), `trending-products.xml` (`7:3466`), `recently-added.xml` (`7:3954`), `main-content.xml` product cards (`6:3223`)
- **Pass:** three sections in order; badges "Best Sellers" / "Trending Now"; titles + featured description; "View All Products" → `/shop`; five 240px cards per row; Figma copy (sizes, origins, prices, bulk tiers, stock labels); green Add to Cart; organic / best-seller badges on yam card
- **Deferred:** heart/cart micro-icons (Lucide placeholders); full pixel QA after asset export

#### Spec 01 — Product card polish + photography (2026-08-30)

- **Method:** Cursor browser @ `http://localhost:3000/#best-sellers` vs Figma `6:3223` + user-supplied exports
- **Pass:** card styling (organic leaf badge, orange bulk row, green stock, circular wishlist); desktop grid aligns header/button with card edges; four product PNGs render in featured/trending/recently-added rows
- **Assets:** `public/images/products/honey-beans.png`, `yellow-garri.png`, `white-puna-yam.png`, `red-palm-oil.png`

#### Spec 01 — Promo, testimonials, newsletter (2026-08-30)

- **Method:** Cursor browser @ `http://localhost:3000/` vs `main-content.xml` (`7:3458`–`7:3461`, `6:2981`, `6:3063`)
- **Pass:** three promo tiles between featured/trending; trending panel bg; three testimonial cards with Figma quotes; green newsletter block with email + Subscribe; section order complete through newsletter (footer in shell)
- **Deferred:** promo tiles are color placeholders until Figma art export; newsletter badge copy inferred (MCP rate limit)

#### Spec 01 — Testimonials polish (2026-08-30)

- **Method:** Cursor browser @ `http://localhost:3000/#testimonials` vs user Figma export + `main-content.xml` (`6:2981`)
- **Pass:** orange `Customer Stories` badge; white heading/subtext on green band; three cards with outline orange stars, Figma quotes, peach avatar + orange initial

#### Spec 02 — Shop catalog (2026-08-31)

- **Method:** Cursor browser @ `http://localhost:3000/shop` vs `shop-catalog/sections/main.xml` (`2:242`)
- **Pass:** breadcrumb; title + description; promo strip; search + category pills; filter sidebar (categories, price, stock, purchase type, origin); toolbar count + sort; 4-col product grid with `ProductCard`; pagination; `?category=grains-flour` filters; links to `/shop/[slug]` placeholder
- **Deferred:** mobile filter drawer; promo banner art; full product catalog from API; list view toggle (grid only)

#### Spec 05 — Checkout page (2026-09-01)

- **Method:** Implementation vs `checkout-page/sections/main.xml` (`2:1527`)
- **Pass:** step indicator (Delivery / Payment / Confirm); guest checkout banner + Sign in link; shipping address form; delivery method radios; order summary with Edit Cart; Continue to Payment / Confirm / Place Order; redirects to `/cart` when empty; clears cart on success
- **Deferred:** payment brand icons; authenticated saved addresses; API `POST /orders`

#### Spec 06 — Order confirmation (2026-09-01)

- **Method:** Implementation vs `order-confirmation/sections/main.xml` (`2:1748`)
- **Pass:** success hero + order #; email confirmation copy; 4-step status timeline; Delivery Information card (address, method, sub-label, estimated arrival); Payment Information card (Visa + last4, billing note); Track My Order + Continue Shopping CTAs; Items in Order sidebar with Paid Total; 2-hour modification info banner
- **Deferred:** payment card brand art; full browser visual QA

#### Spec 02–06 — Desktop shopping flow E2E (2026-09-01)

- **Method:** Cursor browser @ `http://localhost:3000` — PDP → cart → checkout → order confirmation vs Figma `order-confirmation/sections/main.xml` (`2:1748`)
- **Pass:**
  - `/shop/red-palm-oil` — Add to Cart updates header badge + localStorage
  - `/cart` — line items, order summary, Proceed to Checkout
  - `/checkout` — 3-step wizard (delivery, payment, confirm) with order summary sidebar
  - `/order/AFW-HHRPHS/confirmation` — dark canvas hero, green check + order #, timeline (Order Confirmed → Delivered), delivery/payment cards, Items in Order + Paid Total, Track My Order + Continue Shopping, dashboard info banner
- **Gaps fixed:** Place Order redirected to `/cart` instead of confirmation — empty-cart `useEffect` raced with `clearCart()`; fixed via `placingOrderRef` in `CheckoutPageContent`; removed erroneous black `--storefront-canvas` — page uses standard white background per Figma
- **Deferred:** Next.js dev overlay issues badge on PDP; related-product quick-add; payment brand icons; Figma screenshot not cached for order-confirmation frame (metadata XML used)
- **Sign-off:** order confirmation visual QA pass for desktop flow; direct URL requires `sessionStorage` order from checkout (otherwise redirects to `/shop`)

#### Spec 04 — Cart page (2026-09-01)

- **Method:** Implementation vs `cart-page/sections/main.xml` (`2:1187`)
- **Pass:** breadcrumb; Your Cart + item count; line items with image, name, size, origin, qty +/-, remove, line totals; bulk unlocked/pending alerts; Continue Shopping; order summary with free-shipping progress, subtotal, bulk discount, shipping, tax, total; shipping method radios; promo code UI; Proceed to Checkout → `/checkout`; empty cart state; cart persists via localStorage
- **Deferred:** payment brand icons; full browser visual QA; promo code apply logic

#### Spec 03 — Product detail (2026-09-01)

- **Method:** Implementation vs `product-detail/sections/main.xml` (`2:873`) + screenshot
- **Pass:** breadcrumb Home > Shop > category > product; image gallery + thumbnails; organic badge; title, origin, reviews; description; size selector (red palm oil); retail/bulk pricing panel; stock + delivery; quantity + Add to Cart; wishlist button; accordions; You May Also Like (4 cards); cart count/total updates in header on add
- **Deferred:** unique gallery photography per thumbnail; related card quick-add wiring; full browser QA when Cursor browser available

#### Spec 07 — Mobile shop catalog (2026-09-02)

- **Method:** Cursor browser @ `http://localhost:3000/shop` CDP 375×812 vs Figma `3:2189` / `main.xml`
- **Pass:** title; search; horizontal pills (All Products active); product count + Filter & Sort drawer (sort + sidebar filters); 2-col catalog cards with organic badge; Showing 6 of N + Load More; catalog footer (Shop/Support accordion, copyright); Categories tab active in bottom nav
- **Deferred:** PDP/cart/checkout still desktop layout on mobile; Figma product photography placeholders
- **Sign-off:** pass for mobile shop catalog unit

#### Spec 02–06 — Desktop re-QA (2026-09-02)

- **Method:** Cursor browser @ `http://localhost:3000` CDP 1440×900
- **Routes:** `/` (homepage), `/shop/red-palm-oil` (PDP), `/cart`, `/checkout`
- **Pass:** desktop shell at 1440 (main nav, category row, search, hero, product sections, footer); PDP gallery + size selector + accordions + related products; cart shows line items + summary sidebar; checkout step 1 delivery form + order summary
- **Gaps remaining:** 9 manifest icons still pending (chevron-down, social ×3, auth ×2, logout, carousel ×2) — Figma MCP rate limit; footer social icons may 404 until export
- **Sign-off:** pass for desktop shopping flow layout and navigation; spec 00 icon export still deferred

#### Spec 07 — Mobile shopping flow (2026-09-02)

- **Method:** Cursor browser @ `http://localhost:3000/shop/red-palm-oil`, `/cart`, `/checkout` vs responsive adaptation of desktop specs `2:873`, `2:1187`, `2:1527`, `2:1748`
- **Pass:** mobile PDP with back link, gallery thumbs, full-width add-to-cart, 2-col related products; mobile cart with compact line items, order summary, sticky Proceed to Checkout above bottom nav; checkout with stacked layout + sticky step action bar; order confirmation stacks cards and CTAs; cart badge updates from PDP
- **Deferred:** no dedicated Figma mobile frames for PDP/cart/checkout; full E2E place-order pass on 375px viewport (browser automation viewport mixed desktop/mobile in a11y tree)
- **Sign-off:** pass for spec 07 mobile shopping flow unit

#### Spec 09 — Account dashboard (2026-09-02)

- **Method:** Cursor browser @ `http://localhost:3000/account/*` (1200px) vs Figma `dashboard-orders` (`29:86`), `order-detail` (`29:192`), `dashboard-addresses` (`29:279`), `dashboard-reorder-list` (`29:329`), `dashboard-profile` (`29:433`)
- **Pass:** header with logo + greeting + logout; tab nav Orders · Addresses · Reorder List · Profile with active state; 4 order cards with status pills, View Details, Reorder; order detail with back link, items, delivery address, payment summary; 2 address cards + Add New Address; reorder table with qty controls + Add to Cart / Add All; profile personal + business panels, Save Changes; logout → `/`
- **Fixed during QA:** `useCart` threw outside storefront — moved `CartProvider` to root `app/providers.tsx`
- **Deferred:** password change; delete account; backend order/address sync; logout icon PNG export
- **Sign-off:** pass for spec 09 account dashboard unit

#### Spec 08 — Auth login + signup (2026-09-02)

- **Method:** Cursor browser @ `http://localhost:3000/login`, `/signup`, `/account/orders` vs Figma `auth-login` (`29:15`) / `auth-signup` (`28:1161`) metadata
- **Pass:** centered auth layout; 480px card; logo + subtitle; Log In / Sign Up tabs; disabled Apple/Google social buttons; login email/password + forgot link; signup personal/business toggle reveals business fields + info box; submit label switches to "Submit Application"; unauthenticated `/account/orders` redirects to `/login?returnUrl=/account/orders`; checkout Sign in link → `/login?returnUrl=/checkout`
- **Fixed during QA:** account route was at `/orders` (404) — moved to `app/(account)/account/orders/page.tsx` for `/account/orders`
- **Deferred:** OAuth wiring; forgot-password flow; auth social icon PNGs pending export; full login E2E redirect (session submit blocked in automated browser); account dashboard content (spec 09)
- **Sign-off:** pass for spec 08 auth unit

#### Spec 07 — Mobile homepage (2026-09-02)

- **Method:** Cursor browser @ `http://localhost:3000/` CDP viewport 375×812 vs Figma `2:1928` + `context/design-reviews/mobile-homepage.md`
- **Pass:** mobile header (AFW, search, cart badge, menu); announcement bar 31px; hero badge "100% ORGANIC"; stacked CTAs; Fresh Arrivals card; 6-category 2×3 grid; Weekly Deals scroll; Best Sellers 2-up; testimonials carousel; 4 trust props; footer accordion + newsletter; bottom nav Home · Categories · Cart · Account; add-to-cart updates Cart badge
- **Deferred:** Figma icon PNGs still 404 in drawer (Lucide fallbacks in header/nav); hero photography crop differs from Figma mobile frame; trust/category icons pending asset export
- **Sign-off:** pass for spec 07 homepage unit; mobile shop catalog not yet built

#### Spec 00 — Shell motion polish (2026-09-07)

- **Method:** Cursor browser @ `http://localhost:3000/` (desktop) + CDP checks
- **Pass:** primary nav without search/location (CAD + account + cart only); search in category bar (`role=search`); Toronto, ON chip absent; GSAP marquee translating (`matrix` x offset observed); Framer product/category/promo motion wired; `MotionReveal` on homepage sections; TypeScript clean
- **Gaps fixed:** category quick links nowrap + horizontal scroll so search + links don’t wrap awkwardly
- **Deferred:** hover screenshot automation (pointer intercept with overlapping mobile/desktop trees); reduced-motion OS setting not toggled in this session
- **Sign-off:** pass for shell breathing room + motion polish unit

#### Spec 00 — Header polish (2026-08-30)

- **Method:** Cursor browser @ `http://localhost:3000/` vs user Figma header export + `header.xml` (`2:185`)
- **Pass:** Deals orange; Wholesale plain link after vertical rule; Shop All orange in category row; green pill cart `$0.00`; search 65×307 muted fill; category row padding matches main container
