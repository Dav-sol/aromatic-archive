
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Hero section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black z-10"></div>
          <img 
            src="/lovable-uploads/799e3b7d-2632-48fa-8f4e-5c95ec89336e.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        
        <div className="relative z-20 max-w-4xl mx-auto text-center px-4">
          <img 
            src="/lovable-uploads/2c6dbf7f-9cac-486c-9875-538bbfb09192.png" 
            alt="Profumi D'incanto Logo" 
            className="h-32 mx-auto mb-6"
          />
          <h1 className="text-5xl md:text-7xl font-elegant text-primary mb-6">
            Profumi D'incanto
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
            Descubre nuestra exclusiva colección de fragancias de lujo que evocan emociones y recuerdos inolvidables.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/catalog/female">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-black group">
                Fragancias para Mujer
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/catalog/male">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-black group">
                Fragancias para Hombre
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Sección de categorías elegantes */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-elegant text-primary text-center mb-4">Nuestra Colección</h2>
          <div className="h-px w-24 bg-primary mx-auto mb-16"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Categoría Mujer */}
            <div className="group relative overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300 z-10"></div>
              <img 
                src="/lovable-uploads/799e3b7d-2632-48fa-8f4e-5c95ec89336e.png" 
                alt="Fragancias para Mujer" 
                className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-20">
                <h3 className="text-2xl font-elegant text-primary mb-2">Fragancias para Mujer</h3>
                <p className="text-white text-center mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Descubre nuestra colección de perfumes femeninos con aromas cautivadores.
                </p>
                <Link to="/catalog/female">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-black">
                    Explorar Colección
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Categoría Hombre */}
            <div className="group relative overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300 z-10"></div>
              <img 
                src="/lovable-uploads/119d8d7b-60e2-46dd-9a19-632542ed15ae.png" 
                alt="Fragancias para Hombre" 
                className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-20">
                <h3 className="text-2xl font-elegant text-primary mb-2">Fragancias para Hombre</h3>
                <p className="text-white text-center mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explora nuestra selección de perfumes masculinos con personalidad y carácter.
                </p>
                <Link to="/catalog/male">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-black">
                    Explorar Colección
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Categoría Colección Completa */}
            <div className="group relative overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300 z-10"></div>
              <img 
                src="/lovable-uploads/2c6dbf7f-9cac-486c-9875-538bbfb09192.png" 
                alt="Colección Completa" 
                className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-20">
                <h3 className="text-2xl font-elegant text-primary mb-2">Colección Completa</h3>
                <p className="text-white text-center mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Todas nuestras fragancias de lujo en un solo lugar para tu elección.
                </p>
                <Link to="/catalog">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-black">
                    Explorar Colección
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sección de características */}
      <section className="py-20 bg-gradient-to-b from-black to-black/90">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-elegant text-primary text-center mb-4">Por Qué Elegirnos</h2>
          <div className="h-px w-24 bg-primary mx-auto mb-16"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-black/50 p-8 rounded-lg border border-primary/20 hover:border-primary/50 transition-colors duration-300 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-primary text-2xl">✦</span>
              </div>
              <h3 className="text-xl font-elegant text-primary mb-4">Calidad Premium</h3>
              <p className="text-white/80">
                Nuestras fragancias están elaboradas con los mejores ingredientes y procesos artesanales, garantizando una experiencia olfativa excepcional.
              </p>
            </div>
            
            <div className="bg-black/50 p-8 rounded-lg border border-primary/20 hover:border-primary/50 transition-colors duration-300 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-primary text-2xl">✦</span>
              </div>
              <h3 className="text-xl font-elegant text-primary mb-4">Exclusividad</h3>
              <p className="text-white/80">
                Ofrecemos fragancias únicas que no encontrarás en ningún otro lugar, creadas por maestros perfumistas con décadas de experiencia.
              </p>
            </div>
            
            <div className="bg-black/50 p-8 rounded-lg border border-primary/20 hover:border-primary/50 transition-colors duration-300 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-primary text-2xl">✦</span>
              </div>
              <h3 className="text-xl font-elegant text-primary mb-4">Experiencia Sensorial</h3>
              <p className="text-white/80">
                Cada perfume está diseñado para evocar emociones y crear momentos inolvidables, transformando lo cotidiano en extraordinario.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sección CTA */}
      <section className="py-16 bg-luxury-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#17cfd7] to-[#845ef1] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-elegant text-white mb-6">Eleva tu presencia con nuestras fragancias</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Descubre el poder transformador de nuestras exquisitas fragancias y déjate envolver por sus notas encantadoras.
          </p>
          <Link to="/catalog">
            <Button size="lg" className="bg-primary text-black hover:bg-primary/90">
              Explora toda la colección
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
