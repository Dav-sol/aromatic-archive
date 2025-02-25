
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ProductGrid from './ProductGrid';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { SearchIcon, FilterIcon } from 'lucide-react';

type CatalogProps = {
  gender?: 'male' | 'female';
};

const CatalogView = ({ gender }: CatalogProps) => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<string>('newest');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [search]);
  
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', gender, debouncedSearch, sort, minPrice, maxPrice],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select(`
          *,
          product_images(*)
        `);
      
      // Filtrar por género si está especificado
      if (gender) {
        query = query.eq('gender', gender);
      }
      
      // Filtrar por búsqueda
      if (debouncedSearch) {
        query = query.or(`name.ilike.%${debouncedSearch}%,brand.ilike.%${debouncedSearch}%`);
      }
      
      // Filtrar por precio mínimo
      if (minPrice !== '') {
        query = query.gte('price', minPrice);
      }
      
      // Filtrar por precio máximo
      if (maxPrice !== '') {
        query = query.lte('price', maxPrice);
      }
      
      // Ordenar
      if (sort === 'newest') {
        query = query.order('created_at', { ascending: false });
      } else if (sort === 'price-low') {
        query = query.order('price', { ascending: true });
      } else if (sort === 'price-high') {
        query = query.order('price', { ascending: false });
      } else if (sort === 'name-asc') {
        query = query.order('name', { ascending: true });
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      // Procesar y transformar los datos para adaptarlos al formato esperado
      const processedProducts = data.map(product => {
        // Extraer las URLs de las imágenes del array product_images
        const images = product.product_images
          ? product.product_images.map((img: { image_url: string }) => img.image_url)
          : [];
        
        // Retornar el producto con el formato adecuado
        return {
          ...product,
          images
        };
      });
      
      return processedProducts;
    },
  });
  
  const getTitleText = () => {
    if (gender === 'male') return 'Fragancias para Hombre';
    if (gender === 'female') return 'Fragancias para Mujer';
    return 'Catálogo de Fragancias';
  };
  
  const getSubtitleText = () => {
    if (gender === 'male') return 'Encuentra las mejores fragancias masculinas';
    if (gender === 'female') return 'Descubre nuestra colección femenina exclusiva';
    return 'Explora nuestra amplia selección de fragancias de lujo';
  };
  
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{getTitleText()}</h1>
        <p className="text-muted-foreground">{getSubtitleText()}</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Barra de búsqueda */}
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o marca..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        {/* Filtros */}
        <div className="flex gap-2">
          <Select onValueChange={(value) => setSort(value)} defaultValue={sort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Más recientes</SelectItem>
              <SelectItem value="price-low">Precio: menor a mayor</SelectItem>
              <SelectItem value="price-high">Precio: mayor a menor</SelectItem>
              <SelectItem value="name-asc">Nombre: A-Z</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex gap-2 items-center">
            <Input
              type="number"
              placeholder="Min €"
              className="w-20"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : '')}
            />
            <span>-</span>
            <Input
              type="number"
              placeholder="Max €"
              className="w-20"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : '')}
            />
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
        </div>
      ) : products && products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No se encontraron productos</h3>
          <p className="text-muted-foreground mt-2">
            Intenta cambiar los filtros o la búsqueda
          </p>
        </div>
      )}
    </div>
  );
};

export default CatalogView;
