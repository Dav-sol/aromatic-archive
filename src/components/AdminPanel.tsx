
import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Upload, X, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const productSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  brand: z.string().min(1, "La marca es requerida"),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "El precio debe ser mayor a 0"),
  stock: z.coerce.number().min(0, "El stock debe ser mayor o igual a 0"),
  gender: z.enum(["male", "female"]),
  images: z.array(z.object({
    file: z.instanceof(File).optional(),
    url: z.string().optional(),
    id: z.string().optional(),
  })).optional().default([]),
});

type ProductFormValues = z.infer<typeof productSchema>;

const AdminPanel = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      brand: "",
      description: "",
      price: 0,
      stock: 0,
      gender: "male",
      images: [],
    },
  });

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (productsError) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudieron cargar los productos",
        });
        throw productsError;
      }

      // Cargar imágenes para cada producto
      const productsWithImages = await Promise.all(
        productsData.map(async (product) => {
          const { data: imagesData, error: imagesError } = await supabase
            .from('product_images')
            .select('*')
            .eq('product_id', product.id)
            .order('display_order', { ascending: true });

          if (imagesError) {
            console.error('Error al cargar imágenes:', imagesError);
            return {
              ...product,
              images: [],
            };
          }

          return {
            ...product,
            images: imagesData || [],
          };
        })
      );

      return productsWithImages;
    },
  });

  const uploadImage = async (file: File, productId: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${productId}/${fileName}`;
    
    try {
      const { error: uploadError } = await supabase.storage
        .from('product_images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Error al subir imagen:', uploadError);
        throw uploadError;
      }

      const { data: publicUrl } = supabase.storage
        .from('product_images')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('product_images')
        .insert({
          product_id: productId,
          image_url: publicUrl.publicUrl,
          display_order: 0,
        });

      if (dbError) {
        console.error('Error al guardar referencia de imagen:', dbError);
        throw dbError;
      }

      return publicUrl.publicUrl;
    } catch (error) {
      console.error('Error en el proceso de carga:', error);
      throw error;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const currentImages = form.getValues('images') || [];
    const newImages = Array.from(files).map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));

    form.setValue('images', [...currentImages, ...newImages]);
  };

  const removeImage = (index: number) => {
    const currentImages = form.getValues('images') || [];
    const newImages = [...currentImages];
    
    // Liberar URL de objeto si existe
    if (newImages[index]?.url && !newImages[index]?.id) {
      URL.revokeObjectURL(newImages[index].url as string);
    }
    
    newImages.splice(index, 1);
    form.setValue('images', newImages);
  };

  const createProduct = useMutation({
    mutationFn: async (values: ProductFormValues) => {
      setIsUploading(true);
      try {
        // 1. Crear el producto primero
        const { data: product, error } = await supabase
          .from('products')
          .insert({
            name: values.name,
            brand: values.brand,
            description: values.description,
            price: values.price,
            stock: values.stock,
            gender: values.gender,
          })
          .select()
          .single();

        if (error) throw error;

        // 2. Subir imágenes si hay alguna
        if (values.images && values.images.length > 0) {
          const imagePromises = values.images
            .filter((img) => img.file) // Solo procesar archivos nuevos
            .map((img, index) => 
              uploadImage(img.file as File, product.id)
            );

          await Promise.all(imagePromises);
        }

        return product;
      } finally {
        setIsUploading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Éxito",
        description: "Producto creado correctamente",
      });
      setIsOpen(false);
      form.reset();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo crear el producto",
      });
    },
  });

  const updateProduct = useMutation({
    mutationFn: async ({ id, ...values }: ProductFormValues & { id: string }) => {
      setIsUploading(true);
      try {
        // 1. Actualizar datos del producto
        const { data: product, error } = await supabase
          .from('products')
          .update({
            name: values.name,
            brand: values.brand,
            description: values.description,
            price: values.price,
            stock: values.stock,
            gender: values.gender,
          })
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;

        // 2. Procesar imágenes nuevas
        if (values.images && values.images.length > 0) {
          const newImages = values.images.filter(img => img.file);
          
          if (newImages.length > 0) {
            const imagePromises = newImages.map((img) => 
              uploadImage(img.file as File, id)
            );
            
            await Promise.all(imagePromises);
          }
        }

        return product;
      } finally {
        setIsUploading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Éxito",
        description: "Producto actualizado correctamente",
      });
      setIsOpen(false);
      setSelectedProduct(null);
      form.reset();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar el producto",
      });
    },
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      // 1. Primero eliminar las imágenes
      const { data: images } = await supabase
        .from('product_images')
        .select('*')
        .eq('product_id', id);

      if (images && images.length > 0) {
        // Eliminar registros de imágenes
        await supabase
          .from('product_images')
          .delete()
          .eq('product_id', id);

        // También podríamos eliminar los archivos del storage
        // pero esto requeriría más trabajo de listar y eliminar
      }

      // 2. Eliminar el producto
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
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
    if (selectedProduct) {
      updateProduct.mutate({ ...values, id: selectedProduct.id });
    } else {
      createProduct.mutate(values);
    }
  };

  const handleEdit = async (product: any) => {
    setSelectedProduct(product);
    
    // Cargar las imágenes del producto
    const { data: images, error } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', product.id)
      .order('display_order', { ascending: true });
      
    if (error) {
      console.error("Error al cargar imágenes:", error);
    }
    
    // Mapear imágenes para el formulario
    const formattedImages = images ? images.map(img => ({
      id: img.id,
      url: img.image_url
    })) : [];
    
    form.reset({
      name: product.name,
      brand: product.brand,
      description: product.description || "",
      price: product.price,
      stock: product.stock,
      gender: product.gender,
      images: formattedImages,
    });
    
    setIsOpen(true);
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
              form.reset({
                name: "",
                brand: "",
                description: "",
                price: 0,
                stock: 0,
                gender: "male",
                images: [],
              });
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Producto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {selectedProduct ? "Editar Producto" : "Nuevo Producto"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marca</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Género</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un género" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Masculino</SelectItem>
                          <SelectItem value="female">Femenino</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Sección de imágenes */}
                <div>
                  <FormLabel>Imágenes</FormLabel>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {form.watch('images')?.map((image, index) => (
                      <div key={index} className="relative aspect-square border rounded-md overflow-hidden group">
                        <img src={image.url} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center justify-center aspect-square border border-dashed rounded-md text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-colors"
                    >
                      <Upload className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={isUploading}>
                  {isUploading ? "Subiendo..." : (selectedProduct ? "Actualizar" : "Crear")}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Género</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  {product.images && product.images.length > 0 ? (
                    <img 
                      src={product.images[0].image_url} 
                      alt={product.name} 
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell className="capitalize">
                  {product.gender === 'male' ? 'Masculino' : 'Femenino'}
                </TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(product)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. Se eliminará permanentemente el producto
                          {" "}{product.name} y todos sus datos asociados.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteProduct.mutate(product.id)}
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminPanel;
