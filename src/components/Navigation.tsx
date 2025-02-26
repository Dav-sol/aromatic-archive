
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-primary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-elegant text-primary tracking-wide flex items-center">
              <img 
                src="/lovable-uploads/2c6dbf7f-9cac-486c-9875-538bbfb09192.png" 
                alt="Profumi D'incanto" 
                className="h-8 mr-2"
              />
              <span>Profumi D'incanto</span>
            </Link>
          </div>
          <div className="hidden sm:block">
            <div className="flex space-x-8">
              <Link
                to="/catalog"
                className="text-white hover:text-primary px-3 py-2 transition-colors border-b-2 border-transparent hover:border-primary"
              >
                Catálogo
              </Link>
              <Link
                to="/catalog/female"
                className="text-white hover:text-primary px-3 py-2 transition-colors border-b-2 border-transparent hover:border-primary"
              >
                Mujer
              </Link>
              <Link
                to="/catalog/male"
                className="text-white hover:text-primary px-3 py-2 transition-colors border-b-2 border-transparent hover:border-primary"
              >
                Hombre
              </Link>
              <Link
                to="/admin"
                className="text-white hover:text-primary px-3 py-2 transition-colors border-b-2 border-transparent hover:border-primary"
              >
                Administración
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
