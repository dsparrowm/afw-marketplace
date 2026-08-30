# 01 — Homepage

## Goal

Implement the desktop homepage matching Figma frame `Homepage` (`2:4`).

## Figma Reference

- Frame: `homepage` — node `2:4`, 1440×5423
- Screenshot: `figma-cache/storefront/homepage/screenshot.png`
- Full metadata: `figma-cache/storefront/homepage/metadata.xml`

## Sections (build in order)

| # | Slug | Node ID | Description |
| --- | --- | --- | --- |
| 1 | announcement-bar | `2:5` | Part of shell (spec 00) |
| 2 | header | `2:185` | Part of shell (spec 00) |
| 3 | hero | `2:8` | Full-width hero with image, badge, headline, CTAs |
| 4 | trust-bar | `6:2690` | Four trust signals below hero (organic, farm-sourced, delivery, guarantee) |
| 5 | shop-by-category | `2:41` | Category carousel with tiles |
| 6 | featured-products | `6:3169` | Section header + product grid |
| 7 | trending-products | `7:3466` | Section header + product grid |
| 8 | recently-added | `7:3954` | Section header + product grid |
| 9 | promo-banners | `7:3458`–`7:3461` | Three promotional color tiles |
| 10 | testimonials | `6:2981` | Customer review cards on green band |
| 11 | newsletter | `6:3063` | Email signup block above footer |

Each section XML: `figma-cache/storefront/homepage/sections/<slug>.xml`

## Route

- `app/(storefront)/page.tsx`

## Hero Section (`2:8`)

- Background: editorial food photography (full-width, 600px height)
- Gradient overlay
- Badge pill: "100% Organic"
- Headline: "Authentic African Food. Naturally Sourced." (two lines per homepage screenshot)
- Subtext: organic sourcing copy (see `ui-context.md`)
- CTAs: "Shop Now" (primary, links to `/shop`), "Shop Wholesale" (outline, TBD destination)

## Trust Bar (`6:2690`)

Immediately below hero — full-width dark bar, 108px height, four items in a row:

| Icon (Figma) | Title | Subtitle |
| --- | --- | --- |
| leaf `6:2694` | 100% Certified Organic | No artificial chemical additives |
| tractor `6:2702` | Farm-Sourced from Africa | Sourced direct from local producers |
| truck `6:2710` | Delivered Across Canada | Reliable, temperature-stable logistics |
| shield-check `6:2718` | Satisfaction Guaranteed | Love our products or your money back |

Each item: 44px circular icon well + title (semibold) + muted subtitle. Copy in `main-content.xml`.

## Shop by Category (`2:41`)

- Section title: "Shop by Category"
- Carousel arrows (prev/next)
- Category tiles: image + label
- Categories from design: Fresh Produce, Frozen Proteins, Grains & Flour, Spices & Seasonings
- Tile links to `/shop?category=<slug>` (confirm param name with backend)

## Product Sections

Recurring pattern for featured, trending, recently-added:

- Section header row: badge (optional) + title + "View All" button
- Horizontal grid or carousel of `ProductCard` components
- Mock product data until catalog API is wired

## Components to Create

```
components/storefront/
  HeroSection.tsx
  TrustBar.tsx
  CategoryCarousel.tsx
  CategoryTile.tsx
  ProductSection.tsx          ← reusable section wrapper (title + grid)
  ProductCard.tsx             ← shared with shop catalog
  PromoBannerRow.tsx
  TestimonialsSection.tsx
  TestimonialCard.tsx
  NewsletterSection.tsx
```

## Implementation Steps

1. Create `ProductCard` with mock data shape
2. Implement `HeroSection`
3. Implement `TrustBar` (`6:2690`)
4. Implement `CategoryCarousel` with static category data
4. Implement `ProductSection` wrapper
5. Compose homepage with featured, trending, recently-added sections
6. Wire `app/(storefront)/page.tsx` inside `StorefrontShell`

## Data

Mock products in `lib/mocks/products.ts` until `GET /products` (or equivalent) is confirmed.

```typescript
type Product = {
  id: string
  slug: string
  name: string
  price: number        // CAD cents or dollars — confirm with backend
  imageUrl: string
  badge?: string
  category: string
}
```

## Acceptance Criteria

- [ ] Homepage renders all sections in order within `StorefrontShell`
- [ ] Hero matches Figma copy and layout
- [ ] Category carousel shows 4+ categories with images
- [ ] Three product sections render with mock data
- [ ] "Shop Now" navigates to `/shop`
- [ ] Section implementation matches Figma section node IDs (tracked in progress tracker)

## Visual QA

Open **Cursor browser** at `/` and compare each section against
`figma-cache/storefront/homepage/sections/<slug>.xml` and the homepage screenshot.
Log in `context/progress-tracker.md` before moving to the next section.
