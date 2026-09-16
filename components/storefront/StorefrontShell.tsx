import { AnnouncementBar } from "@/components/storefront/AnnouncementBar";
import { MobileBottomNav } from "@/components/storefront/MobileBottomNav";
import { MobileHeader } from "@/components/storefront/MobileHeader";
import {
  StorefrontHeader,
  type StorefrontHeaderProps,
} from "@/components/storefront/StorefrontHeader";
import { StorefrontFooter } from "@/components/storefront/StorefrontFooter";

export type StorefrontShellProps = StorefrontHeaderProps & {
  children: React.ReactNode;
  announcementMessages: string[];
};

export function StorefrontShell({
  children,
  cartItemCount,
  cartTotal,
  isAuthenticated,
  announcementMessages,
}: StorefrontShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar messages={announcementMessages} />
      <div className="hidden lg:block">
        <StorefrontHeader
          cartItemCount={cartItemCount}
          cartTotal={cartTotal}
          isAuthenticated={isAuthenticated}
        />
      </div>
      <MobileHeader isAuthenticated={isAuthenticated} />
      <main className="flex-1 pb-[calc(76px+env(safe-area-inset-bottom))] lg:pb-0">
        {children}
      </main>
      <div className="hidden lg:block">
        <StorefrontFooter />
      </div>
      <MobileBottomNav />
    </div>
  );
}
