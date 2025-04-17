
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { supabase } from "@/integrations/supabase/client";

const AdminForgotPassword = () => {
  const [step, setStep] = useState<'email' | 'code' | 'password'>('email');
  const [email, setEmail] = useState("salapa2179@insfou.com");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendResetCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check if email exists and is an admin
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('email', email)
        .single();

      if (profileError || !profileData || profileData.role !== 'admin') {
        throw new Error('No admin account found with this email');
      }

      // In a real app, you would send an email with a real code
      // For demo purposes, we'll just move to the next step and use "213123" as the code
      toast({
        title: "Reset code sent",
        description: "Check your email for the password reset code",
      });

      setStep('code');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send reset code",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would verify this code against what was sent
    // For demo purposes, we'll check if it matches "213123"
    if (verificationCode === "213123") {
      setStep('password');
      toast({
        title: "Code verified",
        description: "Please set your new password",
      });
    } else {
      toast({
        title: "Invalid code",
        description: "The verification code is incorrect",
        variant: "destructive",
      });
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (newPassword !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (newPassword.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }

      // Reset password using Supabase Auth API
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/login`,
      });

      if (error) throw error;

      // Note: In a real implementation, we would need to use a proper reset token flow
      // Since we can't directly set passwords for security reasons, this is a simplified example
      
      toast({
        title: "Password reset successful",
        description: "Please check your email to complete the password reset process",
      });
      
      // Redirect to login page after short delay
      setTimeout(() => {
        window.location.href = "/admin/login";
      }, 3000);
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to reset password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderEmailStep = () => (
    <form onSubmit={handleSendResetCode}>
      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <FaEnvelope className="text-orange-500 h-4 w-4" />
          </div>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 border-2 border-orange-500 focus-visible:ring-orange-500"
            placeholder="Admin Email"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Send Reset Code"}
      </Button>
    </form>
  );

  const renderCodeStep = () => (
    <form onSubmit={handleVerifyCode}>
      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <FaKey className="text-orange-500 h-4 w-4" />
          </div>
          <Input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="pl-10 border-2 border-orange-500 focus-visible:ring-orange-500"
            placeholder="Verification Code"
            required
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500"
      >
        Verify Code
      </Button>
    </form>
  );

  const renderPasswordStep = () => (
    <form onSubmit={handleResetPassword}>
      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <FaKey className="text-orange-500 h-4 w-4" />
          </div>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="pl-10 border-2 border-orange-500 focus-visible:ring-orange-500"
            placeholder="New Password"
            required
            disabled={isLoading}
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="pl-10 border-2 border-orange-500 focus-visible:ring-orange-500"
            placeholder="Confirm New Password"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500"
        disabled={isLoading}
      >
        {isLoading ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-orange-500">Admin Password Reset</h2>
          <p className="text-gray-500 mt-2">
            {step === 'email' && "Enter your email to reset password"}
            {step === 'code' && "Enter the verification code sent to your email"}
            {step === 'password' && "Set your new password"}
          </p>
        </div>
        
        {step === 'email' && renderEmailStep()}
        {step === 'code' && renderCodeStep()}
        {step === 'password' && renderPasswordStep()}
        
        <div className="mt-6 text-center">
          <Link to="/admin/login" className="text-orange-500 hover:text-orange-700">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPassword;
