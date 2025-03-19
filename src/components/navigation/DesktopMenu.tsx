
import { Link } from "react-router-dom";
import { ShoppingBag, User, UserCog } from "lucide-react";

interface DesktopMenuProps {
  showAdminLink: boolean;
  isTransparent?: boolean;
}

const DesktopMenu = ({ showAdminLink, isTransparent = false }: DesktopMenuProps) => {
  // Modificamos las clases para que siempre tengan una opacidad completa
  // y sean claramente visibles incluso contra fondos claros
  const linkBaseClasses = isTransparent 
    ? "text-white font-medium px-3 py-2 transition-colors border-b-2 border-transparent hover:border-white flex items-center shadow-text"
    : "text-gray-700 hover:text-primary px-3 py-2 transition-colors border-b-2 border-transparent hover:border-primary flex items-center";

  const adminClasses = isTransparent
    ? "text-white font-medium px-3 py-2 transition-colors border-b-2 border-transparent hover:border-white flex items-center shadow-text"
    : "text-green-600 hover:text-green-700 px-3 py-2 transition-colors border-b-2 border-transparent hover:border-green-600 flex items-center";

  return (
    <div className="hidden md:block desktop-menu">
      <div className="flex space-x-8">
        <Link
          to="/catalog"
          className={linkBaseClasses}
        >
          <ShoppingBag className="h-4 w-4 mr-2" />
          Catálogo
        </Link>
        <Link
          to="/catalog/female"
          className={linkBaseClasses}
        >
          <User className="h-4 w-4 mr-2" />
          Mujer
        </Link>
        <Link
          to="/catalog/male"
          className={linkBaseClasses}
        >
          <User className="h-4 w-4 mr-2" />
          Hombre
        </Link>
        {showAdminLink && (
          <Link
            to="/admin"
            className={adminClasses}
          >
            <UserCog className="h-4 w-4 mr-2" />
            Administración
          </Link>
        )}
      </div>
    </div>
  );
};

export default DesktopMenu;
