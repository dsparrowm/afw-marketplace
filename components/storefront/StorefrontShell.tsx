import { AnnouncementBar } from "@/components/storefront/AnnouncementBar";
import {
  StorefrontHeader,
  type StorefrontHeaderProps,
} from "@/components/storefront/StorefrontHeader";
import { StorefrontFooter } from "@/components/storefront/StorefrontFooter";

export type StorefrontShellProps = StorefrontHeaderProps & {
  children: React.ReactNode;
};

export function StorefrontShell({
  children,
  cartItemCount,
  cartTotal,
  isAuthenticated,
}: StorefrontShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <StorefrontHeader
        cartItemCount={cartItemCount}
        cartTotal={cartTotal}
        isAuthenticated={isAuthenticated}
      />
      <main className="flex-1">{children}</main>
      <StorefrontFooter />
    </div>
  );
}
