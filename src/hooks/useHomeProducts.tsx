
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types";

export const useHomeProducts = () => {
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

  return {
    featuredProducts,
    isLoadingFeatured,
    saleProducts,
    isLoadingSale
  };
};
