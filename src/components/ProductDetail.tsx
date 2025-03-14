
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ProductImageGallery from './product/ProductImageGallery';
import ProductInfo from './product/ProductInfo';
import { ProductDetailLoading, ProductDetailNotFound } from './product/ProductDetailStates';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      // Get product data
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
        
      if (productError) throw productError;
      
      // Get product images
      const { data: imagesData, error: imagesError } = await supabase
        .from('product_images')
        .select('*')
        .eq('product_id', id)
        .order('display_order', { ascending: true });
        
      if (imagesError) throw imagesError;
      
      // Get fragrance notes
      const { data: notesData, error: notesError } = await supabase
        .from('fragrance_notes')
        .select('*')
        .eq('product_id', id);
        
      if (notesError) throw notesError;
      
      // Organize notes by type
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
  
  if (isLoading) {
    return <ProductDetailLoading />;
  }
  
  if (!product) {
    return <ProductDetailNotFound />;
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
        {/* Image Gallery */}
        <ProductImageGallery images={product.images} />
        
        {/* Product Information */}
        <ProductInfo product={product} />
      </div>
    </div>
  );
};

export default ProductDetail;
