# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

Phase 1 — Homepage structure complete; asset export + shop catalog next.

## Current Goal

Export remaining Figma assets; shop catalog next.

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

## In Progress

- **Figma asset export (partial)** — logos + hero in `public/brand/`; 24+ assets pending (icons, categories, trust, product photos, promo art)

### Figma asset export blocker (2026-08-30)

| Item | Detail |
| --- | --- |
| Status | Partial — logos + hero exported; icons blocked by MCP Starter `get_screenshot` rate limit |
| Pending | 24 assets in `figma-cache/assets/manifest.json` (header, social, trust, carousel, categories, auth, account) |
| Exported on disk | `public/brand/logo-header.png`, `logo-footer.png`, `logo.png`, `hero_bg_image.png` |
| Runbook | **`figma-cache/assets/EXPORT.md`** |
| Code ready | `lib/brand/assets.ts`, `FigmaImage`, header/footer/hero wired to `public/` paths |

**Next session:** export pending icons via `python3 figma-cache/fetch-assets.py pending` → MCP `get_screenshot` per node → `apply` → re-QA spec 00 icons.

## Next Steps (ordered)

1. **Export remaining Figma icons + product photography** — follow `figma-cache/assets/EXPORT.md`
2. **Re-QA full homepage** at 1440px after asset export
3. **Shop catalog** — first item in `buildOrder` after homepage
4. Continue `figma-cache/manifest.json` → product detail, cart, checkout

## Open Questions

- **Backend API contract** — Which marketplace backend base URL and public endpoints exist for
  catalog, cart, checkout, and customer auth? Check `rokswood-hive-backend-api` or staging docs.
- **Product detail route** — `/shop/[slug]` vs `/products/[slug]` — confirm with backend URL scheme.
- **Auth provider** — Design shows Apple/Google social auth; confirm which OAuth providers the
  backend supports before wiring.
- **Wholesale flow** — "Shop Wholesale" CTA and business signup: does wholesale use different
  pricing API or approval gate before checkout?
- **Figma design tokens** — Approximated from homepage screenshot (orange + forest green). Refine when `get_design_context` is cached.
- **Currency/location switcher** — Header shows CAD + Toronto, ON; confirm if this is static or
  user-selectable with backend support.
- **Category data source** — Homepage category carousel: static from design or dynamic from
  `GET /categories` (or equivalent)?
- **Wholesale nav icon** — Green pill is implemented per homepage screenshot. Leading icon in `header.xml` `2:203` (25px indent) is not in the export manifest; add when Figma export is available. Do not substitute Lucide/emoji.

## Architecture Decisions

- Spec-driven incremental build aligned with `rokswood-hive-web` context pattern
- Figma cache is design reference only — not imported at runtime
- Desktop-first build order per `figma-cache/manifest.json` → `buildOrder`
- Large frames built section-by-section to stay within Figma MCP context limits
- Stack mirrors `rokswood-hive-web` (Next.js 15, Tailwind v4, shadcn, TanStack Query)
- Hero headline wraps as two lines (`Authentic African Food.` / `Naturally Sourced.`) to match the homepage screenshot and 120px heading box `2:16`, not the three-line `hero.xml` text-node extraction
- Wholesale main-nav item is plain text after a vertical rule; Deals uses orange accent (`accent` on `NavLink`)

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

#### Spec 00 — Header polish (2026-08-30)

- **Method:** Cursor browser @ `http://localhost:3000/` vs user Figma header export + `header.xml` (`2:185`)
- **Pass:** Deals orange; Wholesale plain link after vertical rule; Shop All orange in category row; green pill cart `$0.00`; search 65×307 muted fill; category row padding matches main container
