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
import { useAuth } from "@/lib/auth/auth-context";
import {
  addCustomerCartItemAction,
  applyCustomerCartPromoAction,
  getCustomerCartAction,
  removeCustomerCartItemAction,
  removeCustomerCartPromoAction,
  updateCustomerCartItemAction,
} from "@/lib/cart/cart-actions";
import type { CartLine } from "@/lib/cart/types";

export type { CartLine } from "@/lib/cart/types";

const CART_STORAGE_KEY = "afw-marketplace-cart";

type CartContextValue = {
  items: CartLine[];
  itemCount: number;
  total: number;
  discountTotal: number;
  promoCode: string | null;
  promoApplied: boolean;
  isHydrated: boolean;
  isLive: boolean;
  isSyncing: boolean;
  cartError: string | null;
  addItem: (
    item: Omit<CartLine, "quantity"> & { quantity?: number },
  ) => Promise<void>;
  updateQuantity: (
    productId: string,
    sizeLabel: string | undefined,
    quantity: number,
  ) => Promise<void>;
  removeItem: (
    productId: string,
    sizeLabel: string | undefined,
  ) => Promise<void>;
  clearCart: () => void;
  applyPromo: (code: string) => Promise<{ ok: true } | { ok: false; error: string }>;
  removePromo: () => Promise<void>;
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

function findLine(
  items: CartLine[],
  productId: string,
  sizeLabel: string | undefined,
) {
  return items.find((line) => matchesLine(line, productId, sizeLabel));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, isHydrated: authHydrated } = useAuth();
  const [items, setItems] = useState<CartLine[]>([]);
  const [discountTotal, setDiscountTotal] = useState(0);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoApplied, setPromoApplied] = useState(false);
  const [serverTotal, setServerTotal] = useState<number | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [cartError, setCartError] = useState<string | null>(null);
  const isLive = authHydrated && isAuthenticated;

  const applyMappedCart = useCallback(
    (cart: {
      items: CartLine[];
      discountTotal: number;
      total: number;
      promoCode: string | null;
      promoApplied: boolean;
    }) => {
      setItems(cart.items);
      setDiscountTotal(cart.discountTotal);
      setPromoCode(cart.promoCode);
      setPromoApplied(cart.promoApplied);
      setServerTotal(cart.total);
    },
    [],
  );

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      if (!authHydrated) return;

      if (isAuthenticated) {
        setIsSyncing(true);
        const result = await getCustomerCartAction();
        if (cancelled) return;
        if (result.ok) {
          applyMappedCart(result.cart);
          setCartError(null);
        } else {
          setCartError(result.error);
          setItems([]);
          setDiscountTotal(0);
          setPromoCode(null);
          setPromoApplied(false);
          setServerTotal(0);
        }
        setIsSyncing(false);
        setIsHydrated(true);
        return;
      }

      try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as CartLine[];
          if (Array.isArray(parsed)) setItems(parsed);
        }
      } catch {
        // Ignore invalid persisted cart data
      }
      setDiscountTotal(0);
      setPromoCode(null);
      setPromoApplied(false);
      setServerTotal(null);
      setCartError(null);
      setIsHydrated(true);
    }

    void hydrate();
    return () => {
      cancelled = true;
    };
  }, [authHydrated, isAuthenticated, applyMappedCart]);

  useEffect(() => {
    if (!isHydrated || isLive) return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items, isHydrated, isLive]);

  const addItem = useCallback(
    async (item: Omit<CartLine, "quantity"> & { quantity?: number }) => {
      const quantity = item.quantity ?? 1;
      setCartError(null);

      if (isLive) {
        setIsSyncing(true);
        const result = await addCustomerCartItemAction({
          variantId: item.variantId,
          slug: item.slug,
          quantity,
        });
        setIsSyncing(false);
        if (!result.ok) {
          setCartError(result.error);
          return;
        }
        applyMappedCart(result.cart);
        return;
      }

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
    [isLive, applyMappedCart],
  );

  const updateQuantity = useCallback(
    async (
      productId: string,
      sizeLabel: string | undefined,
      quantity: number,
    ) => {
      setCartError(null);

      if (isLive) {
        const line = findLine(items, productId, sizeLabel);
        if (!line?.lineId) {
          setCartError("Unable to update that cart item.");
          return;
        }
        setIsSyncing(true);
        const result = await updateCustomerCartItemAction({
          lineId: line.lineId,
          quantity,
        });
        setIsSyncing(false);
        if (!result.ok) {
          setCartError(result.error);
          return;
        }
        applyMappedCart(result.cart);
        return;
      }

      setItems((current) => {
        if (quantity <= 0) {
          return current.filter((line) => !matchesLine(line, productId, sizeLabel));
        }

        return current.map((line) =>
          matchesLine(line, productId, sizeLabel) ? { ...line, quantity } : line,
        );
      });
    },
    [isLive, items, applyMappedCart],
  );

  const removeItem = useCallback(
    async (productId: string, sizeLabel: string | undefined) => {
      setCartError(null);

      if (isLive) {
        const line = findLine(items, productId, sizeLabel);
        if (!line?.lineId) {
          setCartError("Unable to remove that cart item.");
          return;
        }
        setIsSyncing(true);
        const result = await removeCustomerCartItemAction({
          lineId: line.lineId,
        });
        setIsSyncing(false);
        if (!result.ok) {
          setCartError(result.error);
          return;
        }
        applyMappedCart(result.cart);
        return;
      }

      setItems((current) =>
        current.filter((line) => !matchesLine(line, productId, sizeLabel)),
      );
    },
    [isLive, items, applyMappedCart],
  );

  const clearCart = useCallback(() => {
    setItems([]);
    setDiscountTotal(0);
    setPromoCode(null);
    setPromoApplied(false);
    setServerTotal(isLive ? 0 : null);
  }, [isLive]);

  const applyPromo = useCallback(
    async (code: string) => {
      if (!isLive) {
        return {
          ok: false as const,
          error: "Sign in to apply a promo code.",
        };
      }
      setIsSyncing(true);
      const result = await applyCustomerCartPromoAction({ code });
      setIsSyncing(false);
      if (!result.ok) {
        setCartError(result.error);
        return result;
      }
      applyMappedCart(result.cart);
      setCartError(null);
      return { ok: true as const };
    },
    [isLive, applyMappedCart],
  );

  const removePromo = useCallback(async () => {
    if (!isLive) return;
    setIsSyncing(true);
    const result = await removeCustomerCartPromoAction();
    setIsSyncing(false);
    if (!result.ok) {
      setCartError(result.error);
      return;
    }
    applyMappedCart(result.cart);
    setCartError(null);
  }, [isLive, applyMappedCart]);

  const value = useMemo(() => {
    const itemCount = items.reduce((sum, line) => sum + line.quantity, 0);
    const localTotal = items.reduce(
      (sum, line) => sum + line.unitPrice * line.quantity,
      0,
    );
    const total =
      isLive && serverTotal != null
        ? serverTotal
        : Math.max(0, localTotal - discountTotal);

    return {
      items,
      itemCount,
      total,
      discountTotal,
      promoCode,
      promoApplied,
      isHydrated,
      isLive,
      isSyncing,
      cartError,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      applyPromo,
      removePromo,
    };
  }, [
    items,
    discountTotal,
    promoCode,
    promoApplied,
    isHydrated,
    isLive,
    isSyncing,
    cartError,
    serverTotal,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    applyPromo,
    removePromo,
  ]);

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
