
import { Link, useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const Mining = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      {/* Background gradient */}
      <div className="auth-bg-gradient"></div>
      
      {/* Decorative image */}
      <img 
        className="absolute top-[-25px] right-[-25px] w-[30%] mix-blend-multiply rotate-[40deg] scale-[1.1] opacity-[50%]"
        src="/assets/coin-rotate-ABZPZ9vH.gif"
        alt="decorative"
      />
      
      <div className="relative z-10">
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
              <h1 className="text-white text-[16px]">Stock Mining</h1>
            </div>
            
            <div className="bg-gradient-to-b from-gray-200 to-orange-200 h-[40px] w-[40px] rounded-full p-[2px]">
              <Avatar className="w-full h-full">
                <AvatarImage 
                  className="rounded-full w-full h-full" 
                  src="https://img.freepik.com/premium-photo/3d-rendering-avatar-design_1258715-60685.jpg" 
                  alt="user avatar"
                />
              </Avatar>
            </div>
          </div>

          <div className="mt-[50px] mb-[50px]">
            {/* Balance Card */}
            <div className="bg-white/50 backdrop-blur p-2 rounded-[10px]">
              <div className="flex justify-between items-center gap-2">
                <div>
                  <h1 className="text-orange-500 font-semibold text-[16px]">Current Balance</h1>
                  <h1 className="text-orange-500 font-semibold text-[26px]">$0.00</h1>
                </div>
                <img 
                  className="w-[70px] h-[70px]" 
                  src="/assets/coin-rotate-ABZPZ9vH.gif" 
                  alt="coin" 
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-white/50 rounded-lg p-2 text-center">
                <h1 className="text-sm text-orange-400">Stock Arbitrage</h1>
                <h1 className="text-lg font-bold text-orange-400">OFF</h1>
                <progress className="progress progress-warning w-full" value="0" max="100"></progress>
              </div>
              <div className="bg-white/50 rounded-lg p-2 text-center">
                <h1 className="text-sm text-orange-400">Today Target</h1>
                <h1 className="text-lg font-bold text-orange-400">$0.00</h1>
                <progress className="progress progress-warning w-full" value="100" max="100"></progress>
              </div>
            </div>

            {/* Collect Button Section */}
            <div className="w-full">
              <h1 className="text-gray-400 text-sm mt-3">* Investors can collect profit only once each day</h1>
              <button className="w-full py-3 font-semibold text-white rounded-[10px] shadow-lg my-2 flex justify-center items-center bg-gradient-to-r hover:bg-gradient-to-l from-orange-600 to-orange-400 shadow-orange-600/20 py-[12px]">
                <span className="ps-2">COLLECT NOW</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Mining;
