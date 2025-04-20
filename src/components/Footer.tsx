
import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Twitter, Github, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link to="/" className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-crypto-lightPurple" />
              <span className="font-bold">CryptoQR</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Generate QR codes for multiple cryptocurrencies and networks.
            </p>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm hover:text-crypto-lightPurple transition-colors">
                Home
              </Link>
              <Link to="/coins" className="text-sm hover:text-crypto-lightPurple transition-colors">
                Coins
              </Link>
              <Link to="/networks" className="text-sm hover:text-crypto-lightPurple transition-colors">
                Networks
              </Link>
              <Link to="/about" className="text-sm hover:text-crypto-lightPurple transition-colors">
                About
              </Link>
            </nav>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Supported Coins</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/coins/usdt" className="text-sm hover:text-crypto-lightPurple transition-colors">
                USDT
              </Link>
              <Link to="/coins/btc" className="text-sm hover:text-crypto-lightPurple transition-colors">
                Bitcoin
              </Link>
              <Link to="/coins/eth" className="text-sm hover:text-crypto-lightPurple transition-colors">
                Ethereum
              </Link>
              <Link to="/coins/sol" className="text-sm hover:text-crypto-lightPurple transition-colors">
                Solana
              </Link>
            </nav>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-crypto-lightPurple transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="hover:text-crypto-lightPurple transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="hover:text-crypto-lightPurple transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} CryptoQR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
