/** Promotional banner tiles — Figma `7:3458`–`7:3461`, between featured and trending */
export const promoBanners = [
  {
    id: "promo-1",
    nodeId: "7:3458",
    tone: "amber" as const,
    href: "/shop?category=grains-flour",
  },
  {
    id: "promo-2",
    nodeId: "7:3459",
    tone: "green" as const,
    href: "/shop?category=fresh-produce",
  },
  {
    id: "promo-3",
    nodeId: "7:3461",
    tone: "orange" as const,
    href: "/shop/deals",
  },
] as const;
