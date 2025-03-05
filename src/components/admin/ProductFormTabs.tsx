
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductGeneralTab from "./ProductGeneralTab";
import ProductImagesTab from "./ProductImagesTab";
import ProductFragranceNotesTab from "./ProductFragranceNotesTab";
import { FragranceNote, ProductFormValues } from "./types";
import { UseFormReturn } from "react-hook-form";

interface ProductFormTabsProps {
  form: UseFormReturn<ProductFormValues>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
  newNote: FragranceNote;
  setNewNote: React.Dispatch<React.SetStateAction<FragranceNote>>;
  addFragranceNote: () => void;
  removeFragranceNote: (index: number) => void;
}

const ProductFormTabs = ({
  form,
  fileInputRef,
  handleFileChange,
  removeImage,
  newNote,
  setNewNote,
  addFragranceNote,
  removeFragranceNote,
}: ProductFormTabsProps) => {
  return (
    <Tabs defaultValue="general">
      <TabsList className="mb-4">
        <TabsTrigger value="general">Información General</TabsTrigger>
        <TabsTrigger value="images">Imágenes</TabsTrigger>
        <TabsTrigger value="fragrance">Notas de Fragancia</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general">
        <ProductGeneralTab form={form} />
      </TabsContent>
      
      <TabsContent value="images">
        <ProductImagesTab 
          form={form} 
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
          removeImage={removeImage}
        />
      </TabsContent>
      
      <TabsContent value="fragrance">
        <ProductFragranceNotesTab 
          form={form}
          newNote={newNote}
          setNewNote={setNewNote}
          addFragranceNote={addFragranceNote}
          removeFragranceNote={removeFragranceNote}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ProductFormTabs;
