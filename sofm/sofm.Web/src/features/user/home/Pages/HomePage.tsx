import { HeroSection } from "../components/HeroSection";
import { CategoryGrid } from "../components/CategoryGrid";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { NewsletterSection } from "../components/NewsletterSection";

export const HomePage = () => (
  <>
    <HeroSection />
    <CategoryGrid />
    <FeaturedProducts />
    <NewsletterSection />
  </>
);