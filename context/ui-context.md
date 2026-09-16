# UI Context

## Theme

AFW Marketplace uses a warm, organic grocery aesthetic — white surfaces, earthy greens,
rich food photography, and premium editorial hero imagery. The design reads as a
modern specialty food retailer, not a dense admin portal.

Desktop content width: **1440px** with **40px** horizontal padding on main sections.
Mobile breakpoint design: **375px** frames in Figma.

## Brand Copy (from Figma)

| Element | Copy |
| --- | --- |
| Hero headline | Authentic African Food. Naturally Sourced. |
| Hero badge | 100% Organic |
| Hero subtext | 100% organic products sourced directly from farms and producers across Nigeria and Africa, delivered fresh to your door in Canada. |
| CTA primary | Shop Now |
| CTA secondary | Shop Wholesale |
| Announcement bar | FREE SHIPPING ON ORDERS OVER $150 |
| Footer tagline | Bringing the authentic taste of Africa to your kitchen. We source 100% organic products directly from local farmers across the continent. |

Extract exact color values from Figma `get_design_context` or variable definitions
when design context is fetched. Until then, use CSS variables defined in
`app/globals.css` and update this file with confirmed hex values.

## Color Tokens (provisional)

These are inferred from the Figma design intent. Replace with exact values once
design context is cached.

| Role | CSS variable | Usage |
| --- | --- | --- |
| Primary | `--primary` / `bg-primary` | Orange — main CTAs (Shop Now, Subscribe) |
| Brand green | `--brand-green` / `bg-brand-green` | Announcement bar, cart button, green chrome |
| Brand green foreground | `--brand-green-foreground` | Text on green surfaces |
| Hero badge | `--hero-badge` / `bg-hero-badge` | Hero `100% ORGANIC` pill — `#3F8F5B` (Figma `2:13`) |
| Trust bar | `--trust-bar` / `bg-trust-bar` | Bar below hero — `#231F1E` (Figma `6:2690`) |
| Trust bar icon well | `--trust-bar-icon` / `bg-trust-bar-icon` | 44px circles — `#363130` |
| Trust bar muted | `--trust-bar-muted` / `text-trust-bar-muted` | Subtitle text on trust bar |
| Secondary | `--color-secondary` | Secondary buttons (Shop Wholesale outline) |
| Background | `--color-background` | Page background |
| Foreground | `--color-foreground` | Body text |
| Muted | `--color-muted` | Subtle backgrounds, announcement bar |
| Muted foreground | `--color-muted-foreground` | Secondary text, placeholders |
| Border | `--color-border` | Card borders, input borders |
| Destructive | `--color-destructive` | Errors, remove actions |
| Admin sidebar | `--admin-sidebar` | Staff sidebar background |
| Admin nav active | `--admin-nav-active` | Active sidebar item fill |
| Admin status pending | `--admin-status-pending` | Pending payment / low stock soft fill |
| Admin status packaging | `--admin-status-packaging` | Needs packaging soft fill |
| Admin status delayed | `--admin-status-delayed` | Delayed / out of stock soft fill |
| Admin status positive | `--admin-status-positive` | Positive metric delta text |
| Admin status active | `--admin-status-active` | Active product status chip |
| Admin banner | `--admin-banner` | Inventory shipment callout fill |

Do not hardcode hex in components. Define tokens in `app/globals.css` and reference
via Tailwind utilities (`bg-primary`, `text-muted-foreground`, etc.).

## Typography

- Primary font: Inter (or the font confirmed from Figma design context)
- Hero headline: two lines, large, bold — "Authentic African Food." / "Naturally Sourced." (~56px / 60px line height, 120px block)
- Section headings: `text-2xl` / 32px ("Shop by Category", "Trending Products")
- Body: regular weight, comfortable line height for product descriptions
- Nav links: medium weight, ~20px height in header
- Announcement bar: compact, centered, all-caps or semibold
- Hero badge: 26px pill `#3F8F5B`, white uppercase tracking (`100% ORGANIC`)

## Layout Patterns

### Desktop storefront

- **Announcement bar** — full-width, ~40px; GSAP looping multi-message marquee (pause on hover; static under reduced motion)
- **Header** — sticky; logo left, nav (Shop, Categories, Deals orange, separator, Wholesale text link); right actions: CAD chip, account icon, green pill cart. Desktop search lives in the **category secondary bar** (compact ~44px field, max ~400px) beside category quick links — not in the primary row. Location chip removed from chrome until backend-backed switching exists.
- **Hero** — full-width 600px; light left-to-right scrim; stack from Figma y-offsets
  (badge y=95, heading y=144, subtext y=318, CTAs y=428). Green uppercase badge, two-line
  headline, pill CTAs (orange Shop Now, frosted Shop Wholesale)
- **Trust bar** — `#231F1E` bar, 108px, four icon+text columns immediately below hero (`6:2690`)
- **Product sections** — section header row (title left, "View All Products" right),
  horizontal product card grid; trending row on `--trending-panel` background
