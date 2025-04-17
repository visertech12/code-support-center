
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";

const Guide = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-orange-100 max-w-[480px] mx-auto overflow-hidden">
      <div className="relative overflow-x-hidden min-h-screen">
        <div className="absolute top-[-20px] scale-[1.3] bg-gradient-to-b from-orange-600 via-orange-400 to-orange-100 w-full h-[300px] rotate-[-10deg] blur-lg"></div>
        
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
                <h1 className="text-white text-[16px]">User Guide</h1>
              </div>
            </div>
          </div>

          <div className="bg-white/30 backdrop-blur px-3 pt-[30px] rounded-t-[30px] mt-[40px] mb-[20px]">
            <div className="prose prose-orange max-w-none">
              <h2 className="text-orange-600 font-bold text-xl text-center mb-4">
                A Comprehensive Guide to Running a Successful Mining Website
              </h2>
              
              <p className="text-orange-600 mb-4">
                Mining cryptocurrencies has become a lucrative endeavor for many individuals and businesses around the world.
                If you're considering starting a mining website, you're entering a dynamic and rapidly evolving industry.
              </p>

              {/* Add more content sections as needed */}
              
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Guide;
