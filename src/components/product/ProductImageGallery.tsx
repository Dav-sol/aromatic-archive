
import { useState } from 'react';

interface ProductImageGalleryProps {
  images: string[];
}

const ProductImageGallery = ({ images }: ProductImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="space-y-4">
      <div className="aspect-square overflow-hidden rounded-lg border bg-muted">
        {images && images.length > 0 ? (
          <img
            src={images[selectedImageIndex]}
            alt="Product image"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-secondary">
            <p className="text-muted-foreground">No hay imagen disponible</p>
          </div>
        )}
      </div>
      
      {/* Miniaturas */}
      {images && images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border ${
                selectedImageIndex === index
                  ? "ring-2 ring-primary ring-offset-2"
                  : ""
              }`}
            >
              <img
                src={image}
                alt={`Vista ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
