# 20 — Admin Add / Edit Product Form

## Goal

Build the staff Add Product form matching Figma frame `add-edit-product-form` (`79:146`).
Reuse the same form for edit at `/admin/products/[id]/edit`.

## Figma References

| Area | Node ID | Cache path |
| --- | --- | --- |
| Frame | `79:146` | `figma-cache/admin/add-edit-product-form/` |
| Main | `79:178` | `…/sections/main.xml` |
| Screenshot | — | `figma-cache/admin/add-edit-product-form/screenshot.png` |

## Routes

- `/admin/products/new` — Add Product
- `/admin/products/[id]/edit` — Edit Product (same form, edit copy)

## Components

```
components/admin/products/
  ProductFormPage.tsx
  ProductForm.tsx

lib/mocks/admin-product-form.ts
```

## Sections (numbered)

1. Product Images (dropzone + thumbs)
2. Product Information
3. Pricing & Commercial Model (+ tiers)
4. Classification
5. Pack Size & Units
6. Inventory Management
7. Shipping Logistics
Footer: Cancel · Save as Draft · Save Product

## Acceptance

1. Form matches Figma defaults/copy; Visual QA logged
