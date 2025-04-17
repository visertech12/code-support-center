
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import NoticeBoard from "./pages/NoticeBoard";
import Package from "./pages/Package";
import Team from "./pages/Team";
import Mining from "./pages/Mining";
import Apps from "./pages/Apps";
import Guide from "./pages/Guide";
import Profile from "./pages/Profile";
import Recharge from "./pages/Recharge";
import ProfileSetting from "./pages/ProfileSetting";
import AccountPassword from "./pages/AccountPassword";
import WithdrawPassword from "./pages/WithdrawPassword";
import WithdrawWallet from "./pages/WithdrawWallet";
import TransactionHistory from "./pages/TransactionHistory";
import RunningPackages from "./pages/RunningPackages";

// Admin routes
import AdminLogin from "./pages/admin/AdminLogin";
import AdminForgotPassword from "./pages/admin/AdminForgotPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersManagement from "./pages/admin/UsersManagement";
import DepositsManagement from "./pages/admin/DepositsManagement";
import WithdrawalsManagement from "./pages/admin/WithdrawalsManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected user routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/notice-board" element={
              <ProtectedRoute>
                <NoticeBoard />
              </ProtectedRoute>
            } />
            <Route path="/package" element={
              <ProtectedRoute>
                <Package />
              </ProtectedRoute>
            } />
            <Route path="/mining" element={
              <ProtectedRoute>
                <Mining />
              </ProtectedRoute>
            } />
            <Route path="/team/:level" element={
              <ProtectedRoute>
                <Team />
              </ProtectedRoute>
            } />
            <Route path="/apps" element={
              <ProtectedRoute>
                <Apps />
              </ProtectedRoute>
            } />
            <Route path="/guide" element={
              <ProtectedRoute>
                <Guide />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/profile-setting" element={
              <ProtectedRoute>
                <ProfileSetting />
              </ProtectedRoute>
            } />
            <Route path="/account-password" element={
              <ProtectedRoute>
                <AccountPassword />
              </ProtectedRoute>
            } />
            <Route path="/withdraw-password" element={
              <ProtectedRoute>
                <WithdrawPassword />
              </ProtectedRoute>
            } />
            <Route path="/withdraw-wallet" element={
              <ProtectedRoute>
                <WithdrawWallet />
              </ProtectedRoute>
            } />
            <Route path="/recharge/:id" element={
              <ProtectedRoute>
                <Recharge />
              </ProtectedRoute>
            } />
            <Route path="/recharge" element={
              <ProtectedRoute>
                <Recharge />
              </ProtectedRoute>
            } />
            <Route path="/transactions" element={
              <ProtectedRoute>
                <TransactionHistory />
              </ProtectedRoute>
            } />
            <Route path="/running-packages" element={
              <ProtectedRoute>
                <RunningPackages />
              </ProtectedRoute>
            } />
            {/* Redirect runing-packages (typo) to running-packages */}
            <Route path="/runing-packages" element={
              <ProtectedRoute>
                <RunningPackages />
              </ProtectedRoute>
            } />
            
            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
            <Route path="/admin/dashboard" element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <AdminProtectedRoute>
                <UsersManagement />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/deposits" element={
              <AdminProtectedRoute>
                <DepositsManagement />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/withdrawals" element={
              <AdminProtectedRoute>
                <WithdrawalsManagement />
              </AdminProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
