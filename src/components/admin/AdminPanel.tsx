
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import AdminPanelHeader from './AdminPanelHeader';
import ProductsTable from "./ProductsTable";
import LoadingSpinner from './LoadingSpinner';
import { useProductsData } from './hooks/useProductsData';
import { useProductMutations } from './hooks/useProductMutations';
import { loadProductDetails } from './helpers/productHelpers';
import { ProductFormValues } from "./types";

const AdminPanel = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

  // Obtener datos de productos
  const { products, isLoading } = useProductsData({ toast });

  // Mutaciones de productos
  const { createProductMutation, updateProductMutation, deleteProductMutation } = 
    useProductMutations({ toast, setIsOpen, setSelectedProduct, setImagesToDelete });

  const onSubmit = (values: ProductFormValues) => {
    setIsUploading(true);
    try {
      if (selectedProduct) {
        updateProductMutation.mutate({ id: selectedProduct.id, values });
      } else {
        createProductMutation.mutate(values);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = async (product: any) => {
    setSelectedProduct(product);
    setImagesToDelete([]); // Reiniciar las imágenes a eliminar
    
    try {
      const enhancedProduct = await loadProductDetails(product);
      setSelectedProduct(enhancedProduct);
      setIsOpen(true);
    } catch (error) {
      console.error("Error al preparar producto para edición:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo cargar el producto para editar",
      });
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <AdminPanelHeader 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        setImagesToDelete={setImagesToDelete}
        onSubmit={onSubmit}
        isUploading={isUploading}
      />

      <ProductsTable 
        products={products || []}
        handleEdit={handleEdit}
        deleteProduct={deleteProductMutation}
      />
    </div>
  );
};

export default AdminPanel;
