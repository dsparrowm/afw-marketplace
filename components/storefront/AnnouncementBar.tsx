import { siteConfig } from "@/lib/storefront/site";

export function AnnouncementBar() {
  return (
    <div className="bg-announcement text-announcement-foreground">
      <div className="mx-auto flex h-10 max-w-[1440px] items-center justify-center px-4 text-center text-xs font-semibold tracking-wide sm:text-sm">
        {siteConfig.announcement}
      </div>
    </div>
  );
}
