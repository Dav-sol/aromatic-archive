
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductForm from "./ProductForm";
import { ProductFormValues } from "./types";

interface AdminPanelHeaderProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedProduct: any | null;
  setSelectedProduct: (product: any | null) => void;
  setImagesToDelete: (images: string[]) => void;
  onSubmit: (values: ProductFormValues) => void;
  isUploading: boolean;
}

const AdminPanelHeader = ({
  isOpen,
  setIsOpen,
  selectedProduct,
  setSelectedProduct,
  setImagesToDelete,
  onSubmit,
  isUploading
}: AdminPanelHeaderProps) => {
  return (
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
  );
};

export default AdminPanelHeader;
