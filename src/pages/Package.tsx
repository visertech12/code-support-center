
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockPackages } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

interface PackageData {
  id: string;
  name: string;
  description: string;
  price: number;
  daily_profit_percentage: number;
  duration_days: number;
  total_return_percentage: number;
  image_url: string;
  status: string;
}

const Package = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setPackages(mockPackages);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleBuyPackage = (packageData: PackageData) => {
    // Store selected package in session storage for recharge page
    sessionStorage.setItem('selectedPackage', JSON.stringify(packageData));
    navigate('/recharge');
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 mb-20">
      <h1 className="text-2xl font-bold mb-6">Investment Packages</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img 
                src={pkg.image_url || "https://via.placeholder.com/300x150"} 
                alt={pkg.name} 
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-0 right-0 bg-orange-500 text-white px-3 py-1 rounded-bl-lg">
                {pkg.daily_profit_percentage}% Daily
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
              <p className="text-gray-600 mb-4">{pkg.description}</p>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-gray-100 p-2 rounded">
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-semibold">${pkg.price}</p>
                </div>
                <div className="bg-gray-100 p-2 rounded">
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-semibold">{pkg.duration_days} Days</p>
                </div>
                <div className="bg-gray-100 p-2 rounded">
                  <p className="text-sm text-gray-500">Daily Profit</p>
                  <p className="font-semibold">{pkg.daily_profit_percentage}%</p>
                </div>
                <div className="bg-gray-100 p-2 rounded">
                  <p className="text-sm text-gray-500">Total Return</p>
                  <p className="font-semibold">{pkg.total_return_percentage}%</p>
                </div>
              </div>
              
              <button 
                onClick={() => handleBuyPackage(pkg)}
                className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {packages.length === 0 && !isLoading && (
        <div className="text-center py-8">
          <p className="text-gray-500">No packages available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default Package;
