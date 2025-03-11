
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AdminAccess } from "./navigation/AdminAccess";
import MobileMenu from "./navigation/MobileMenu";
import DesktopMenu from "./navigation/DesktopMenu";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAdminLink, setShowAdminLink] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { handleLogoClick } = AdminAccess({ 
    onAdminStatusChange: (newStatus) => setShowAdminLink(newStatus) 
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

  // Detect scroll for navbar shadow
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

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-primary/30 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <button 
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
              </button>
            </div>
            
            <DesktopMenu showAdminLink={showAdminLink} />
            
            <button 
              className="md:hidden flex items-center justify-center p-2 rounded-md text-primary focus:outline-none"
              onClick={toggleMenu}
              aria-label="Abrir menú"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>
      
      <MobileMenu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        showAdminLink={showAdminLink}
      />
    </>
  );
};

export default Navigation;
