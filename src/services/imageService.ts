
import { supabase } from '@/integrations/supabase/client';

export const fetchProductImages = async (productId: string) => {
  const { data, error } = await supabase
    .from('product_images')
    .select('*')
    .eq('product_id', productId)
    .order('display_order', { ascending: true });
    
  if (error) {
    console.error("Error al cargar imágenes:", error);
    throw error;
  }
  
  return data;
};

export const uploadImage = async (file: File, productId: string) => {
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

export const deleteImageFromDB = async (imageId: string) => {
  try {
    const { error } = await supabase
      .from('product_images')
      .delete()
      .eq('id', imageId);

    if (error) {
      throw error;
    }
    return true;
  } catch (error) {
    console.error('Error al eliminar imagen de la base de datos:', error);
    return false;
  }
};
