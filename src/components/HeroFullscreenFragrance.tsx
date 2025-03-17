
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroFullscreenFragrance = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#f8e5d7] to-white z-0"></div>
      
      {/* Fondo con elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-[10%] w-60 h-60 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-[10%] w-60 h-60 bg-[#f8d0b0]/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Texto lado izquierdo */}
          <div className="lg:col-span-6 lg:pr-8">
            <h2 className="text-5xl sm:text-7xl font-elegant text-primary mb-6">
              Elegancia en cada <br/>fragancia
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-2xl">
              Cada perfume cuenta una historia única, evocando emociones y creando experiencias sensoriales que perduran en el tiempo.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/catalog/female">
                <Button className="bg-primary text-white hover:bg-primary/90 text-base px-6 py-5 w-full sm:w-auto">
                  Para mujer
                </Button>
              </Link>
              <Link to="/catalog/male">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 text-base px-6 py-5 w-full sm:w-auto">
                  Para hombre
                </Button>
              </Link>
            </div>
            
            {/* Rating/estrellitas */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
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
          
          {/* Imagen perfume - lado derecho */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto">
              <div className="absolute -inset-4 bg-white/50 backdrop-blur-sm rounded-3xl transform rotate-6 border border-white/70"></div>
              <div className="absolute -inset-4 bg-[#fcf0e9]/80 rounded-3xl transform -rotate-3"></div>
              <div className="relative aspect-square max-w-md mx-auto">
                <img 
                  src="/lovable-uploads/9e593248-72c4-4a06-8137-aa97516ace9f.png" 
                  alt="Fragancia exclusiva" 
                  className="w-full h-full object-contain relative z-10 p-8"
                />
                
                {/* Elementos decorativos */}
                <img 
                  src="/lovable-uploads/53bb3c6e-168e-421a-b7c3-a95e962c22ab.png" 
                  alt="Elemento decorativo" 
                  className="absolute top-0 -right-16 w-40 h-auto z-0 opacity-60 transform -rotate-12"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroFullscreenFragrance;
