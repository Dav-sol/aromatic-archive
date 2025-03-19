
import { useHomeProducts } from "@/hooks/useHomeProducts";
import HeroFragrance from "./HeroFragrance";
import FeaturedProducts from "./homepage/FeaturedProducts";
import PromotionsSection from "./homepage/PromotionsSection";
import CollectionCategories from "./homepage/CollectionCategories";
import FeaturesSection from "./homepage/FeaturesSection";
import CallToAction from "./homepage/CallToAction";

const HomePage = () => {
  const { 
    featuredProducts, 
    isLoadingFeatured, 
    saleProducts, 
    isLoadingSale 
  } = useHomeProducts();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero section */}
      <HeroFragrance />
      
      {/* Popular Products Section */}
      <FeaturedProducts 
        products={featuredProducts} 
        isLoading={isLoadingFeatured} 
      />
      
      {/* Promotions Section */}
      <PromotionsSection 
        products={saleProducts} 
        isLoading={isLoadingSale} 
      />

      {/* Collection Categories Section */}
      <CollectionCategories />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* CTA Section */}
      <CallToAction />
    </div>
  );
};

export default HomePage;
