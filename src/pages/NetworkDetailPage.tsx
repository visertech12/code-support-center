
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QRGenerator from '@/components/QRGenerator';
import { useToast } from '@/components/ui/use-toast';

// Data for networks (same data as in NetworksPage)
const NETWORKS = [
  {
    id: 'tron',
    name: 'Tron',
    shortName: 'TRC20',
    coins: [
      { id: 'usdt', symbol: 'USDT', name: 'Tether' },
      { id: 'trx', symbol: 'TRX', name: 'TRON' },
    ],
    color: 'bg-red-600',
    description: 'TRON is a blockchain-based operating system with high throughput, high scalability, and high availability, perfect for USDT transfers.',
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    shortName: 'ERC20',
    coins: [
      { id: 'eth', symbol: 'ETH', name: 'Ethereum' },
      { id: 'usdt', symbol: 'USDT', name: 'Tether' },
      { id: 'usdc', symbol: 'USDC', name: 'USD Coin' },
      { id: 'shib', symbol: 'SHIB', name: 'Shiba Inu' },
    ],
    color: 'bg-indigo-600',
    description: 'Ethereum is a decentralized, open-source blockchain with smart contract functionality, hosting many ERC20 tokens.',
  },
  {
    id: 'bsc',
    name: 'BNB Smart Chain',
    shortName: 'BEP20',
    coins: [
      { id: 'bnb', symbol: 'BNB', name: 'BNB' },
      { id: 'usdt', symbol: 'USDT', name: 'Tether' },
      { id: 'cake', symbol: 'CAKE', name: 'PancakeSwap' },
    ],
    color: 'bg-yellow-600',
    description: 'BNB Smart Chain (formerly BSC) runs parallel to BNB Beacon Chain, offering smart contract functionality with lower fees.',
  },
  {
    id: 'solana',
    name: 'Solana',
    shortName: 'SOL',
    coins: [
      { id: 'sol', symbol: 'SOL', name: 'Solana' },
      { id: 'usdt', symbol: 'USDT', name: 'Tether' },
      { id: 'ray', symbol: 'RAY', name: 'Raydium' },
    ],
    color: 'bg-purple-600',
    description: 'Solana is a high-performance blockchain supporting fast, secure, and scalable decentralized applications and tokens.',
  },
  {
    id: 'polygon',
    name: 'Polygon',
    shortName: 'MATIC',
    coins: [
      { id: 'matic', symbol: 'MATIC', name: 'Polygon' },
      { id: 'usdt', symbol: 'USDT', name: 'Tether' },
    ],
    color: 'bg-violet-600',
    description: 'Polygon (formerly Matic) is a protocol and framework for building and connecting Ethereum-compatible blockchain networks.',
  },
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    shortName: 'BTC',
    coins: [
      { id: 'btc', symbol: 'BTC', name: 'Bitcoin' },
    ],
    color: 'bg-amber-500',
    description: 'Bitcoin is the original cryptocurrency, a decentralized digital currency without a central bank or administrator.',
  },
];

const NetworkDetailPage = () => {
  const { networkId } = useParams<{ networkId: string }>();
  const [network, setNetwork] = useState<typeof NETWORKS[0] | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const selectedNetwork = NETWORKS.find((n) => n.id === networkId);
    if (selectedNetwork) {
      setNetwork(selectedNetwork);
    } else {
      toast({
        title: "Network not found",
        description: "The requested network could not be found.",
        variant: "destructive",
      });
    }
  }, [networkId, toast]);

  if (!network) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Network not found</h1>
        <p className="mb-6">The blockchain network you're looking for doesn't exist or isn't supported yet.</p>
        <Button asChild variant="outline">
          <Link to="/networks">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Networks
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className={`py-12 ${network.color} text-white`}>
        <div className="container">
          <div className="flex items-center mb-6">
            <Button asChild variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white">
              <Link to="/networks">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Networks
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Layers className="h-10 w-10" />
            <div>
              <h1 className="text-4xl font-bold">{network.name}</h1>
              <p className="text-xl text-white/80">{network.shortName}</p>
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
                <h2 className="text-xl font-bold mb-4">About {network.name}</h2>
                <p className="text-muted-foreground mb-6">{network.description}</p>
                
                <h3 className="font-medium mb-2">Supported Coins</h3>
                <ul className="space-y-2 mb-6">
                  {network.coins.map((coin) => (
                    <li key={coin.id} className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-crypto-lightPurple mr-2"></span>
                      {coin.name} ({coin.symbol})
                    </li>
                  ))}
                </ul>
                
                <h3 className="font-medium mb-2">Tips for using {network.shortName} addresses</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Always verify the network before sending</li>
                  <li>• Sending to the wrong network may result in lost funds</li>
                  <li>• Test with a small amount first</li>
                  <li>• Save your QR code in a secure location</li>
                </ul>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Generate {network.name} QR Code</h2>
              <QRGenerator />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NetworkDetailPage;
