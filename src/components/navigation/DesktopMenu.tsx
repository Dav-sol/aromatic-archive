
import { Link } from "react-router-dom";
import { ShoppingBag, User, UserCog } from "lucide-react";

interface DesktopMenuProps {
  showAdminLink: boolean;
}

const DesktopMenu = ({ showAdminLink }: DesktopMenuProps) => {
  return (
    <div className="hidden md:block desktop-menu">
      <div className="flex space-x-8">
        <Link
          to="/catalog"
          className="text-gray-700 hover:text-primary px-3 py-2 transition-colors border-b-2 border-transparent hover:border-primary flex items-center"
        >
          <ShoppingBag className="h-4 w-4 mr-2" />
          Catálogo
        </Link>
        <Link
          to="/catalog/female"
          className="text-gray-700 hover:text-primary px-3 py-2 transition-colors border-b-2 border-transparent hover:border-primary flex items-center"
        >
          <User className="h-4 w-4 mr-2" />
          Mujer
        </Link>
        <Link
          to="/catalog/male"
          className="text-gray-700 hover:text-primary px-3 py-2 transition-colors border-b-2 border-transparent hover:border-primary flex items-center"
        >
          <User className="h-4 w-4 mr-2" />
          Hombre
        </Link>
        {showAdminLink && (
          <Link
            to="/admin"
            className="text-green-600 hover:text-green-700 px-3 py-2 transition-colors border-b-2 border-transparent hover:border-green-600 flex items-center"
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
