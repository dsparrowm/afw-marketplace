import { StorefrontCartShell } from "@/components/storefront/StorefrontCartShell";
import { getAnnouncementMessages } from "@/lib/storefront/announcement";

export default async function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const announcementMessages = await getAnnouncementMessages();
  return (
    <StorefrontCartShell announcementMessages={announcementMessages}>
      {children}
    </StorefrontCartShell>
  );
}
