
import { Link } from "react-router-dom";
import { Home, ShoppingBag, User, UserCog } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  showAdminLink: boolean;
}

const MobileMenu = ({ isOpen, onClose, showAdminLink }: MobileMenuProps) => {
  return (
    <div className={`fixed inset-0 bg-white z-40 transition-all duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
      <div className="pt-20 pb-4 px-4 flex flex-col h-full overflow-y-auto">
        <div className="flex flex-col space-y-1">
          <Link
            to="/"
            className="text-gray-800 hover:bg-primary/10 hover:text-primary px-4 py-3 rounded-md transition-colors text-lg font-medium flex items-center"
            onClick={onClose}
          >
            <Home className="h-5 w-5 mr-3" />
            Inicio
          </Link>
          <Link
            to="/catalog"
            className="text-gray-800 hover:bg-primary/10 hover:text-primary px-4 py-3 rounded-md transition-colors text-lg font-medium flex items-center"
            onClick={onClose}
          >
            <ShoppingBag className="h-5 w-5 mr-3" />
            Catálogo
          </Link>
          <Link
            to="/catalog/female"
            className="text-gray-800 hover:bg-primary/10 hover:text-primary px-4 py-3 rounded-md transition-colors text-lg font-medium flex items-center pl-12"
            onClick={onClose}
          >
            <User className="h-5 w-5 mr-3" />
            Mujer
          </Link>
          <Link
            to="/catalog/male"
            className="text-gray-800 hover:bg-primary/10 hover:text-primary px-4 py-3 rounded-md transition-colors text-lg font-medium flex items-center pl-12"
            onClick={onClose}
          >
            <User className="h-5 w-5 mr-3" />
            Hombre
          </Link>
          {showAdminLink && (
            <Link
              to="/admin"
              className="text-gray-800 bg-green-50 hover:bg-green-100 hover:text-green-700 px-4 py-3 rounded-md transition-colors text-lg font-medium flex items-center"
              onClick={onClose}
            >
              <UserCog className="h-5 w-5 mr-3 text-green-600" />
              Administración
            </Link>
          )}
        </div>
        <div className="mt-auto pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">© 2024 Profumi D'incanto</p>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
