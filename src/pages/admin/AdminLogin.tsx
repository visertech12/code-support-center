
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { FaUser, FaKey } from "react-icons/fa";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import * as bcrypt from 'bcryptjs';

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useAuth();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in as admin
  useEffect(() => {
    if (profile?.role === 'admin') {
      navigate('/admin/dashboard');
    }
  }, [profile, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // First check admin_users table for direct admin login
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('id, email, password_hash, full_name')
        .eq('email', formData.email)
        .eq('status', 'active')
        .single();

      if (adminError) {
        // If not found in admin_users, try the regular authentication flow
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          throw error;
        }

        // Check if user has admin role
        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (userError) {
          throw userError;
        }

        if (userData.role !== 'admin') {
          throw new Error('Not authorized as admin');
        }
      } else {
        // Admin found in admin_users table, check password
        const passwordMatch = await bcrypt.compare(formData.password, adminData.password_hash);
        if (!passwordMatch) {
          throw new Error('Invalid credentials');
        }
        
        // If using admin_users table, we still need to create a session or token
        // For now, we can store admin data in localStorage
        localStorage.setItem('adminUser', JSON.stringify({
          id: adminData.id,
          email: adminData.email,
          fullName: adminData.full_name
        }));
      }

      toast({
        title: "Success",
        description: "Welcome to admin panel",
      });
      
      // Redirect to admin dashboard or saved location
      const from = (location.state as any)?.from?.pathname || '/admin/dashboard';
      navigate(from);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-orange-500">Admin Login</h2>
          <p className="text-gray-500 mt-2">Sign in to manage your platform</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <FaUser className="text-orange-500 h-4 w-4" />
              </div>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="pl-10 border-2 border-orange-500 focus-visible:ring-orange-500"
                placeholder="Admin Email"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <FaKey className="text-orange-500 h-4 w-4" />
              </div>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="pl-10 border-2 border-orange-500 focus-visible:ring-orange-500"
                placeholder="Admin Password"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login to Admin Panel"}
          </Button>
          
          <div className="mt-4 text-center">
            <Link to="/admin/forgot-password" className="text-orange-500 hover:text-orange-700">
              Forgot Password?
            </Link>
          </div>
        </form>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Default Admin Credentials</h3>
          <p className="text-xs text-gray-500">Email: salapa2179@insfou.com</p>
          <p className="text-xs text-gray-500">Password: Admin@123</p>
          <p className="text-xs text-gray-500 mt-2">Please change these credentials after first login.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
