
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Droplet } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
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
      
      // Obtener las notas de fragancia
      const { data: notesData, error: notesError } = await supabase
        .from('fragrance_notes')
        .select('*')
        .eq('product_id', id);
        
      if (notesError) throw notesError;
      
      // Organizar las notas por tipo
      const notes = {
        top: notesData?.filter(note => note.note_type === 'top') || [],
        middle: notesData?.filter(note => note.note_type === 'middle') || [],
        base: notesData?.filter(note => note.note_type === 'base') || []
      };
      
      return {
        ...productData,
        images: imagesData?.map(img => img.image_url) || [],
        notes
      };
    },
  });
  
  // Función para renderizar las notas de fragancia con su tipo
  const renderNotes = (notes, type) => {
    if (!notes || notes.length === 0) return null;
    
    const typeLabels = {
      top: 'Notas de Salida',
      middle: 'Notas de Corazón',
      base: 'Notas de Fondo'
    };
    
    return (
      <div>
        <h4 className="font-medium text-sm">{typeLabels[type]}</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {notes.map((note) => (
            <Badge key={note.id} variant="outline" className="flex items-center gap-1">
              <Droplet className="h-3 w-3" />
              {note.description}
            </Badge>
          ))}
        </div>
      </div>
    );
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
            <p className="text-xl font-semibold mt-2">
              {product.is_on_sale && product.sale_price ? (
                <>
                  <span className="line-through text-muted-foreground mr-2">${product.price}</span>
                  <span className="text-red-600">${product.sale_price}</span>
                </>
              ) : (
                `$${product.price}`
              )}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Marca: {product.brand}
            </p>
          </div>
          
          {/* Descripción */}
          <div className="py-4 border-t border-b">
            <h3 className="font-medium mb-2">Descripción</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          
          {/* Notas de Fragancia */}
          {(product.notes?.top?.length > 0 || product.notes?.middle?.length > 0 || product.notes?.base?.length > 0) && (
            <div className="py-4 border-b">
              <h3 className="font-medium mb-3">Notas de Fragancia</h3>
              <div className="space-y-4">
                {renderNotes(product.notes.top, 'top')}
                {renderNotes(product.notes.middle, 'middle')}
                {renderNotes(product.notes.base, 'base')}
              </div>
            </div>
          )}
          
          {/* Información adicional */}
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
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
