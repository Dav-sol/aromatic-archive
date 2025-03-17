
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroFragrance = () => {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-gray-50">
      {/* Fondo de imagen a pantalla completa */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/30f94e12-2c02-44ec-96a8-32c9452c7bb1.png" 
          alt="Fragancia de lujo" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Contenido centrado */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full pt-16 text-center">
        <h1 className="text-5xl md:text-6xl font-elegant text-primary mt-10 mb-2">
          Elegancia
        </h1>
        
        <div className="mt-auto mb-20 flex flex-col items-center">
          <Link to="/catalog" className="mb-4">
            <Button variant="outline" className="rounded-full bg-black/60 backdrop-blur-sm text-white border-white/20 hover:bg-black/80 px-8 py-3">
              Explorar Colección
            </Button>
          </Link>
          
          <Link to="/product/1" className="underline text-sm text-white/90 hover:text-white">
            Ver Detalles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroFragrance;
