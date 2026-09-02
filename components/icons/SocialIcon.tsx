import { cn } from "@/lib/utils";

export type SocialNetwork = "facebook" | "instagram" | "twitter";

export type SocialIconProps = {
  network: SocialNetwork;
  className?: string;
  /** Figma footer sizes — default 16px height */
  size?: number;
};

const viewBoxes: Record<SocialNetwork, string> = {
  facebook: "0 0 10 16",
  instagram: "0 0 14 16",
  twitter: "0 0 16 16",
};

/** Monochrome social glyphs — Lucide/SVG fallback for Figma footer icons `18:80`–`18:86` */
export function SocialIcon({ network, className, size = 16 }: SocialIconProps) {
  const height = size;
  const widths: Record<SocialNetwork, number> = {
    facebook: (10 / 16) * height,
    instagram: (14 / 16) * height,
    twitter: height,
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBoxes[network]}
      width={widths[network]}
      height={height}
      fill="currentColor"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      {network === "facebook" ? (
        <path d="M6.5 16V8.7h2.8L9.6 5.9H6.5V4c0-.9.3-1.5 1.6-1.5H9.7V0.1C9.4 0 8.3 0 7 0 4.6 0 3 1.1 3 3.2V5.9H0v2.8h3V16h3.5z" />
      ) : null}
      {network === "instagram" ? (
        <path d="M7 4.2A2.8 2.8 0 1 0 7 9.8a2.8 2.8 0 0 0 0-5.6zm0 7.3A4.5 4.5 0 1 1 7 2.5a4.5 4.5 0 0 1 0 9zm5.6-7.4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM14 4.5c0-.8-.1-1.6-.4-2.3A4.6 4.6 0 0 0 11.8.4C11.1.1 10.3 0 9.5 0H4.5C2 0 0 2 0 4.5v7C0 14 2 16 4.5 16h7c2.5 0 4.5-2 4.5-4.5v-7zm-2 9.5h-7a2.5 2.5 0 0 1-2.5-2.5v-7A2.5 2.5 0 0 1 4.5 2h7a2.5 2.5 0 0 1 2.5 2.5v7a2.5 2.5 0 0 1-2.5 2.5z" />
      ) : null}
      {network === "twitter" ? (
        <path d="M9.5 0h3.1L7.3 6.8 16 16h-4.9L5.1 10.4 2 16H0l5.7-7.3L0 0h5l3.5 4.6L9.5 0zm-1.1 14.4h1.7L4.3 1.6H2.5l6 12.8z" />
      ) : null}
    </svg>
  );
}
