
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShieldCheck } from "lucide-react";
import { AdminAccess } from "./navigation/AdminAccess";
import MobileMenu from "./navigation/MobileMenu";
import DesktopMenu from "./navigation/DesktopMenu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAdminLink, setShowAdminLink] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleAdminStatusChange = (status: boolean) => {
    setShowAdminLink(status);
  };

  const { handleLogoClick } = AdminAccess({ 
    onAdminStatusChange: handleAdminStatusChange,
    isAdmin: showAdminLink
  });

  // Toggle the menu open/closed state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent scrolling when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // Detect scroll for navbar shadow and background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  }, [location.pathname]);

  // Secret path detection
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('access') === 'admin') {
      console.log("Admin access enabled via URL parameter");
      setShowAdminLink(true);
      
      // Remove the parameter from URL for discretion
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [location]);

  // Determine if we're on the homepage to apply transparent navbar
  const isHomePage = location.pathname === "/";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-sm shadow-md border-b border-primary/20' 
          : isHomePage 
            ? 'bg-transparent border-transparent' 
            : 'bg-white border-b border-primary/30'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <button 
                className={`text-xl sm:text-2xl font-elegant tracking-wide flex items-center ${
                  isScrolled || !isHomePage 
                    ? 'text-primary' 
                    : 'text-white/90 hover:text-white'
                }`}
                onClick={handleLogoClick}
              >
                <img 
                  src="/lovable-uploads/2c6dbf7f-9cac-486c-9875-538bbfb09192.png" 
                  alt="Profumi D'incanto" 
                  className={`h-6 sm:h-8 mr-2 ${!isScrolled && isHomePage ? 'filter brightness-0 invert' : ''}`}
                />
                <span className="hidden sm:inline">Profumi D'incanto</span>
                <span className="sm:hidden">Profumi</span>
              </button>
            </div>
            
            {/* Desktop Menu with conditional styling */}
            <DesktopMenu 
              showAdminLink={showAdminLink} 
              isTransparent={!isScrolled && isHomePage}
            />
            
            {/* Indicador visual de modo admin */}
            {showAdminLink && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="absolute top-4 right-20 md:right-4 flex items-center animate-pulse">
                      <ShieldCheck className={`h-5 w-5 ${
                        !isScrolled && isHomePage ? 'text-white' : 'text-green-600'
                      }`} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Modo Administrador Activo</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            
            {/* Botón para el menú móvil con estilos condicionales */}
            <button 
              className={`md:hidden flex items-center justify-center p-2 rounded-md focus:outline-none ${
                isScrolled || !isHomePage 
                  ? 'text-primary' 
                  : 'text-white/90 hover:text-white'
              }`}
              onClick={toggleMenu}
              aria-label="Abrir menú"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        showAdminLink={showAdminLink}
      />
    </>
  );
};

export default Navigation;
