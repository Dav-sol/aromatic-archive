
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/types";

interface FeaturedProductsProps {
  products: Product[] | undefined;
  isLoading: boolean;
}

const FeaturedProducts = ({ products, isLoading }: FeaturedProductsProps) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-elegant text-primary text-center mb-4">Productos Populares</h2>
        <div className="h-px w-24 bg-primary mx-auto mb-16"></div>
        
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
          <p className="text-center text-gray-500 italic">No hay productos destacados disponibles actualmente.</p>
        )}

        <div className="text-center mt-10">
          <Link to="/catalog">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              Ver todos los productos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
