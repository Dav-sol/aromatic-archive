
// This file is now a barrel file that re-exports from the new service modules
// to maintain backward compatibility and avoid breaking existing imports

export {
  fetchProducts,
  fetchProductImages,
  fetchFragranceNotes,
  uploadImage,
  deleteImageFromDB,
  saveFragranceNotes,
  createProduct,
  updateProduct,
  deleteProduct
} from '@/services';
