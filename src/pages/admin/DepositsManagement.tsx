
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface Deposit {
  id: string;
  user_id: string;
  amount: number;
  payment_method: string;
  transaction_id: string;
  screenshot_url: string | null;
  status: string;
  package_id: string | null;
  created_at: string;
  user_email?: string;
  user_name?: string;
}

const DepositsManagement = () => {
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    fetchDeposits();
  }, []);

  const fetchDeposits = async () => {
    setIsLoading(true);
    try {
      const { data: depositsData, error: depositsError } = await supabase
        .from("deposits")
        .select("*")
        .order("created_at", { ascending: false });

      if (depositsError) {
        throw depositsError;
      }

      // Enhance deposits with user information
      const enhancedDeposits = await Promise.all(
        (depositsData || []).map(async (deposit) => {
          const { data: userData, error: userError } = await supabase
            .from("profiles")
            .select("email, username, full_name")
            .eq("id", deposit.user_id)
            .single();

          return {
            ...deposit,
            user_email: userError ? "Unknown" : userData.email,
            user_name: userError ? "Unknown" : (userData.full_name || userData.username),
          };
        })
      );

      setDeposits(enhancedDeposits);
    } catch (error) {
      console.error("Error fetching deposits:", error);
      toast({
        title: "Error",
        description: "Could not load deposits",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (depositId: string, newStatus: string) => {
    setProcessing(depositId);
    try {
      const deposit = deposits.find((d) => d.id === depositId);
      if (!deposit) {
        throw new Error("Deposit not found");
      }

      // Update deposit status
      const { error: updateError } = await supabase
        .from("deposits")
        .update({ status: newStatus })
        .eq("id", depositId);

      if (updateError) {
        throw updateError;
      }

      // Update corresponding transaction
      const { data: transactionData, error: transactionError } = await supabase
        .from("transactions")
        .select("id")
        .eq("user_id", deposit.user_id)
        .eq("amount", deposit.amount)
        .eq("type", "deposit")
        .eq("status", "pending")
        .order("created_at", { ascending: false })
        .limit(1);

      if (!transactionError && transactionData && transactionData.length > 0) {
        await supabase
          .from("transactions")
          .update({ 
            status: newStatus,
            description: newStatus === 'approved' 
              ? `Deposit of $${deposit.amount} approved`
              : `Deposit of $${deposit.amount} rejected`
          })
          .eq("id", transactionData[0].id);
      }

      // If approved, add funds to user balance
      if (newStatus === "approved") {
        // Use the increment_balance function we already have
        const { error: balanceError } = await supabase.rpc(
          "increment_balance",
          {
            user_id_param: deposit.user_id,
            amount_param: deposit.amount,
          }
        );

        if (balanceError) {
          throw balanceError;
        }
        
        // If there's a package_id, create a user_package
        if (deposit.package_id) {
          // First get package details
          const { data: packageData, error: packageError } = await supabase
            .from("packages")
            .select("*")
            .eq("id", deposit.package_id)
            .single();
          
          if (!packageError && packageData) {
            // Calculate end date based on package duration
            const startDate = new Date();
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + packageData.duration_days);
            
            // Create user package
            await supabase.from("user_packages").insert([
              {
                user_id: deposit.user_id,
                package_id: deposit.package_id,
                purchase_amount: deposit.amount,
                status: "active",
                start_date: startDate.toISOString(),
                end_date: endDate.toISOString()
              }
            ]);
          }
        }
      }

      // Update local state
      setDeposits(
        deposits.map((d) =>
          d.id === depositId ? { ...d, status: newStatus } : d
        )
      );

      toast({
        title: "Success",
        description: `Deposit ${newStatus}`,
      });
    } catch (error: any) {
      console.error(`Error ${newStatus} deposit:`, error);
      toast({
        title: "Error",
        description: error.message || `Failed to ${newStatus} deposit`,
        variant: "destructive",
      });
    } finally {
      setProcessing(null);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar show={showSidebar} setShow={setShowSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="Deposits Management" onMenuClick={() => setShowSidebar(true)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4">
          <div className="container mx-auto">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Deposits</h2>
                <Button 
                  onClick={fetchDeposits} 
                  variant="outline" 
                  size="sm"
                  className="text-orange-500 border-orange-500 hover:bg-orange-50"
                >
                  Refresh
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment Method
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Transaction ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Screenshot
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {deposits.length > 0 ? (
                      deposits.map((deposit) => (
                        <tr key={deposit.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {deposit.user_name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {deposit.user_email}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              ${deposit.amount.toFixed(2)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {deposit.payment_method}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {deposit.transaction_id}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {deposit.screenshot_url ? (
                              <a
                                href={deposit.screenshot_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-500 hover:underline"
                              >
                                View Screenshot
                              </a>
                            ) : (
                              <span className="text-gray-500">No screenshot</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold leading-5 rounded-full ${getStatusBadgeClass(
                                deposit.status
                              )}`}
                            >
                              {deposit.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(deposit.created_at).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(deposit.created_at).toLocaleTimeString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {deposit.status === "pending" ? (
                              <div className="flex space-x-2">
                                <Button
                                  onClick={() =>
                                    handleStatusChange(deposit.id, "approved")
                                  }
                                  size="sm"
                                  className="bg-green-500 hover:bg-green-600"
                                  disabled={!!processing}
                                >
                                  {processing === deposit.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    "Approve"
                                  )}
                                </Button>
                                <Button
                                  onClick={() =>
                                    handleStatusChange(deposit.id, "rejected")
                                  }
                                  size="sm"
                                  variant="destructive"
                                  disabled={!!processing}
                                >
                                  {processing === deposit.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    "Reject"
                                  )}
                                </Button>
                              </div>
                            ) : (
                              <div className="text-sm text-gray-500 italic">
                                No actions available
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-6 py-4 text-center text-gray-500"
                        >
                          No deposits found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DepositsManagement;
