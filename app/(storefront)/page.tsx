import { CategoryCarousel } from "@/components/storefront/CategoryCarousel";
import { HeroSection } from "@/components/storefront/HeroSection";
import { MobileHomepage } from "@/components/storefront/mobile/MobileHomepage";
import { NewsletterSection } from "@/components/storefront/NewsletterSection";
import { ProductSection } from "@/components/storefront/ProductSection";
import { PromoBannerRow } from "@/components/storefront/PromoBannerRow";
import { TestimonialsSection } from "@/components/storefront/TestimonialsSection";
import { TrustBar } from "@/components/storefront/TrustBar";
import { buildHomepageProductSections } from "@/lib/catalog/homepage-sections";
import {
  fetchStorefrontCategories,
  fetchStorefrontProductPool,
} from "@/lib/catalog/storefront-data";

export default async function HomePage() {
  const [{ products }, categories] = await Promise.all([
    fetchStorefrontProductPool(),
    fetchStorefrontCategories(),
  ]);

  const { featured, trending, recentlyAdded } =
    buildHomepageProductSections(products);

  return (
    <>
      <MobileHomepage
        categories={categories}
        bestSellers={featured.products}
      />
      <div className="hidden lg:contents">
        <HeroSection />
        <TrustBar />
        <CategoryCarousel categories={categories} />
        <ProductSection section={featured} />
        <PromoBannerRow />
        <ProductSection section={trending} panelBackground />
        <ProductSection section={recentlyAdded} />
        <TestimonialsSection />
        <NewsletterSection />
      </div>
    </>
  );
}
