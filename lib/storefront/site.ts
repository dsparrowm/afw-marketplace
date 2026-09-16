export const siteConfig = {
  name: "African Food Warehouse",
  shortName: "AFW",
  announcements: [
    "FREE SHIPPING ON ORDERS OVER $150",
    "100% ORGANIC PRODUCTS SOURCED FROM AFRICAN FARMS",
    "NEW ARRIVALS WEEKLY — SHOP FRESH STOCK",
  ],
  description:
    "Bringing the authentic taste of Africa to your kitchen. We source 100% organic products directly from local farmers across the continent.",
  copyright: "© 2024 African Food Warehouse. All rights reserved.",
  currency: "CAD",
} as const;

export type NavLink = {
  label: string;
  href: string;
  hasDropdown?: boolean;
  /** Orange accent text — Deals in Figma `2:200` */
  accent?: boolean;
  /** Vertical rule before link — Wholesale in Figma `2:203` */
  separated?: boolean;
};

export const mainNavLinks: NavLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/shop", hasDropdown: true },
  { label: "Deals", href: "/shop?filter=deals", accent: true },
  { label: "New Arrivals", href: "/shop?filter=new" },
  { label: "Wholesale", href: "/signup", separated: true },
];

export const categoryQuickLinks = [
  { label: "Shop All", href: "/shop" },
  { label: "Grains & Flours", href: "/shop?category=grains-flours" },
  { label: "Spices & Seasonings", href: "/shop?category=spices-seasonings" },
  { label: "Oils & Sauces", href: "/shop?category=oils-sauces" },
  { label: "Snacks", href: "/shop?category=snacks" },
  { label: "Beverages", href: "/shop?category=beverages" },
  { label: "Fresh Produce", href: "/shop?category=fresh-produce" },
] as const;

export type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

export const footerColumns: FooterColumn[] = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Fresh Produce", href: "/shop?category=fresh-produce" },
      { label: "Bulk Wholesale", href: "/signup" },
      { label: "New Arrivals", href: "/shop?filter=new" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Our Farmers", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Shipping Policy", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "FAQs", href: "/faq" },
      { label: "Store Locator", href: "#" },
    ],
  },
];

export const footerLegalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
] as const;
