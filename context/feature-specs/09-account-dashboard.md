# 09 — Account Dashboard

## Goal

Implement the signed-in customer account area matching Figma dashboard frames.

## Figma References

| Page | Slug | Node ID | Cache |
| --- | --- | --- | --- |
| Orders | dashboard-orders | `29:86` | `figma-cache/storefront/dashboard-orders/` |
| Order detail | order-detail | `29:192` | `figma-cache/storefront/order-detail/` |
| Addresses | dashboard-addresses | `29:279` | `figma-cache/storefront/dashboard-addresses/` |
| Reorder list | dashboard-reorder-list | `29:329` | `figma-cache/storefront/dashboard-reorder-list/` |
| Profile | dashboard-profile | `29:433` | `figma-cache/storefront/dashboard-profile/` |

## Routes

- `app/(account)/layout.tsx` — account shell with tab nav
- `app/(account)/orders/page.tsx`
- `app/(account)/orders/[id]/page.tsx`
- `app/(account)/addresses/page.tsx`
- `app/(account)/reorder/page.tsx`
- `app/(account)/profile/page.tsx`

## Shared Shell

All dashboard frames share a common structure:

- **Header:** Brand logo + "AFW Marketplace" text, user greeting, logout button
- **Tab nav:** Orders | Addresses | Reorder | Profile (confirm exact labels from Figma)
- **Content area:** page-specific content below tabs

```
components/account/
  AccountShell.tsx
  AccountHeader.tsx
  AccountTabNav.tsx
```

## Orders (`29:86`)

- Order history table (order #, date, status, total, actions)
- "View" link to order detail

## Order Detail (`29:192`)

- Order header (number, date, status)
- Line items
- Shipping address
- Order totals
- Reorder action

## Addresses (`29:279`)

- Saved addresses list
- Add / edit / delete address
- Set default address

## Reorder List (`29:329`)

- Previously ordered products for quick reorder
- Add to cart action per item

## Profile (`29:433`)

- Account info display and edit
- Account type (personal / business) display
- Password change (if in Figma)

## Auth Gate

- All `/account/*` routes require authenticated session
- Redirect to `/login?returnUrl=...` if unauthenticated

## Implementation Steps

1. Create account layout with header and tab nav
2. Implement orders list with mock order data
3. Implement order detail page
4. Implement addresses CRUD (mock for v1)
5. Implement reorder list
6. Implement profile page
7. Wire logout to session destruction

## Data

```typescript
type Order = {
  id: string
  orderNumber: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
  shippingAddress: Address
}

type Address = {
  id: string
  label?: string
  street: string
  city: string
  province: string
  postalCode: string
  country: string
  isDefault: boolean
}
```

## Acceptance Criteria

- [ ] Unauthenticated users redirected from `/account/*`
- [ ] Tab nav switches between account pages with active state
- [ ] Orders list shows mock orders with link to detail
- [ ] Order detail shows line items and totals
- [ ] Addresses page supports add/edit/delete (mock)
- [ ] Reorder list adds items to cart
- [ ] Profile displays user info
- [ ] Logout clears session and redirects to `/`
- [ ] Layout matches Figma dashboard frames
