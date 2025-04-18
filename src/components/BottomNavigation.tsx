
import React from "react";
import { Link, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="fixed z-50 w-full h-16 max-w-[480px] -translate-x-1/2 bottom-0 left-1/2 bg-white">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
        <Link 
          className={`inline-flex flex-col items-center justify-center px-5 group ${currentPath === "/dashboard" ? "bottomImgActive" : "bottomImg"}`} 
          to="/dashboard"
        >
          <img 
            className="w-[30px] h-[30px] p-[1px]" 
            src="https://cdn-icons-png.flaticon.com/128/9664/9664027.png" 
            alt="dashboard" 
          />
        </Link>
        <Link 
          className={`inline-flex flex-col items-center justify-center px-5 group ${currentPath === "/notice-board" ? "bottomImgActive" : "bottomImg"}`} 
          to="/notice-board"
        >
          <img 
            className="w-[30px] h-[30px] p-[1px]" 
            src="https://cdn-icons-png.flaticon.com/128/2645/2645897.png" 
            alt="notice" 
          />
        </Link>
        <Link 
          className={`inline-flex flex-col items-center justify-center px-5 group ${currentPath.startsWith("/team") ? "bottomImgActive" : "bottomImg"}`} 
          to="/team/1"
        >
          <img 
            className="w-[30px] h-[30px] p-[1px]" 
            src="https://cdn-icons-png.flaticon.com/128/33/33308.png" 
            alt="team" 
          />
        </Link>
        <Link 
          className={`inline-flex flex-col items-center justify-center px-5 group ${currentPath === "/profile" ? "bottomImgActive" : "bottomImg"}`} 
          to="/profile"
        >
          <img 
            className="w-[30px] h-[30px] p-[1px]" 
            src="https://cdn-icons-png.flaticon.com/128/10333/10333482.png" 
            alt="profile" 
          />
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;

