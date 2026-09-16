# 11 — Admin Products List

## Goal

Build the staff Products list screen matching Figma Admin frame `products` (`72:203`).

## Figma References

| Area | Node ID | Cache path |
| --- | --- | --- |
| Frame | `72:203` | `figma-cache/admin/products/` |
| Main | `72:249` | `…/sections/main.xml` |
| Screenshot | — | `figma-cache/admin/products/screenshot.png` |

Reuse shared `AdminShell` / sidebar from spec 10.

## Components

```
components/admin/products/
  ProductsPage.tsx
  ProductsHeader.tsx
  ProductsFilters.tsx
  ProductsTable.tsx
  ProductsPagination.tsx
  ProductStatusBadge.tsx

lib/mocks/admin-products.ts
```

## UI (main `72:249`)

- Header: "Products" + subtitle; search field; green **Add Product** → `/admin/products/new`
- Filters: Category, Status, Origin selects + Reset Filters
- Table columns: Image, Product Name, Category, Price, Stock, Status, Actions
- Status chips: Active · Low Stock · Draft / Out of Stock
- Row actions: Edit · More (icons)
- Footer: "Showing 1-8 of 284 products" + Previous / 1 2 3 / Next

## Data

- Mock rows from `main.xml` (8 products). Total count **284** per Figma pagination copy.
- Client-side search + filter on the page-1 mock set for this unit.
- Do not invent extra product rows beyond Figma for visual QA.

## Out of Scope

- ~~Real `GET /admin/products` wiring~~ → see spec 25
- Add/Edit product form screens
- More-menu actions (UI affordance only)

## Acceptance

1. `/admin/products` matches screenshot structure and Figma copy
2. Products nav item active in sidebar
3. Visual QA logged in `progress-tracker.md`
