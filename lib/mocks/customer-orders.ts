import type { CustomerOrder, SavedAddress } from "@/types/account";

const homeAddress: SavedAddress = {
  id: "addr-home",
  fullName: "Adaeze Okafor",
  street: "458 Spadina Ave, Apt 302",
  city: "Toronto",
  province: "ON",
  postalCode: "M5S 2G8",
  country: "Canada",
  isDefault: true,
};

/** Mock order history — Figma `dashboard-orders` `29:86` */
export const mockCustomerOrders: CustomerOrder[] = [
  {
    id: "AFW-20248",
    orderNumber: "#AFW-20248",
    date: "2024-10-24T14:30:00.000Z",
    status: "shipped",
    estimatedDelivery: "October 27, 2024",
    items: [
      {
        productId: "jollof-spice",
        slug: "honey-beans",
        name: "Premium Jollof Rice Spice Mix",
        subtitle: "100% Organic, Locally Sourced",
        quantity: 2,
        unitPrice: 7.49,
        imageUrl: "/images/products/honey-beans.png",
      },
      {
        productId: "red-palm-oil",
        slug: "red-palm-oil",
        name: "Organic Cold-Pressed Palm Oil",
        subtitle: "750ml, Sourced from Nigeria",
        quantity: 1,
        unitPrice: 24.5,
        imageUrl: "/images/products/red-palm-oil.png",
      },
      {
        productId: "stockfish",
        slug: "yellow-garri",
        name: "Dried Stockfish Fillets (Premium Quality)",
        subtitle: "250g Pack",
        quantity: 1,
        unitPrice: 42,
        imageUrl: "/images/products/yellow-garri.png",
      },
    ],
    subtotal: 124.8,
    shipping: 12.5,
    tax: 5.2,
    total: 142.5,
    shippingAddress: homeAddress,
  },
  {
    id: "AFW-20215",
    orderNumber: "#AFW-20215",
    date: "2024-10-12T10:15:00.000Z",
    status: "delivered",
    items: [
      {
        productId: "white-puna-yam",
        slug: "white-puna-yam",
        name: "White Puna Yam",
        subtitle: "Medium Tubers (2kg)",
        quantity: 2,
        unitPrice: 18.99,
        imageUrl: "/images/products/white-puna-yam.png",
      },
      {
        productId: "honey-beans",
        slug: "honey-beans",
        name: "Honey Beans (Oloyin)",
        subtitle: "2kg Bag",
        quantity: 1,
        unitPrice: 14.99,
        imageUrl: "/images/products/honey-beans.png",
      },
    ],
    subtotal: 72.97,
    shipping: 9.99,
    tax: 6.24,
    total: 89.2,
    shippingAddress: homeAddress,
  },
  {
    id: "AFW-20190",
    orderNumber: "#AFW-20190",
    date: "2024-09-28T16:45:00.000Z",
    status: "processing",
    items: [
      {
        productId: "red-palm-oil",
        slug: "red-palm-oil",
        name: "Organic Cold-Pressed Palm Oil",
        subtitle: "Box of 12 Bottles (750ml)",
        quantity: 3,
        unitPrice: 58,
        imageUrl: "/images/products/red-palm-oil.png",
      },
      {
        productId: "yellow-garri",
        slug: "yellow-garri",
        name: "Premium Yellow Garri",
        subtitle: "Carton of 10 Bags (1kg)",
        quantity: 2,
        unitPrice: 17.2,
        imageUrl: "/images/products/yellow-garri.png",
      },
    ],
    subtotal: 208.4,
    shipping: 0,
    tax: 2,
    total: 210.4,
    shippingAddress: homeAddress,
  },
  {
    id: "AFW-20155",
    orderNumber: "#AFW-20155",
    date: "2024-09-04T09:00:00.000Z",
    status: "cancelled",
    items: [
      {
        productId: "honey-beans",
        slug: "honey-beans",
        name: "Honey Beans (Oloyin)",
        subtitle: "1kg Bag",
        quantity: 1,
        unitPrice: 12.99,
        imageUrl: "/images/products/honey-beans.png",
      },
    ],
    subtotal: 12.99,
    shipping: 9.99,
    tax: 1.68,
    total: 65,
    shippingAddress: homeAddress,
  },
];

export function getCustomerOrderById(id: string): CustomerOrder | undefined {
  return mockCustomerOrders.find((order) => order.id === id);
}

export function formatOrderDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatOrderDateLong(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-CA", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
