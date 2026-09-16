# 43 — Wire Storefront Catalog to Public APIs

## Goal

Load homepage, shop, and product detail from public endpoints (no staff token):

- `GET /public/products`
- `GET /public/products/{slug}`
- `GET /public/categories`

## Mapping

| Storefront | Source |
| --- | --- |
| Product pool (home + shop) | Paginated `/public/products` summaries |
| PDP `/shop/[slug]` | `/public/products/{slug}` (variants + tiers) |
| Category carousel | `/public/categories` merged onto curated Figma tiles |

Keep mock fallback via `CATALOG_FALLBACK_TO_MOCK`.

## Modules

```
types/api.ts
lib/api/public-catalog.ts
lib/catalog/map-public-product.ts
lib/catalog/storefront-data.ts
```

## Out of Scope

- Live cart/wishlist
- Admin catalog changes
- Homepage announcement / hero-slides (follow-up)

## Acceptance

1. `/` and `/shop` render products from `/public/products`
2. PDP loads from `/public/products/{slug}`
3. No staff Bearer required for catalog SSR
4. Visual QA + TypeScript clean
