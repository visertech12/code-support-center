
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";

// Define team stats interface
interface TeamStats {
  totalCommission: number;
  todayCommission: number;
  totalTeamSize: number;
  todayJoined: number;
  teamRecharge: number;
  teamWithdraw: number;
}

const Team = () => {
  const navigate = useNavigate();
  const { level = "1" } = useParams<{ level?: string }>();
  
  // Mock data for team stats
  const teamStats: TeamStats = {
    totalCommission: 0,
    todayCommission: 0,
    totalTeamSize: 0,
    todayJoined: 0,
    teamRecharge: 0,
    teamWithdraw: 0
  };

  // Mock referral link
  const referralLink = "https://mystock.scriptbasket.com/signup/NTAwMzc=";

  // Handle copy to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    // You could add a toast notification here
  };

  const levels = ["1", "2", "3"];

  return (
    <div className="auth-container">
      {/* Background gradient */}
      <div className="auth-bg-gradient"></div>
      
      {/* Decorative image */}
      <img 
        className="absolute top-[-25px] right-[-25px] w-[30%] mix-blend-multiply rotate-[40deg] scale-[1.1] opacity-[50%]"
        src="https://cdn-icons-png.flaticon.com/128/7185/7185630.png"
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
              <h1 className="text-white text-[16px]">My Team</h1>
            </div>
            
            {/* User avatar */}
            <div className="bg-gradient-to-b from-gray-200 to-orange-200 h-[40px] w-[40px] rounded-full p-[2px]">
              <img 
                className="rounded-full w-full h-full" 
                src="https://img.freepik.com/premium-photo/3d-rendering-avatar-design_1258715-60685.jpg" 
                alt="user avatar"
              />
            </div>
          </div>
          
          <div className="mt-[30px] mb-[30px]">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 justify-items-stretch mb-3">
              <div className="bg-white shadow-md shadow-orange-500/50 rounded-[10px] p-3 text-center">
                <h1 className="text-lg font-bold text-orange-400">${teamStats.totalCommission.toFixed(2)}</h1>
                <h1 className="text-[10px] font-bold text-orange-400">Total Commission</h1>
              </div>
              <div className="bg-white shadow-md shadow-orange-500/50 rounded-[10px] p-3 text-center">
                <h1 className="text-lg font-bold text-orange-400">${teamStats.todayCommission.toFixed(2)}</h1>
                <h1 className="text-[10px] font-bold text-orange-400">Today's Commission</h1>
              </div>
              <div className="bg-white shadow-md shadow-orange-500/50 rounded-[10px] p-3 text-center">
                <h1 className="text-lg font-bold text-orange-400">{teamStats.totalTeamSize}</h1>
                <h1 className="text-[10px] font-bold text-orange-400">Total Team Size</h1>
              </div>
              <div className="bg-white shadow-md shadow-orange-500/50 rounded-[10px] p-3 text-center">
                <h1 className="text-lg font-bold text-orange-400">{teamStats.todayJoined}</h1>
                <h1 className="text-[10px] font-bold text-orange-400">Today Joined</h1>
              </div>
              <div className="bg-white shadow-md shadow-orange-500/50 rounded-[10px] p-3 text-center">
                <h1 className="text-lg font-bold text-orange-400">${teamStats.teamRecharge.toFixed(2)}</h1>
                <h1 className="text-[10px] font-bold text-orange-400">Team Recharge</h1>
              </div>
              <div className="bg-white shadow-md shadow-orange-500/50 rounded-[10px] p-3 text-center">
                <h1 className="text-lg font-bold text-orange-400">${teamStats.teamWithdraw.toFixed(2)}</h1>
                <h1 className="text-[10px] font-bold text-orange-400">Team Withdraw</h1>
              </div>
            </div>
            
            {/* Referral link */}
            <div className="flex gap-2 bg-white/50 rounded-full shadow-md shadow-orange-500/50 p-2 justify-items-stretch mb-3">
              <div className="flex-auto bg-white text-orange-500 text-nowrap truncate border border-orange-500 p-2 rounded-full">
                {referralLink}
              </div>
              <div 
                className="bg-orange-600 text-white border border-orange-500 p-2 px-5 rounded-full cursor-pointer"
                onClick={handleCopyLink}
              >
                Copy
              </div>
            </div>
            
            {/* Level tabs */}
            <div className="grid grid-cols-3 bg-white/50 rounded-full shadow-md shadow-orange-500/50 p-2 gap-3 justify-items-stretch mb-3">
              {levels.map((l) => (
                <Link
                  key={l}
                  to={`/team/${l}`}
                  className={`px-4 py-1 rounded-full text-center ${
                    level === l ? "text-orange-200 bg-orange-700" : "text-white bg-gray-400"
                  }`}
                >
                  Lev{l}({teamStats.totalTeamSize})
                </Link>
              ))}
            </div>
            
            {/* Team members list (empty state) */}
            <div className="container mx-auto my-3">
              <div className="container h-[30vh] grid grid-cols-1 content-center justify-items-center">
                <div className="grid content-center justify-items-center">
                  <img 
                    width="60px" 
                    className="hue-rotate-[224deg]" 
                    src="https://cdn-icons-png.flaticon.com/128/16504/16504070.png" 
                    alt="empty"
                  />
                  <h1 className="text-gray-500 text-sm mt-2">No Team Member Found!</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Team;
