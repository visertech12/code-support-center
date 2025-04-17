
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
    fullName: "", // For first-time setup
    confirmPassword: "", // For first-time setup
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstTimeSetup, setIsFirstTimeSetup] = useState(false);
  const [setupChecked, setSetupChecked] = useState(false);

  // Check if admin setup has been completed
  useEffect(() => {
    const checkAdminSetup = async () => {
      try {
        // Check if any admin users exist
        const { count, error } = await supabase
          .from('admin_users')
          .select('*', { count: 'exact', head: true });

        if (error) {
          console.error('Error checking admin setup:', error);
          return;
        }

        // If no admin users exist, show first time setup
        setIsFirstTimeSetup(count === 0);
        setSetupChecked(true);
      } catch (error) {
        console.error('Error checking admin setup:', error);
      }
    };

    checkAdminSetup();
  }, []);

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

  const handleSetupAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.fullName || !formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Hash the password
      const passwordHash = await bcrypt.hash(formData.password, 10);
      
      // Create admin user
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .insert([{
          email: formData.email,
          password_hash: passwordHash,
          full_name: formData.fullName,
          status: 'active'
        }])
        .select();

      if (adminError) {
        throw adminError;
      }
      
      toast({
        title: "Success",
        description: "Admin account created successfully. You can now log in.",
      });
      
      // Clear form and switch to login mode
      setFormData({
        email: formData.email,
        password: "",
        fullName: "",
        confirmPassword: "",
      });
      setIsFirstTimeSetup(false);
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create admin account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
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
        
        // Store admin data in localStorage
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

  if (!setupChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Checking system status...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          {isFirstTimeSetup ? (
            <>
              <h2 className="text-2xl font-bold text-orange-500">Admin Setup</h2>
              <p className="text-gray-500 mt-2">Create your admin account</p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-orange-500">Admin Login</h2>
              <p className="text-gray-500 mt-2">Sign in to manage your platform</p>
            </>
          )}
        </div>
        
        {isFirstTimeSetup ? (
          <form onSubmit={handleSetupAdmin}>
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

            <div className="mb-4">
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <FaUser className="text-orange-500 h-4 w-4" />
                </div>
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="pl-10 border-2 border-orange-500 focus-visible:ring-orange-500"
                  placeholder="Full Name"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
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
                  placeholder="Password"
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
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 border-2 border-orange-500 focus-visible:ring-orange-500"
                  placeholder="Confirm Password"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500"
              disabled={isLoading}
            >
              {isLoading ? "Setting up..." : "Create Admin Account"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
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
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
