
import { useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FragranceNote, ProductFormValues, productSchema } from "./types";
import ProductFormTabs from "./ProductFormTabs";
import { useToast } from "@/components/ui/use-toast";

interface ProductFormProps {
  initialValues: ProductFormValues;
  onSubmit: (values: ProductFormValues) => void;
  isUploading: boolean;
  isEdit: boolean;
}

const ProductForm = ({
  initialValues,
  onSubmit,
  isUploading,
  isEdit
}: ProductFormProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newNote, setNewNote] = useState<FragranceNote>({ description: "", note_type: "top" });

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialValues
  });

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

  const removeImage = async (index: number) => {
    const currentImages = form.getValues('images') || [];
    const image = currentImages[index];
    
    // Liberar URL de objeto si existe
    if (image.url && !image.id) {
      URL.revokeObjectURL(image.url);
    }
    
    const newImages = [...currentImages];
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <ProductFormTabs 
          form={form}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
          removeImage={removeImage}
          newNote={newNote}
          setNewNote={setNewNote}
          addFragranceNote={addFragranceNote}
          removeFragranceNote={removeFragranceNote}
        />
        
        <Button type="submit" className="w-full" disabled={isUploading}>
          {isUploading ? "Guardando..." : (isEdit ? "Actualizar" : "Crear")}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
