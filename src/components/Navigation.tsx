
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAdminLink, setShowAdminLink] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevenir el desplazamiento cuando el menú está abierto
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // Logo click counter for admin access
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const currentTime = new Date().getTime();
    
    // Reset counter if more than 2 seconds between clicks
    if (currentTime - lastClickTime > 2000) {
      setLogoClickCount(1);
    } else {
      setLogoClickCount(prev => prev + 1);
    }
    
    setLastClickTime(currentTime);
    
    // Activate admin link after 5 rapid clicks
    if (logoClickCount === 4) {
      setShowAdminLink(prev => !prev);
      setLogoClickCount(0);
    }
    
    // Normal link behavior after handling the click counting
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    window.location.href = '/';
  };

  // Mantener el atajo de teclado como método alternativo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setShowAdminLink(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Detectar scroll para añadir sombra a la barra de navegación
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú cuando se cambia de ruta
  useEffect(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  }, [location.pathname]);

  // Secret path detection
  useEffect(() => {
    // Check if URL contains the secret admin access parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('access') === 'admin') {
      setShowAdminLink(true);
      
      // Remove the parameter from URL for discretion
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [location]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-primary/30 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <a 
                href="/"
                className="text-xl sm:text-2xl font-elegant text-primary tracking-wide flex items-center"
                onClick={handleLogoClick}
              >
                <img 
                  src="/lovable-uploads/2c6dbf7f-9cac-486c-9875-538bbfb09192.png" 
                  alt="Profumi D'incanto" 
                  className="h-6 sm:h-8 mr-2"
                />
                <span className="hidden sm:inline">Profumi D'incanto</span>
                <span className="sm:hidden">Profumi</span>
              </a>
            </div>
            
            {/* Menú de escritorio */}
            <div className="hidden md:block desktop-menu">
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
                {showAdminLink && (
                  <Link
                    to="/admin"
                    className="text-gray-700 hover:text-primary px-3 py-2 transition-colors border-b-2 border-transparent hover:border-primary"
                  >
                    Administración
                  </Link>
                )}
              </div>
            </div>
            
            {/* Botón de menú hamburguesa para móvil */}
            <button 
              className="md:hidden flex items-center justify-center p-2 rounded-md text-primary focus:outline-none"
              onClick={toggleMenu}
              aria-label="Abrir menú"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Menú móvil */}
      <div className={`fixed inset-0 bg-white z-40 transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="pt-20 pb-4 px-4 flex flex-col h-full overflow-y-auto">
          <div className="flex flex-col space-y-2">
            <Link
              to="/"
              className="text-gray-800 hover:bg-primary/10 hover:text-primary px-4 py-3 rounded-md transition-colors text-lg font-medium"
              onClick={toggleMenu}
            >
              Inicio
            </Link>
            <Link
              to="/catalog"
              className="text-gray-800 hover:bg-primary/10 hover:text-primary px-4 py-3 rounded-md transition-colors text-lg font-medium"
              onClick={toggleMenu}
            >
              Catálogo
            </Link>
            <Link
              to="/catalog/female"
              className="text-gray-800 hover:bg-primary/10 hover:text-primary px-4 py-3 rounded-md transition-colors text-lg font-medium"
              onClick={toggleMenu}
            >
              Mujer
            </Link>
            <Link
              to="/catalog/male"
              className="text-gray-800 hover:bg-primary/10 hover:text-primary px-4 py-3 rounded-md transition-colors text-lg font-medium"
              onClick={toggleMenu}
            >
              Hombre
            </Link>
            {showAdminLink && (
              <Link
                to="/admin"
                className="text-gray-800 hover:bg-primary/10 hover:text-primary px-4 py-3 rounded-md transition-colors text-lg font-medium"
                onClick={toggleMenu}
              >
                Administración
              </Link>
            )}
          </div>
          <div className="mt-auto pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">© 2024 Profumi D'incanto</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
