
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { ChartContainer } from "@/components/ui/chart";
import { Loader2 } from "lucide-react";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingWithdrawals: 0,
    pendingDeposits: 0,
    totalTransactions: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  
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
        loadStats();
      }
    };
    
    checkAdmin();
  }, [navigate]);
  
  const loadStats = async () => {
    try {
      // Get total users
      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      
      // Get pending withdrawals
      const { count: pendingWithdrawalsCount } = await supabase
        .from('withdrawals')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');
      
      // Get pending deposits
      const { count: pendingDepositsCount } = await supabase
        .from('deposits')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');
      
      // Get total transactions
      const { count: transactionsCount } = await supabase
        .from('transactions')
        .select('*', { count: 'exact', head: true });
      
      setStats({
        totalUsers: userCount || 0,
        pendingWithdrawals: pendingWithdrawalsCount || 0,
        pendingDeposits: pendingDepositsCount || 0,
        totalTransactions: transactionsCount || 0,
      });
    } catch (error) {
      console.error('Error loading admin stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Chart data
  const userGrowthData = [
    { name: "Mon", users: 10 },
    { name: "Tue", users: 15 },
    { name: "Wed", users: 18 },
    { name: "Thu", users: 22 },
    { name: "Fri", users: 28 },
    { name: "Sat", users: 35 },
    { name: "Sun", users: 40 },
  ];

  const transactionData = [
    { name: "Mon", deposits: 10, withdrawals: 5 },
    { name: "Tue", deposits: 15, withdrawals: 8 },
    { name: "Wed", deposits: 12, withdrawals: 10 },
    { name: "Thu", deposits: 20, withdrawals: 12 },
    { name: "Fri", deposits: 18, withdrawals: 11 },
    { name: "Sat", deposits: 22, withdrawals: 15 },
    { name: "Sun", deposits: 25, withdrawals: 18 },
  ];
  
  // Chart configuration
  const chartConfig = {
    users: {
      label: "Users",
      color: "#f97316"
    },
    deposits: {
      label: "Deposits",
      color: "#f97316"
    },
    withdrawals: {
      label: "Withdrawals",
      color: "#fb923c"
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 overflow-y-auto">
        <AdminHeader title="Dashboard" />
        
        <main className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-500">{stats.totalUsers}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm font-medium text-gray-500">Pending Withdrawals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-500">{stats.pendingWithdrawals}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm font-medium text-gray-500">Pending Deposits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-500">{stats.pendingDeposits}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm font-medium text-gray-500">Total Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-500">{stats.totalTransactions}</div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent User Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={userGrowthData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="users" 
                            stroke="#f97316" 
                            activeDot={{ r: 8 }} 
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={transactionData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="deposits" 
                            stroke="#f97316" 
                            activeDot={{ r: 8 }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="withdrawals" 
                            stroke="#fb923c" 
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
