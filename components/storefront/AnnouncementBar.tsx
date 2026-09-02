import { siteConfig } from "@/lib/storefront/site";

export function AnnouncementBar() {
  return (
    <div className="bg-announcement text-announcement-foreground">
      <div className="mx-auto flex h-[31px] max-w-[1440px] items-center justify-center px-4 text-center text-[11px] font-semibold tracking-wide lg:h-10 lg:text-sm">
        {siteConfig.announcement}
      </div>
    </div>
  );
}
