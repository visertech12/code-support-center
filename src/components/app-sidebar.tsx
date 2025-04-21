import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Coins, Network, Settings, Info, Mail, FileText, HelpCircle, QrCode, FileSearch, Shuffle } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarLink {
  to: string;
  icon: React.ComponentType<any>;
  label: string;
}

const links: SidebarLink[] = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/coins', icon: Coins, label: 'Coins' },
  { to: '/networks', icon: Network, label: 'Networks' },
  { to: '/services', icon: Settings, label: 'Services' },
  { to: '/verify', icon: FileSearch, label: 'Blockchain Transaction Verifier' },
  { to: '/why', icon: HelpCircle, label: 'Why Wallet2QR' },
  { to: '/about', icon: Info, label: 'About' },
  { to: '/contact', icon: Mail, label: 'Contact' },
  { to: '/terms', icon: FileText, label: 'Legal' },
];

export function AppSidebar() {
  const { isOpen, setOpen } = useSidebar();
  const location = useLocation();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-[280px] p-0 bg-gray-900">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className={`fixed top-16 left-0 h-[calc(100vh-64px)] w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out z-30 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <SidebarContent />
    </div>
  );
}

function SidebarContent() {
  const { setOpen } = useSidebar();
  const location = useLocation();

  return (
    <div className="p-4">
      <div className="flex items-center space-x-2 px-4 py-3">
        <QrCode className="h-6 w-6 text-crypto-lightPurple" />
        <span className="text-xl font-bold text-white">Wallet2QR</span>
      </div>
      
      <nav className="space-y-1 mt-6">
        {links.map((link) => {
          const isActive = location.pathname === link.to ||
                        (link.to !== '/' && location.pathname.startsWith(link.to));
          
          return (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                isActive 
                  ? "bg-white/10 text-white" 
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              )}
            >
              <link.icon className="w-5 h-5" />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
