
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import BottomNavigation from "@/components/BottomNavigation";

const NoticeBoard = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      {/* Background gradient */}
      <div className="auth-bg-gradient"></div>
      
      {/* Decorative image */}
      <img 
        className="absolute top-[-25px] right-[-25px] w-[30%] mix-blend-multiply rotate-[40deg] scale-[1.1] opacity-[60%]"
        src="https://ouch-cdn2.icons8.com/DS0dx3QLc__--RnrMhkIdEFxc0SoJbNNSGRVzTavogc/rs:fit:368:368/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNTkz/L2FjNThiOGQ1LWI5/OWEtNGJhZi04ODVh/LTlhNzZhYzIwNzVi/Ny5wbmc.png" 
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
              <h1 className="text-white text-[16px]">Notice Board</h1>
            </div>
            
            {/* User avatar */}
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
        </div>
        
        {/* Notice container */}
        <div className="container mx-auto px-[8px] mt-[40px]">
          {/* General notice */}
          <div className="bg-white border-2 border-orange-400 rounded-[10px] p-1">
            <div className="bg-gradient-to-t from-orange-500 to-orange-400 rounded-lg p-1">
              <h1 className="text-center text-orange-100">Notice For All User</h1>
            </div>
            <div className="border-2 border-orange-400 rounded-lg p-2 mt-2">
              <h1 className="text-sm text-orange-400">
                Developer Contact<br />
                Telegram: @ScriptBasket<br />
                WhatsApp +447878928800<br />
                One important aspect of communication is business
                communication, also known as formal communication. Formal
                letters, memos, circulars etc are all forms of business
                communication. Another important tool of the same is a
                notice. Let us learn the meaning of notices and details of
                notice-writing.
              </h1>
            </div>
          </div>
          
          {/* User specific notice */}
          <div className="bg-white border-2 border-orange-400 rounded-[10px] p-1 mt-3">
            <div className="bg-gradient-to-t from-orange-500 to-orange-400 rounded-lg p-1">
              <h1 className="text-center text-orange-100">Notice For demodemo</h1>
            </div>
            <div className="border-2 border-orange-400 rounded-lg p-2 mt-2">
              <h1 className="text-sm text-orange-400">
                <span className="text-red-400">Empty!</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom navigation */}
      <BottomNavigation />
    </div>
  );
};

export default NoticeBoard;
