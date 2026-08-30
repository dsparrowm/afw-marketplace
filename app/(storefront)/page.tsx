import { CategoryCarousel } from "@/components/storefront/CategoryCarousel";
import { HeroSection } from "@/components/storefront/HeroSection";
import { NewsletterSection } from "@/components/storefront/NewsletterSection";
import { ProductSection } from "@/components/storefront/ProductSection";
import { PromoBannerRow } from "@/components/storefront/PromoBannerRow";
import { TestimonialsSection } from "@/components/storefront/TestimonialsSection";
import { TrustBar } from "@/components/storefront/TrustBar";
import {
  featuredProductsSection,
  recentlyAddedSection,
  trendingProductsSection,
} from "@/lib/storefront/homepage-products";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <CategoryCarousel />
      <ProductSection section={featuredProductsSection} />
      <PromoBannerRow />
      <ProductSection section={trendingProductsSection} panelBackground />
      <ProductSection section={recentlyAddedSection} />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
