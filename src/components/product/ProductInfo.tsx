
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FragranceNotes from './FragranceNotes';

interface ProductInfoProps {
  product: {
    name: string;
    brand: string;
    price: number;
    sale_price?: number;
    is_on_sale?: boolean;
    description: string;
    stock: number;
    gender: string;
    notes: {
      top: any[];
      middle: any[];
      base: any[];
    };
  };
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  // Function to generate the WhatsApp link
  const generateWhatsAppLink = () => {
    if (!product) return '#';
    
    const phoneNumber = '573023357375'; // Number with international format
    const message = encodeURIComponent(
      `Hola, estoy interesado/a en el perfume ${product.name} (${product.brand}). ¿Podrías darme más información?`
    );
    
    return `https://wa.me/${phoneNumber}?text=${message}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-xl font-semibold mt-2">
          {product.is_on_sale && product.sale_price ? (
            <>
              <span className="line-through text-muted-foreground mr-2">$ {Number(product.price).toLocaleString('es-CO')}</span>
              <span className="text-red-600">$ {Number(product.sale_price).toLocaleString('es-CO')}</span>
            </>
          ) : (
            `$ ${Number(product.price).toLocaleString('es-CO')}`
          )}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Marca: {product.brand}
        </p>
      </div>
      
      {/* Description */}
      <div className="py-4 border-t border-b">
        <h3 className="font-medium mb-2">Descripción</h3>
        <p className="text-muted-foreground">{product.description}</p>
      </div>
      
      {/* Fragrance Notes */}
      <FragranceNotes notes={product.notes} />
      
      {/* Additional Information */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <div className="w-24">Stock:</div>
          <div>{product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}</div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-24">Género:</div>
          <div className="capitalize">
            {product.gender === 'male' ? 'Masculino' : 'Femenino'}
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <Button 
        className="w-full mt-4" 
        size="lg" 
        asChild
      >
        <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="mr-2 h-5 w-5" />
          Consultar por WhatsApp
        </a>
      </Button>
    </div>
  );
};

export default ProductInfo;
