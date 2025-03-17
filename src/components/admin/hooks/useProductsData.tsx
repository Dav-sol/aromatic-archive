
import { useQuery } from '@tanstack/react-query';
import * as productService from "@/services";

interface UseProductsDataProps {
  toast: any;
}

export const useProductsData = ({ toast }: UseProductsDataProps) => {
  // Consulta productos con correcto manejo de errores
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: productService.fetchProducts,
    meta: {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudieron cargar los productos",
        });
      }
    }
  });

  return { products, isLoading };
};
