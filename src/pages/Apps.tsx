
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import BottomNavigation from "@/components/BottomNavigation";

const Apps = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-orange-100 max-w-[480px] mx-auto overflow-hidden">
      <div className="relative overflow-x-hidden min-h-screen">
        <div className="absolute top-[-20px] scale-[1.3] bg-gradient-to-b from-orange-600 via-orange-400 to-orange-100 w-full h-[300px] rotate-[-10deg] blur-lg"></div>
        <img 
          className="absolute top-[-25px] right-[-25px] w-[30%] mix-blend-multiply rotate-[40deg] scale-[1.1] opacity-[50%]" 
          src="https://cdn-icons-png.flaticon.com/128/10951/10951883.png" 
          alt="" 
        />
        
        <div className="relative z-[2]">
          <div className="p-[15px] mt-[50px]">
            <div className="mx-auto">
              <div className="flex items-center gap-4 px-3">
                <div>
                  <img 
                    className="w-[80px] rounded-[20px] shadow-sm bg-white shadow-gray-800"
                    src="https://mystock-admin.scriptbasket.com/assets/apps_download/app_logo/1731707808.png"
                    alt="app logo"
                  />
                </div>
                <div className="flex-auto">
                  <h1 className="font-bold text-white text-lg">myStock</h1>
                  <h1 className="text-md text-gray-100">Hashtag Apps</h1>
                  <h1 className="text-[12px] text-gray-200">Contains ads • In-app purchases</h1>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-5">
                <div className="text-center">
                  <h1 className="text-white text-[13px]">5.0 ⭐</h1>
                  <h1 className="text-orange-600 text-[12px] mt-2">500 reviews</h1>
                </div>
                <div className="text-center border-r border-l">
                  <h1 className="text-white text-[13px]">5K+</h1>
                  <h1 className="text-orange-600 text-[12px] mt-2">Downloads</h1>
                </div>
                <div className="text-center">
                  <h1 className="text-white text-[13px]">✓</h1>
                  <h1 className="text-orange-600 text-[12px] mt-2">Editors' Choice</h1>
                </div>
              </div>

              <div className="my-6">
                <button className="w-full bg-orange-500 hover:bg-orange-600 font-semibold text-white rounded-[10px] shadow-lg my-2 py-[8px]">
                  Install
                </button>
              </div>

              <h1 className="text-orange-400 text-[14px] px-2">
                🏠 You can share this with your family.
              </h1>

              <div className="my-4">
                <Swiper
                  spaceBetween={10}
                  slidesPerView={2.3}
                  className="py-3"
                >
                  {[
                    "6737c3d2053831731707858",
                    "6737c3dd796c61731707869",
                    "6737c3e7207b71731707879",
                    "6737c3edad6f41731707885",
                    "6737c3f4ddf1f1731707892"
                  ].map((id) => (
                    <SwiperSlide key={id}>
                      <div className="rounded-[10px] shadow-sm shadow-orange-800">
                        <img
                          className="rounded-[10px]"
                          src={`https://mystock-admin.scriptbasket.com/assets/apps_download/app_ss/${id}.png`}
                          alt=""
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <h1 className="font-[400] text-orange-300 text-[18px] px-2 mt-4">About this app</h1>
              <h5 className="text-orange-500 text-[14px] px-2">
                Little moments lead to big friendships. Share yours on Instagram.
              </h5>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Apps;
