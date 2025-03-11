
import { useState, useEffect } from "react";

interface AdminAccessProps {
  onAdminStatusChange: (status: boolean) => void;
}

export const AdminAccess = ({ onAdminStatusChange }: AdminAccessProps) => {
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
      // Fix: Directly pass a boolean instead of a function
      onAdminStatusChange(!true); // Toggle the admin status
      setLogoClickCount(0);
    }
  };

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        // Fix: Directly pass a boolean instead of a function
        onAdminStatusChange(true);
        console.log("Admin access toggled via keyboard");
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onAdminStatusChange]);

  return { handleLogoClick };
};
