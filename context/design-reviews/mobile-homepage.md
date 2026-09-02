# Design Review — Mobile Homepage

**Date:** 2026-09-02  
**Status:** ✅ Resolved — ✅ Implemented 2026-09-02  
**Figma frame:** Mobile Homepage `2:1928` (375×3093)  
**Cache:** `figma-cache/storefront/mobile-homepage/`  
**Related spec:** `context/feature-specs/07-mobile-storefront.md`

## Summary

Solid mobile adaptation — not a desktop shrink. Review identified IA, trust, and parity gaps vs desktop. **All open decisions are resolved below.** Build follows Figma structure with documented deviations where product/UX rationale overrides the frame.

**Overall:** B+ baseline → **A- target** after resolved changes.

---

## Resolved Decisions

| # | Question | Decision | Rationale |
| --- | --- | --- | --- |
| 1 | Bottom nav: Cart replaces Wishlist? | **Yes — Home · Categories · Cart · Account** | Grocery shoppers need cart in the thumb zone. Wishlist stays on product cards only. Header cart icon + badge remains for dual entry. |
| 2 | Hero badge: unify on "100% Organic"? | **Yes — "100% Organic"** on mobile and desktop | Matches brand positioning (`project-overview.md`). Figma mobile copy "Direct From Source" is superseded. |
| 3 | Add mobile testimonials? | **Yes — compact carousel after Best Sellers** | Social proof is critical for specialty food. Reuse desktop `TestimonialsSection` content; mobile layout = 1 card visible, horizontal swipe, reduced vertical padding (`py-12`). **Deviation from Figma** (section not in frame). |
| 4 | Category grid: 2×2 or expand? | **2×3 grid — all 6 `homepageCategories`** | Figma shows 4 tiles; desktop shows 6. Show full catalog entry points; reuse `CategoryTile` + `homepageCategories`. "See All" → `/shop`. **Deviation from Figma** tile count/layout. |
| 5 | Wholesale CTA: full button or demote? | **Keep full-width secondary button per Figma** | Wholesale is a primary product goal. Stacked retail + wholesale CTAs are appropriate for dual-audience brand. Links to `/signup`. |
| 6 | Trust props: 3 or 4 items? | **4 items — reuse desktop `TrustBar` copy** | Restore "Satisfaction Guaranteed". Vertical stack in existing trust card section; same icons/copy as desktop trust bar. **Deviation from Figma** (adds 4th row). |
| 7 | Location/currency in mobile header? | **Defer to hamburger menu drawer** | Keep header minimal (logo, search, cart, menu). Drawer shows nav links + static CAD / Toronto, ON (non-interactive until backend confirms switcher). |
| 8 | Add-to-cart touch target? | **44×44px minimum** | Visual can stay 32px icon; hit area expanded with padding. |
| 9 | Announcement bar at 320px? | **Responsive type — `text-[11px]` below 375px** | Keep full copy; do not shorten message. |

---

## Approved Deviations from Figma `2:1928`

| Element | Figma | Build |
| --- | --- | --- |
| Bottom nav tab 3 | Wishlist | **Cart** (`/cart`, badge from cart context) |
| Hero badge copy | Direct From Source | **100% Organic** |
| Categories section | 2×2 (4 tiles) | **2×3 (6 tiles)** from `homepageCategories` |
| Trust card | 3 items | **4 items** from desktop trust bar |
| Testimonials | Not present | **Carousel** after Best Sellers |
| Add-to-cart button | 32×32 | **44×44** hit target |

All other sections follow Figma structure and copy from `figma-cache/storefront/mobile-homepage/sections/*.xml`.

---

## Mobile Homepage — Section Order (build spec)

| Order | Section | Source | Notes |
| --- | --- | --- | --- |
| 1 | Announcement bar | Figma `2:1929` | Same copy as desktop |
| 2 | Mobile header | Figma `2:2148` | Logo, search, cart, menu |
| 3 | Hero | Figma `2:1932` | Badge **100% Organic**; CTAs Shop Now + Shop Wholesale |
| 4 | Fresh Arrivals alert | Figma `2:1949` | Peach urgency card |
| 5 | Categories | Figma `2:1963` | **2×3 grid**, 6 categories, See All |
| 6 | Weekly Deals | Figma `2:1990` | Horizontal scroll sale cards |
| 7 | Best Sellers | Figma `2:2025` | 2-up product grid |
| 8 | Testimonials | **Added** | 1-card swipe carousel; desktop content |
| 9 | Trust props | Figma `2:2073` | **4 items** vertical |
| 10 | Mobile footer | Figma `2:2101` | Accordion + newsletter |
| 11 | Bottom nav | Figma `2:2165` | **Cart** tab, fixed |

---

## Bottom Nav Spec

| Tab | Route | Active when |
| --- | --- | --- |
| Home | `/` | pathname `/` |
| Categories | `/shop` | pathname starts with `/shop` |
| Cart | `/cart` | pathname `/cart` or `/checkout` |
| Account | `/login` | pathname starts with `/login`, `/signup`, or `/account` |

- Fixed bottom, 76px height, safe-area padding
- Active tab: brand green icon + label
- Cart tab shows item count badge when > 0

---

## Scores (post-resolution)

| Dimension | Before | Target |
| --- | --- | --- |
| Mobile-native patterns | 7/10 | 9/10 |
| Trust & social proof | 5/10 | 8/10 |
| Desktop parity | 6/10 | 8/10 |

---

## References

- Figma: [Mobile Homepage `2:1928`](https://www.figma.com/design/TRHpdrWtpLm06UPtgHYDgB/AFW-Marketplace?node-id=2-1928)
- Implementation spec: `context/feature-specs/07-mobile-storefront.md`
- Desktop comparison: `context/feature-specs/01-homepage.md`
- Category data: `lib/storefront/categories.ts` → `homepageCategories`
- Testimonials data: `lib/storefront/testimonials.ts`
