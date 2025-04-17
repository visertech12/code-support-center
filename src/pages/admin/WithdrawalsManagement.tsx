
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { CheckCircle, XCircle, Eye } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Withdrawal {
  id: string;
  user_id: string;
  amount: number;
  payment_method: string;
  wallet_address: string;
  created_at: string;
  status: string;
  username: string;
}

const WithdrawalsManagement = () => {
  const navigate = useNavigate();
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<Withdrawal | null>(null);
  
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/admin/login");
        return;
      }
      
      // Check if user has admin role
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
      
      if (error || data?.role !== 'admin') {
        navigate("/admin/login");
      } else {
        fetchWithdrawals();
      }
    };
    
    checkAdmin();
  }, [navigate]);
  
  const fetchWithdrawals = async () => {
    try {
      // Using a join to get username from profiles
      const { data, error } = await supabase
        .from('withdrawals')
        .select(`
          *,
          profiles:user_id (username)
        `);
        
      if (error) {
        throw error;
      }
      
      // Transform the data to include username directly
      const formattedWithdrawals = data.map(item => ({
        ...item,
        username: item.profiles?.username || 'Unknown',
      }));
      
      setWithdrawals(formattedWithdrawals || []);
    } catch (error) {
      console.error('Error fetching withdrawals:', error);
      toast({
        title: "Error",
        description: "Failed to load withdrawals",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const approveWithdrawal = async (withdrawalId: string) => {
    try {
      // Get the withdrawal details
      const { data: withdrawalData, error: withdrawalError } = await supabase
        .from('withdrawals')
        .select('*')
        .eq('id', withdrawalId)
        .single();
        
      if (withdrawalError) throw withdrawalError;
      
      // Update withdrawal status to approved
      const { error: updateError } = await supabase
        .from('withdrawals')
        .update({ status: 'approved' })
        .eq('id', withdrawalId);
        
      if (updateError) throw updateError;
      
      // Create a transaction record
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert([
          {
            user_id: withdrawalData.user_id,
            amount: withdrawalData.amount,
            type: 'withdrawal',
            status: 'completed',
            description: `Withdrawal of $${withdrawalData.amount} approved`,
            reference_id: withdrawalId
          }
        ]);
        
      if (transactionError) throw transactionError;
      
      // Update local state
      setWithdrawals(withdrawals.map(withdrawal => 
        withdrawal.id === withdrawalId ? { ...withdrawal, status: 'approved' } : withdrawal
      ));
      
      toast({
        title: "Success",
        description: "Withdrawal approved",
      });
    } catch (error) {
      console.error('Error approving withdrawal:', error);
      toast({
        title: "Error",
        description: "Failed to approve withdrawal",
        variant: "destructive",
      });
    }
  };
  
  const rejectWithdrawal = async (withdrawalId: string) => {
    try {
      // Get the withdrawal details
      const { data: withdrawalData, error: withdrawalError } = await supabase
        .from('withdrawals')
        .select('*')
        .eq('id', withdrawalId)
        .single();
        
      if (withdrawalError) throw withdrawalError;
      
      // Update withdrawal status to rejected
      const { error: updateError } = await supabase
        .from('withdrawals')
        .update({ status: 'rejected' })
        .eq('id', withdrawalId);
        
      if (updateError) throw updateError;
      
      // Refund the amount back to user's balance
      const { error: balanceError } = await supabase
        .rpc('increment_balance', { 
          user_id_param: withdrawalData.user_id,
          amount_param: withdrawalData.amount
        });
        
      if (balanceError) throw balanceError;
      
      // Create a transaction record
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert([
          {
            user_id: withdrawalData.user_id,
            amount: withdrawalData.amount,
            type: 'withdrawal_refund',
            status: 'completed',
            description: `Withdrawal of $${withdrawalData.amount} rejected and refunded`,
            reference_id: withdrawalId
          }
        ]);
        
      if (transactionError) throw transactionError;
      
      // Update local state
      setWithdrawals(withdrawals.map(withdrawal => 
        withdrawal.id === withdrawalId ? { ...withdrawal, status: 'rejected' } : withdrawal
      ));
      
      toast({
        title: "Success",
        description: "Withdrawal rejected and amount refunded",
      });
    } catch (error) {
      console.error('Error rejecting withdrawal:', error);
      toast({
        title: "Error",
        description: "Failed to reject withdrawal",
        variant: "destructive",
      });
    }
  };
  
  const filteredWithdrawals = withdrawals.filter(withdrawal => 
    withdrawal.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    withdrawal.payment_method?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    withdrawal.wallet_address?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 overflow-y-auto">
        <AdminHeader title="Withdrawals Management" />
        
        <main className="p-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
              <h2 className="text-xl font-semibold">All Withdrawals</h2>
              
              <div className="w-full md:w-64">
                <Input
                  placeholder="Search withdrawals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-orange-200 focus-visible:ring-orange-500"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Wallet Address</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        Loading withdrawals...
                      </TableCell>
                    </TableRow>
                  ) : filteredWithdrawals.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        No withdrawals found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredWithdrawals.map((withdrawal) => (
                      <TableRow key={withdrawal.id}>
                        <TableCell>{withdrawal.username}</TableCell>
                        <TableCell>${withdrawal.amount}</TableCell>
                        <TableCell>{withdrawal.payment_method}</TableCell>
                        <TableCell>
                          <span className="truncate max-w-[150px] block">
                            {withdrawal.wallet_address}
                          </span>
                        </TableCell>
                        <TableCell>
                          {new Date(withdrawal.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            withdrawal.status === 'approved' 
                              ? 'bg-green-100 text-green-700' 
                              : withdrawal.status === 'rejected'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {withdrawal.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedWithdrawal(withdrawal)}
                                >
                                  <Eye className="h-4 w-4 text-blue-500" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Withdrawal Details</DialogTitle>
                                </DialogHeader>
                                {selectedWithdrawal && (
                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="font-semibold">User:</div>
                                    <div>{selectedWithdrawal.username}</div>
                                    
                                    <div className="font-semibold">Amount:</div>
                                    <div>${selectedWithdrawal.amount}</div>
                                    
                                    <div className="font-semibold">Method:</div>
                                    <div>{selectedWithdrawal.payment_method}</div>
                                    
                                    <div className="font-semibold">Wallet Address:</div>
                                    <div className="break-all">{selectedWithdrawal.wallet_address}</div>
                                    
                                    <div className="font-semibold">Date:</div>
                                    <div>{new Date(selectedWithdrawal.created_at).toLocaleString()}</div>
                                    
                                    <div className="font-semibold">Status:</div>
                                    <div>{selectedWithdrawal.status}</div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            
                            {withdrawal.status === 'pending' && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => approveWithdrawal(withdrawal.id)}
                                >
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                </Button>
                                
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => rejectWithdrawal(withdrawal.id)}
                                >
                                  <XCircle className="h-4 w-4 text-red-500" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WithdrawalsManagement;
