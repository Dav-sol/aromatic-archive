
import HeroFragrance from "./HeroFragrance";
import CollectionCategories from "./homepage/CollectionCategories";
import FeaturedProducts from "./homepage/FeaturedProducts";
import FeaturesSection from "./homepage/FeaturesSection";
import PromotionsSection from "./homepage/PromotionsSection";
import CallToAction from "./homepage/CallToAction";
import { useHomeProducts } from "@/hooks/useHomeProducts";

const HomePage = () => {
  // Use the hook to fetch both featured and sale products
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
      
      {/* Categorías de colección */}
      <CollectionCategories />
      
      {/* Productos destacados */}
      <FeaturedProducts 
        products={featuredProducts} 
        isLoading={isLoadingFeatured} 
      />
      
      {/* Características de la marca */}
      <FeaturesSection />
      
      {/* Sección de promociones */}
      <PromotionsSection 
        products={saleProducts} 
        isLoading={isLoadingSale} 
      />
      
      {/* Llamada a la acción */}
      <CallToAction />
    </div>
  );
};

export default HomePage;
