# Architecture Context

## Stack

| Layer | Technology | Role |
| --- | --- | --- |
| Framework | Next.js 15 App Router + TypeScript | Routing, server components, layouts, route handlers |
| Styling | Tailwind CSS v4 | Utility-first styling and responsive layout |
| UI | shadcn/ui + Radix primitives | Interactive controls and design primitives |
| Motion | Framer Motion + GSAP | Simple hovers/reveals (Framer); complex loops/timelines (GSAP) |
| Data fetching | TanStack Query | Server state for catalog, cart, auth, and account APIs |
| Icons | Figma exports in `public/icons/` | Brand-matched UI icons from design file |
| UI chrome | Lucide React | Mobile menu toggle and other non-Figma controls |
| Utils | clsx, tailwind-merge, date-fns | Class composition and formatting |

Stack choices align with `rokswood-hive-web` conventions where practical.

## Repository Layout

```
afw-marketplace/
├── AGENTS.md
├── context/                    ← Spec-driven docs (source of truth for agents)
├── figma-cache/                ← Cached Figma frames (design reference, read-only)
├── app/                        ← Next.js routes, layouts, API route handlers
├── components/
│   ├── storefront/             ← Storefront-specific UI (header, footer, product cards)
│   ├── account/                ← Auth and account dashboard UI
│   ├── admin/                  ← Staff admin shell and screens
│   └── ui/                     ← shadcn primitives (generated — do not edit)
├── lib/
│   ├── api/                    ← Backend request wrappers
│   ├── hooks/                  ← TanStack Query hooks
│   ├── auth/                   ← Session and customer auth helpers
│   ├── cart/                   ← Cart state helpers
│   └── motion/                 ← GSAP setup + shared motion helpers
├── types/                      ← Shared TypeScript contracts
├── lib/brand/assets.ts         ← Figma icon/logo path map
└── public/
    ├── brand/                  ← Logo (`logo.png` from Figma `16:3`)
    └── icons/                  ← Header, social, auth icons from Figma
```

Folders under `app/`, `components/`, and `lib/` are created incrementally as feature
specs are implemented. Do not scaffold the full tree upfront.

## System Boundaries

- `app/` owns routing, page composition, and route handlers
- `components/storefront/` owns public shopping UI
- `components/account/` owns auth forms and account dashboard UI
- `components/admin/` owns staff admin shell and screens
- `lib/api/` owns backend request wrappers — no direct `fetch` in leaf components
- `lib/hooks/` owns TanStack Query hooks wrapping API wrappers
- `lib/auth/` owns customer session creation, retrieval, and cookie handling
  (`afw_cust_at` / `afw_cust_rt` / `afw_cust_profile`; `/auth/customer/*`)
- `lib/admin/staff-session.ts` owns interactive staff login cookies (HTTP-only);
  `lib/api/staff-auth.ts` owns env-based machine tokens for catalog SSR
- Admin UI reads/writes that need staff Bearer use `marketplaceFetch(..., { auth: "session" })`
- Customer `/public/*` calls that need the shopper Bearer use
  `marketplaceFetch(..., { auth: "customer" })`
- Token refresh may run during RSC; cookie writes only succeed in Server Actions —
  refresh still returns a usable access token for the current request when cookies cannot be updated.
  `getInteractiveStaffAccessToken` / `getInteractiveStaffIdentity` and
  `getInteractiveCustomerAccessToken` / `getInteractiveCustomerProfile` are React
  `cache()`-memoized per request to avoid parallel refresh-token rotation races.
- JWT access claims expose `sub` (user id) — staff self-revoke guard; customer profile
  display fields are stored in `afw_cust_profile` until a profile API exists
- `figma-cache/` is design reference only — not imported at runtime

## Backend Integration

Staging API docs: **`context/backend-api.md`** (Swagger at `http://104.251.212.74:3000/docs`).
Credentials for staff testing live in **`.env.local`** (see `.env.example`).
OpenAPI snapshot: `context/backend-openapi.json` (117 paths as of 2026-09-11).

The backend exposes **staff/admin** (`/admin/*`, `/auth/*`) and **customer/public**
(`/auth/customer/*`, `/public/*`) routes. Storefront catalog SSR uses public
`/public/products` and `/public/categories` (no staff Bearer).

Gaps to record in `context/progress-tracker.md`:

- No customer order-history list endpoint yet (`GET /public/orders` missing)
- Cart / addresses / wishlist live wiring still pending in the Next app

## Shared Shell Components

These appear on nearly every storefront page and should be built once, then composed:

| Component | Figma reference | Notes |
| --- | --- | --- |
| `AnnouncementBar` | `2:5` (homepage) | GSAP multi-message marquee ("FREE SHIPPING…") |
| `StorefrontHeader` | `2:185` | Logo, nav, CAD, account, cart; search in category bar |
| `StorefrontFooter` | `18:70` | Brand, link columns, social, newsletter |
| `MobileBottomNav` | `2:2165` | Home · Categories · Cart · Account (mobile `< lg`) |
| `MobileHeader` | `2:2148` | Compact header + hamburger drawer (mobile `< lg`) |

Header nav items from design: Shop, Categories, Deals, New Arrivals, Wholesale.

## Component Boundaries

- Shell components (`AnnouncementBar`, `StorefrontHeader`, `StorefrontFooter`) receive
  minimal props (cart count, auth state) — no data fetching inside
- Page routes own data loading (server components or container wrappers)
- Product cards, category tiles, and cart line items are presentational
- Auth forms own local validation and submission state
- Account dashboard pages share a layout shell (tabs: Orders, Addresses, Reorder, Profile)

## State Model

- **Cart state** — server-backed when API available; optimistic local updates for qty
- **Auth state** — HTTP-only session cookies via `lib/auth/`
- **Catalog data** — TanStack Query via `lib/hooks/`
- **Form state** — local to auth, checkout, and profile forms
- **UI state** — local (mobile nav open, filter drawers, carousel position)

## Route Domains

- `app/(storefront)/` — public shopping routes with shared shell layout
- `app/(auth)/` — login, signup, password reset request (`/forgot-password`), and confirm (`/reset-password`)
- `app/(account)/` — authenticated customer area with account layout
- `app/(admin)/` — staff admin area: `/admin/login` (guest) + `(protected)` shell for `/admin/*`
- `middleware.ts` — redirects unauthenticated `/admin/*` (except login) to `/admin/login`
- `app/api/` — route handlers proxying to marketplace backend

## Invariants

1. Shared shell components must be reused across storefront pages — no per-page header copies
2. Presentation components must not call backend APIs directly
3. Figma frame section order in `figma-cache/manifest.json` is the build order unless
   `progress-tracker.md` says otherwise
4. Desktop layouts target 1440px content width with 40px side padding (per Figma frames)
5. Mobile layouts target 375px width per mobile Figma frames
6. Currency displays as CAD unless locale switching is implemented
7. Business/wholesale signup fields appear only when account type toggle is "Business"
8. Do not import from `figma-cache/` in application code

## Deployment

Target platform: Render (or similar). Bind HTTP to `0.0.0.0:$PORT`. Filesystem is
ephemeral — persist uploads and sessions via backend/database, not local disk.
