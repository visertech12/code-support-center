
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import NetworkCard from '@/components/NetworkCard';
import { Input } from '@/components/ui/input';
import SEO from '@/components/SEO';

// Data for networks
const NETWORKS = [
  {
    id: 'tron',
    name: 'Tron',
    shortName: 'TRC20',
    coins: [
      { id: 'usdt', symbol: 'USDT' },
      { id: 'trx', symbol: 'TRX' },
    ],
    color: 'bg-red-600',
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    shortName: 'ERC20',
    coins: [
      { id: 'eth', symbol: 'ETH' },
      { id: 'usdt', symbol: 'USDT' },
      { id: 'usdc', symbol: 'USDC' },
      { id: 'shib', symbol: 'SHIB' },
    ],
    color: 'bg-indigo-600',
  },
  {
    id: 'bsc',
    name: 'BNB Smart Chain',
    shortName: 'BEP20',
    coins: [
      { id: 'bnb', symbol: 'BNB' },
      { id: 'usdt', symbol: 'USDT' },
      { id: 'cake', symbol: 'CAKE' },
    ],
    color: 'bg-yellow-600',
  },
  {
    id: 'solana',
    name: 'Solana',
    shortName: 'SOL',
    coins: [
      { id: 'sol', symbol: 'SOL' },
      { id: 'usdt', symbol: 'USDT' },
      { id: 'ray', symbol: 'RAY' },
    ],
    color: 'bg-purple-600',
  },
  {
    id: 'polygon',
    name: 'Polygon',
    shortName: 'MATIC',
    coins: [
      { id: 'matic', symbol: 'MATIC' },
      { id: 'usdt', symbol: 'USDT' },
    ],
    color: 'bg-violet-600',
  },
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    shortName: 'BTC',
    coins: [
      { id: 'btc', symbol: 'BTC' },
    ],
    color: 'bg-amber-500',
  },
];

const NetworksPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNetworks = useMemo(() => {
    if (!searchQuery.trim()) return NETWORKS;
    
    const query = searchQuery.toLowerCase().trim();
    return NETWORKS.filter(network => 
      network.name.toLowerCase().includes(query) || 
      network.shortName.toLowerCase().includes(query) ||
      network.coins.some(coin => coin.symbol.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  return (
    <div>
      <SEO 
        title="Supported Blockchain Networks | CryptoQR"
        description="Explore all supported blockchain networks for cryptocurrency QR code generation including Ethereum, Bitcoin, Solana, and more."
        keywords="blockchain networks, crypto networks, ethereum network, bitcoin blockchain, solana network, tron, bnb chain"
      />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-crypto-accent/10 to-crypto-blue/10 py-12">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Supported Networks</h1>
            <p className="text-xl text-muted-foreground">
              Generate QR codes for cryptocurrency addresses on various blockchain networks.
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
              placeholder="Search networks or coins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background border-muted rounded-full"
            />
          </div>
        </div>
      </section>

      {/* Networks grid */}
      <section className="py-12">
        <div className="container">
          {filteredNetworks.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredNetworks.map((network) => (
                <NetworkCard
                  key={network.id}
                  id={network.id}
                  name={network.name}
                  shortName={network.shortName}
                  coins={network.coins}
                  color={network.color}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <h3 className="text-lg font-medium mb-2">No networks found matching "{searchQuery}"</h3>
              <p className="text-muted-foreground">Try another search term or check the available networks</p>
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
              Select your preferred network and create a QR code for your wallet address.
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

export default NetworksPage;
