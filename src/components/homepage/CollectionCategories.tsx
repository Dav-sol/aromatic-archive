
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CollectionCategories = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-elegant text-primary text-center mb-4">Nuestra Colección</h2>
        <div className="h-px w-24 bg-primary mx-auto mb-16"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Categoría Mujer */}
          <div className="group relative overflow-hidden rounded-lg shadow-md border border-primary/20">
            <div className="absolute inset-0 bg-white/50 group-hover:bg-white/30 transition-all duration-300 z-10"></div>
            <img 
              src="/lovable-uploads/799e3b7d-2632-48fa-8f4e-5c95ec89336e.png" 
              alt="Fragancias para Mujer" 
              className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-20">
              <h3 className="text-2xl font-elegant text-primary mb-2">Fragancias para Mujer</h3>
              <p className="text-gray-800 text-center mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Descubre nuestra colección de perfumes femeninos con aromas cautivadores.
              </p>
              <Link to="/catalog/female">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Explorar Colección
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Categoría Hombre */}
          <div className="group relative overflow-hidden rounded-lg shadow-md border border-primary/20">
            <div className="absolute inset-0 bg-white/50 group-hover:bg-white/30 transition-all duration-300 z-10"></div>
            <img 
              src="/lovable-uploads/119d8d7b-60e2-46dd-9a19-632542ed15ae.png" 
              alt="Fragancias para Hombre" 
              className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-20">
              <h3 className="text-2xl font-elegant text-primary mb-2">Fragancias para Hombre</h3>
              <p className="text-gray-800 text-center mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Explora nuestra selección de perfumes masculinos con personalidad y carácter.
              </p>
              <Link to="/catalog/male">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Explorar Colección
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Categoría Colección Completa */}
          <div className="group relative overflow-hidden rounded-lg shadow-md border border-primary/20">
            <div className="absolute inset-0 bg-white/50 group-hover:bg-white/30 transition-all duration-300 z-10"></div>
            <img 
              src="/lovable-uploads/2c6dbf7f-9cac-486c-9875-538bbfb09192.png" 
              alt="Colección Completa" 
              className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-20">
              <h3 className="text-2xl font-elegant text-primary mb-2">Colección Completa</h3>
              <p className="text-gray-800 text-center mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Todas nuestras fragancias de lujo en un solo lugar para tu elección.
              </p>
              <Link to="/catalog">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Explorar Colección
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionCategories;
