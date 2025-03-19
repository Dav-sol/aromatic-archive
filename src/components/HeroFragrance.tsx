
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroFragrance = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gray-50">
      {/* Fondo de imagen a pantalla completa */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/6f36387f-5abc-43a7-8cbc-9beeaf16a4cf.png" 
          alt="Fragancia de lujo" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      {/* Contenido centrado */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-5xl md:text-6xl font-elegant text-white mt-10 mb-2 tracking-wide">
          Elegancia
        </h1>
        
        <div className="mt-auto mb-20 flex flex-col items-center">
          <Link to="/catalog" className="mb-4">
            <Button variant="outline" className="rounded-full bg-black/40 backdrop-blur-sm text-white border-white/20 hover:bg-black/60 px-8 py-3">
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
