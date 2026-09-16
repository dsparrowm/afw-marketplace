import { getPublicAnnouncement } from "@/lib/api/public-storefront";
import { siteConfig } from "@/lib/storefront/site";

const FALLBACK_MESSAGES = [...siteConfig.announcements];

/** Split API announcement text into marquee segments when delimiters are present. */
export function parseAnnouncementText(text: string | null | undefined): string[] {
  const trimmed = text?.trim();
  if (!trimmed) return [];

  const parts = trimmed
    .split(/\s*[|•]\s*|\n+/)
    .map((part) => part.trim())
    .filter(Boolean);

  return parts.length > 0 ? parts : [trimmed];
}

export async function getAnnouncementMessages(): Promise<string[]> {
  try {
    const announcement = await getPublicAnnouncement();
    const parsed = parseAnnouncementText(announcement.text);
    if (parsed.length > 0) return parsed;
  } catch {
    // Fall through to static Figma copy
  }
  return FALLBACK_MESSAGES;
}
