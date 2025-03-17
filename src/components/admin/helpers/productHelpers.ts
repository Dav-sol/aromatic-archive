
import * as productService from "@/services";

export const loadProductDetails = async (product: any) => {
  // Cargar las imágenes del producto
  const images = await productService.fetchProductImages(product.id);
  
  // Cargar notas de fragancia
  const fragranceNotes = await productService.fetchFragranceNotes(product.id);
  
  // Mapear imágenes para el formulario
  const formattedImages = images ? images.map(img => ({
    id: img.id,
    url: img.image_url
  })) : [];
  
  // Formatear notas de fragancia para el formulario
  const formattedNotes = fragranceNotes ? fragranceNotes.map(note => ({
    description: note.description,
    note_type: note.note_type as "top" | "middle" | "base"
  })) : [];
  
  const initialValues = {
    name: product.name,
    brand: product.brand,
    description: product.description || "",
    price: product.price,
    stock: product.stock,
    gender: product.gender,
    images: formattedImages,
    fragranceNotes: formattedNotes,
    isFeatured: product.is_featured || false,
    discountPercentage: product.discount_percentage || 0
  };
  
  return {
    ...product, 
    initialValues
  };
};
