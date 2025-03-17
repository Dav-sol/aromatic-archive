
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as productService from "@/services";
import { ProductFormValues } from "../types";

interface UseProductMutationsProps {
  toast: any;
  setIsOpen: (isOpen: boolean) => void;
  setSelectedProduct: (product: any | null) => void;
  setImagesToDelete: (images: string[]) => void;
}

export const useProductMutations = ({
  toast,
  setIsOpen,
  setSelectedProduct,
  setImagesToDelete
}: UseProductMutationsProps) => {
  const queryClient = useQueryClient();

  const createProductMutation = useMutation({
    mutationFn: productService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Éxito",
        description: "Producto creado correctamente",
      });
      setIsOpen(false);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo crear el producto",
      });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: (data: { id: string, values: ProductFormValues }) => 
      productService.updateProduct(data.id, data.values, []),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['featuredProducts'] });
      queryClient.invalidateQueries({ queryKey: ['saleProducts'] });
      toast({
        title: "Éxito",
        description: "Producto actualizado correctamente",
      });
      setIsOpen(false);
      setSelectedProduct(null);
      setImagesToDelete([]);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar el producto",
      });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: productService.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['featuredProducts'] });
      queryClient.invalidateQueries({ queryKey: ['saleProducts'] });
      toast({
        title: "Éxito",
        description: "Producto eliminado correctamente",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo eliminar el producto",
      });
    },
  });

  return {
    createProductMutation,
    updateProductMutation,
    deleteProductMutation
  };
};
