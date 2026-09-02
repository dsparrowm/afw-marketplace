export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type CustomerOrderItem = {
  productId: string;
  slug: string;
  name: string;
  subtitle?: string;
  quantity: number;
  unitPrice: number;
  imageUrl?: string;
};

export type SavedAddress = {
  id: string;
  fullName: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

export type CustomerOrder = {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  items: CustomerOrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: SavedAddress;
  estimatedDelivery?: string;
};

export type ReorderProduct = {
  productId: string;
  slug: string;
  name: string;
  sizeLabel: string;
  lastOrdered: string;
  unitPrice: number;
  imageUrl?: string;
};
