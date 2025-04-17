
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";
import { Loader2 } from "lucide-react";

interface Stock {
  id: number;
  name: string;
  price: number;
  image: string;
  dailyProfit: number;
  totalProfit: number;
  validity: number;
}

interface PaymentMethod {
  id: string;
  name: string;
  payment_number?: string;
  currency?: string;
  exchange_rate?: number;
}

// Stock data (to be replaced with database when API is ready)
const stocks: Stock[] = [
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

const Recharge = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const [amount, setAmount] = useState<number>(0);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: "1000", name: "bKash", payment_number: "017xxxxxx66" },
    { id: "1001", name: "Nagad", payment_number: "018xxxxxx77" },
    { id: "1002", name: "USDT", payment_number: "TC8xxxxx9F", currency: "USDT", exchange_rate: 100 }
  ]);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Get stock details if id is provided
  useEffect(() => {
    if (id) {
      const stockId = parseInt(id);
      const stock = stocks.find(s => s.id === stockId);
      if (stock) {
        setSelectedStock(stock);
        setAmount(stock.price);
      } else {
        toast({
          title: "Error",
          description: "Stock not found",
          variant: "destructive",
        });
        navigate('/package');
      }
    } else {
      // Default amount for general recharge
      setAmount(50);
    }
  }, [id, navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMethod(e.target.value);
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Payment number copied to clipboard",
    });
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to make a deposit",
        variant: "destructive",
      });
      navigate('/');
      return;
    }

    if (!selectedMethod) {
      toast({
        title: "Error",
        description: "Please select a payment method",
        variant: "destructive",
      });
      return;
    }

    if (!transactionId) {
      toast({
        title: "Error",
        description: "Please enter the transaction ID",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Upload screenshot if available
      let screenshotUrl = null;
      if (screenshot) {
        try {
          const fileExt = screenshot.name.split('.').pop();
          const fileName = `${user.id}_${Date.now()}.${fileExt}`;
          const filePath = `${user.id}/${fileName}`;
          
          const { error: uploadError } = await supabase.storage
            .from('screenshots')
            .upload(filePath, screenshot);
            
          if (uploadError) {
            throw uploadError;
          }
          
          const { data: publicUrlData } = supabase.storage
            .from('screenshots')
            .getPublicUrl(filePath);
            
          if (publicUrlData) {
            screenshotUrl = publicUrlData.publicUrl;
          }
        } catch (uploadError) {
          console.error('Error uploading screenshot:', uploadError);
          // Continue without screenshot if upload fails
        }
      }

      // Create deposit record
      const { error: depositError } = await supabase
        .from('deposits')
        .insert([
          {
            user_id: user.id,
            amount: amount,
            payment_method: paymentMethods.find(m => m.id === selectedMethod)?.name || selectedMethod,
            transaction_id: transactionId,
            screenshot_url: screenshotUrl,
            package_id: selectedStock ? String(selectedStock.id) : null,
            status: 'pending'
          }
        ]);

      if (depositError) {
        throw depositError;
      }

      // Create transaction record
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert([
          {
            user_id: user.id,
            amount: amount,
            type: 'deposit',
            status: 'pending',
            description: `Deposit of $${amount} ${selectedStock ? `for stock: ${selectedStock.name}` : '(account recharge)'}`
          }
        ]);

      if (transactionError) {
        throw transactionError;
      }

      toast({
        title: "Success",
        description: "Deposit request submitted successfully",
      });

      // Redirect to transactions page
      navigate('/transactions');
    } catch (error: any) {
      console.error('Error submitting deposit:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit deposit request",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getSelectedMethod = () => {
    return paymentMethods.find(method => method.id === selectedMethod);
  };

  const calculateLocalAmount = () => {
    const method = getSelectedMethod();
    if (method && method.exchange_rate) {
      return (amount * method.exchange_rate).toFixed(2);
    }
    return (amount * 100).toFixed(2); // Default exchange rate
  };

  return (
    <div className="relative overflow-x-hidden min-h-[100vh]">
      {/* Background gradient */}
      <div className="absolute top-[-20px] scale-[1.3] bg-gradient-to-b from-orange-600 via-orange-400 to-orange-100 w-full h-[300px] rotate-[-10deg] blur-lg"></div>
      
      {/* Decorative icon */}
      <img
        className="absolute top-[-25px] right-[-25px] w-[30%] mix-blend-multiply rotate-[40deg] scale-[1.1] opacity-[50%]"
        src="https://cdn-icons-png.flaticon.com/128/2953/2953536.png"
        alt=""
      />

      <div className="relative z-[2]">
        <div className="p-[15px]">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex gap-3 items-center bg-black/30 backdrop-blur h-[40px] rounded-full px-[15px]">
              <div>
                <img 
                  className="w-[20px] cursor-pointer" 
                  src="https://cdn-icons-png.flaticon.com/128/507/507257.png" 
                  alt=""
                  onClick={handleBack}
                />
              </div>
              <h1 className="text-white text-[16px]">
                {selectedStock ? `Top-up for ${selectedStock.name}` : "Recharge Account"}
              </h1>
            </div>
            <div className="bg-gradient-to-b from-gray-200 to-orange-200 h-[40px] w-[40px] rounded-full p-[2px]">
              <img 
                className="rounded-full w-full h-full" 
                src={profile?.avatar_url || "https://img.freepik.com/premium-photo/3d-rendering-avatar-design_1258715-60685.jpg"}
                alt="" 
              />
            </div>
          </div>

          <div className="mt-[50px]">
            {/* Current balance */}
            <div className="bg-white/50 backdrop-blur p-2 rounded-[10px]">
              <div className="flex justify-between items-center gap-2">
                <div>
                  <h1 className="text-orange-500 font-semibold text-[16px]">Current Balance</h1>
                  <h1 className="text-orange-500 font-semibold text-[26px]">
                    ${profile?.balance?.toFixed(2) || "0.00"}
                  </h1>
                </div>
                <img 
                  className="w-[70px] h-[70px]" 
                  src="https://cdn3d.iconscout.com/3d/premium/thumb/secure-wallet-3d-icon-download-in-png-blend-fbx-gltf-file-formats--balance-money-business-payment-shopping-pack-e-commerce-icons-5769610.png?f=webp" 
                  alt="" 
                />
              </div>
            </div>

            {/* Amount */}
            <div className="mt-4">
              <label 
                htmlFor="amount" 
                className="block mb-2 text-sm font-medium text-orange-600"
              >
                Amount
              </label>
              <div className="relative mb-2">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <i className="fi fi-sr-money-bill-wave w-4 h-5 text-orange-500"></i>
                </div>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => !selectedStock && setAmount(Number(e.target.value))}
                  className="bg-white/50 text-orange-400 text-sm rounded-lg w-full ps-10 p-2.5 border-2 border-orange-500 focus:!outline-0 border-amber-500 focus:outline-2 font-bold text-orange-500 focus:outline-amber-600 bg-white/50"
                  placeholder="Enter Amount to Deposit"
                  readOnly={!!selectedStock}
                />
              </div>
            </div>

            {/* Payment method */}
            <div className="mt-4">
              <div className="mb-2">
                <label 
                  htmlFor="payment_method" 
                  className="block mb-2 text-sm font-medium text-orange-600"
                >
                  Deposit Method
                </label>
                <div className="relative mb-2">
                  <select
                    id="payment_method"
                    value={selectedMethod}
                    onChange={handleMethodChange}
                    className="bg-white/50 text-orange-500 text-sm rounded-lg w-full p-[12px] border-2 border-orange-600 focus:!outline-0 focus:outline-transparent border-amber-500 focus:outline-2 focus:outline-amber-600 bg-white/50"
                  >
                    <option value="">Select Deposit Method</option>
                    {paymentMethods.map((method) => (
                      <option key={method.id} value={method.id}>
                        {method.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Payment details */}
            {selectedMethod && (
              <div className="mt-4">
                <div className="border-2 border-orange-500 rounded-[10px] my-[20px]">
                  <div className="px-3 border-b-2 border-orange-500">
                    <h1 className="font-normal text-[14px] text-gray-500 mt-2">
                      Our {getSelectedMethod()?.name} Number:
                    </h1>
                    <div className="flex items-center justify-between mb-2">
                      <h1 className="font-bold text-sm text-orange-500 text-nowrap truncate">
                        {getSelectedMethod()?.payment_number || "Not available"}
                      </h1>
                      <i 
                        className="fi fi-sr-copy-alt leading-[0px] text-orange-500 hover:text-orange-600 cursor-pointer"
                        onClick={() => copyToClipboard(getSelectedMethod()?.payment_number || "")}
                      ></i>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between px-3 border-b-2 border-orange-500">
                    <h1 className="font-normal text-[14px] text-gray-500 my-2">Amount:</h1>
                    <h1 className="font-bold text-sm my-2 text-orange-500">
                      {amount.toFixed(2)} {getSelectedMethod()?.currency || "USD"}
                    </h1>
                  </div>
                  
                  {getSelectedMethod()?.exchange_rate && (
                    <div className="flex items-center justify-between px-3 border-b-2 border-orange-500">
                      <h1 className="font-normal text-[14px] text-gray-500 my-2">Rate:</h1>
                      <h1 className="font-bold text-sm my-2 text-orange-500">
                        1 {getSelectedMethod()?.currency || "USD"} = {getSelectedMethod()?.exchange_rate.toFixed(2)} Taka
                      </h1>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between px-3">
                    <h1 className="font-normal text-[14px] text-gray-500 my-2">You Need To Pay:</h1>
                    <h1 className="font-bold text-sm my-2 text-orange-500">
                      {calculateLocalAmount()} Taka
                    </h1>
                  </div>
                </div>
              </div>
            )}

            {/* Payment form */}
            <div className="mt-4">
              <div className="bg-white/50 rounded-[20px] p-4">
                <h1 className="text-center text-[16px] font-semibold text-orange-600 underline">
                  After Pay Fill This Form Carefully
                </h1>
                
                <div className="mt-[10px]">
                  <label 
                    htmlFor="transaction_id" 
                    className="block mb-2 text-sm font-medium text-orange-500"
                  >
                    Your Payment Transaction ID
                  </label>
                  <div className="relative mb-2">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <i className="fi fi-sr-file-invoice-dollar w-4 h-5 text-orange-500"></i>
                    </div>
                    <input
                      type="text"
                      id="transaction_id"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      className="bg-white/50 text-orange-400 text-sm rounded-lg w-full ps-10 p-2.5 border-2 border-orange-500 focus:!outline-0"
                      placeholder="Enter your Payment Transaction ID"
                    />
                  </div>
                </div>
                
                <div className="mt-[10px] mb-[30px]">
                  <label 
                    className="block mb-2 text-sm font-medium text-orange-500" 
                    htmlFor="screenshot"
                  >
                    Upload Payment Screenshot
                  </label>
                  <input
                    className="block w-full bg-transparent text-sm text-orange-500 border-2 border-orange-500 rounded-lg cursor-pointer bg-orange-50 py-[5px]"
                    id="screenshot"
                    name="screenshot"
                    type="file"
                    accept="image/*"
                    onChange={handleScreenshotChange}
                  />
                </div>
                
                <div className="mt-4">
                  <Button
                    type="button"
                    className="bg-gradient-to-b hover:bg-gradient-to-t from-orange-500 to-orange-400 border-0 rounded-[12px] !w-[100%]"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center text-body-5 px-4 py-2.5">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center text-body-5 px-4 py-2.5">
                        Send Deposit Request!
                      </span>
                    )}
                  </Button>
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

export default Recharge;
