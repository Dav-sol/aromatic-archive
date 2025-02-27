
import { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevenir el desplazamiento cuando el menú está abierto
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-primary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <Link 
                to="/" 
                className="text-2xl font-elegant text-primary tracking-wide flex items-center"
                onClick={() => isMenuOpen && setIsMenuOpen(false)}
              >
                <img 
                  src="/lovable-uploads/2c6dbf7f-9cac-486c-9875-538bbfb09192.png" 
                  alt="Profumi D'incanto" 
                  className="h-8 mr-2"
                />
                <span>Profumi D'incanto</span>
              </Link>
            </div>
            
            {/* Menú de escritorio */}
            <div className="hidden sm:block desktop-menu">
              <div className="flex space-x-8">
                <Link
                  to="/catalog"
                  className="text-gray-700 hover:text-primary px-3 py-2 transition-colors border-b-2 border-transparent hover:border-primary"
                >
                  Catálogo
                </Link>
                <Link
                  to="/catalog/female"
                  className="text-gray-700 hover:text-primary px-3 py-2 transition-colors border-b-2 border-transparent hover:border-primary"
                >
                  Mujer
                </Link>
                <Link
                  to="/catalog/male"
                  className="text-gray-700 hover:text-primary px-3 py-2 transition-colors border-b-2 border-transparent hover:border-primary"
                >
                  Hombre
                </Link>
                <Link
                  to="/admin"
                  className="text-gray-700 hover:text-primary px-3 py-2 transition-colors border-b-2 border-transparent hover:border-primary"
                >
                  Administración
                </Link>
              </div>
            </div>
            
            {/* Botón de menú hamburguesa para móvil */}
            <div 
              className={`hamburger-icon flex flex-col items-center justify-center ${isMenuOpen ? 'hamburger-active' : ''}`}
              onClick={toggleMenu}
            >
              <div className="hamburger-line"></div>
              <div className="hamburger-line"></div>
              <div className="hamburger-line"></div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Menú móvil */}
      <div className={`mobile-menu-container ${isMenuOpen ? 'visible' : 'hidden'}`}>
        <div className="flex flex-col w-full py-10">
          <Link
            to="/"
            className="mobile-menu-link"
            onClick={toggleMenu}
          >
            Inicio
          </Link>
          <Link
            to="/catalog"
            className="mobile-menu-link"
            onClick={toggleMenu}
          >
            Catálogo
          </Link>
          <Link
            to="/catalog/female"
            className="mobile-menu-link"
            onClick={toggleMenu}
          >
            Mujer
          </Link>
          <Link
            to="/catalog/male"
            className="mobile-menu-link"
            onClick={toggleMenu}
          >
            Hombre
          </Link>
          <Link
            to="/admin"
            className="mobile-menu-link"
            onClick={toggleMenu}
          >
            Administración
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navigation;