- **Promo banners** — three rounded color tiles between featured and trending (`7:3458`–`7:3461`)
- **Testimonials** — full-width `--brand-green` band (`6:2981`); orange `Customer Stories` badge; three white cards with orange outline stars, peach avatar circles
- **Newsletter** — rounded green CTA block with email field + orange Subscribe (`6:3063`)
- **Category row** — circular/square category tiles with image + label, carousel arrows
- **Footer** — multi-column links (Shop, Company, Support), social icons, newsletter

### Mobile storefront

- Compact announcement bar (~31px)
- Simplified header with logo and icons
- Stacked sections with full-width cards
- Fixed bottom navigation bar (Home, Shop, Cart, Account — confirm icons from Figma)

### Account area

- Centered auth card (480px wide) on neutral background
- Login / Sign Up tabs
- Social auth buttons (Apple, Google) above email form
- Business signup: account type toggle, business fields, volume selector, info box
- Dashboard: brand header row, tab nav (Orders, Addresses, Reorder, Profile), content area

### Admin (staff)

- Desktop **1440×960** frames; fixed **260px** left sidebar + main content
- Sidebar: light muted surface, active nav pill (light green), Lucide icons until Figma exports
- Main: white background, 32px padding, card panels with soft border + light radius
- Metric cards in a 4-column row; tables left (~676px) + recent sales right (~420px)
- Status badges: soft pastel fills (pending / packaging / delayed / low / out)
- Brand green accents for active nav and positive deltas — not storefront orange CTAs

## Motion

| Library | Use |
| --- | --- |
| Framer Motion | Simple interactions: card/tile hover lift, tap scale, section fade-up (`MotionReveal`) |
| GSAP + `@gsap/react` | Complex continuous motion: announcement marquee loop (pause/resume, `matchMedia` reduced motion) |

Tokens:

- Interactive hover/tap: ~150–200ms, ease `[0.22, 1, 0.36, 1]`
- Section reveal: ~400–500ms fade + `y: 24`
- Marquee: linear, ~55px/s; pause on hover/focus
- `prefers-reduced-motion`: disable transforms and marquee; keep color hovers

Helpers: `components/storefront/motion/MotionReveal.tsx`, `lib/motion/gsap-setup.ts`.

## Components

### Product card (recurring pattern)

- 240×~510 card with border, shadow, 21px padding
- Product image (square, object-contain on muted well)
- Top badges: Organic (light green `--section-badge` + leaf icon), Best Seller (amber `--product-badge-best-seller`), New Arrival (blue `--product-badge-new`)
- Wishlist heart (top-right, circular outline) — Lucide until Figma asset available
- Size • origin meta row (uppercase), product name, stock dot + label (green in-stock / amber low-stock)
- Price panel on `--muted` overlay: Retail Price + CAD; bulk tier + `/unit` in brand orange (`--primary`)
- Add to Cart: full-width green (`--brand-green`) with plus icon

### Buttons

| Variant | Usage |
| --- | --- |
| Primary (filled) | Shop Now, Add to Cart, Login, Submit |
| Secondary (frosted pill) | Shop Wholesale on hero; outline elsewhere (Continue Shopping) |
| Ghost | Carousel arrows, icon buttons |
| Destructive | Remove from cart |

Hero CTAs are fully rounded pills (`rounded-full`). Other storefront buttons stay `rounded-xl`.

### Form fields

- Bordered inputs with rounded corners
- Labels above fields
- Placeholder text from Figma (e.g. "Search products, categories, or brands...")
- Inline validation errors below fields
- Auth: email, password; signup adds name, business fields, consent checkbox

## Icons and Media

All logos and brand-matched UI icons are **exported from Figma** and committed under `public/`.
See `context/design-assets.md` and `lib/brand/assets.ts` for the canonical path map.

| Asset | Figma node | Path | Size |
| --- | --- | --- | --- |
| AFW logo | `16:3` | `public/brand/logo.png` | 105×62 |
| Header icons | `2:211`–`2:233` | `public/icons/header/*.png` | per manifest |
| Footer social | `18:80`–`18:86` | `public/icons/social/*.png` | per manifest |
| Auth social | `31:1250`, `31:1255` | `public/icons/auth/*.png` | per manifest |

- Render with `components/storefront/FigmaImage.tsx` (`next/image`, explicit dimensions)
- Import paths from `lib/brand/assets.ts` — do not hardcode `/public/...` in components
- Lucide is allowed only for generic UI chrome not present in Figma (e.g. mobile menu open/close)
- Product and hero photography: `next/image` with appropriate `sizes` (exported per spec)
- Export workflow: `python3 figma-cache/fetch-assets.py pending` → Figma MCP `get_screenshot` → `apply`

## Radius and Surfaces

- Cards: `rounded-lg` with subtle border and light shadow
- Category tiles: rounded square images with label below
- Auth card: rounded container with padding
- Inputs: `rounded-md`
- Hero badge: solid `#3F8F5B` pill (`--hero-badge`), uppercase
- Hero CTAs: `rounded-full` pills — primary orange; secondary frosted white/20 + blur

## Responsive Strategy

1. Build desktop frames first (1440px) per `figma-cache/manifest.json` build order
2. Adapt shared shell components for mobile using mobile Figma frames as reference
3. Use Tailwind responsive prefixes (`md:`, `lg:`) — do not maintain separate
   component trees unless the mobile design diverges significantly (bottom nav)
