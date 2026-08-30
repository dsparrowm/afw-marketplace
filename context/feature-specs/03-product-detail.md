# 03 — Product Detail

## Goal

Implement the product detail page matching Figma frame `Product Detail` (`2:870`).

## Figma Reference

- Frame: `product-detail` — node `2:870`, 1440×2391
- Screenshot: `figma-cache/storefront/product-detail/screenshot.png`
- Sections: announcement-bar (`18:257`), header (`18:259`), main (`2:873`)

## Route

- `app/(storefront)/shop/[slug]/page.tsx` (confirm slug param with backend)

## Page Structure

Main section (`2:873`) typically includes:

- Product image gallery (primary image + thumbnails)
- Product name, price (CAD), availability
- Description / details
- Quantity selector
- Add to Cart button
- Related or recommended products (if in Figma main section)

## Components

```
components/storefront/
  ProductDetailPage.tsx
  ProductImageGallery.tsx
  ProductInfo.tsx
  AddToCartButton.tsx
  QuantitySelector.tsx
```

## Implementation Steps

1. Read `product-detail/sections/main.xml` for exact layout
2. Create dynamic route with mock product lookup by slug
3. Implement image gallery
4. Implement product info + quantity + add to cart
5. Add to cart action updates cart state (local mock until spec 04 API)
6. 404 state for unknown slug

## Data

```typescript
type ProductDetail = Product & {
  description: string
  images: string[]
  inStock: boolean
  unit?: string          // e.g. "per lb", "per bag"
}
```

## Acceptance Criteria

- [ ] `/shop/[slug]` renders product detail for valid slug
- [ ] Image gallery shows primary + thumbnail navigation
- [ ] Add to cart increments cart count in header
- [ ] Unknown slug shows not-found page
- [ ] Layout matches Figma screenshot
