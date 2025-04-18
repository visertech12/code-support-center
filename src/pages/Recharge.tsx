
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface SelectedPackage {
  id: string;
  name: string;
  price: number;
}

const Recharge = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: '',
    paymentMethod: 'bitcoin',
    transactionId: '',
    screenshot: null as File | null
  });
  const [paymentDetails, setPaymentDetails] = useState({
    wallet: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    bankDetails: 'Bank: ABC Bank\nAccount: 123456789\nName: MyStock Investment'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<SelectedPackage | null>(null);
  
  useEffect(() => {
    // Check for selected package from packages page
    const packageData = sessionStorage.getItem('selectedPackage');
    if (packageData) {
      try {
        const parsedData = JSON.parse(packageData);
        setSelectedPackage(parsedData);
        setFormData(prev => ({
          ...prev,
          amount: parsedData.price.toString()
        }));
      } catch (error) {
        console.error('Error parsing package data:', error);
      }
    }
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, screenshot: e.target.files![0] }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.transactionId) {
      toast({
        title: "Error",
        description: "Please enter transaction ID",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Mock API call for deposit
    setTimeout(() => {
      toast({
        title: "Deposit Requested",
        description: "Your deposit request has been submitted and is pending approval",
      });
      
      navigate('/dashboard');
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 mb-20">
      <h1 className="text-2xl font-bold mb-6">Deposit Funds</h1>
      
      {selectedPackage && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-lg mb-2">Selected Package</h2>
          <p className="text-gray-700">
            <span className="font-medium">{selectedPackage.name}</span> - ${selectedPackage.price}
          </p>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Amount ($)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter amount"
              required
              min="1"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Payment Method
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="bitcoin">Bitcoin</option>
              <option value="ethereum">Ethereum</option>
              <option value="bank">Bank Transfer</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Payment Address
            </label>
            <div className="bg-gray-100 p-4 rounded-md mb-2">
              {formData.paymentMethod === 'bank' ? (
                <pre className="whitespace-pre-wrap text-sm">{paymentDetails.bankDetails}</pre>
              ) : (
                <div>
                  <p className="text-sm mb-2 break-all">{paymentDetails.wallet}</p>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(paymentDetails.wallet);
                      toast({
                        title: "Copied",
                        description: "Wallet address copied to clipboard",
                      });
                    }}
                    className="text-xs bg-orange-500 text-white px-2 py-1 rounded"
                  >
                    Copy Address
                  </button>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500">
              Please send the exact amount to this address and then fill in the transaction details below.
            </p>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Transaction ID
            </label>
            <input
              type="text"
              name="transactionId"
              value={formData.transactionId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter transaction ID or reference"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Payment Screenshot (Optional)
            </label>
            <input
              type="file"
              name="screenshot"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Upload a screenshot of your payment for faster verification.
            </p>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Processing...
              </>
            ) : (
              "Submit Deposit Request"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Recharge;
