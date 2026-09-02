# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

Phase 2 — Catalog wired to staging API (admin proxy); cart/checkout/auth still mocked.

## Current Goal

Expand staging catalog seed data; wire customer APIs when available. Export remaining 9 Figma icons when MCP limit resets.

## Completed

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

## In Progress

- _(none — icon fallbacks complete 2026-09-02)_

### Figma asset export (2026-09-02)

| Item | Detail |
| --- | --- |
| Status | **Complete with fallbacks** — 17 PNG exports + 9 Lucide/SVG fallbacks |
| PNG exports | logos, hero, header icons (search/cart/user/flag/location), trust (×4), categories (×6), products (×4) |
| Lucide/SVG fallbacks | chevron-down, carousel arrows, logout, social (×3), auth (×2) — see `components/icons/` |

## Next Steps (ordered)

1. **Seed staging catalog** — add products/categories on backend so API-driven pages have full data
2. **Customer API wiring** — cart, checkout, auth, account orders when public endpoints ship

## Design Reviews

- **Mobile homepage (2026-09-02)** — `context/design-reviews/mobile-homepage.md` — ✅ Implemented per resolved decisions.

## Open Questions

- **Backend API contract** — **Partially resolved (2026-09-02):** staging at
  `http://104.251.212.74:3000`, Swagger `/docs`, creds in `.env.local`, full map in
  `context/backend-api.md`. Catalog wired via server-side admin proxy. Open gap: no public customer/cart/checkout/auth endpoints.
- **Product detail route** — **Resolved:** keep `/shop/[slug]` — backend `CreateProductDto` uses `slug`.
- **Auth provider** — Design shows Apple/Google social auth; confirm which OAuth providers the
  backend supports before wiring.
- **Wholesale flow** — "Shop Wholesale" CTA and business signup: does wholesale use different
  pricing API or approval gate before checkout?
- **Figma design tokens** — Approximated from homepage screenshot (orange + forest green). Refine when `get_design_context` is cached.
- **Currency/location switcher** — Header shows CAD + Toronto, ON; confirm if this is static or
  user-selectable with backend support.
- **Category data source** — **Resolved for catalog:** dynamic from `GET /admin/categories/tree` when API has data; static Figma tiles as image fallback / empty-state fallback.
- **Wholesale nav icon** — Green pill is implemented per homepage screenshot. Leading icon in `header.xml` `2:203` (25px indent) is not in the export manifest; add when Figma export is available. Do not substitute Lucide/emoji.

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

- Figma file: `TRHpdrWtpLm06UPtgHYDgB`, canvas `0:1` (Storefront)
- Homepage frame `2:4` is 5423px tall — too large for single design-context fetch; use sections
- Pending design-context fetches: run `python3 figma-cache/cache.py pending`

## Visual QA Log

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

#### Spec 00 — Header polish (2026-08-30)

- **Method:** Cursor browser @ `http://localhost:3000/` vs user Figma header export + `header.xml` (`2:185`)
- **Pass:** Deals orange; Wholesale plain link after vertical rule; Shop All orange in category row; green pill cart `$0.00`; search 65×307 muted fill; category row padding matches main container
