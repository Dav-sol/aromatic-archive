
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Image as ImageIcon, Star, TagIcon } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { UseMutationResult } from "@tanstack/react-query";

interface ProductsTableProps {
  products: any[];
  handleEdit: (product: any) => void;
  deleteProduct: UseMutationResult<any, Error, string, unknown>;
}

const ProductsTable = ({
  products,
  handleEdit,
  deleteProduct,
}: ProductsTableProps) => {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Marca</TableHead>
            <TableHead>Género</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Estado</TableHead>
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
              <TableCell className="font-medium max-w-[200px] truncate" title={product.name}>
                {product.name}
              </TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell className="capitalize">
                {product.gender === 'male' ? 'Masculino' : 'Femenino'}
              </TableCell>
              <TableCell>
                {product.is_on_sale ? (
                  <div>
                    <span className="line-through text-muted-foreground text-sm">
                      $ {Number(product.price).toLocaleString('es-CO')}
                    </span>
                    <br />
                    <span className="text-red-600">
                      $ {Number(product.sale_price).toLocaleString('es-CO')}
                    </span>
                  </div>
                ) : (
                  <span>$ {Number(product.price).toLocaleString('es-CO')}</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {product.is_featured && (
                    <Badge variant="outline" className="border-yellow-500 text-yellow-700 flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Destacado
                    </Badge>
                  )}
                  {product.is_on_sale && (
                    <Badge variant="outline" className="border-red-500 text-red-700 flex items-center gap-1">
                      <TagIcon className="h-3 w-3" />
                      {product.discount_percentage}% dcto
                    </Badge>
                  )}
                </div>
              </TableCell>
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
  );
};

export default ProductsTable;
