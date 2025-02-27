
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Definimos los tipos permitidos para las notas de fragancia
type NoteType = "top" | "middle" | "base";

const FragranceNoteSchema = z.object({
  description: z.string().min(1, "La descripción de la nota es requerida"),
  note_type: z.enum(["top", "middle", "base"], {
    required_error: "El tipo de nota es requerido",
  }),
});

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
  fragranceNotes: z.array(FragranceNoteSchema).optional().default([]),
});

type ProductFormValues = z.infer<typeof productSchema>;
type FragranceNote = z.infer<typeof FragranceNoteSchema>;

const AdminPanel = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newNote, setNewNote] = useState<FragranceNote>({ description: "", note_type: "top" });

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
      fragranceNotes: [],
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

  const addFragranceNote = () => {
    if (!newNote.description.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "La descripción de la nota no puede estar vacía",
      });
      return;
    }

    const currentNotes = form.getValues('fragranceNotes') || [];
    form.setValue('fragranceNotes', [...currentNotes, newNote]);
    setNewNote({ description: "", note_type: "top" });
  };

  const removeFragranceNote = (index: number) => {
    const currentNotes = form.getValues('fragranceNotes') || [];
    const newNotes = [...currentNotes];
    newNotes.splice(index, 1);
    form.setValue('fragranceNotes', newNotes);
  };

  const saveFragranceNotes = async (productId: string, notes: FragranceNote[]) => {
    if (!notes || notes.length === 0) return;

    try {
      // Primero eliminar notas existentes para este producto
      await supabase
        .from('fragrance_notes')
        .delete()
        .eq('product_id', productId);

      // Luego insertar las nuevas notas
      const notesWithProductId = notes.map(note => ({
        description: note.description,
        note_type: note.note_type,
        product_id: productId
      }));

      const { error } = await supabase
        .from('fragrance_notes')
        .insert(notesWithProductId);

      if (error) throw error;
    } catch (error) {
      console.error('Error al guardar notas de fragancia:', error);
      throw error;
    }
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
            .map((img) => 
              uploadImage(img.file as File, product.id)
            );

          await Promise.all(imagePromises);
        }

        // 3. Guardar notas de fragancia si hay alguna
        if (values.fragranceNotes && values.fragranceNotes.length > 0) {
          await saveFragranceNotes(product.id, values.fragranceNotes);
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

        // 3. Actualizar notas de fragancia
        await saveFragranceNotes(id, values.fragranceNotes || []);

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
      // 1. Primero eliminar las notas de fragancia
      await supabase
        .from('fragrance_notes')
        .delete()
        .eq('product_id', id);

      // 2. Eliminar las imágenes
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

      // 3. Eliminar el producto
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
    const { data: images, error: imagesError } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', product.id)
      .order('display_order', { ascending: true });
      
    if (imagesError) {
      console.error("Error al cargar imágenes:", imagesError);
    }
    
    // Cargar notas de fragancia
    const { data: fragranceNotes, error: notesError } = await supabase
      .from('fragrance_notes')
      .select('*')
      .eq('product_id', product.id);
      
    if (notesError) {
      console.error("Error al cargar notas de fragancia:", notesError);
    }
    
    // Mapear imágenes para el formulario
    const formattedImages = images ? images.map(img => ({
      id: img.id,
      url: img.image_url
    })) : [];
    
    // Formatear notas de fragancia para el formulario
    const formattedNotes: FragranceNote[] = fragranceNotes ? fragranceNotes.map(note => ({
      description: note.description,
      note_type: note.note_type as NoteType
    })) : [];
    
    form.reset({
      name: product.name,
      brand: product.brand,
      description: product.description || "",
      price: product.price,
      stock: product.stock,
      gender: product.gender,
      images: formattedImages,
      fragranceNotes: formattedNotes,
    });
    
    setIsOpen(true);
  };

  const getNoteTypeLabel = (type: string) => {
    const labels = {
      top: "Salida",
      middle: "Corazón",
      base: "Fondo"
    };
    return labels[type as keyof typeof labels] || type;
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
                fragranceNotes: [],
              });
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <Tabs defaultValue="general">
                  <TabsList className="mb-4">
                    <TabsTrigger value="general">Información General</TabsTrigger>
                    <TabsTrigger value="images">Imágenes</TabsTrigger>
                    <TabsTrigger value="fragrance">Notas de Fragancia</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="general">
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
                  </TabsContent>
                  
                  <TabsContent value="images">
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
                  </TabsContent>
                  
                  <TabsContent value="fragrance">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Añadir nueva nota</h3>
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <Input
                              placeholder="Descripción de la nota"
                              value={newNote.description}
                              onChange={(e) => setNewNote({...newNote, description: e.target.value})}
                            />
                          </div>
                          <Select 
                            value={newNote.note_type}
                            onValueChange={(value) => setNewNote({...newNote, note_type: value as NoteType})}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Tipo de nota" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="top">Nota de Salida</SelectItem>
                              <SelectItem value="middle">Nota de Corazón</SelectItem>
                              <SelectItem value="base">Nota de Fondo</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button type="button" onClick={addFragranceNote}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Lista de notas añadidas */}
                      <div>
                        <h3 className="text-sm font-medium mb-2">Notas añadidas</h3>
                        <div className="border rounded-md overflow-hidden">
                          {form.watch('fragranceNotes')?.length > 0 ? (
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Descripción</TableHead>
                                  <TableHead>Tipo</TableHead>
                                  <TableHead className="w-[100px]">Acción</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {form.watch('fragranceNotes')?.map((note, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{note.description}</TableCell>
                                    <TableCell>{getNoteTypeLabel(note.note_type)}</TableCell>
                                    <TableCell>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeFragranceNote(index)}
                                      >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          ) : (
                            <div className="py-6 text-center text-muted-foreground">
                              No hay notas de fragancia añadidas
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <Button type="submit" className="w-full" disabled={isUploading}>
                  {isUploading ? "Guardando..." : (selectedProduct ? "Actualizar" : "Crear")}
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
