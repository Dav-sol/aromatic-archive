
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/types";

interface PromotionsSectionProps {
  products: Product[] | undefined;
  isLoading: boolean;
}

const PromotionsSection = ({ products, isLoading }: PromotionsSectionProps) => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <div className="inline-block bg-primary/10 px-6 py-3 rounded-full mb-6">
            <span className="text-primary font-medium">¡Ofertas Especiales!</span>
          </div>
          <h2 className="text-4xl font-elegant text-primary text-center mb-4">Promociones del Momento</h2>
          <div className="h-px w-24 bg-primary mx-auto mb-4"></div>
          <p className="text-gray-600 text-center max-w-2xl">
            Descubre nuestras fragancias exclusivas con descuentos especiales por tiempo limitado.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <p className="text-center text-gray-500 italic">No hay productos en promoción disponibles actualmente.</p>
        )}

        <div className="text-center mt-10">
          <Link to="/catalog">
            <Button className="bg-primary text-white hover:bg-primary/90">
              Ver todas las promociones
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PromotionsSection;
