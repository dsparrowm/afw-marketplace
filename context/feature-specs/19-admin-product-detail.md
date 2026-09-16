# 19 — Admin Product Detail

## Goal

Build the staff Product Details screen matching Figma frame `product-detail-admin` (`79:7`).

## Figma References

| Area | Node ID | Cache path |
| --- | --- | --- |
| Frame | `79:7` | `figma-cache/admin/product-detail-admin/` |
| Main | `79:39` | `…/sections/main.xml` |
| Screenshot | — | `figma-cache/admin/product-detail-admin/screenshot.png` |

## Route

`/admin/products/[id]` — uses Figma mock product for visual QA; list edit links already target this route.

## Components

```
components/admin/products/
  ProductDetailPage.tsx
  ProductDetailHeader.tsx
  ProductDetailGallery.tsx
  ProductDetailInfo.tsx
  ProductPricingTiers.tsx
  ProductInventoryLogistics.tsx
  ProductDetailActions.tsx

lib/mocks/admin-product-detail.ts
```

## UI

- Breadcrumb: Products / All Grains / Nigerian Jollof Rice Mix
- Title + Published badge + Last Updated + Edit Product
- Gallery (hero + 3 thumbs), info card, pricing tiers, inventory + shipping, footer actions

## Acceptance

1. Detail page matches Figma copy/structure; Visual QA logged
