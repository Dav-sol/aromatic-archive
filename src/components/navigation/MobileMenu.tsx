
import { Link } from "react-router-dom";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  showAdminLink: boolean;
}

const MobileMenu = ({ isOpen, onClose, showAdminLink }: MobileMenuProps) => {
  return (
    <div className={`fixed inset-0 bg-white z-40 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
      <div className="pt-20 pb-4 px-4 flex flex-col h-full overflow-y-auto">
        <div className="flex flex-col space-y-2">
          <Link
            to="/"
            className="text-gray-800 hover:bg-primary/10 hover:text-primary px-4 py-3 rounded-md transition-colors text-lg font-medium"
            onClick={onClose}
          >
            Inicio
          </Link>
          <Link
            to="/catalog"
            className="text-gray-800 hover:bg-primary/10 hover:text-primary px-4 py-3 rounded-md transition-colors text-lg font-medium"
            onClick={onClose}
          >
            Catálogo
          </Link>
          <Link
            to="/catalog/female"
            className="text-gray-800 hover:bg-primary/10 hover:text-primary px-4 py-3 rounded-md transition-colors text-lg font-medium"
            onClick={onClose}
          >
            Mujer
          </Link>
          <Link
            to="/catalog/male"
            className="text-gray-800 hover:bg-primary/10 hover:text-primary px-4 py-3 rounded-md transition-colors text-lg font-medium"
            onClick={onClose}
          >
            Hombre
          </Link>
          {showAdminLink && (
            <Link
              to="/admin"
              className="text-gray-800 hover:bg-primary/10 hover:text-primary px-4 py-3 rounded-md transition-colors text-lg font-medium"
              onClick={onClose}
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
  );
};

export default MobileMenu;
