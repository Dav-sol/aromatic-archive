
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`} className="group relative block">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
        />
        {product.isOnSale && (
          <div className="absolute top-2 right-2 bg-black text-white text-xs font-medium px-2 py-1 rounded">
            EN OFERTA
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700 font-medium">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
        </div>
        <div className={cn("text-sm", product.isOnSale ? "text-red-600" : "text-gray-900")}>
          {product.isOnSale ? (
            <>
              <span className="line-through text-gray-500">De ${product.price}</span>
              <br />
              <span>Desde ${product.salePrice}</span>
            </>
          ) : (
            `De $${product.price}`
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
