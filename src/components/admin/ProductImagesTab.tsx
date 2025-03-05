
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "./types";
import { FormLabel } from "@/components/ui/form";
import { X, Upload } from "lucide-react";

interface ProductImagesTabProps {
  form: UseFormReturn<ProductFormValues>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
}

const ProductImagesTab = ({ 
  form, 
  fileInputRef, 
  handleFileChange, 
  removeImage 
}: ProductImagesTabProps) => {
  return (
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
  );
};

export default ProductImagesTab;
