
import { useState, useEffect } from "react";

interface AdminAccessProps {
  onAdminStatusChange: (status: boolean) => void;
  isAdmin: boolean; // Añadimos una prop para saber el estado actual
}

export const AdminAccess = ({ onAdminStatusChange, isAdmin }: AdminAccessProps) => {
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

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
      // Correctamente alterna el estado de admin
      onAdminStatusChange(!isAdmin);
      setLogoClickCount(0);
    }
  };

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        onAdminStatusChange(!isAdmin);
        console.log("Admin access toggled via keyboard");
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onAdminStatusChange, isAdmin]);

  return { handleLogoClick };
};
