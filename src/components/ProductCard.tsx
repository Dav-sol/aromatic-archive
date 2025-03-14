
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`} className="group relative block">
      <div className="card-luxury gold-shine">
        <div className="aspect-square w-full overflow-hidden bg-black relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
          />
          {product.isOnSale && (
            <div className="absolute top-2 right-2 bg-black text-primary text-xs font-medium px-2 py-1 rounded border border-primary/30">
              EN OFERTA
            </div>
          )}
        </div>
        <div className="p-4 bg-card">
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-2">
              <h3 className="text-primary font-elegant text-lg font-medium truncate">
                {product.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{product.brand}</p>
            </div>
            <div className={cn("text-sm whitespace-nowrap", product.isOnSale ? "text-red-500" : "text-primary")}>
              {product.isOnSale ? (
                <>
                  <span className="line-through text-muted-foreground">$ {product.price.toLocaleString('es-CO')}</span>
                  <br />
                  <span className="font-medium">$ {product.salePrice?.toLocaleString('es-CO')}</span>
                </>
              ) : (
                <span className="font-medium">$ {product.price.toLocaleString('es-CO')}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
