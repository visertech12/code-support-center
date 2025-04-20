
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Coins, Network, Settings, Info, Mail } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

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
  { to: '/about', icon: Info, label: 'About' },
  { to: '/contact', icon: Mail, label: 'Contact' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">CryptoQR</span>
          </Link>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="space-y-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={onClose}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <link.icon className="w-5 h-5" />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
