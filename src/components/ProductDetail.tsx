
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Share2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      // Obtener datos del producto
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
        
      if (productError) throw productError;
      
      // Obtener imágenes del producto
      const { data: imagesData, error: imagesError } = await supabase
        .from('product_images')
        .select('*')
        .eq('product_id', id)
        .order('display_order', { ascending: true });
        
      if (imagesError) throw imagesError;
      
      return {
        ...productData,
        images: imagesData?.map(img => img.image_url) || []
      };
    },
  });
  
  const handleAddToCart = () => {
    toast({
      title: "Añadido al carrito",
      description: `${product?.name} ha sido añadido a tu carrito.`,
    });
  };
  
  const handleAddToWishlist = () => {
    toast({
      title: "Añadido a favoritos",
      description: `${product?.name} ha sido añadido a tus favoritos.`,
    });
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Enlace copiado",
      description: "El enlace del producto ha sido copiado al portapapeles.",
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold">Producto no encontrado</h2>
        <p className="mt-2 text-muted-foreground">
          El producto que buscas no existe o ha sido eliminado.
        </p>
        <Button asChild className="mt-4">
          <Link to="/catalog">Volver al catálogo</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="pl-0">
          <Link to="/catalog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al catálogo
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Galería de imágenes */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border bg-muted">
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary">
                <p className="text-muted-foreground">No hay imagen disponible</p>
              </div>
            )}
          </div>
          
          {/* Miniaturas */}
          {product.images && product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border ${
                    selectedImageIndex === index
                      ? "ring-2 ring-primary ring-offset-2"
                      : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - Vista ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Información del producto */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-xl font-semibold mt-2">${product.price}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Marca: {product.brand}
            </p>
          </div>
          
          <div className="py-4 border-t border-b">
            <h3 className="font-medium mb-2">Descripción</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-24">Stock:</div>
              <div>{product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}</div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-24">Género:</div>
              <div className="capitalize">
                {product.gender === 'male' ? 'Masculino' : 'Femenino'}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4 pt-4">
            <Button 
              size="lg" 
              className="flex-1"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Añadir al carrito
            </Button>
            
            <Button
              size="icon"
              variant="outline"
              onClick={handleAddToWishlist}
            >
              <Heart className="h-4 w-4" />
            </Button>
            
            <Button
              size="icon"
              variant="outline"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
