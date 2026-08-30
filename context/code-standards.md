# Code Standards

## General

- Keep components small and single-purpose
- Prefer explicit naming over shorthand
- Fix root causes instead of route-specific workarounds
- Delete dead code rather than keeping commented alternatives
- Match conventions from `rokswood-hive-web` where this repo has no established pattern

## TypeScript

- Use explicit prop types for all reusable components
- Prefer `type` over `interface` unless declaration merging is needed
- Avoid `any` in new code
- Keep shared API and domain shapes in `types/`
- Prefer TanStack Query for server state; local state for UI only

## Next.js

- Default to Server Components unless state or browser APIs are required
- Add `"use client"` only for interactivity, forms, or client hooks
- Keep route handlers in `app/api/` and service wrappers in `lib/api/`
- Use React Query hooks in `lib/hooks/` instead of scattered `useEffect` fetches
- Use route groups `(storefront)`, `(auth)`, `(account)` for layout boundaries

## Styling

- Use Tailwind utilities and CSS variables from `app/globals.css`
- No hardcoded hex values in components — use design tokens from `ui-context.md`
- Prefer `next/image` over raw `<img>` for new work
- Mobile-first responsive classes

## Components

- Presentation components receive data via props — no fetching in leaf components
- Page routes or container wrappers own data loading
- Shared storefront shell lives in `components/storefront/`
- Account UI lives in `components/account/`
- Extract reusable pieces only when the pattern appears on 2+ pages

## Figma Implementation

- Reference node IDs from `figma-cache/manifest.json` in PR descriptions and progress tracker
- Large frames: implement section-by-section per manifest `sections` array
- When `design-context.tsx` is available in the cache, treat it as reference — adapt to
  project conventions, do not paste verbatim
- **Icons and logos:** use paths from `lib/brand/assets.ts`; export from Figma per
  `context/design-assets.md` and `figma-cache/assets/manifest.json`
- Run `python3 figma-cache/fetch-assets.py apply <slug> <url>` after each MCP export; commit PNGs to `public/`
- Do not substitute Lucide or emoji for Figma-defined brand icons (logo, header actions, social, auth)

## File Organization

```
app/
  (storefront)/           ← Public shopping routes
  (auth)/                 ← Login, signup
  (account)/              ← Customer dashboard
  api/                    ← Backend proxies

components/
  storefront/             ← Header, footer, product cards, cart UI
  account/                ← Auth forms, dashboard shell, order tables
  ui/                     ← shadcn primitives (do not edit)

lib/
  api/                    ← Marketplace API wrappers
  hooks/                  ← TanStack Query hooks
  auth/                   ← Customer session helpers
  mocks/                  ← Typed fixtures until backend is wired

types/
  product.ts              ← Product, category shapes
  cart.ts                 ← Cart, line item shapes
  order.ts                ← Order, checkout shapes
  customer.ts             ← Auth, profile, address shapes
```

## Naming Conventions

- Components: PascalCase files and exports (`ProductCard.tsx`)
- Routes: lowercase path segments (`app/(storefront)/shop/page.tsx`)
- Hooks: `use` prefix (`useProducts`, `useCart`)
- API wrappers: noun-based (`products.ts`, `cart.ts`)
- Figma section slugs in cache: kebab-case (match manifest)

## Auth and Sessions

- Customer session cookies are the source of truth for auth state
- Protect `/account/*` routes via middleware and server-side session checks
- Public routes: `/`, `/shop`, `/products`, `/cart`, `/login`, `/signup`
