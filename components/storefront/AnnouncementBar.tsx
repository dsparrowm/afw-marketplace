import { AnnouncementBarClient } from "@/components/storefront/AnnouncementBarClient";

export type AnnouncementBarProps = {
  messages: string[];
};

/** Thin wrapper kept for existing imports — messages come from the layout fetch. */
export function AnnouncementBar({ messages }: AnnouncementBarProps) {
  return <AnnouncementBarClient messages={messages} />;
}
