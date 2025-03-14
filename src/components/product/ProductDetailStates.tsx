
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export const ProductDetailLoading = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Skeleton className="h-10 w-40" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery Skeleton */}
        <div className="space-y-4">
          <Skeleton className="aspect-square w-full" />
          <div className="flex space-x-2">
            <Skeleton className="h-20 w-20" />
            <Skeleton className="h-20 w-20" />
            <Skeleton className="h-20 w-20" />
          </div>
        </div>
        
        {/* Product Info Skeleton */}
        <div className="space-y-6">
          <div>
            <Skeleton className="h-10 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/4 mb-2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
          
          <div className="py-4 border-t border-b">
            <Skeleton className="h-6 w-1/4 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          
          <div>
            <Skeleton className="h-6 w-1/3 mb-3" />
            <div className="grid grid-cols-3 gap-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
          
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
            
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          
          <Skeleton className="h-12 w-full mt-4" />
        </div>
      </div>
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
