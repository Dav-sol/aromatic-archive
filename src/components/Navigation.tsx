
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-semibold tracking-tight">
              Perfumes
            </Link>
          </div>
          <div className="hidden sm:block">
            <div className="flex space-x-8">
              <Link
                to="/catalog"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 transition-colors"
              >
                Catálogo
              </Link>
              <Link
                to="/catalog/female"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 transition-colors"
              >
                Mujer
              </Link>
              <Link
                to="/catalog/male"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 transition-colors"
              >
                Hombre
              </Link>
              <Link
                to="/admin"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 transition-colors"
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
