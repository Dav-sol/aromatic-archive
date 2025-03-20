
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
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
      
      {/* Contenido centrado */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-5xl md:text-7xl font-elegant text-white shadow-text tracking-wide mb-6 mt-[-100px]">
          Elegancia
        </h1>
        
        <div className="absolute bottom-20 w-full flex flex-col items-center">
          <Link to="/catalog">
            <Button variant="outline" className="rounded-full bg-black/20 backdrop-blur-sm text-white border-white/20 hover:bg-black/40 px-8 py-6 text-lg">
              Explorar Colección
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroFragrance;
