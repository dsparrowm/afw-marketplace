# 00 — Storefront Shell

## Goal

Build the shared layout components reused across all public storefront pages:
announcement bar, header, and footer.

## Figma References

| Component | Node ID | Cache path |
| --- | --- | --- |
| Announcement bar | `2:5` | `figma-cache/storefront/homepage/sections/announcement-bar.xml` |
| Header | `2:185` | `figma-cache/storefront/homepage/sections/header.xml` |
| Footer | `18:70` | `figma-cache/storefront/footer/metadata.xml` |

Screenshot: `figma-cache/storefront/homepage/screenshot.png` (top of page).

**Logo and icons:** export from Figma nodes per `context/design-assets.md` and
`figma-cache/assets/EXPORT.md` — do not crop from screenshots. If export is blocked by MCP
rate limits, defer visual QA sign-off until `public/brand/logo.png` and `public/icons/**` exist.

## Components to Create

```
components/storefront/
  AnnouncementBar.tsx
  StorefrontHeader.tsx
  StorefrontFooter.tsx
  StorefrontShell.tsx        ← composes the three above + children slot
```

## AnnouncementBar

- Full-width bar, ~40px height
- Centered text: "FREE SHIPPING ON ORDERS OVER $150"
- Background: muted/brand color (token — confirm from Figma)

## StorefrontHeader

- Sticky at top (below announcement bar)
- **Left:** AFW logo (link to `/`) — Figma node `16:3` → `public/brand/logo.png`
- **Nav:** Shop, Categories (dropdown chevron), Deals, New Arrivals, Wholesale
- **Center-right:** Search input with placeholder "Search products, categories, or brands..."
- **Right:** Currency selector (CAD + flag), location (Toronto, ON), account icon, cart button
  with item count badge
- Cart button label shows "Cart" + count

Props: `cartItemCount?: number`, `isAuthenticated?: boolean`

## StorefrontFooter

- Logo + brand description paragraph
- Social links: Facebook `18:80`, Instagram `18:83`, Twitter `18:86` → `public/icons/social/`
- Link columns: Shop, Company, Support (link labels from `footer/metadata.xml`)
- Newsletter signup (if present in footer frame)
- Copyright line
- Payment method icons (if present)

## Layout

```
app/(storefront)/layout.tsx
  └── StorefrontShell
        ├── AnnouncementBar
        ├── StorefrontHeader
        ├── {children}
        └── StorefrontFooter
```

## Implementation Steps

1. Create `StorefrontShell` layout with placeholder children
2. Implement `AnnouncementBar` (static copy)
3. Implement `StorefrontHeader` with nav links (href placeholders), search (non-functional),
   and cart badge (prop-driven, default 0)
4. Implement `StorefrontFooter` with link columns from Figma metadata
5. Wire `(storefront)` route group layout

## Data

- Static copy from Figma metadata for v1
- Cart count: prop from parent (wire to cart state in spec 04)
- Search: UI only until catalog search API is confirmed

## Acceptance Criteria

- [ ] Shell renders on a placeholder `/` page with correct visual structure
- [ ] Header nav links are present and styled per Figma
- [ ] Footer link columns match Figma labels
- [ ] Components are reused — no duplicate header/footer markup in page files
- [ ] No hardcoded hex — uses CSS variables from `globals.css`
- [ ] Responsive: header collapses gracefully on smaller screens (hamburger TBD in spec 07)

## Visual QA

After implementation, open **Cursor browser** at the route and compare against the Figma
screenshot (`figma-cache/storefront/<slug>/screenshot.png`). For API work, verify the
integration end to end. Log results in `context/progress-tracker.md` per `AGENTS.md`.
