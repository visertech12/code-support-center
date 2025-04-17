
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AdminProtectedRouteProps {
  children: ReactNode;
}

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const { profile, isLoading } = useAuth();
  const location = useLocation();
  const [adminUser, setAdminUser] = useState<any>(null);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    // Check for admin user in localStorage (from admin_users table)
    const storedAdmin = localStorage.getItem('adminUser');
    if (storedAdmin) {
      try {
        const parsedAdmin = JSON.parse(storedAdmin);
        setAdminUser(parsedAdmin);
      } catch (error) {
        console.error('Error parsing admin user:', error);
        localStorage.removeItem('adminUser');
      }
    }
    
    setCheckingAdmin(false);
  }, []);

  if (isLoading || checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  // Allow access if user has admin role or if we have a valid admin user from admin_users table
  if ((profile && profile.role === 'admin') || adminUser) {
    return <>{children}</>;
  }

  // Redirect to admin login page
  return <Navigate to="/admin/login" state={{ from: location }} replace />;
};

export default AdminProtectedRoute;
