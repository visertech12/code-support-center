
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import BottomNavigation from "@/components/BottomNavigation";
import { BanknoteIcon } from "lucide-react";

const WithdrawWallet = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gateway: "",
    address: "7878"
  });

  const handleGatewayChange = (value: string) => {
    setFormData(prev => ({ ...prev, gateway: value }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, address: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate fields
    if (!formData.gateway) {
      toast({
        title: "Error",
        description: "Please select a gateway",
        variant: "destructive"
      });
      return;
    }

    if (!formData.address) {
      toast({
        title: "Error",
        description: "Gateway address is required",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically make an API call to update the wallet address
    toast({
      title: "Success",
      description: "Your withdraw wallet has been updated successfully",
    });
  };

  return (
    <div className="relative min-h-screen bg-orange-100 max-w-[480px] mx-auto overflow-hidden">
      <div className="relative overflow-x-hidden min-h-screen">
        <div className="absolute top-[-20px] scale-[1.3] bg-gradient-to-b from-orange-600 via-orange-400 to-orange-100 w-full h-[300px] rotate-[-10deg] blur-lg"></div>
        <img 
          className="absolute top-[-25px] right-[-25px] w-[30%] mix-blend-multiply rotate-[40deg] scale-[1.1] opacity-[60%]" 
          src="https://cdn-icons-png.flaticon.com/128/11239/11239955.png" 
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
                <h1 className="text-white text-[16px]">Withdraw Wallet</h1>
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
              <label htmlFor="gateway" className="block mb-2 text-sm font-medium text-orange-600">
                Gateway
              </label>
              <Select
                disabled
                value={formData.gateway}
                onValueChange={handleGatewayChange}
              >
                <SelectTrigger className="bg-white/50 text-orange-500 text-sm rounded-lg w-full p-[12px] border-2 border-orange-600 focus:outline-none">
                  <SelectValue placeholder="Select Gateway" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bkash">bKash</SelectItem>
                  <SelectItem value="nagad">Nagad</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-2">
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-orange-600">
                Gateway Address or Number
              </label>
              <div className="relative mb-2">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <BanknoteIcon className="w-4 h-5 text-orange-400" />
                </div>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  className="bg-white/50 text-orange-400 text-sm rounded-lg w-full ps-10 p-2.5 border-2 border-orange-500 focus:!outline-0"
                  placeholder="Enter Your Gateway Address or Number"
                  value={formData.address}
                  onChange={handleAddressChange}
                  readOnly
                />
              </div>
            </div>

            <Button 
              type="submit"
              disabled
              className="w-full py-3 font-semibold text-white rounded-[10px] shadow-lg my-2 bg-gradient-to-r hover:bg-gradient-to-l from-orange-500 to-orange-400 shadow-md shadow-orange-700/40"
            >
              Update Wallet Address
            </Button>
          </form>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default WithdrawWallet;
