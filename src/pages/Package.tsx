
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

// Define stock item type
interface StockItem {
  id: string;
  name: string;
  price: number;
  image_url: string;
  daily_profit_percentage: number;
  total_return_percentage: number;
  duration_days: number;
  description?: string;
}

const StockCard = ({ stock }: { stock: StockItem }) => {
  // Calculate daily profit
  const dailyProfit = (stock.price * stock.daily_profit_percentage) / 100;
  // Calculate total profit
  const totalProfit = (stock.price * stock.total_return_percentage) / 100;
  
  return (
    <div className="relative bg-gradient-to-b from-orange-600/80 to-orange-200/80 shadow-md p-3 rounded-[30px] mt-[60px]">
      <img 
        className="w-[45%] rotate-[-30deg] ms-[-20px] mt-[-50px] rounded-t-[50px] rounded-b-[20px] shadow-md shadow-orange-700" 
        src={stock.image_url} 
        alt={stock.name} 
      />
      <div className="mt-3 mb-[30px]">
        <h1 className="text-center text-[18px] font-bold text-white">{stock.name}</h1>
        <h1 className="text-center text-[18px] font-bold text-white bg-orange-500 rounded-full">${stock.price}</h1>
        <div className="grid gap-3 mt-3 ps-2">
          <div className="flex gap-2 items-center">
            <img 
              className="w-[20px] rounded-full border-[2px] border-white" 
              src="https://cdn-icons-png.flaticon.com/128/12484/12484055.png" 
              alt="profit" 
            />
            <h1 className="text-orange-800 text-[13px] font-semibold text-nowrap truncate">
              ${dailyProfit.toFixed(2)} Daily Profit
            </h1>
          </div>
          <div className="flex gap-2 items-center">
            <img 
              className="w-[20px] rounded-full border-[2px] border-white" 
              src="https://cdn-icons-png.flaticon.com/128/12484/12484055.png" 
              alt="total profit" 
            />
            <h1 className="text-orange-800 text-[13px] font-semibold text-nowrap truncate">
              ${totalProfit.toFixed(2)} Total Profit
            </h1>
          </div>
          <div className="flex gap-2 items-center">
            <img 
              className="w-[20px] rounded-full border-[2px] border-white" 
              src="https://cdn-icons-png.flaticon.com/128/12484/12484055.png" 
              alt="validity" 
            />
            <h1 className="text-orange-800 text-[13px] font-semibold text-nowrap truncate">
              {stock.duration_days} Days Validity
            </h1>
          </div>
        </div>
      </div>
      <a 
        className="absolute right-[-10px] bottom-[-10px] h-[50px] w-[50px] p-2 bg-orange-500 shadow-md shadow-orange-500 border-2 border-white rounded-full"
        href={`/recharge/${stock.id}`}
      >
        <img 
          className="w-full h-full invert" 
          src="https://cdn-icons-png.flaticon.com/128/4379/4379581.png" 
          alt="recharge" 
        />
      </a>
    </div>
  );
};

const Package = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [stocks, setStocks] = useState<StockItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data, error } = await supabase
          .from('packages')
          .select('*')
          .eq('status', 'active');
          
        if (error) {
          throw error;
        }
        
        if (data) {
          setStocks(data);
        }
      } catch (error: any) {
        console.error('Error loading packages:', error.message);
        toast({
          title: "Error",
          description: "Failed to load packages",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPackages();
  }, []);
  
  return (
    <div className="auth-container">
      {/* Background gradient */}
      <div className="auth-bg-gradient"></div>
      
      {/* Decorative image */}
      <img 
        className="absolute top-[-25px] right-[-25px] w-[30%] mix-blend-multiply rotate-[40deg] scale-[1.1] opacity-[50%]"
        src="https://cdn-icons-png.flaticon.com/128/10951/10951883.png" 
        alt="decorative"
      />
      
      <div className="relative z-10">
        <div className="p-[15px]">
          <div className="flex items-center justify-between">
            {/* Back button and title */}
            <div className="flex gap-3 items-center bg-black/30 backdrop-blur h-[40px] rounded-full px-[15px]">
              <div>
                <img 
                  className="w-[20px] cursor-pointer" 
                  src="https://cdn-icons-png.flaticon.com/128/507/507257.png" 
                  alt="back"
                  onClick={() => navigate(-1)}
                />
              </div>
              <h1 className="text-white text-[16px]">All Stocks</h1>
            </div>
            
            {/* User avatar */}
            <div className="bg-gradient-to-b from-gray-200 to-orange-200 h-[40px] w-[40px] rounded-full p-[2px]">
              <img 
                className="rounded-full w-full h-full" 
                src={profile?.avatar_url || "https://img.freepik.com/premium-photo/3d-rendering-avatar-design_1258715-60685.jpg"} 
                alt="user avatar"
              />
            </div>
          </div>
          
          {/* Stock cards grid */}
          <div className="mt-[50px] mb-[60px]">
            {isLoading ? (
              <div className="flex justify-center items-center h-[300px]">
                <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
              </div>
            ) : stocks.length > 0 ? (
              <div className="grid gap-4 grid-cols-2 mb-3">
                {stocks.map(stock => (
                  <StockCard key={stock.id} stock={stock} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No packages available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Package;
