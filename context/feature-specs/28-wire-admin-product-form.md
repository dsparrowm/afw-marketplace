# 28 — Wire Admin Product Form Mutations

## Goal

Save Add/Edit Product form to staging via interactive staff session:
`POST/PATCH /admin/products`, variant create/update, stock adjust, price tiers.

## Modules

```
lib/admin/product-form-mappers.ts
lib/admin/load-admin-product-form.ts
lib/admin/save-admin-product.ts
lib/admin/product-form-actions.ts
components/admin/products/ProductForm.tsx
app/(admin)/admin/(protected)/products/new/page.tsx
app/(admin)/admin/(protected)/products/[id]/edit/page.tsx
```

## Behavior

- **Add:** create product → variant → wholesale tiers; optional draft (`status: hidden`)
- **Edit:** patch product + variant; stock delta via `PATCH .../stock`
- Categories from live `GET /admin/categories/tree`
- Edit prefill from `GET /admin/products/{id}`
- Redirect to `/admin/products/[id]` on success
- Warehouse / dimensions / shipping remain UI-only (no API fields)

## Acceptance

1. Create a product from `/admin/products/new` and see it on list/detail
2. Edit name/price/stock on `/admin/products/[id]/edit` persists
3. Visual QA + TypeScript clean
