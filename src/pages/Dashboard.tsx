
import { Link } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";

const Dashboard = () => {
  return (
    <div className="auth-container">
      {/* Background gradient */}
      <div className="auth-bg-gradient"></div>
      
      {/* Decorative image */}
      <img 
        className="absolute top-[-25px] right-[-25px] w-[30%] mix-blend-multiply rotate-[40deg] scale-[1.1] opacity-[60%]"
        src="https://cdn-icons-png.flaticon.com/128/15177/15177698.png"
        alt="decorative"
      />
      
      <div className="relative z-10">
        <div className="p-[15px]">
          <div className="flex items-center justify-between">
            {/* User avatar */}
            <div className="bg-gradient-to-b from-gray-200 to-orange-200 h-[40px] w-[40px] rounded-full p-[2px]">
              <img 
                className="rounded-full w-full h-full" 
                src="https://img.freepik.com/premium-photo/3d-rendering-avatar-design_1258715-60685.jpg" 
                alt="user avatar"
              />
            </div>
            
            {/* Notice button */}
            <Link to="/notice-board" className="flex gap-3 items-center bg-black/30 backdrop-blur h-[40px] rounded-full px-[15px]">
              <div className="bg-transparent w-3 h-3 rounded-full ring-[4px] ring-orange-500"></div>
              <h1 className="text-white text-[16px]">Notice</h1>
            </Link>
          </div>
          
          {/* User balance section */}
          <div className="mt-[40px]">
            <h1 className="font-semibold text-orange-200 text-[18px]">demodemo</h1>
            <h1 className="font-bold text-gray-100 text-[32px]">$0.00</h1>
          </div>
          
          {/* Total earning section */}
          <div className="mt-[40px]">
            <div className="flex items-center justify-between gap-2 bg-gradient-to-bl from-orange-800 to-orange-700 p-3 rounded-full">
              <h1 className="text-orange-200/60 font-bold">Total Earning</h1>
              <h1 className="text-white font-bold">$0.00</h1>
            </div>
          </div>
          
          {/* Menu grid */}
          <div className="mt-[20px]">
            <div className="grid gap-4 grid-cols-3">
              {menuItems.map((item, index) => (
                <MenuGridItem key={index} href={item.href} iconSrc={item.iconSrc} label={item.label} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Transactions section */}
        <div className="bg-gradient-to-b from-white/80 to-orange-100 p-3 rounded-t-[30px] pb-[50px]">
          <div className="bg-orange-200 w-12 h-2 rounded-full mx-auto"></div>
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <h1 className="text-gray-600 font-bold text-left text-[20px]">Transactions</h1>
              <Link to="/transactions" className="flex items-center gap-2">
                <h1 className="text-gray-600 font-normal text-[14px]">See All</h1>
                <img className="w-[10px] h-[10px]" src="https://cdn-icons-png.flaticon.com/128/271/271228.png" alt="arrow" />
              </Link>
            </div>
            <div className="grid gap-4 mt-4">
              <div className="h-[200px] grid grid-cols-1 content-center justify-items-center">
                <div className="grid content-center justify-items-center">
                  <img width="60px" className="hue-rotate-[224deg]" src="https://cdn-icons-png.flaticon.com/128/16504/16504070.png" alt="no transactions" />
                  <h1 className="text-gray-500 text-sm mt-2">No Transactions Found!</h1>
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

// Menu grid item component
const MenuGridItem = ({ href, iconSrc, label }: { href: string; iconSrc: string; label: string }) => (
  <Link 
    to={href}
    className="grid justify-items-center bg-white/30 shadow-md shadow-gray-500/5 rounded-[20px] px-2 py-5"
  >
    <img 
      className="w-[45px] aspect-square rounded-full bg-orange-600" 
      src={iconSrc} 
      alt={label}
    />
    <h1 className="text-[13px] text-gray-600 font-semibold text-nowrap mt-4">{label}</h1>
  </Link>
);

// Menu item data
const menuItems = [
  {
    href: "/cashout",
    iconSrc: "https://cdn-icons-png.flaticon.com/128/5659/5659950.png",
    label: "Withdraw"
  },
  {
    href: "/running-packages",
    iconSrc: "https://cdn-icons-png.flaticon.com/128/6286/6286629.png",
    label: "My Stocks"
  },
  {
    href: "/team/1",
    iconSrc: "https://cdn-icons-png.flaticon.com/128/2843/2843289.png",
    label: "Teams"
  },
  {
    href: "/transactions",
    iconSrc: "https://cdn-icons-png.flaticon.com/128/7400/7400300.png",
    label: "All Records"
  },
  {
    href: "/records/cashout",
    iconSrc: "https://cdn-icons-png.flaticon.com/128/17871/17871628.png",
    label: "Withdrawals"
  },
  {
    href: "/commissions",
    iconSrc: "https://cdn-icons-png.flaticon.com/128/6132/6132721.png",
    label: "Commission"
  },
  {
    href: "/news",
    iconSrc: "https://cdn-icons-png.flaticon.com/128/2353/2353154.png",
    label: "News"
  },
  {
    href: "/guide",
    iconSrc: "https://cdn-icons-png.flaticon.com/128/4542/4542770.png",
    label: "Guide"
  },
  {
    href: "/apps",
    iconSrc: "https://cdn-icons-png.flaticon.com/128/1029/1029767.png",
    label: "Apps"
  }
];

export default Dashboard;
