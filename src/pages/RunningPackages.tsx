
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserPackage {
  id: string;
  package: {
    name: string;
    price: number;
    daily_profit_percentage: number;
    duration_days: number;
    total_return_percentage: number;
  };
  purchase_amount: number;
  status: string;
  start_date: string;
  end_date: string;
  created_at: string;
}

const RunningPackages = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [packages, setPackages] = useState<UserPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserPackages = async () => {
      try {
        if (!user) return;
        
        const { data, error } = await supabase
          .from('user_packages')
          .select(`
            id,
            purchase_amount,
            status,
            start_date,
            end_date,
            created_at,
            package:package_id (
              name, 
              price, 
              daily_profit_percentage, 
              duration_days, 
              total_return_percentage
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          toast({
            variant: "destructive",
            title: "Error fetching packages",
            description: error.message
          });
          return;
        }

        setPackages(data || []);
      } catch (error) {
        console.error("Error fetching user packages:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch your stocks. Please try again."
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPackages();
  }, [user, toast]);

  // Calculate daily profit amount
  const calculateDailyProfit = (purchaseAmount: number, dailyProfitPercentage: number) => {
    return (purchaseAmount * dailyProfitPercentage) / 100;
  };

  // Format date to MM/DD/YYYY
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  return (
    <div className="relative min-h-screen bg-orange-100 max-w-[480px] mx-auto overflow-hidden">
      <div className="relative overflow-x-hidden min-h-[100vh]">
        {/* Background gradient */}
        <div className="absolute top-[-20px] scale-[1.3] bg-gradient-to-b from-orange-600 via-orange-400 to-orange-100 w-full h-[300px] rotate-[-10deg] blur-lg"></div>
        
        {/* Decorative image */}
        <img 
          className="absolute top-[-25px] right-[-25px] w-[30%] mix-blend-multiply rotate-[40deg] scale-[1.1] opacity-[60%]"
          src="https://cdn-icons-png.flaticon.com/128/9226/9226554.png" 
          alt="decorative"
        />
        
        <div className="relative z-[2]">
          <div className="p-[15px]">
            {/* Header with back button and avatar */}
            <div className="flex items-center justify-between">
              <div className="flex gap-3 items-center bg-black/30 backdrop-blur h-[40px] rounded-full px-[15px]">
                <div>
                  <img 
                    className="w-[20px] cursor-pointer" 
                    src="https://cdn-icons-png.flaticon.com/128/507/507257.png" 
                    alt="back"
                    onClick={() => navigate(-1)}
                  />
                </div>
                <h1 className="text-white text-[16px]">My Stocks</h1>
              </div>
              
              <div className="bg-gradient-to-b from-gray-200 to-orange-200 h-[40px] w-[40px] rounded-full p-[2px]">
                <img 
                  className="rounded-full w-full h-full" 
                  src="https://img.freepik.com/premium-photo/3d-rendering-avatar-design_1258715-60685.jpg" 
                  alt="user avatar"
                />
              </div>
            </div>
          </div>

          <div className="container mx-auto px-[8px] mt-[40px]">
            {isLoading ? (
              <div className="h-[65vh] flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
              </div>
            ) : packages.length === 0 ? (
              <div className="container h-[65vh] grid grid-cols-1 content-center justify-items-center">
                <div className="grid content-center justify-items-center">
                  <img width="60px" className="hue-rotate-[224deg]" src="https://cdn-icons-png.flaticon.com/128/16504/16504070.png" alt="no packages" />
                  <h1 className="text-gray-500 text-sm mt-2">No Running Stocks Found!</h1>
                </div>
              </div>
            ) : (
              <div>
                {packages.map((pkg) => (
                  <div 
                    key={pkg.id} 
                    className="flex items-center bg-white shadow-md rounded-[10px] p-2 w-100 my-3"
                  >
                    <img 
                      width="50px" 
                      className="rounded-[10px]" 
                      src={`https://mystock-admin.scriptbasket.com/assets/images/plan/65ca81545efd51707770196.jpg`} 
                      alt={pkg.package.name}
                    />
                    <div className="px-3 flex-auto">
                      <h1 className="text-orange-400 text-md">
                        {pkg.package.name} <span className="text-orange-50 bg-orange-500 px-2 py-[1px] rounded-full">${pkg.purchase_amount.toFixed(2)}</span>
                      </h1>
                      <h1 className="text-gray-400 text-sm">
                        Daily Earn: {calculateDailyProfit(pkg.purchase_amount, pkg.package.daily_profit_percentage).toFixed(2)}
                      </h1>
                      <h1 className="text-gray-400 text-sm">
                        Purchase Date: {formatDate(pkg.start_date)}
                      </h1>
                      <h1 className="text-gray-400 text-sm">
                        Expire Date: {formatDate(pkg.end_date)}
                      </h1>
                    </div>
                    <div className="grid justify-items-end">
                      <h1 className="text-orange-400 font-bold">
                        {pkg.status === 'active' ? 'Running' : pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1)}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default RunningPackages;
