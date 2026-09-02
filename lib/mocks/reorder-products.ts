import type { ReorderProduct } from "@/types/account";

/** Frequently ordered wholesale products — Figma `dashboard-reorder-list` `29:329` */
export const mockReorderProducts: ReorderProduct[] = [
  {
    productId: "jollof-spice",
    slug: "honey-beans",
    name: "Premium Jollof Rice Spice Mix",
    sizeLabel: "Carton of 24 Packs",
    lastOrdered: "2024-10-24T14:30:00.000Z",
    unitPrice: 144,
    imageUrl: "/images/products/honey-beans.png",
  },
  {
    productId: "red-palm-oil",
    slug: "red-palm-oil",
    name: "Organic Cold-Pressed Palm Oil",
    sizeLabel: "Box of 12 Bottles (750ml)",
    lastOrdered: "2024-10-12T10:15:00.000Z",
    unitPrice: 240,
    imageUrl: "/images/products/red-palm-oil.png",
  },
  {
    productId: "stockfish",
    slug: "yellow-garri",
    name: "Premium Dried Stockfish Fillets",
    sizeLabel: "Bulk Wholesale Box (5kg)",
    lastOrdered: "2024-09-28T16:45:00.000Z",
    unitPrice: 380,
    imageUrl: "/images/products/yellow-garri.png",
  },
  {
    productId: "yam-flour",
    slug: "white-puna-yam",
    name: "Organic Yam Flour (Elubo)",
    sizeLabel: "Carton of 10 Bags (1kg)",
    lastOrdered: "2024-09-04T09:00:00.000Z",
    unitPrice: 95,
    imageUrl: "/images/products/white-puna-yam.png",
  },
];
