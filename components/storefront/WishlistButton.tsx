"use client";

import { usePathname, useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { useWishlist } from "@/lib/wishlist/wishlist-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type WishlistButtonProps = {
  variantId?: string;
  slug?: string;
  label: string;
  className?: string;
  iconClassName?: string;
};

export function WishlistButton({
  variantId,
  slug,
  label,
  className,
  iconClassName,
}: WishlistButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isHydrated: authHydrated } = useAuth();
  const { isSaved, toggle, isSyncing } = useWishlist();
  const saved = isSaved({ variantId, slug });

  async function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (!authHydrated) return;

    if (!isAuthenticated) {
      const returnUrl = pathname || "/shop";
      router.push(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
      return;
    }

    await toggle({ variantId, slug });
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className={className}
      aria-label={saved ? `Remove ${label} from wishlist` : `Save ${label}`}
      aria-pressed={saved}
      disabled={isSyncing}
      onClick={(event) => {
        void handleClick(event);
      }}
    >
      <Heart
        className={cn(
          iconClassName,
          saved && "fill-brand-green text-brand-green",
        )}
        aria-hidden
      />
    </Button>
  );
}
