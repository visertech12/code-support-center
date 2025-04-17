
import React from "react";
import { Link, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="fixed z-50 w-full h-16 max-w-[480px] -translate-x-1/2 bottom-0 left-1/2 bg-white">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
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
          className={`inline-flex flex-col items-center justify-center px-5 group ${currentPath === "/package" ? "bottomImgActive" : "bottomImg"}`} 
          to="/package"
        >
          <img 
            className="w-[30px] h-[30px] p-[1px]" 
            src="https://cdn-icons-png.flaticon.com/128/10645/10645200.png" 
            alt="package" 
          />
        </Link>
        <Link 
          className="inline-flex flex-col items-center justify-center px-5 group mt-[-15px] mb-auto" 
          to="/mining"
        >
          <div className="saturate-150 bg-gradient-to-b from-orange-300 to-orange-600 w-[60px] h-[60px] rounded-full p-3 ring-[5px] ring-orange-100">
            <img 
              className="w-full h-full invert rounded-full" 
              src="https://cdn-icons-png.flaticon.com/128/17025/17025367.png" 
              alt="mining" 
            />
          </div>
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
