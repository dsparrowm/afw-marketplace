# Design Assets (Figma → Code)

All logos and UI icons must be **exported from the Figma file** and committed under `public/`.
Do not use Lucide, Font Awesome, or hand-drawn SVG substitutes for assets that exist in Figma.

**Do not crop from frame screenshots** — screenshots in `figma-cache/` are for visual QA only,
not for extracting icons or the logo.

**Source file:** [AFW-Marketplace](https://www.figma.com/design/TRHpdrWtpLm06UPtgHYDgB/AFW-Marketplace)  
**File key:** `TRHpdrWtpLm06UPtgHYDgB`  
**Machine-readable manifest:** `figma-cache/assets/manifest.json`

## Export workflow

1. List pending assets: `python3 figma-cache/fetch-assets.py pending`
2. For each asset, call Figma MCP `get_screenshot` with `fileKey` + `nodeId`
3. Download the returned URL into the repo:
   ```bash
   python3 figma-cache/fetch-assets.py apply logo "https://www.figma.com/api/mcp/asset/....png"
   ```
4. Use `FigmaImage` / paths from `lib/brand/assets.ts` in components
5. Mark visual QA pass only after exported assets render in Cursor browser

MCP asset URLs expire in ~7 days — always commit the downloaded PNG to `public/`.

## Brand logo

| Slug | Node ID | Path | Size | Usage |
| --- | --- | --- | --- | --- |
| `logo` | `16:3` | `public/brand/logo-header.png` | 210×124 | Header wordmark (green on light) |
| `logo-footer` | `18:75` | `public/brand/logo-footer.png` | 210×124 | Footer wordmark (white on dark) |

Duplicate logo instances in Figma reuse the same asset (`18:75`, `28:1159`, `28:1164`, `31:1277`, account dashboard nodes).

## Storefront header icons

| Slug | Node ID | Path | Size | Figma name |
| --- | --- | --- | --- | --- |
| `icon-search` | `2:211` | `public/icons/header/search.png` | 16×16 | Search magnifier |
| `icon-chevron-down` | `2:197` | `public/icons/header/chevron-down.png` | 10×10 | Categories / CAD chevron (`2:221`) |
| `icon-flag-canada` | `2:216` | `public/icons/header/flag-canada.png` | 20×10 | Flag_of_Canada_(Pantone).svg |
| `icon-location` | `2:224` | `public/icons/header/location.png` | 11×14 | Location pin |
| `icon-user` | `2:230` | `public/icons/header/user.png` | 16×18 | Account button |
| `icon-cart` | `2:233` | `public/icons/header/cart.png` | 18×16 | Cart button |

Reference: `figma-cache/storefront/homepage/sections/header.xml` (`2:185`).

## Footer social icons

| Slug | Node ID | Path | Size |
| --- | --- | --- | --- |
| `icon-social-facebook` | `18:80` | `public/icons/social/facebook.png` | 10×16 |
| `icon-social-instagram` | `18:83` | `public/icons/social/instagram.png` | 14×16 |
| `icon-social-twitter` | `18:86` | `public/icons/social/twitter.png` | 16×16 |

Reference: `figma-cache/storefront/footer/metadata.xml` (`18:70`).

## Auth icons

| Slug | Node ID | Path | Usage |
| --- | --- | --- | --- |
| `icon-auth-apple` | `31:1250` | `public/icons/auth/apple.png` | Continue with Apple |
| `icon-auth-google` | `31:1255` | `public/icons/auth/google.png` | Continue with Google |

Reference: `figma-cache/storefront/auth-login/metadata.xml`.

## Account icons

| Slug | Node ID | Path | Usage |
| --- | --- | --- | --- |
| `icon-logout` | `29:544` | `public/icons/account/logout.png` | Dashboard logout |

## Trust bar icons (homepage)

| Slug | Node ID | Path | Size | Figma name |
| --- | --- | --- | --- | --- |
| `icon-trust-leaf` | `6:2694` | `public/icons/trust/leaf.png` | 19×19 | leaf |
| `icon-trust-tractor` | `6:2702` | `public/icons/trust/tractor.png` | 19×19 | tractor |
| `icon-trust-truck` | `6:2710` | `public/icons/trust/truck.png` | 19×19 | truck |
| `icon-trust-shield-check` | `6:2718` | `public/icons/trust/shield-check.png` | 19×19 | shield-check |

Reference: `figma-cache/storefront/homepage/sections/main-content.xml` (`6:2690` trust-bar).

## Homepage photography

| Slug | Node ID | Path | Size | Usage |
| --- | --- | --- | --- | --- |
| `hero-background` | `2:9` | `public/brand/hero_bg_image.png` | 2880×1200 | Hero section background (`2:8`) |

Reference: `figma-cache/storefront/homepage/sections/hero.xml`.

## Homepage category tiles

| Slug | Node ID | Path | Size | Label |
| --- | --- | --- | --- | --- |
| `category-fresh-produce` | `2:55` | `public/images/categories/fresh-produce.png` | 157×157 | Fresh Produce |
| `category-frozen-proteins` | `2:60` | `public/images/categories/frozen-proteins.png` | 157×157 | Frozen Proteins |
| `category-grains-flour` | `2:65` | `public/images/categories/grains-flour.png` | 157×157 | Grains & Flour |
| `category-condiments-spices` | `2:70` | `public/images/categories/condiments-spices.png` | 157×157 | Condiments & Spices |
| `category-snacks-drinks` | `2:75` | `public/images/categories/snacks-drinks.png` | 157×157 | Snacks & Drinks |
| `category-beauty` | `2:80` | `public/images/categories/beauty.png` | 157×157 | Beauty |

Reference: `figma-cache/storefront/homepage/sections/shop-by-category.xml` (`2:41`).

## Carousel controls

| Slug | Node ID | Path | Size |
| --- | --- | --- | --- |
| `icon-carousel-prev` | `2:47` | `public/icons/carousel/chevron-left.png` | 10×16 |
| `icon-carousel-next` | `2:50` | `public/icons/carousel/chevron-right.png` | 10×16 |

## Implementation rules

1. Import paths from `lib/brand/assets.ts` — never hardcode `/public/...` in components
2. Render with `components/storefront/FigmaImage.tsx` (`next/image`, explicit width/height)
3. If an asset is `pending` in the manifest, export it before marking the feature unit complete
4. Product photography and category images are exported per-frame as separate assets (added when implementing homepage/catalog specs)
5. Update `figma-cache/assets/manifest.json` `status` to `exported` when files land in `public/`

All shell assets are **partially exported** (1/14 as of 2026-08-30). Logo is in `public/brand/logo.png`; remaining icons and hero background pending MCP `get_screenshot` (Starter plan allows very few calls per session).

Run `python3 figma-cache/fetch-assets.py next` and export **one asset at a time** until `status` shows 14/14, then `finalize`.

### Next session checklist

1. Read **`figma-cache/assets/EXPORT.md`** (step-by-step runbook)
2. Run `python3 figma-cache/fetch-assets.py pending`
3. For each asset: Figma MCP `get_screenshot` → `fetch-assets.py apply <slug> <url>`
4. Commit PNGs under `public/brand/` and `public/icons/`
5. Clear `exportBlocker` in `manifest.json` when all 13 are `exported`
6. Re-run spec 00 visual QA in Cursor browser before continuing to spec 01
