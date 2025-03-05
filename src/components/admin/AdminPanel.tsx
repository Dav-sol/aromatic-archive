
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductFormValues, FragranceNote, ProductImage } from "./types";
import ProductsTable from "./ProductsTable";
import ProductForm from "./ProductForm";
import * as productService from "./productService";

const AdminPanel = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

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
      productService.updateProduct(data.id, data.values, imagesToDelete),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
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
      // Cargar las imágenes del producto
      const images = await productService.fetchProductImages(product.id);
      
      // Cargar notas de fragancia
      const fragranceNotes = await productService.fetchFragranceNotes(product.id);
      
      // Mapear imágenes para el formulario
      const formattedImages: ProductImage[] = images ? images.map(img => ({
        id: img.id,
        url: img.image_url
      })) : [];
      
      // Formatear notas de fragancia para el formulario
      const formattedNotes: FragranceNote[] = fragranceNotes ? fragranceNotes.map(note => ({
        description: note.description,
        note_type: note.note_type as "top" | "middle" | "base"
      })) : [];
      
      const initialValues: ProductFormValues = {
        name: product.name,
        brand: product.brand,
        description: product.description || "",
        price: product.price,
        stock: product.stock,
        gender: product.gender,
        images: formattedImages,
        fragranceNotes: formattedNotes,
      };
      
      setSelectedProduct({
        ...product, 
        initialValues
      });
      
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
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Panel de Administración
        </h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setSelectedProduct(null);
              setImagesToDelete([]);
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Producto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedProduct ? "Editar Producto" : "Nuevo Producto"}
              </DialogTitle>
            </DialogHeader>
            <ProductForm 
              initialValues={selectedProduct?.initialValues || {
                name: "",
                brand: "",
                description: "",
                price: 0,
                stock: 0,
                gender: "male",
                images: [],
                fragranceNotes: [],
              }}
              onSubmit={onSubmit}
              isUploading={isUploading}
              isEdit={!!selectedProduct}
            />
          </DialogContent>
        </Dialog>
      </div>

      <ProductsTable 
        products={products || []}
        handleEdit={handleEdit}
        deleteProduct={deleteProductMutation}
      />
    </div>
  );
};

export default AdminPanel;
