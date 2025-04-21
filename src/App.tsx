import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Layout from "./pages/Layout";
import Index from "./pages/Index";
import CoinsPage from "./pages/CoinsPage";
import NetworksPage from "./pages/NetworksPage";
import TransactionVerifierPage from "./pages/TransactionVerifierPage";
import AboutPage from "./pages/AboutPage";
import CoinDetailPage from "./pages/CoinDetailPage";
import NetworkDetailPage from "./pages/NetworkDetailPage";
import NotFound from "./pages/NotFound";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import WhyPage from "./pages/WhyPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import { SidebarProvider } from "./components/ui/sidebar";
import { SiteSettingsProvider } from "./contexts/SiteSettingsContext";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import UsdtValidatorPage from "./pages/UsdtValidatorPage";
// REMOVED: import UsdtConverterPage from "./pages/UsdtConverterPage";
// REMOVED: import RandomCoinGeneratorPage from "./pages/RandomCoinGeneratorPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <SiteSettingsProvider>
            <AdminAuthProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <SidebarProvider>
                  <BrowserRouter>
                    <Routes>
                      <Route element={<Layout />}>
                        <Route path="/" element={<Index />} />
                        <Route path="/coins" element={<CoinsPage />} />
                        <Route path="/coins/:coinId" element={<CoinDetailPage />} />
                        <Route path="/networks" element={<NetworksPage />} />
                        <Route path="/networks/:networkId" element={<NetworkDetailPage />} />
                        <Route path="/verify" element={<TransactionVerifierPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/terms" element={<TermsPage />} />
                        <Route path="/privacy" element={<PrivacyPage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/why" element={<WhyPage />} />
                        <Route path="/usdt-validator" element={<UsdtValidatorPage />} />
                        {/* REMOVED: <Route path="/usdt-converter" element={<UsdtConverterPage />} /> */}
                        {/* REMOVED: <Route path="/random-coin" element={<RandomCoinGeneratorPage />} /> */}
                        <Route path="*" element={<NotFound />} />
                      </Route>
                      <Route path="/admin" element={<AdminLoginPage />} />
                      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                    </Routes>
                  </BrowserRouter>
                </SidebarProvider>
              </TooltipProvider>
            </AdminAuthProvider>
          </SiteSettingsProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
};

export default App;
