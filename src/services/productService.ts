
import { supabase } from '@/integrations/supabase/client';
import { ProductFormValues } from '@/components/admin/types';
import { uploadImage, deleteImageFromDB } from './imageService';
import { saveFragranceNotes } from './fragranceService';

export const fetchProducts = async () => {
  const { data: productsData, error: productsError } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (productsError) {
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
};

export const createProduct = async (values: ProductFormValues) => {
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
      is_featured: values.isFeatured,
      discount_percentage: values.discountPercentage
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
};

export const updateProduct = async (id: string, values: ProductFormValues, imagesToDelete: string[]) => {
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
      is_featured: values.isFeatured,
      discount_percentage: values.discountPercentage
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  // 2. Eliminar imágenes seleccionadas para borrar
  if (imagesToDelete.length > 0) {
    const deletePromises = imagesToDelete.map(imageId => deleteImageFromDB(imageId));
    await Promise.all(deletePromises);
  }

  // 3. Procesar imágenes nuevas
  if (values.images && values.images.length > 0) {
    const newImages = values.images.filter(img => img.file);
    
    if (newImages.length > 0) {
      const imagePromises = newImages.map((img) => 
        uploadImage(img.file as File, id)
      );
      
      await Promise.all(imagePromises);
    }
  }

  // 4. Actualizar notas de fragancia
  await saveFragranceNotes(id, values.fragranceNotes || []);

  return product;
};

export const deleteProduct = async (id: string) => {
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
  }

  // 3. Eliminar el producto
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
};
