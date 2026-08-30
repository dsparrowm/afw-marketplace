/**
 * Figma-exported asset paths. See context/design-assets.md and
 * figma-cache/assets/manifest.json for node IDs and export workflow.
 */
export const brandAssets = {
  /** Green wordmark for light header — Figma `image 2` / node `16:3` */
  logo: "/brand/logo-header.png",
  /** White wordmark for dark footer — Figma `image 2` / node `18:75` */
  logoFooter: "/brand/logo-footer.png",
} as const;

export const homepageAssets = {
  /** Hero editorial photography — Figma node `2:9` */
  heroBackground: "/brand/hero_bg_image.png",
} as const;

export const trustIcons = {
  leaf: "/icons/trust/leaf.png",
  tractor: "/icons/trust/tractor.png",
  truck: "/icons/trust/truck.png",
  shieldCheck: "/icons/trust/shield-check.png",
} as const;

export const categoryImages = {
  freshProduce: "/images/categories/fresh-produce.png",
  frozenProteins: "/images/categories/frozen-proteins.png",
  grainsFlour: "/images/categories/grains-flour.png",
  condimentsSpices: "/images/categories/condiments-spices.png",
  snacksDrinks: "/images/categories/snacks-drinks.png",
  beauty: "/images/categories/beauty.png",
} as const;

export const productImages = {
  honeyBeans: "/images/products/honey-beans.png",
  yellowGarri: "/images/products/yellow-garri.png",
  whitePunaYam: "/images/products/white-puna-yam.png",
  redPalmOil: "/images/products/red-palm-oil.png",
} as const;

export const carouselIcons = {
  prev: "/icons/carousel/chevron-left.png",
  next: "/icons/carousel/chevron-right.png",
} as const;

export const headerIcons = {
  search: "/icons/header/search.png",
  chevronDown: "/icons/header/chevron-down.png",
  flagCanada: "/icons/header/flag-canada.png",
  location: "/icons/header/location.png",
  user: "/icons/header/user.png",
  cart: "/icons/header/cart.png",
} as const;

export const socialIcons = {
  facebook: "/icons/social/facebook.png",
  instagram: "/icons/social/instagram.png",
  twitter: "/icons/social/twitter.png",
} as const;

export const authIcons = {
  apple: "/icons/auth/apple.png",
  google: "/icons/auth/google.png",
} as const;

export const accountIcons = {
  logout: "/icons/account/logout.png",
} as const;

export type FigmaAssetPath =
  | (typeof brandAssets)[keyof typeof brandAssets]
  | (typeof homepageAssets)[keyof typeof homepageAssets]
  | (typeof trustIcons)[keyof typeof trustIcons]
  | (typeof categoryImages)[keyof typeof categoryImages]
  | (typeof productImages)[keyof typeof productImages]
  | (typeof carouselIcons)[keyof typeof carouselIcons]
  | (typeof headerIcons)[keyof typeof headerIcons]
  | (typeof socialIcons)[keyof typeof socialIcons]
  | (typeof authIcons)[keyof typeof authIcons]
  | (typeof accountIcons)[keyof typeof accountIcons];
