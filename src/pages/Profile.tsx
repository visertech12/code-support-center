
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";

const Profile = () => {
  const navigate = useNavigate();

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
                <h1 className="text-white text-[16px]">Profile</h1>
              </div>
              <div className="bg-gradient-to-b from-gray-200 to-orange-200 h-[40px] w-[40px] rounded-full p-[2px]">
                <img 
                  className="rounded-full w-full h-full" 
                  src="https://img.freepik.com/premium-photo/3d-rendering-avatar-design_1258715-60685.jpg" 
                  alt="avatar" 
                />
              </div>
            </div>

            <div className="mt-[40px] mb-[20px]">
              <div className="flex flex-col items-center">
                <img 
                  className="border-[3px] w-[90px] h-[90px] rounded-full shadow-md shadow-orange-500" 
                  src="https://img.freepik.com/premium-photo/3d-rendering-avatar-design_1258715-60685.jpg" 
                  alt="profile" 
                />
                <div className="mt-3 text-center">
                  <h1 className="font-bold text-orange-700 text-[20px]">demodemo</h1>
                  <h1 className="font-semibold text-orange-700/70 text-[14px]">demodemo@gmail.com</h1>
                </div>
              </div>

              <div className="grid gap-3 bg-gradient-to-tr from-orange-500 to-orange-300 shadow-md p-3 rounded-[20px] mt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-white text-[12px] font-semibold">Account Balance</h1>
                    <h1 className="text-white text-[22px] font-bold">$0.00</h1>
                  </div>
                  <img className="w-[50px] opacity-80" src="https://cdn-icons-png.flaticon.com/128/11241/11241715.png" alt="" />
                </div>
                <hr />
                <div className="flex items-center justify-between">
                  <h1 className="text-white text-[12px] font-semibold">Total Stock Purchase</h1>
                  <h1 className="text-white text-[14px] font-semibold">$0.00</h1>
                </div>
                <div className="flex items-center justify-between">
                  <h1 className="text-white text-[12px] font-semibold">Total Cash Withdraw</h1>
                  <h1 className="text-white text-[14px] font-semibold">$0.00</h1>
                </div>
              </div>

              <div className="grid bg-white shadow-md px-3 rounded-[20px] mt-4">
                {[
                  { title: "Edit Profile", path: "/profile-setting" },
                  { title: "Account Password", path: "/account-password" },
                  { title: "Withdraw Password", path: "/withdraw-password" },
                  { title: "Withdraw Wallet", path: "/withdraw-wallet" },
                  { title: "Customer Service", path: "https://t.me/scriptbasket", external: true }
                ].map((item, index) => (
                  <div key={item.path}>
                    <a 
                      className="flex items-center justify-between py-3 cursor-pointer"
                      href={item.external ? item.path : undefined}
                      onClick={item.external ? undefined : () => navigate(item.path)}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                    >
                      <h1 className="text-black text-[14px] font-bold">{item.title}</h1>
                      <img 
                        className="w-[20px] opacity-50" 
                        src="https://cdn-icons-png.flaticon.com/128/2989/2989988.png" 
                        alt="arrow" 
                      />
                    </a>
                    {index < 4 && <hr />}
                  </div>
                ))}
              </div>

              <div className="grid bg-white shadow-md px-3 rounded-[20px] mt-4">
                <div className="flex items-center justify-between py-4 cursor-pointer">
                  <h1 className="text-red-500 text-[14px] font-bold">Logout</h1>
                  <img 
                    className="w-[20px] opacity-50 redImage" 
                    src="https://cdn-icons-png.flaticon.com/128/2989/2989988.png" 
                    alt="logout" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Profile;
