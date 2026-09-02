import { FreshArrivalsAlert } from "@/components/storefront/mobile/FreshArrivalsAlert";
import { MobileBestSellersSection } from "@/components/storefront/mobile/MobileBestSellersSection";
import { MobileCategoryGrid } from "@/components/storefront/mobile/MobileCategoryGrid";
import { MobileFooterAccordion } from "@/components/storefront/mobile/MobileFooterAccordion";
import { MobileHeroSection } from "@/components/storefront/mobile/MobileHeroSection";
import { MobileTestimonialsCarousel } from "@/components/storefront/mobile/MobileTestimonialsCarousel";
import { MobileTrustProps } from "@/components/storefront/mobile/MobileTrustProps";
import { WeeklyDealsSection } from "@/components/storefront/mobile/WeeklyDealsSection";
import type { HomepageCategory } from "@/lib/storefront/categories";
import type { Product } from "@/types/product";

export type MobileHomepageProps = {
  categories?: HomepageCategory[];
  bestSellers?: Product[];
};

/** Mobile homepage composition — Figma `2:1928` + approved design review deviations */
export function MobileHomepage({
  categories,
  bestSellers,
}: MobileHomepageProps) {
  return (
    <div className="lg:hidden" data-figma-node="2:1928">
      <MobileHeroSection />
      <FreshArrivalsAlert />
      <MobileCategoryGrid categories={categories} />
      <WeeklyDealsSection />
      <MobileBestSellersSection products={bestSellers} />
      <MobileTestimonialsCarousel />
      <MobileTrustProps />
      <MobileFooterAccordion />
    </div>
  );
}
