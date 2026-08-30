# 04 — Cart Page

## Goal

Implement the cart page matching Figma frame `Cart Page` (`2:1184`).

## Figma Reference

- Frame: `cart-page` — node `2:1184`, 1440×1895
- Metadata: `figma-cache/storefront/cart-page/metadata.xml`
- Sections: announcement-bar (`18:318`), header (`18:320`), main (`2:1187`), footer (`18:133`)

## Route

- `app/(storefront)/cart/page.tsx`

## Page Structure

Main section (`2:1187`) typically includes:

- Cart line items table/list (image, name, price, quantity controls, remove)
- Order summary sidebar (subtotal, shipping estimate, total)
- "Continue Shopping" link
- "Proceed to Checkout" CTA

## Components

```
components/storefront/
  CartPage.tsx
  CartLineItem.tsx
  CartSummary.tsx
  EmptyCart.tsx
```

## State

- v1: React context or Zustand store in `lib/cart/` with localStorage persistence
- v2: server cart via `lib/api/cart.ts` when backend supports session cart

```typescript
type CartItem = {
  productId: string
  slug: string
  name: string
  price: number
  quantity: number
  imageUrl: string
}
```

## Implementation Steps

1. Read `cart-page/sections/main.xml` for layout
2. Create cart state provider
3. Implement `CartLineItem` with qty +/- and remove
4. Implement `CartSummary` with calculated totals
5. Implement `EmptyCart` state
6. Wire header cart badge to cart item count
7. "Proceed to Checkout" navigates to `/checkout`

## Acceptance Criteria

- [ ] `/cart` shows line items added from product detail
- [ ] Quantity changes update totals
- [ ] Remove item works
- [ ] Empty cart shows appropriate message + shop link
- [ ] Header cart badge reflects total item count
- [ ] Checkout CTA navigates to `/checkout`
