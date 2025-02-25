
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Sección de encabezado con gradiente */}
      <div className="gradient-header h-16"></div>
      
      {/* Hero section */}
      <section className="hero-luxury">
        <div className="hero-content text-center">
          <h1 className="hero-title">Profumi D'incanto</h1>
          <p className="hero-subtitle">
            Descubre nuestra exclusiva colección de fragancias de lujo que despiertan emociones y evocan recuerdos inolvidables.
          </p>
          <div className="hero-buttons">
            <Link to="/catalog/female">
              <button className="button-luxury">Fragancias para Mujer</button>
            </Link>
            <Link to="/catalog/male">
              <button className="button-luxury">Fragancias para Hombre</button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Sección de categorías */}
      <section className="black-section">
        <div className="container mx-auto">
          <h2 className="section-title">Nuestra Colección</h2>
          <div className="golden-divider"></div>
          
          <div className="category-container">
            {/* Categoría 1 */}
            <div className="category-card" style={{ backgroundImage: "url('/lovable-uploads/799e3b7d-2632-48fa-8f4e-5c95ec89336e.png')" }}>
              <div className="category-content">
                <h3 className="category-title">Fragancias para Mujer</h3>
                <p className="category-description">Descubre nuestra exclusiva colección de perfumes femeninos con aromas cautivadores.</p>
                <Link to="/catalog/female">
                  <button className="circular-button">
                    Explorar
                  </button>
                </Link>
              </div>
            </div>
            
            {/* Categoría 2 */}
            <div className="category-card" style={{ backgroundImage: "url('/lovable-uploads/119d8d7b-60e2-46dd-9a19-632542ed15ae.png')" }}>
              <div className="category-content">
                <h3 className="category-title">Fragancias para Hombre</h3>
                <p className="category-description">Explora nuestra selección de perfumes masculinos con personalidad y carácter.</p>
                <Link to="/catalog/male">
                  <button className="circular-button">
                    Explorar
                  </button>
                </Link>
              </div>
            </div>
            
            {/* Categoría 3 */}
            <div className="category-card" style={{ backgroundImage: "url('/lovable-uploads/2c6dbf7f-9cac-486c-9875-538bbfb09192.png')" }}>
              <div className="category-content">
                <h3 className="category-title">Colección Completa</h3>
                <p className="category-description">Todas nuestras fragancias de lujo en un solo lugar para tu elección.</p>
                <Link to="/catalog">
                  <button className="circular-button">
                    Explorar
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sección de características */}
      <section className="black-section">
        <div className="container mx-auto">
          <h2 className="section-title">Por Qué Elegirnos</h2>
          <div className="golden-divider"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            <div className="text-center">
              <h3 className="text-primary font-elegant text-xl mb-3">Calidad Premium</h3>
              <p className="text-white/80">
                Todas nuestras fragancias están elaboradas con los mejores ingredientes y procesos artesanales.
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-primary font-elegant text-xl mb-3">Exclusividad</h3>
              <p className="text-white/80">
                Ofrecemos fragancias únicas que no encontrarás en ningún otro lugar del mercado.
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-primary font-elegant text-xl mb-3">Experiencia Sensorial</h3>
              <p className="text-white/80">
                Cada perfume está diseñado para evocar emociones y crear experiencias sensoriales inolvidables.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
