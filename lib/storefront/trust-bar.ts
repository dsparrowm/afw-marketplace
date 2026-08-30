/** Homepage trust bar copy — Figma node `6:2690`, `main-content.xml` */
import type { trustIcons } from "@/lib/brand/assets";

export type TrustBarItem = {
  title: string;
  subtitle: string;
  icon: keyof typeof trustIcons;
};

export const trustBarItems: TrustBarItem[] = [
  {
    title: "100% Certified Organic",
    subtitle: "No artificial chemical additives",
    icon: "leaf",
  },
  {
    title: "Farm-Sourced from Africa",
    subtitle: "Sourced direct from local producers",
    icon: "tractor",
  },
  {
    title: "Delivered Across Canada",
    subtitle: "Reliable, temperature-stable logistics",
    icon: "truck",
  },
  {
    title: "Satisfaction Guaranteed",
    subtitle: "Love our products or your money back",
    icon: "shieldCheck",
  },
];
