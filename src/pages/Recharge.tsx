import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import BottomNavigation from "@/components/BottomNavigation";

interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
}

const Recharge = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [formData, setFormData] = useState({
    amount: 50,
    paymentMethod: "",
    transactionId: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    accountNumber: "017xxxxxx66",
    rate: 100,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/");
        return;
      }
      
      // Fetch package details if ID is provided
      if (id) {
        const { data: packageData, error: packageError } = await supabase
          .from('packages')
          .select('*')
          .eq('id', id)
          .single();
          
        if (!packageError && packageData) {
          setSelectedPackage(packageData);
          setFormData(prev => ({ ...prev, amount: packageData.price }));
        }
      }
      
      // Fetch user's current balance
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('balance')
        .eq('id', session.user.id)
        .single();
        
      if (!userError && userData) {
        setCurrentBalance(userData.balance || 0);
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, [navigate, id]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validation
      if (!formData.paymentMethod) {
        toast({
          title: "Error",
          description: "Please select a payment method",
          variant: "destructive",
        });
        return;
      }
      
      if (!formData.transactionId) {
        toast({
          title: "Error",
          description: "Transaction ID is required",
          variant: "destructive",
        });
        return;
      }
      
      if (!selectedFile) {
        toast({
          title: "Error",
          description: "Payment screenshot is required",
          variant: "destructive",
        });
        return;
      }
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/");
        return;
      }
      
      setUploadingFile(true);
      
      // Upload screenshot
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${session.user.id}-${Date.now()}.${fileExt}`;
      
      // Check if the payment-screenshots bucket exists, if not create it
      const { data: bucketData, error: bucketError } = await supabase.storage.getBucket('payment-screenshots');
      
      if (bucketError && bucketError.message.includes('does not exist')) {
        await supabase.storage.createBucket('payment-screenshots', { public: true });
      }
      
      const { data: fileData, error: fileError } = await supabase.storage
        .from('payment-screenshots')
        .upload(fileName, selectedFile);
        
      if (fileError) {
        throw fileError;
      }
      
      // Get public URL for the uploaded file
      const { data: publicUrlData } = supabase.storage
        .from('payment-screenshots')
        .getPublicUrl(fileName);
        
      const screenshotUrl = publicUrlData.publicUrl;
      
      // Create deposit record
      const { data: depositData, error: depositError } = await supabase
        .from('deposits')
        .insert([
          {
            user_id: session.user.id,
            amount: formData.amount,
            payment_method: formData.paymentMethod,
            transaction_id: formData.transactionId,
            screenshot_url: screenshotUrl,
            status: 'pending',
            package_id: id || null
          }
        ]);
        
      if (depositError) {
        throw depositError;
      }
      
      // Create transaction record
      await supabase
        .from('transactions')
        .insert([
          {
            user_id: session.user.id,
            amount: formData.amount,
            type: 'deposit',
            status: 'pending',
            description: `Deposit of $${formData.amount} pending approval`
          }
        ]);
      
      toast({
        title: "Success",
        description: "Your deposit request has been submitted!",
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error('Error submitting deposit:', error);
      toast({
        title: "Error",
        description: "Failed to submit deposit request",
        variant: "destructive",
      });
    } finally {
      setUploadingFile(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-orange-100">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }
  
  const toPay = formData.amount * paymentInfo.rate;
  
  return (
    <div className="relative min-h-screen bg-orange-100 max-w-[480px] mx-auto overflow-hidden">
      <div className="relative overflow-x-hidden min-h-screen">
        <div className="absolute top-[-20px] scale-[1.3] bg-gradient-to-b from-orange-600 via-orange-400 to-orange-100 w-full h-[300px] rotate-[-10deg] blur-lg"></div>
        <img 
          className="absolute top-[-25px] right-[-25px] w-[30%] mix-blend-multiply rotate-[40deg] scale-[1.1] opacity-[50%]" 
          src="https://cdn-icons-png.flaticon.com/128/2953/2953536.png" 
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
                <h1 className="text-white text-[16px]">
                  {selectedPackage ? `Top-up for ${selectedPackage.name}` : "Deposit Funds"}
                </h1>
              </div>
              <div className="bg-gradient-to-b from-gray-200 to-orange-200 h-[40px] w-[40px] rounded-full p-[2px]">
                <img 
                  className="rounded-full w-full h-full" 
                  src="https://img.freepik.com/premium-photo/3d-rendering-avatar-design_1258715-60685.jpg" 
                  alt="" 
                />
              </div>
            </div>

            <div className="mt-[50px]">
              <div className="bg-white/50 backdrop-blur p-2 rounded-[10px]">
                <div className="flex justify-between items-center gap-2">
                  <div>
                    <h1 className="text-orange-500 font-semibold text-[16px]">Current Balance</h1>
                    <h1 className="text-orange-500 font-semibold text-[26px]">${currentBalance.toFixed(2)}</h1>
                  </div>
                  <img 
                    className="w-[70px] h-[70px]" 
                    src="https://cdn3d.iconscout.com/3d/premium/thumb/secure-wallet-3d-icon-download-in-png-blend-fbx-gltf-file-formats--balance-money-business-payment-shopping-pack-e-commerce-icons-5769610.png?f=webp" 
                    alt="" 
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium text-orange-600">
                    Amount
                  </label>
                  <div className="relative mb-2">
                    <Input
                      type="number"
                      name="amount"
                      className="bg-white/50 text-orange-400 ps-10 border-2 border-orange-500 focus:outline-none"
                      placeholder="Enter Amount to Deposit"
                      value={formData.amount}
                      onChange={handleChange}
                      disabled={selectedPackage !== null}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <div className="mb-2">
                    <label className="block mb-2 text-sm font-medium text-orange-600">
                      Deposit Method
                    </label>
                    <select 
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      className="bg-white/50 text-orange-500 text-sm rounded-lg w-full p-[12px] border-2 border-orange-600 focus:outline-none"
                    >
                      <option value="">Select Deposit Method</option>
                      <option value="bKash">bKash</option>
                      <option value="Nagad">Nagad</option>
                      <option value="USDT">USDT</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="border-2 border-orange-500 rounded-[10px] my-[20px]">
                    <div className="px-3 border-b-2 border-orange-500">
                      <h1 className="font-normal text-[14px] text-gray-500 mt-2">Our bKash Number:</h1>
                      <div className="flex items-center justify-between mb-2">
                        <h1 className="font-bold text-sm text-orange-500 text-nowrap truncate">
                          {paymentInfo.accountNumber}
                        </h1>
                        <button 
                          type="button"
                          className="text-orange-500 hover:text-orange-600 cursor-pointer"
                          onClick={() => {
                            navigator.clipboard.writeText(paymentInfo.accountNumber);
                            toast({
                              title: "Copied",
                              description: "Account number copied to clipboard",
                            });
                          }}
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-3 border-b-2 border-orange-500">
                      <h1 className="font-normal text-[14px] text-gray-500 my-2">Amount:</h1>
                      <h1 className="font-bold text-sm my-2 text-orange-500">{formData.amount.toFixed(2)} USDT</h1>
                    </div>
                    <div className="flex items-center justify-between px-3 border-b-2 border-orange-500">
                      <h1 className="font-normal text-[14px] text-gray-500 my-2">Rate:</h1>
                      <h1 className="font-bold text-sm my-2 text-orange-500">1 USDT = {paymentInfo.rate.toFixed(2)} Taka</h1>
                    </div>
                    <div className="flex items-center justify-between px-3">
                      <h1 className="font-normal text-[14px] text-gray-500 my-2">You Need To Pay:</h1>
                      <h1 className="font-bold text-sm my-2 text-orange-500">{toPay.toFixed(2)} Taka</h1>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="bg-white/50 rounded-[20px] p-4">
                    <h1 className="text-center text-[16px] font-semibold text-orange-600 underline">
                      After Pay Fill This Form Carefully
                    </h1>
                    <div className="mt-[10px]">
                      <label className="block mb-2 text-sm font-medium text-orange-500">
                        Your Payment Transaction ID
                      </label>
                      <div className="relative mb-2">
                        <Input
                          type="text"
                          name="transactionId"
                          value={formData.transactionId}
                          onChange={handleChange}
                          className="bg-white/50 text-orange-400 ps-10 border-2 border-orange-500 focus:outline-none"
                          placeholder="Enter your Payment Transaction ID"
                        />
                      </div>
                    </div>
                    <div className="mt-[10px] mb-[30px]">
                      <label className="block mb-2 text-sm font-medium text-orange-500">
                        Upload Payment Screenshot
                      </label>
                      <input
                        className="block w-full bg-transparent text-sm text-orange-500 border-2 border-orange-500 rounded-lg cursor-pointer bg-orange-50 py-[5px]"
                        type="file"
                        name="screenshot"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="mt-4">
                      <Button 
                        type="submit"
                        className="w-full bg-gradient-to-b from-orange-500 to-orange-400 hover:bg-gradient-to-t"
                        disabled={uploadingFile}
                      >
                        {uploadingFile ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                            Processing...
                          </>
                        ) : (
                          "Send Deposit Request!"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Recharge;
