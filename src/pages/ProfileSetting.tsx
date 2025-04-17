
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import BottomNavigation from "@/components/BottomNavigation";

const ProfileSetting = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "demodemo",
    firstName: " ",
    lastName: " ",
    mobileNumber: "123456785",
    email: "demodemo@gmail.com"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to update the profile
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  return (
    <div className="relative min-h-screen bg-orange-100 max-w-[480px] mx-auto overflow-hidden">
      <div className="relative overflow-x-hidden min-h-screen">
        <div className="absolute top-[-20px] scale-[1.3] bg-gradient-to-b from-orange-600 via-orange-400 to-orange-100 w-full h-[300px] rotate-[-10deg] blur-lg"></div>
        <img 
          className="absolute top-[-25px] right-[-25px] w-[30%] mix-blend-multiply rotate-[40deg] scale-[1.1] opacity-[60%]" 
          src="https://cdn-icons-png.flaticon.com/128/807/807262.png" 
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
                <h1 className="text-white text-[16px]">Profile Setting</h1>
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
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-orange-600">
                Username
              </label>
              <div className="relative mb-2">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <i className="fi fi-sr-following w-4 h-5 text-orange-400"></i>
                </div>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  className="bg-white/50 text-orange-400 text-sm rounded-lg w-full ps-10 p-2.5 border-2 border-orange-500 focus:!outline-0"
                  placeholder="Enter Username"
                  readOnly
                  value={formData.username}
                />
              </div>
            </div>

            <div className="mb-2">
              <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-orange-600">
                First Name
              </label>
              <div className="relative mb-2">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <i className="fi fi-sr-user-pen w-4 h-5 text-orange-400"></i>
                </div>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="bg-white/50 text-orange-400 text-sm rounded-lg w-full ps-10 p-2.5 border-2 border-orange-500 focus:!outline-0"
                  placeholder="Enter First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-2">
              <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-orange-600">
                Last Name
              </label>
              <div className="relative mb-2">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <i className="fi fi-sr-user-pen w-4 h-5 text-orange-400"></i>
                </div>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="bg-white/50 text-orange-400 text-sm rounded-lg w-full ps-10 p-2.5 border-2 border-orange-500 focus:!outline-0"
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-2">
              <label htmlFor="mobileNumber" className="block mb-2 text-sm font-medium text-orange-600">
                Mobile Number
              </label>
              <div className="relative mb-2">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <i className="fi fi-sr-phone-call w-4 h-5 text-orange-400"></i>
                </div>
                <Input
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  className="bg-white/50 text-orange-400 text-sm rounded-lg w-full ps-10 p-2.5 border-2 border-orange-500 focus:!outline-0"
                  placeholder="Enter Mobile Number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-2">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-orange-600">
                Email Address
              </label>
              <div className="relative mb-2">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <i className="fi fi-sr-envelope w-4 h-5 text-orange-400"></i>
                </div>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  className="bg-white/50 text-orange-400 text-sm rounded-lg w-full ps-10 p-2.5 border-2 border-orange-500 focus:!outline-0"
                  placeholder="Enter Email Address"
                  readOnly
                  value={formData.email}
                />
              </div>
            </div>

            <Button 
              type="submit"
              className="w-full py-3 font-semibold text-white rounded-[10px] shadow-lg my-2 bg-gradient-to-r hover:bg-gradient-to-l from-orange-500 to-orange-400 shadow-md shadow-orange-700/40"
            >
              Update Informations
            </Button>
          </form>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default ProfileSetting;
