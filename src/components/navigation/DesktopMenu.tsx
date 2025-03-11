
import { Link } from "react-router-dom";

interface DesktopMenuProps {
  showAdminLink: boolean;
}

const DesktopMenu = ({ showAdminLink }: DesktopMenuProps) => {
  return (
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
  );
};

export default DesktopMenu;
