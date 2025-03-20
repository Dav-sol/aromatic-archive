
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroFragrance = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Fondo de imagen a pantalla completa */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/0b8c9f07-b7e5-453c-be87-68ae8398b703.png" 
          alt="Fragancia de lujo" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Contenido centrado */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-7xl md:text-9xl font-elegant text-white shadow-text tracking-wider mb-10">
          Elegancia
        </h1>
        
        <Link to="/catalog">
          <Button variant="outline" className="rounded-full bg-black/30 backdrop-blur-sm text-white border-white/20 hover:bg-black/50 px-8 py-6 text-lg">
            Explorar Colección
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HeroFragrance;
