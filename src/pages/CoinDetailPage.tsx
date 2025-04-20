
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QRGenerator from '@/components/QRGenerator';
import { useToast } from '@/components/ui/use-toast';

// Data for coins (same data as in CoinsPage)
const COINS = [
  {
    id: 'usdt',
    name: 'Tether',
    symbol: 'USDT',
    icon: '💵',
    networks: ['Tron (TRC20)', 'Ethereum (ERC20)', 'BNB Smart Chain (BEP20)', 'Solana', 'Polygon'],
    color: 'bg-green-600',
    description: 'Tether (USDT) is a stablecoin pegged to the US dollar, providing stability in the volatile crypto market.',
  },
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: '₿',
    networks: ['Bitcoin'],
    color: 'bg-amber-500',
    description: 'Bitcoin (BTC) is the first and most widely recognized cryptocurrency, created by Satoshi Nakamoto in 2009.',
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: 'Ξ',
    networks: ['Ethereum'],
    color: 'bg-indigo-600',
    description: 'Ethereum (ETH) is a decentralized platform that enables smart contracts and decentralized applications (DApps).',
  },
  {
    id: 'sol',
    name: 'Solana',
    symbol: 'SOL',
    icon: '◎',
    networks: ['Solana'],
    color: 'bg-purple-600',
    description: 'Solana (SOL) is a high-performance blockchain supporting fast, secure, and scalable decentralized applications.',
  },
  {
    id: 'bnb',
    name: 'BNB',
    symbol: 'BNB',
    icon: '🔶',
    networks: ['BNB Smart Chain (BEP20)', 'Binance Chain (BEP2)'],
    color: 'bg-yellow-600',
    description: 'BNB is the native token of the Binance ecosystem, used for trading fee discounts and various applications on BNB Chain.',
  },
  {
    id: 'xrp',
    name: 'XRP',
    symbol: 'XRP',
    icon: '✕',
    networks: ['XRP Ledger'],
    color: 'bg-blue-600',
    description: 'XRP is the native digital asset on the XRP Ledger, designed for fast and low-cost international payments.',
  },
  {
    id: 'ada',
    name: 'Cardano',
    symbol: 'ADA',
    icon: '₳',
    networks: ['Cardano'],
    color: 'bg-crypto-purple',
    description: 'Cardano (ADA) is a proof-of-stake blockchain platform founded on peer-reviewed research and sustainable development.',
  },
  {
    id: 'doge',
    name: 'Dogecoin',
    symbol: 'DOGE',
    icon: '🐶',
    networks: ['Dogecoin'],
    color: 'bg-amber-600',
    description: 'Dogecoin (DOGE) started as a meme cryptocurrency but has grown into a popular digital currency for tipping and donations.',
  },
];

const CoinDetailPage = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const [coin, setCoin] = useState<typeof COINS[0] | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const selectedCoin = COINS.find((c) => c.id === coinId);
    if (selectedCoin) {
      setCoin(selectedCoin);
    } else {
      toast({
        title: "Coin not found",
        description: "The requested cryptocurrency could not be found.",
        variant: "destructive",
      });
    }
  }, [coinId, toast]);

  if (!coin) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Coin not found</h1>
        <p className="mb-6">The cryptocurrency you're looking for doesn't exist or isn't supported yet.</p>
        <Button asChild variant="outline">
          <Link to="/coins">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Coins
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className={`py-12 ${coin.color} text-white`}>
        <div className="container">
          <div className="flex items-center mb-6">
            <Button asChild variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white">
              <Link to="/coins">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Coins
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-4xl">{coin.icon}</span>
            <div>
              <h1 className="text-4xl font-bold">{coin.name}</h1>
              <p className="text-xl text-white/80">{coin.symbol}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-muted/40 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4">About {coin.name}</h2>
                <p className="text-muted-foreground mb-6">{coin.description}</p>
                
                <h3 className="font-medium mb-2">Supported Networks</h3>
                <ul className="space-y-2 mb-6">
                  {coin.networks.map((network) => (
                    <li key={network} className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-crypto-lightPurple mr-2"></span>
                      {network}
                    </li>
                  ))}
                </ul>
                
                <h3 className="font-medium mb-2">Tips for using {coin.symbol} QR codes</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Always verify the address before scanning</li>
                  <li>• Test with a small amount first</li>
                  <li>• Save your QR code in a secure location</li>
                  <li>• Use high quality when printing QR codes</li>
                </ul>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Generate {coin.name} QR Code</h2>
              <QRGenerator />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoinDetailPage;
