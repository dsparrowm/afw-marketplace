# 06 — Order Confirmation

## Goal

Implement the order confirmation page matching Figma frame `Order Confirmation` (`2:1734`).

## Figma Reference

- Frame: `order-confirmation` — node `2:1734`, 1440×1704
- Metadata: `figma-cache/storefront/order-confirmation/metadata.xml`
- Sections: announcement-bar (`18:440`), header (`18:442`), main (`2:1748`), footer (`2:1910`)

## Route

- `app/(storefront)/order/[id]/confirmation/page.tsx`

## Page Structure

Main section (`2:1748`) typically includes:

- Success icon / confirmation message
- Order number
- Order summary (items, totals)
- Shipping address recap
- Estimated delivery info
- CTAs: "Continue Shopping", "View Order" (links to account order detail)

## Components

```
components/storefront/
  OrderConfirmationPage.tsx
  OrderConfirmationSummary.tsx
```

## Implementation Steps

1. Read `order-confirmation/sections/main.xml`
2. Create dynamic route accepting order ID
3. Display confirmation UI with order data (mock or from checkout response)
4. Clear cart after successful order
5. Wire CTAs to `/shop` and `/account/orders/[id]`

## Acceptance Criteria

- [ ] Confirmation page renders after checkout
- [ ] Order number and summary displayed
- [ ] Cart is cleared after order placement
- [ ] CTAs navigate correctly
- [ ] Layout matches Figma
