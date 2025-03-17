
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroFragrance = () => {
  return (
    <section className="relative bg-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Contenido texto - lado izquierdo */}
          <div className="pr-0 lg:pr-10">
            <h2 className="text-6xl sm:text-7xl font-elegant text-primary/90 mb-6">
              Fragancias únicas
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-2xl">
              Descubre nuestras exclusivas fragancias artesanales y llena tu espacio con aromas que inspiran, cautivan y resuenan con tu personalidad.
            </p>
            <Link to="/catalog">
              <Button className="bg-primary text-white hover:bg-primary/90 text-base px-8 py-6">
                Explorar la colección
              </Button>
            </Link>
          </div>
          
          {/* Imagen perfume - lado derecho */}
          <div className="relative">
            <div className="aspect-square w-full max-w-lg mx-auto relative">
              <div className="absolute inset-0 bg-[#FDF7F3] rounded-2xl transform -rotate-3"></div>
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-2xl transform rotate-3"></div>
              <img 
                src="/lovable-uploads/9e593248-72c4-4a06-8137-aa97516ace9f.png" 
                alt="Fragancia exclusiva" 
                className="w-full h-full object-contain relative z-10 p-6"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Rating/estrellitas como en el ejemplo */}
      <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-20 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Excelente</span>
          <span className="mx-1 text-gray-400">•</span>
          <span className="text-sm font-medium text-gray-700">4.9 calificación</span>
          <div className="flex ml-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg 
                key={star} 
                className="w-4 h-4 text-primary/90 fill-current" 
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroFragrance;
