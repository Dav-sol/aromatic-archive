
import HeroFragrance from "./HeroFragrance";
import CollectionCategories from "./homepage/CollectionCategories";
import FeaturedProducts from "./homepage/FeaturedProducts";
import FeaturesSection from "./homepage/FeaturesSection";
import PromotionsSection from "./homepage/PromotionsSection";
import CallToAction from "./homepage/CallToAction";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero section */}
      <HeroFragrance />
      
      {/* Categorías de colección */}
      <CollectionCategories />
      
      {/* Productos destacados */}
      <FeaturedProducts />
      
      {/* Características de la marca */}
      <FeaturesSection />
      
      {/* Sección de promociones */}
      <PromotionsSection />
      
      {/* Llamada a la acción */}
      <CallToAction />
    </div>
  );
};

export default HomePage;
