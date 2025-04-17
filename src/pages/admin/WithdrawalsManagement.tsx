
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Check, X, Eye } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { supabase } from '@/lib/supabaseClient';

interface Withdrawal {
  id: string;
  user_id: string;
  amount: number;
  payment_method: string;
  wallet_address: string;
  status: string;
  created_at: string;
  username?: string;
  email?: string;
}

const WithdrawalsManagement = () => {
  const navigate = useNavigate();
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Dialog state
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<Withdrawal | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/admin/login');
        return;
      }
      
      // Check if user has admin role
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
      
      if (error || data?.role !== 'admin') {
        navigate('/admin/login');
      } else {
        fetchWithdrawals();
      }
    };
    
    checkAdmin();
  }, [navigate]);

  const fetchWithdrawals = async () => {
    try {
      // Get all withdrawals with user information
      const { data, error } = await supabase
        .from('withdrawals')
        .select(`
          *,
          profiles:user_id (username, email)
        `)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      // Format data to include username and email
      const formattedData = data.map((item: any) => ({
        ...item,
        username: item.profiles?.username,
        email: item.profiles?.email,
      }));
      
      setWithdrawals(formattedData);
    } catch (error) {
      console.error('Error fetching withdrawals:', error);
      toast({
        title: 'Error',
        description: 'Failed to load withdrawals',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const openDetailsDialog = (withdrawal: Withdrawal) => {
    setSelectedWithdrawal(withdrawal);
    setIsDetailsOpen(true);
  };
  
  const processWithdrawal = async (id: string, action: 'approve' | 'reject') => {
    setIsProcessing(true);
    
    try {
      const status = action === 'approve' ? 'completed' : 'rejected';
      
      // Update withdrawal status
      const { error: updateError } = await supabase
        .from('withdrawals')
        .update({ status })
        .eq('id', id);
        
      if (updateError) throw updateError;
      
      if (action === 'approve') {
        // Get withdrawal details
        const { data: withdrawalData, error: withdrawalError } = await supabase
          .from('withdrawals')
          .select('user_id, amount')
          .eq('id', id)
          .single();
          
        if (withdrawalError) throw withdrawalError;
        
        // Add transaction record
        const { error: transactionError } = await supabase
          .from('transactions')
          .insert({
            user_id: withdrawalData.user_id,
            amount: withdrawalData.amount,
            type: 'withdrawal',
            status: 'completed',
            description: `Withdrawal of $${withdrawalData.amount} approved`,
            reference_id: id
          });
          
        if (transactionError) throw transactionError;
      }
      
      // Update local state
      setWithdrawals(withdrawals.map(withdrawal => 
        withdrawal.id === id ? { ...withdrawal, status } : withdrawal
      ));
      
      toast({
        title: 'Success',
        description: `Withdrawal ${action === 'approve' ? 'approved' : 'rejected'} successfully`,
      });
      
      setIsDetailsOpen(false);
    } catch (error) {
      console.error(`Error ${action}ing withdrawal:`, error);
      toast({
        title: 'Error',
        description: `Failed to ${action} withdrawal`,
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const filteredWithdrawals = withdrawals.filter(withdrawal => 
    withdrawal.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    withdrawal.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    withdrawal.payment_method.toLowerCase().includes(searchTerm.toLowerCase()) ||
    withdrawal.wallet_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    withdrawal.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar show={sidebarOpen} setShow={setSidebarOpen} />
      
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
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Wallet Address</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
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
                        <TableCell>
                          <div className="font-medium">{withdrawal.username}</div>
                          <div className="text-xs text-gray-500">{withdrawal.email}</div>
                        </TableCell>
                        <TableCell>${withdrawal.amount.toFixed(2)}</TableCell>
                        <TableCell>{withdrawal.payment_method}</TableCell>
                        <TableCell>
                          <div className="truncate max-w-[120px]">
                            {withdrawal.wallet_address}
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(withdrawal.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            withdrawal.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : withdrawal.status === 'rejected'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {withdrawal.status || 'pending'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openDetailsDialog(withdrawal)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
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
      
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        {selectedWithdrawal && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Withdrawal Details</DialogTitle>
              <DialogDescription>
                Review and process this withdrawal request
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">User:</div>
                <div>{selectedWithdrawal.username}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">Amount:</div>
                <div>${selectedWithdrawal.amount.toFixed(2)}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">Payment Method:</div>
                <div>{selectedWithdrawal.payment_method}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">Wallet Address:</div>
                <div className="break-all">{selectedWithdrawal.wallet_address}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">Date:</div>
                <div>{new Date(selectedWithdrawal.created_at).toLocaleString()}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium">Status:</div>
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedWithdrawal.status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : selectedWithdrawal.status === 'rejected'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {selectedWithdrawal.status || 'pending'}
                  </span>
                </div>
              </div>
            </div>
            <DialogFooter>
              {selectedWithdrawal.status === 'pending' && (
                <div className="flex w-full justify-between">
                  <Button 
                    variant="destructive"
                    onClick={() => processWithdrawal(selectedWithdrawal.id, 'reject')}
                    disabled={isProcessing}
                    className="flex gap-2 items-center"
                  >
                    <X className="h-4 w-4" />
                    Reject
                  </Button>
                  <Button 
                    className="bg-green-600 hover:bg-green-700 flex gap-2 items-center"
                    onClick={() => processWithdrawal(selectedWithdrawal.id, 'approve')}
                    disabled={isProcessing}
                  >
                    <Check className="h-4 w-4" />
                    Approve
                  </Button>
                </div>
              )}
              {selectedWithdrawal.status !== 'pending' && (
                <Button onClick={() => setIsDetailsOpen(false)} className="w-full">
                  Close
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default WithdrawalsManagement;
