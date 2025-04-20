
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { AppSidebar } from '@/components/app-sidebar';
import Footer from '@/components/Footer';
import { SidebarProvider } from '@/components/ui/sidebar';

const Layout = () => {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <AppSidebar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default Layout;
