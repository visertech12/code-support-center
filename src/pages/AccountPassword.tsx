
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import BottomNavigation from "@/components/BottomNavigation";
import { Lock } from "lucide-react";

const AccountPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords
    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive"
      });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "New password and confirm password do not match",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically make an API call to update the password
    toast({
      title: "Success",
      description: "Your password has been updated successfully",
    });
  };

  return (
    <div className="relative min-h-screen bg-orange-100 max-w-[480px] mx-auto overflow-hidden">
      <div className="relative overflow-x-hidden min-h-screen">
        <div className="absolute top-[-20px] scale-[1.3] bg-gradient-to-b from-orange-600 via-orange-400 to-orange-100 w-full h-[300px] rotate-[-10deg] blur-lg"></div>
        <img 
          className="absolute top-[-25px] right-[-25px] w-[30%] mix-blend-multiply rotate-[40deg] scale-[1.1] opacity-[60%]" 
          src="https://cdn-icons-png.flaticon.com/128/2938/2938972.png" 
          alt="" 
        />
        
        <div className="relative z-[2]">
          <div className="p-[15px]">
            <div className="flex items-center justify-between">
              <div className="flex gap-3 items-center bg-black/30 backdrop-blur h-[40px] rounded-full px-[15px]">
                <img 
                  className="w-[20px] cursor-pointer" 
                  src="https://cdn-icons-png.flaticon.com/128/507/507257.png" 
                  alt="back"
                  onClick={() => navigate(-1)}
                />
                <h1 className="text-white text-[16px]">Account Password</h1>
              </div>
              <div className="bg-gradient-to-b from-gray-200 to-orange-200 h-[40px] w-[40px] rounded-full p-[2px]">
                <img 
                  className="rounded-full w-full h-full" 
                  src="https://img.freepik.com/premium-photo/3d-rendering-avatar-design_1258715-60685.jpg" 
                  alt="avatar" 
                />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white/50 backdrop-blur min-h-screen mx-auto px-[15px] pt-[30px] mt-[60px] rounded-t-[20px]">
            <div className="mb-2">
              <label htmlFor="oldPassword" className="block mb-2 text-sm font-medium text-orange-600">
                Old Password
              </label>
              <div className="relative mb-2">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <Lock className="w-4 h-5 text-orange-400" />
                </div>
                <Input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  className="bg-white/50 text-orange-400 text-sm rounded-lg w-full ps-10 p-2.5 border-2 border-orange-500 focus:!outline-0"
                  placeholder="Enter Your Old Password"
                  value={formData.oldPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-2">
              <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-orange-600">
                New Password
              </label>
              <div className="relative mb-2">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <Lock className="w-4 h-5 text-orange-400" />
                </div>
                <Input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="bg-white/50 text-orange-400 text-sm rounded-lg w-full ps-10 p-2.5 border-2 border-orange-500 focus:!outline-0"
                  placeholder="Enter Your New Password"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-2">
              <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-orange-600">
                Confirm Password
              </label>
              <div className="relative mb-2">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <Lock className="w-4 h-5 text-orange-400" />
                </div>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="bg-white/50 text-orange-400 text-sm rounded-lg w-full ps-10 p-2.5 border-2 border-orange-500 focus:!outline-0"
                  placeholder="Enter Your New Password Again"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <Button 
              type="submit"
              className="w-full py-3 font-semibold text-white rounded-[10px] shadow-lg my-2 bg-gradient-to-r hover:bg-gradient-to-l from-orange-500 to-orange-400 shadow-md shadow-orange-700/40"
            >
              Update Password
            </Button>
          </form>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default AccountPassword;
