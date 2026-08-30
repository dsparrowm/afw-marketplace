# 07 — Mobile Storefront

## Goal

Adapt the storefront for mobile viewports using dedicated Figma mobile frames.

## Figma References

| Frame | Node ID | Cache |
| --- | --- | --- |
| Mobile Homepage | `2:1928` | `figma-cache/storefront/mobile-homepage/` |
| Mobile Shop Catalog | `3:2189` | `figma-cache/storefront/mobile-shop-catalog/` |

Both frames are 375px wide.

## Sections (mobile homepage)

| Slug | Node ID |
| --- | --- |
| announcement-bar | `2:1929` |
| header | `2:2148` |
| main | `2:1931` |
| bottom-nav | `2:2165` |

## Components

```
components/storefront/
  MobileBottomNav.tsx
  MobileHeader.tsx              ← if significantly different from desktop header
```

Prefer responsive adaptation of existing desktop components where the design allows.
Create mobile-specific components only when Figma mobile frames diverge structurally.

## Mobile Bottom Nav (`2:2165`)

- Fixed at bottom of viewport
- Icon + label tabs (confirm items from Figma: likely Home, Shop, Cart, Account)
- Active state for current route

## Implementation Steps

1. Review mobile frame screenshots/metadata vs desktop components
2. Implement `MobileBottomNav`
3. Add responsive breakpoints to `StorefrontShell` — show bottom nav on mobile, hide desktop nav items
4. Adapt homepage and shop catalog layouts for 375px
5. Test all shopping flow pages at mobile width

## Acceptance Criteria

- [ ] Mobile homepage matches Figma `2:1928` at 375px
- [ ] Mobile shop catalog matches Figma `3:2189` at 375px
- [ ] Bottom nav highlights active route
- [ ] Shopping flow works end to end on mobile viewport
- [ ] No horizontal scroll on 375px width
