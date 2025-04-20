
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import CoinCard from '@/components/CoinCard';
import { Input } from '@/components/ui/input';
import SEO from '@/components/SEO';

// Data for coins
const COINS = [
  {
    id: 'usdt',
    name: 'Tether',
    symbol: 'USDT',
    icon: '💵',
    networks: ['Tron (TRC20)', 'Ethereum (ERC20)', 'BNB Smart Chain (BEP20)', 'Solana', 'Polygon'],
    color: 'bg-green-600',
  },
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: '₿',
    networks: ['Bitcoin'],
    color: 'bg-amber-500',
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: 'Ξ',
    networks: ['Ethereum'],
    color: 'bg-indigo-600',
  },
  {
    id: 'sol',
    name: 'Solana',
    symbol: 'SOL',
    icon: '◎',
    networks: ['Solana'],
    color: 'bg-purple-600',
  },
  {
    id: 'bnb',
    name: 'BNB',
    symbol: 'BNB',
    icon: '🔶',
    networks: ['BNB Smart Chain (BEP20)', 'Binance Chain (BEP2)'],
    color: 'bg-yellow-600',
  },
  {
    id: 'xrp',
    name: 'XRP',
    symbol: 'XRP',
    icon: '✕',
    networks: ['XRP Ledger'],
    color: 'bg-blue-600',
  },
  {
    id: 'ada',
    name: 'Cardano',
    symbol: 'ADA',
    icon: '₳',
    networks: ['Cardano'],
    color: 'bg-crypto-purple',
  },
  {
    id: 'doge',
    name: 'Dogecoin',
    symbol: 'DOGE',
    icon: '🐶',
    networks: ['Dogecoin'],
    color: 'bg-amber-600',
  },
];

const CoinsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCoins = useMemo(() => {
    if (!searchQuery.trim()) return COINS;
    
    const query = searchQuery.toLowerCase().trim();
    return COINS.filter(coin => 
      coin.name.toLowerCase().includes(query) || 
      coin.symbol.toLowerCase().includes(query) ||
      coin.networks.some(network => network.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  return (
    <div>
      <SEO 
        title="Supported Cryptocurrencies | CryptoQR"
        description="Browse all supported cryptocurrencies for QR code generation. Bitcoin, Ethereum, Tether, and more across multiple networks."
        keywords="cryptocurrency list, bitcoin qr, ethereum qr, tether qr, crypto coins, supported cryptocurrencies"
      />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-crypto-lightPurple/10 to-crypto-purple/10 py-12">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Supported Cryptocurrencies</h1>
            <p className="text-xl text-muted-foreground">
              Generate QR codes for various cryptocurrencies across multiple networks.
            </p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search coins or networks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background border-muted rounded-full"
            />
          </div>
        </div>
      </section>

      {/* Coins grid */}
      <section className="py-12">
        <div className="container">
          {filteredCoins.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCoins.map((coin) => (
                <CoinCard
                  key={coin.id}
                  id={coin.id}
                  name={coin.name}
                  symbol={coin.symbol}
                  icon={coin.icon}
                  networks={coin.networks}
                  color={coin.color}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <h3 className="text-lg font-medium mb-2">No coins found matching "{searchQuery}"</h3>
              <p className="text-muted-foreground">Try another search term or check the available coins</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-muted/40">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to generate your QR code?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Select your preferred cryptocurrency and create a QR code for your wallet address.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 rounded-md bg-gradient-to-r from-crypto-lightPurple to-crypto-purple text-white hover:opacity-90 transition-opacity"
            >
              Generate QR Code
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoinsPage;
