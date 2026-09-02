"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const CART_STORAGE_KEY = "afw-marketplace-cart";

export type CartLine = {
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

type CartContextValue = {
  items: CartLine[];
  itemCount: number;
  total: number;
  isHydrated: boolean;
  addItem: (item: Omit<CartLine, "quantity"> & { quantity?: number }) => void;
  updateQuantity: (
    productId: string,
    sizeLabel: string | undefined,
    quantity: number,
  ) => void;
  removeItem: (productId: string, sizeLabel: string | undefined) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function lineKey(productId: string, sizeLabel?: string) {
  return `${productId}::${sizeLabel ?? ""}`;
}

function matchesLine(
  line: CartLine,
  productId: string,
  sizeLabel: string | undefined,
) {
  return line.productId === productId && line.sizeLabel === sizeLabel;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartLine[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // Ignore invalid persisted cart data
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items, isHydrated]);

  const addItem = useCallback(
    (item: Omit<CartLine, "quantity"> & { quantity?: number }) => {
      const quantity = item.quantity ?? 1;
      setItems((current) => {
        const existing = current.find((line) =>
          matchesLine(line, item.productId, item.sizeLabel),
        );

        if (existing) {
          return current.map((line) =>
            matchesLine(line, item.productId, item.sizeLabel)
              ? { ...line, quantity: line.quantity + quantity }
              : line,
          );
        }

        return [...current, { ...item, quantity }];
      });
    },
    [],
  );

  const updateQuantity = useCallback(
    (productId: string, sizeLabel: string | undefined, quantity: number) => {
      setItems((current) => {
        if (quantity <= 0) {
          return current.filter((line) => !matchesLine(line, productId, sizeLabel));
        }

        return current.map((line) =>
          matchesLine(line, productId, sizeLabel) ? { ...line, quantity } : line,
        );
      });
    },
    [],
  );

  const removeItem = useCallback(
    (productId: string, sizeLabel: string | undefined) => {
      setItems((current) =>
        current.filter((line) => !matchesLine(line, productId, sizeLabel)),
      );
    },
    [],
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo(() => {
    const itemCount = items.reduce((sum, line) => sum + line.quantity, 0);
    const total = items.reduce(
      (sum, line) => sum + line.unitPrice * line.quantity,
      0,
    );

    return {
      items,
      itemCount,
      total,
      isHydrated,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    };
  }, [items, isHydrated, addItem, updateQuantity, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

export function getCartLineKey(line: CartLine): string {
  return lineKey(line.productId, line.sizeLabel);
}
