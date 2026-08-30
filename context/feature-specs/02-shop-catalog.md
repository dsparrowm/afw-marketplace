# 02 — Shop Catalog

## Goal

Implement the shop catalog page matching Figma frame `Shop Catalog` (`2:239`).

## Figma Reference

- Frame: `shop-catalog` — node `2:239`, 1440×2462
- Metadata: `figma-cache/storefront/shop-catalog/metadata.xml`
- Sections: header (`2:833`), main (`2:242`), footer (`18:7`)

## Route

- `app/(storefront)/shop/page.tsx`
- Query params TBD: `?category=`, `?sort=`, `?q=` (confirm with backend)

## Page Structure

Uses `StorefrontShell` (spec 00). Main content area (`2:242`) includes:

- Page title / breadcrumb (confirm from Figma metadata)
- Filter sidebar or toolbar (categories, price range, availability)
- Product grid (responsive columns)
- Sort dropdown
- Pagination

## Components

```
components/storefront/
  CatalogPage.tsx             ← page-level composition
  CatalogFilters.tsx          ← sidebar or drawer filters
  CatalogProductGrid.tsx      ← grid of ProductCard
  CatalogSortSelect.tsx
  CatalogPagination.tsx
```

Reuse `ProductCard` from spec 01.

## Implementation Steps

1. Read `shop-catalog/sections/main.xml` for exact layout structure
2. Create catalog page route with mock product list
3. Implement filter UI (static options from homepage categories for v1)
4. Implement sort select (UI only or wired if API supports)
5. Implement pagination (client-side on mock data for v1)
6. Wire category links from homepage carousel

## Data

- v1: `lib/mocks/products.ts` with filter/sort applied client-side
- v2: `lib/api/products.ts` + `useProducts` hook when backend contract confirmed

## Acceptance Criteria

- [ ] `/shop` renders product grid inside storefront shell
- [ ] Category filter from homepage query param filters displayed products
- [ ] Product cards link to `/shop/[slug]` (or confirmed product detail route)
- [ ] Pagination controls render and update the grid
- [ ] Layout matches Figma main section structure
