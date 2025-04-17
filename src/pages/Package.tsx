
import React from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";

// Define stock item type
interface StockItem {
  id: number;
  name: string;
  price: number;
  image: string;
  dailyProfit: number;
  totalProfit: number;
  validity: number;
}

const stocks: StockItem[] = [
  {
    id: 1,
    name: "TSLA",
    price: 50,
    image: "https://mystock-admin.scriptbasket.com/assets/images/plan/65ca7f1bc64751707769627.png",
    dailyProfit: 5,
    totalProfit: 75,
    validity: 15
  },
  {
    id: 2,
    name: "NVIDIA",
    price: 100,
    image: "https://mystock-admin.scriptbasket.com/assets/images/plan/65ca7f71caba51707769713.png",
    dailyProfit: 10,
    totalProfit: 150,
    validity: 15
  },
  {
    id: 3,
    name: "META",
    price: 200,
    image: "https://mystock-admin.scriptbasket.com/assets/images/plan/65ca7fc9efb401707769801.png",
    dailyProfit: 20,
    totalProfit: 300,
    validity: 15
  },
  {
    id: 4,
    name: "AMD",
    price: 300,
    image: "https://mystock-admin.scriptbasket.com/assets/images/plan/65ca80235fb711707769891.jpg",
    dailyProfit: 30,
    totalProfit: 450,
    validity: 15
  },
  {
    id: 5,
    name: "AMZN",
    price: 400,
    image: "https://mystock-admin.scriptbasket.com/assets/images/plan/65ca81545efd51707770196.jpg",
    dailyProfit: 40,
    totalProfit: 600,
    validity: 15
  }
];

const StockCard = ({ stock }: { stock: StockItem }) => (
  <div className="relative bg-gradient-to-b from-orange-600/80 to-orange-200/80 shadow-md p-3 rounded-[30px] mt-[60px]">
    <img 
      className="w-[45%] rotate-[-30deg] ms-[-20px] mt-[-50px] rounded-t-[50px] rounded-b-[20px] shadow-md shadow-orange-700" 
      src={stock.image} 
      alt={stock.name} 
    />
    <div className="mt-3 mb-[30px]">
      <h1 className="text-center text-[18px] font-bold text-white">{stock.name}</h1>
      <h1 className="text-center text-[18px] font-bold text-white bg-orange-500 rounded-full">${stock.price}</h1>
      <div className="grid gap-3 mt-3 ps-2">
        <div className="flex gap-2 items-center">
          <img 
            className="w-[20px] rounded-full border-[2px] border-white" 
            src="https://cdn-icons-png.flaticon.com/128/12484/12484055.png" 
            alt="profit" 
          />
          <h1 className="text-orange-800 text-[13px] font-semibold text-nowrap truncate">
            ${stock.dailyProfit} Daily Profit
          </h1>
        </div>
        <div className="flex gap-2 items-center">
          <img 
            className="w-[20px] rounded-full border-[2px] border-white" 
            src="https://cdn-icons-png.flaticon.com/128/12484/12484055.png" 
            alt="total profit" 
          />
          <h1 className="text-orange-800 text-[13px] font-semibold text-nowrap truncate">
            ${stock.totalProfit} Total Profit
          </h1>
        </div>
        <div className="flex gap-2 items-center">
          <img 
            className="w-[20px] rounded-full border-[2px] border-white" 
            src="https://cdn-icons-png.flaticon.com/128/12484/12484055.png" 
            alt="validity" 
          />
          <h1 className="text-orange-800 text-[13px] font-semibold text-nowrap truncate">
            {stock.validity} Days Validity
          </h1>
        </div>
      </div>
    </div>
    <a 
      className="absolute right-[-10px] bottom-[-10px] h-[50px] w-[50px] p-2 bg-orange-500 shadow-md shadow-orange-500 border-2 border-white rounded-full"
      href={`/recharge/${stock.id}`}
    >
      <img 
        className="w-full h-full invert" 
        src="https://cdn-icons-png.flaticon.com/128/4379/4379581.png" 
        alt="recharge" 
      />
    </a>
  </div>
);

const Package = () => {
  const navigate = useNavigate();
  
  return (
    <div className="auth-container">
      {/* Background gradient */}
      <div className="auth-bg-gradient"></div>
      
      {/* Decorative image */}
      <img 
        className="absolute top-[-25px] right-[-25px] w-[30%] mix-blend-multiply rotate-[40deg] scale-[1.1] opacity-[50%]"
        src="https://cdn-icons-png.flaticon.com/128/10951/10951883.png" 
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
              <h1 className="text-white text-[16px]">All Stocks</h1>
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
          
          {/* Stock cards grid */}
          <div className="mt-[50px] mb-[60px]">
            <div className="grid gap-4 grid-cols-2 mb-3">
              {stocks.map(stock => (
                <StockCard key={stock.id} stock={stock} />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Package;
