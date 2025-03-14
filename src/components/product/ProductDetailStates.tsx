
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const ProductDetailLoading = () => {
  return (
    <div className="flex justify-center py-16">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
    </div>
  );
};

export const ProductDetailNotFound = () => {
  return (
    <div className="text-center py-16">
      <h2 className="text-2xl font-bold">Producto no encontrado</h2>
      <p className="mt-2 text-muted-foreground">
        El producto que buscas no existe o ha sido eliminado.
      </p>
      <Button asChild className="mt-4">
        <Link to="/catalog">Volver al catálogo</Link>
      </Button>
    </div>
  );
};
