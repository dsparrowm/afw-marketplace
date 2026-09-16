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
  addCustomerWishlistItemAction,
  getCustomerWishlistAction,
  removeCustomerWishlistItemAction,
  type MappedWishlistItem,
} from "@/lib/wishlist/wishlist-actions";

type WishlistContextValue = {
  items: MappedWishlistItem[];
  isHydrated: boolean;
  isSyncing: boolean;
  isSaved: (input: { variantId?: string; slug?: string }) => boolean;
  toggle: (input: {
    variantId?: string;
    slug?: string;
  }) => Promise<{ ok: true } | { ok: false; error: string }>;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, isHydrated: authHydrated } = useAuth();
  const [items, setItems] = useState<MappedWishlistItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      if (!authHydrated) return;

      if (!isAuthenticated) {
        if (!cancelled) {
          setItems([]);
          setIsHydrated(true);
        }
        return;
      }

      setIsSyncing(true);
      const result = await getCustomerWishlistAction();
      if (cancelled) return;
      if (result.ok) {
        setItems(result.items);
      } else {
        setItems([]);
      }
      setIsSyncing(false);
      setIsHydrated(true);
    }

    void hydrate();
    return () => {
      cancelled = true;
    };
  }, [authHydrated, isAuthenticated]);

  const isSaved = useCallback(
    (input: { variantId?: string; slug?: string }) => {
      const variantId = input.variantId?.trim();
      if (variantId) {
        return items.some((item) => item.variantId === variantId);
      }
      const slug = input.slug?.trim();
      if (!slug) return false;
      return items.some((item) => item.productSlug === slug);
    },
    [items],
  );

  const toggle = useCallback(
    async (input: { variantId?: string; slug?: string }) => {
      if (!isAuthenticated) {
        return { ok: false as const, error: "Please sign in to use your wishlist." };
      }

      const variantId = input.variantId?.trim();
      const slug = input.slug?.trim();
      const existing = variantId
        ? items.find((item) => item.variantId === variantId)
        : slug
          ? items.find((item) => item.productSlug === slug)
          : undefined;

      setIsSyncing(true);
      const result = existing
        ? await removeCustomerWishlistItemAction(existing.itemId)
        : await addCustomerWishlistItemAction({ variantId, slug });
      setIsSyncing(false);

      if (!result.ok) {
        return result;
      }

      setItems(result.items);
      return { ok: true as const };
    },
    [isAuthenticated, items],
  );

  const value = useMemo(
    () => ({
      items,
      isHydrated,
      isSyncing,
      isSaved,
      toggle,
    }),
    [items, isHydrated, isSyncing, isSaved, toggle],
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
}
