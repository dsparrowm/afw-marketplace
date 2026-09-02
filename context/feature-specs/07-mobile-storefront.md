# 07 — Mobile Storefront

## Goal

Adapt the storefront for mobile viewports using dedicated Figma mobile frames, with approved deviations documented in `context/design-reviews/mobile-homepage.md`.

## Design Sign-off

**Resolved 2026-09-02** — see `context/design-reviews/mobile-homepage.md` → Resolved Decisions. Build may proceed.

## Figma References

| Frame | Node ID | Cache |
| --- | --- | --- |
| Mobile Homepage | `2:1928` | `figma-cache/storefront/mobile-homepage/` |
| Mobile Shop Catalog | `3:2189` | `figma-cache/storefront/mobile-shop-catalog/` |

Both frames are 375px wide.

## Breakpoint

- **Mobile shell active:** `< lg` (below 1024px) — bottom nav visible, desktop header nav/category row hidden
- **Desktop shell:** `lg+` — existing `StorefrontHeader` / footer

## Sections (mobile homepage)

| Slug | Node ID | Build notes |
| --- | --- | --- |
| announcement-bar | `2:1929` | Reuse `AnnouncementBar` |
| header | `2:2148` | New `MobileHeader` — logo, search, cart, menu |
| main | `2:1931` | See section order below |
| bottom-nav | `2:2165` | New `MobileBottomNav` — **Cart not Wishlist** |

### Main content order

1. Hero (`2:1932`) — badge **"100% Organic"** (not Figma "Direct From Source")
2. Fresh Arrivals alert (`2:1949`)
3. Categories (`2:1963`) — **2×3 grid**, six tiles from `homepageCategories`
4. Weekly Deals (`2:1990`) — horizontal scroll
5. Best Sellers (`2:2025`) — 2-up grid, reuse `ProductCard`
6. **Testimonials** — not in Figma; compact carousel after Best Sellers
7. Trust props (`2:2073`) — **4 items**, reuse desktop trust bar copy/icons
8. Footer accordion (`2:2101`) — new `MobileFooter` or responsive `StorefrontFooter`

## Components

```
components/storefront/
  MobileBottomNav.tsx
  MobileHeader.tsx
  MobileMenuDrawer.tsx          ← hamburger: main nav + static CAD/Toronto
  mobile/
    FreshArrivalsAlert.tsx
    MobileCategoryGrid.tsx
    WeeklyDealsSection.tsx
    MobileTestimonialsCarousel.tsx
    MobileTrustProps.tsx
    MobileFooterAccordion.tsx
```

Prefer responsive adaptation of existing components (`ProductCard`, `CategoryTile`, `AnnouncementBar`, testimonial data) where structure allows.

## Mobile Bottom Nav (`2:2165`)

Fixed at bottom; **Home · Categories · Cart · Account** (Cart replaces Figma Wishlist).

| Tab | Route | Notes |
| --- | --- | --- |
| Home | `/` | |
| Categories | `/shop` | |
| Cart | `/cart` | Badge from `useCart()`; active on `/checkout` too |
| Account | `/login` | `/account/*` when auth exists |

- 76px height + `env(safe-area-inset-bottom)`
- Active state: brand green icon + label

## Mobile Header (`2:2148`)

- Left: leaf icon + "AFW" wordmark → `/`
- Right: search (opens search or `/shop`), cart (badge), hamburger
- Cart remains in header **and** bottom nav
- No location/currency in header — static display in `MobileMenuDrawer`

## Hero (mobile)

- Rounded container 343×520, 16px horizontal inset
- Badge: **"100% Organic"** — solid brand-green pill (match desktop)
- Headline + subtext: Figma copy from `main.xml`
- CTAs: full-width stacked — Shop Now (`/shop`), Shop Wholesale (`/signup`)

## Categories

- Title "Categories" + "See All" → `/shop`
- **2×3 grid** using `CategoryTile` + `homepageCategories` (6 items)
- 16px gutter, 163.5px tile width equivalent at 375

## Testimonials (added)

- Reuse `testimonialsContent` from `lib/storefront/testimonials.ts`
- Single visible card, horizontal snap scroll
- Green band, reduced padding (`py-12` vs desktop `py-24`)
- Place **after Best Sellers, before trust props**

## Trust props

- Four vertical rows — same copy as desktop `TrustBar`
- Icons from asset manifest when exported; placeholder until then

## Touch targets

- All tappable controls **minimum 44×44px** hit area (add-to-cart, nav icons, accordion rows)

## StorefrontShell changes

- Render `MobileHeader` + `MobileBottomNav` below `lg`
- Add bottom padding to main content when bottom nav visible (`pb-[76px]` + safe area)
- Hide desktop header nav row and category quick links on mobile

## Implementation Steps

1. `MobileBottomNav` + shell breakpoint wiring
2. `MobileHeader` + `MobileMenuDrawer`
3. Mobile homepage sections in order (hero → footer)
4. Responsive homepage page — desktop sections hidden on mobile, mobile sections hidden on desktop (or single responsive components)
5. Visual QA at 375px and 320px
6. Mobile shop catalog (`3:2189`) — next unit after homepage
7. Mobile shopping flow — PDP, cart, checkout, order confirmation below `lg`

## Mobile Shopping Flow (responsive adaptation)

No dedicated Figma mobile frames for PDP/cart/checkout; adapt desktop specs with mobile shell:

| Route | Component |
| --- | --- |
| `/shop/[slug]` | `MobileProductDetailPage`, `MobileProductGallery` |
| `/cart` | `MobileCartPageContent`, `MobileCartLineItem`, sticky checkout bar |
| `/checkout` | responsive `CheckoutPageContent` + `MobileStickyCheckoutBar` |
| `/order/[id]/confirmation` | responsive `OrderConfirmationPage` |

Desktop layouts hidden below `lg` (`hidden lg:block`); mobile layouts use `lg:hidden`.

## Mobile Shop Catalog (`3:2189`)

| Slug | Node ID | Component |
| --- | --- | --- |
| main | `3:2192` | `MobileCatalogPage` |
| search | `3:2196` | `MobileCatalogSearch` |
| category pills | `3:2201` | `MobileCatalogCategoryPills` |
| toolbar | `3:2213` | `MobileCatalogToolbar` + `MobileCatalogFilterDrawer` |
| product grid | `3:2220` | `MobileCatalogProductGrid` (catalog `MobileProductCard`) |
| load more | `3:2321` | inline in `MobileCatalogProductGrid` |
| footer | `3:2329` | `MobileFooterAccordion` variant `catalog` |

- Horizontal scroll pills: All Products, Grains & Flour, Fresh Produce, Spices & Oil, Snacks
- Filter & Sort opens full-screen drawer (sort + reused `CatalogFilters`)
- Load more shows 6 products at a time (`MOBILE_CATALOG_PAGE_SIZE`)
- Desktop catalog hidden below `lg`; mobile catalog hidden at `lg+`

## Acceptance Criteria

- [x] Mobile homepage matches Figma `2:1928` at 375px **except approved deviations**
- [x] Bottom nav: Home · Categories · Cart · Account; Cart badge works
- [x] Hero badge reads "100% Organic"
- [x] Six categories visible in 2×3 grid
- [x] Testimonials carousel present with desktop copy
- [x] Four trust props with desktop copy
- [x] No horizontal scroll at 375px or 320px (visual QA pass)
- [x] Mobile shop catalog matches Figma `3:2189` at 375px
- [x] Shopping flow works end-to-end on mobile viewport (PDP, cart, checkout, order confirmation adapted below `lg`)
