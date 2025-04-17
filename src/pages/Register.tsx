
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaKey, FaPhone, FaGlobe, FaUserPlus } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { isValidEmail, isValidPhone, isStrongPassword } from '@/lib/utils';
import { supabase } from '@/lib/supabaseClient';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

// Countries data for the dropdown
const countries = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "UK", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "IN", name: "India" },
  { code: "NG", name: "Nigeria" },
  // This is shortened for brevity - in a real app we would include all countries
];

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    country: '',
    password: '',
    referCode: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Extract referral code from URL if present
  useState(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get('ref');
    if (ref) {
      setFormData(prev => ({ ...prev, referCode: ref }));
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Validate all fields
      if (!formData.username || formData.username.length < 3) {
        throw new Error('Username must be at least 3 characters');
      }
      
      if (!isValidEmail(formData.email)) {
        throw new Error('Please enter a valid email address');
      }
      
      if (!isValidPhone(formData.phone)) {
        throw new Error('Please enter a valid phone number');
      }
      
      if (!formData.country) {
        throw new Error('Please select your country');
      }
      
      if (!isStrongPassword(formData.password)) {
        throw new Error('Password must be at least 8 characters');
      }
      
      // Check if username already exists
      const { data: existingUser, error: userCheckError } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', formData.username)
        .maybeSingle();
        
      if (existingUser) {
        throw new Error('Username already taken');
      }
      
      // Register with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username,
            phone: formData.phone,
            country: formData.country
          }
        }
      });
      
      if (error) {
        throw error;
      }
      
      // Get referrer ID if referral code provided
      let referrerId = null;
      if (formData.referCode) {
        const { data: referrer } = await supabase
          .from('profiles')
          .select('id')
          .eq('referral_code', formData.referCode)
          .maybeSingle();
          
        if (referrer) {
          referrerId = referrer.id;
        }
      }
      
      // Generate unique referral code for the new user
      const referralCode = generateReferralCode();
      
      // Create user profile with additional info
      if (data.user) {
        await supabase.from('profiles').insert([
          {
            id: data.user.id,
            username: formData.username,
            email: formData.email,
            phone: formData.phone,
            country: formData.country,
            referral_code: referralCode,
            referred_by: referrerId,
            status: 'active',
            balance: 0
          }
        ]);
        
        // If there's a referrer, update their referral count
        if (referrerId) {
          // Get current referral count
          const { data: referrerData } = await supabase
            .from('profiles')
            .select('referral_count')
            .eq('id', referrerId)
            .single();
            
          if (referrerData) {
            const newCount = (referrerData.referral_count || 0) + 1;
            await supabase
              .from('profiles')
              .update({ referral_count: newCount })
              .eq('id', referrerId);
          }
        }
      }
      
      toast({
        title: "Registration Successful",
        description: "Your account has been created. You can now log in.",
      });
      
      // Redirect to login page
      navigate('/');
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Generate a random referral code
  const generateReferralCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let referralCode = '';
    for (let i = 0; i < 8; i++) {
      referralCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return referralCode;
  };

  return (
    <div className="auth-container">
      {/* Background gradient */}
      <div className="auth-bg-gradient"></div>
      
      {/* Decorative image */}
      <img 
        className="absolute top-[-25px] right-[-25px] w-[30%] mix-blend-multiply rotate-[40deg] scale-[1.1] opacity-[60%]"
        src="https://cdn-icons-png.flaticon.com/128/11069/11069063.png"
        alt="decorative"
      />
      
      <div className="relative z-10">
        <div className="p-[15px]"></div>
        
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8 mt-[40px]">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* Logo */}
            <img
              className="mx-auto h-[80px] w-auto"
              src="https://mystock-admin.scriptbasket.com/assets/images/logoIcon/logo.png"
              alt="myStock"
            />
            
            {/* Heading */}
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white drop-shadow-md">
              REGISTER
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {error && (
              <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            <form className="space-y-3" onSubmit={handleSubmit}>
              {/* Username Input */}
              <div className="pb-[1px]">
                <div className="relative mb-2">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <FaUser className="text-orange-500 h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="auth-input"
                    placeholder="Enter any username"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="pb-[1px]">
                <div className="relative mb-2">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <MdEmail className="text-orange-500 h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="auth-input"
                    placeholder="Enter your email Address"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div className="pb-[1px]">
                <div className="relative mb-2">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <FaPhone className="text-orange-500 h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="auth-input"
                    placeholder="Enter your phone number"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Country Select */}
              <div className="pb-[1px]">
                <div className="mb-2">
                  <div className="relative mb-2">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <FaGlobe className="text-orange-500 h-4 w-4" />
                    </div>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="bg-white text-orange-500 text-sm rounded-[15px] w-full ps-[36px] p-[12px] border-2 border-orange-600 focus:outline-none shadow-md py-[15px]"
                      required
                      disabled={isLoading}
                    >
                      <option value="">Select Country</option>
                      {countries.map(country => (
                        <option key={country.code} value={country.code}>{country.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <div className="pb-[1px]">
                <div className="relative mb-2">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <FaKey className="text-orange-500 h-4 w-4" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="auth-input"
                    placeholder="Enter any password"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Referral Code Input */}
              <div className="pb-[1px]">
                <div className="relative mb-2">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <FaUserPlus className="text-orange-500 h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    name="referCode"
                    value={formData.referCode}
                    onChange={handleChange}
                    className="auth-input"
                    placeholder="Enter a refer code (optional)"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button 
                  type="submit" 
                  className="auth-button flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                      Creating Account...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>
            </form>

            {/* Login Link */}
            <p className="mt-10 text-center text-sm text-gray-500">
              Already have account?
              <Link
                to="/"
                className="font-semibold leading-6 text-orange-500 hover:text-orange-400 ps-1"
              >
                Login Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
