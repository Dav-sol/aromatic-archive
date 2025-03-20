
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroFragrance = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gray-50">
      {/* Fondo de imagen a pantalla completa */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/0b8c9f07-b7e5-453c-be87-68ae8398b703.png" 
          alt="Fragancia de lujo" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/5"></div>
      </div>
      
      {/* Contenido centrado */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-6xl md:text-8xl font-elegant text-white shadow-text tracking-wider mb-6">
          Elegancia
        </h1>
        
        <div className="absolute bottom-32 w-full flex flex-col items-center">
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
