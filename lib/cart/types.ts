export type CartLine = {
  /** Server cart line id when synced with `/public/cart` */
  lineId?: string;
  /** Product variant id for live cart mutations */
  variantId?: string;
  productId: string;
  slug: string;
  name: string;
  unitPrice: number;
  quantity: number;
  sizeLabel?: string;
  imageUrl?: string;
  origin?: string;
  bulkPrice?: number;
  bulkMinQuantity?: number;
};
