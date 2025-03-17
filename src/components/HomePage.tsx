import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ProductGrid from "./ProductGrid";
import { Product } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import HeroFragrance from "./HeroFragrance";

const HomePage = () => {
  // Fetch featured products
  const { data: featuredProducts, isLoading: isLoadingFeatured } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, product_images(*)')
        .eq('is_featured', true)
        .order('name');
        
      if (error) throw error;
      
      return data.map(product => ({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        salePrice: product.sale_price,
        isOnSale: product.is_on_sale,
        images: product.product_images?.map(img => img.image_url) || []
      })) as Product[];
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });

  // Fetch products on sale
  const { data: saleProducts, isLoading: isLoadingSale } = useQuery({
    queryKey: ['saleProducts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, product_images(*)')
        .eq('is_on_sale', true)
        .order('discount_percentage', { ascending: false });
        
      if (error) throw error;
      
      return data.map(product => ({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        salePrice: product.sale_price,
        isOnSale: product.is_on_sale,
        images: product.product_images?.map(img => img.image_url) || []
      })) as Product[];
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-white/70 z-10"></div>
          <img 
            src="/lovable-uploads/799e3b7d-2632-48fa-8f4e-5c95ec89336e.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 max-w-4xl mx-auto text-center px-4">
          <img 
            src="/lovable-uploads/2c6dbf7f-9cac-486c-9875-538bbfb09192.png" 
            alt="Profumi D'incanto Logo" 
            className="h-32 mx-auto mb-6"
          />
          <h1 className="text-5xl md:text-7xl font-elegant text-primary mb-6">
            Profumi D'incanto
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto">
            Descubre nuestra exclusiva colección de fragancias de lujo que evocan emociones y recuerdos inolvidables.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/catalog/female">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-white group">
                Fragancias para Mujer
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/catalog/male">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-white group">
                Fragancias para Hombre
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Nueva sección de Hero Fragrance */}
      <HeroFragrance />
      
      {/* Popular Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-elegant text-primary text-center mb-4">Productos Populares</h2>
          <div className="h-px w-24 bg-primary mx-auto mb-16"></div>
          
          {isLoadingFeatured ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : featuredProducts && featuredProducts.length > 0 ? (
            <ProductGrid products={featuredProducts} />
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
      
      {/* Promotions Section */}
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
          
          {isLoadingSale ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : saleProducts && saleProducts.length > 0 ? (
            <ProductGrid products={saleProducts} />
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

      {/* Sección de categorías elegantes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-elegant text-primary text-center mb-4">Nuestra Colección</h2>
          <div className="h-px w-24 bg-primary mx-auto mb-16"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Categoría Mujer */}
            <div className="group relative overflow-hidden rounded-lg shadow-md border border-primary/20">
              <div className="absolute inset-0 bg-white/50 group-hover:bg-white/30 transition-all duration-300 z-10"></div>
              <img 
                src="/lovable-uploads/799e3b7d-2632-48fa-8f4e-5c95ec89336e.png" 
                alt="Fragancias para Mujer" 
                className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-20">
                <h3 className="text-2xl font-elegant text-primary mb-2">Fragancias para Mujer</h3>
                <p className="text-gray-800 text-center mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Descubre nuestra colección de perfumes femeninos con aromas cautivadores.
                </p>
                <Link to="/catalog/female">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                    Explorar Colección
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Categoría Hombre */}
            <div className="group relative overflow-hidden rounded-lg shadow-md border border-primary/20">
              <div className="absolute inset-0 bg-white/50 group-hover:bg-white/30 transition-all duration-300 z-10"></div>
              <img 
                src="/lovable-uploads/119d8d7b-60e2-46dd-9a19-632542ed15ae.png" 
                alt="Fragancias para Hombre" 
                className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-20">
                <h3 className="text-2xl font-elegant text-primary mb-2">Fragancias para Hombre</h3>
                <p className="text-gray-800 text-center mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explora nuestra selección de perfumes masculinos con personalidad y carácter.
                </p>
                <Link to="/catalog/male">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                    Explorar Colección
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Categoría Colección Completa */}
            <div className="group relative overflow-hidden rounded-lg shadow-md border border-primary/20">
              <div className="absolute inset-0 bg-white/50 group-hover:bg-white/30 transition-all duration-300 z-10"></div>
              <img 
                src="/lovable-uploads/2c6dbf7f-9cac-486c-9875-538bbfb09192.png" 
                alt="Colección Completa" 
                className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-20">
                <h3 className="text-2xl font-elegant text-primary mb-2">Colección Completa</h3>
                <p className="text-gray-800 text-center mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Todas nuestras fragancias de lujo en un solo lugar para tu elección.
                </p>
                <Link to="/catalog">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                    Explorar Colección
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sección de características */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-elegant text-primary text-center mb-4">Por Qué Elegirnos</h2>
          <div className="h-px w-24 bg-primary mx-auto mb-16"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-lg border border-primary/20 hover:border-primary/50 transition-colors duration-300 text-center shadow-md">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-primary text-2xl">✦</span>
              </div>
              <h3 className="text-xl font-elegant text-primary mb-4">Calidad Premium</h3>
              <p className="text-gray-700">
                Nuestras fragancias están elaboradas con los mejores ingredientes y procesos artesanales, garantizando una experiencia olfativa excepcional.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-primary/20 hover:border-primary/50 transition-colors duration-300 text-center shadow-md">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-primary text-2xl">✦</span>
              </div>
              <h3 className="text-xl font-elegant text-primary mb-4">Exclusividad</h3>
              <p className="text-gray-700">
                Ofrecemos fragancias únicas que no encontrarás en ningún otro lugar, creadas por maestros perfumistas con décadas de experiencia.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-primary/20 hover:border-primary/50 transition-colors duration-300 text-center shadow-md">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-primary text-2xl">✦</span>
              </div>
              <h3 className="text-xl font-elegant text-primary mb-4">Experiencia Sensorial</h3>
              <p className="text-gray-700">
                Cada perfume está diseñado para evocar emociones y crear momentos inolvidables, transformando lo cotidiano en extraordinario.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sección CTA */}
      <section className="py-16 bg-luxury-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#f7d58b] to-[#efd8a8] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-elegant text-primary mb-6">Eleva tu presencia con nuestras fragancias</h2>
          <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
            Descubre el poder transformador de nuestras exquisitas fragancias y déjate envolver por sus notas encantadoras.
          </p>
          <Link to="/catalog">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
              Explora toda la colección
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
