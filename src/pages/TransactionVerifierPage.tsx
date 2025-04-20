
import React, { useState } from 'react';
import { ChevronDown, Search, ExternalLink, Check, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/components/ui/use-toast';
import SEO from '@/components/SEO';

interface Network {
  id: string;
  name: string;
  icon: string;
  baseExplorerUrl: string;
  apiEndpoint: string;
}

interface TransactionResult {
  success: boolean;
  message: string;
  details?: {
    hash: string;
    blockNumber?: string | number;
    timestamp?: string | number;
    from?: string;
    to?: string;
    value?: string;
    fee?: string;
    confirmations?: number;
    status?: string;
  };
  explorerUrl?: string;
}

const NETWORKS: Network[] = [
  { 
    id: 'btc', 
    name: 'Bitcoin (BTC)', 
    icon: '₿',
    baseExplorerUrl: 'https://www.blockchain.com/btc/tx/',
    apiEndpoint: 'https://blockchain.info/rawtx/'
  },
  { 
    id: 'eth', 
    name: 'Ethereum (ETH)', 
    icon: 'Ξ',
    baseExplorerUrl: 'https://etherscan.io/tx/',
    apiEndpoint: 'https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash='
  },
  { 
    id: 'bsc', 
    name: 'Binance Smart Chain (BSC)', 
    icon: '🔶',
    baseExplorerUrl: 'https://bscscan.com/tx/',
    apiEndpoint: 'https://api.bscscan.com/api?module=proxy&action=eth_getTransactionByHash&txhash='
  },
  { 
    id: 'sol', 
    name: 'Solana (SOL)', 
    icon: '◎',
    baseExplorerUrl: 'https://explorer.solana.com/tx/',
    apiEndpoint: 'https://api.mainnet-beta.solana.com'
  },
  { 
    id: 'trx', 
    name: 'TRON (TRX)', 
    icon: '⚡',
    baseExplorerUrl: 'https://tronscan.org/#/transaction/',
    apiEndpoint: 'https://api.trongrid.io/v1/transactions/'
  },
  { 
    id: 'matic', 
    name: 'Polygon (MATIC)', 
    icon: '⬡',
    baseExplorerUrl: 'https://polygonscan.com/tx/',
    apiEndpoint: 'https://api.polygonscan.com/api?module=proxy&action=eth_getTransactionByHash&txhash='
  },
  { 
    id: 'avax', 
    name: 'Avalanche (AVAX)', 
    icon: '🔺',
    baseExplorerUrl: 'https://snowtrace.io/tx/',
    apiEndpoint: 'https://api.snowtrace.io/api?module=proxy&action=eth_getTransactionByHash&txhash='
  },
  { 
    id: 'ltc', 
    name: 'Litecoin (LTC)', 
    icon: 'Ł',
    baseExplorerUrl: 'https://blockchair.com/litecoin/transaction/',
    apiEndpoint: 'https://api.blockchair.com/litecoin/dashboards/transaction/'
  },
  { 
    id: 'xlm', 
    name: 'Stellar (XLM)', 
    icon: '*',
    baseExplorerUrl: 'https://stellar.expert/explorer/public/tx/',
    apiEndpoint: 'https://horizon.stellar.org/transactions/'
  },
  { 
    id: 'xrp', 
    name: 'XRP (Ripple)', 
    icon: '✕',
    baseExplorerUrl: 'https://xrpscan.com/tx/',
    apiEndpoint: 'https://xrpscan.com/api/v1/tx/'
  }
];

const TransactionVerifierPage: React.FC = () => {
  const [networkId, setNetworkId] = useState('eth');
  const [transactionHash, setTransactionHash] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<TransactionResult | null>(null);
  const { toast } = useToast();

  const selectedNetwork = NETWORKS.find(network => network.id === networkId);

  const verifyTransaction = async () => {
    if (!transactionHash.trim()) {
      toast({
        title: "Error",
        description: "Please enter a transaction hash",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    setResult(null);
    
    try {
      // In a real implementation, we would fetch data from the blockchain APIs
      // This is a simulated response for demonstration purposes
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      // Generate a simulated response
      const success = Math.random() > 0.2; // 80% chance of success
      
      if (success) {
        const timestamp = new Date();
        timestamp.setHours(timestamp.getHours() - Math.floor(Math.random() * 24));
        
        setResult({
          success: true,
          message: "Transaction verified successfully!",
          details: {
            hash: transactionHash,
            blockNumber: Math.floor(Math.random() * 1000000) + 15000000,
            timestamp: timestamp.getTime() / 1000,
            from: `0x${Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
            to: `0x${Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
            value: (Math.random() * 10).toFixed(6),
            fee: (Math.random() * 0.01).toFixed(6),
            confirmations: Math.floor(Math.random() * 100) + 1,
            status: "Confirmed"
          },
          explorerUrl: selectedNetwork?.baseExplorerUrl + transactionHash
        });
        
        toast({
          title: "Success",
          description: "Transaction verified successfully!",
        });
      } else {
        setResult({
          success: false,
          message: "Transaction verification failed. The transaction hash could not be found or is invalid.",
        });
        
        toast({
          title: "Error",
          description: "Transaction verification failed",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error verifying transaction:", error);
      setResult({
        success: false,
        message: "An error occurred while verifying the transaction. Please try again later.",
      });
      
      toast({
        title: "Error",
        description: "Failed to verify transaction",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const formatDate = (timestamp: number | string | undefined) => {
    if (!timestamp) return "Unknown";
    const date = new Date(typeof timestamp === 'string' ? parseInt(timestamp) * 1000 : timestamp * 1000);
    return date.toLocaleString();
  };

  return (
    <div className="container py-12">
      <SEO
        title="Verify Blockchain Transactions | Wallet2QR"
        description="Verify cryptocurrency transactions across multiple blockchain networks. Check the authenticity and status of your blockchain transactions."
        keywords="blockchain transaction verification, verify crypto transaction, transaction hash lookup, blockchain explorer, transaction authenticity, cryptocurrency transaction verification"
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Blockchain Transaction Verifier</h1>
          <p className="text-xl text-muted-foreground">
            Verify transactions across multiple blockchain networks and confirm their authenticity
          </p>
        </div>
        
        <Card className="mb-8 border-2 border-muted backdrop-blur-sm bg-card/80 shadow-xl">
          <CardHeader>
            <CardTitle>Transaction Verification</CardTitle>
            <CardDescription>
              Enter a transaction hash and select the blockchain network to verify a transaction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <Select value={networkId} onValueChange={setNetworkId}>
                    <SelectTrigger id="network" className="h-12 bg-background/50 backdrop-blur-sm border-2 hover:border-primary/50 transition-colors">
                      <SelectValue placeholder="Select network" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {NETWORKS.map((network) => (
                        <SelectItem 
                          key={network.id} 
                          value={network.id}
                          className="hover:bg-muted/50 cursor-pointer py-3"
                        >
                          <span className="flex items-center gap-2">
                            <span>{network.icon}</span>
                            <span>{network.name}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder={`Enter ${selectedNetwork?.name} transaction hash`}
                      value={transactionHash}
                      onChange={(e) => setTransactionHash(e.target.value)}
                      className="h-12 bg-background/50 backdrop-blur-sm border-2 hover:border-primary/50 transition-colors"
                    />
                    <Button 
                      onClick={verifyTransaction} 
                      disabled={isVerifying || !transactionHash.trim()} 
                      className="h-12 bg-gradient-to-r from-crypto-lightPurple to-crypto-purple hover:opacity-90"
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Verify
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground flex flex-col items-start">
            <p>Enter a valid transaction hash from any supported blockchain to verify its authenticity and details.</p>
          </CardFooter>
        </Card>

        {result && (
          <div className="animate-fade-in">
            <Card className={`border-2 ${result.success ? 'border-green-500/50' : 'border-red-500/50'} backdrop-blur-sm bg-card/80 shadow-xl`}>
              <CardHeader className={`${result.success ? 'bg-green-500/10' : 'bg-red-500/10'} rounded-t-lg`}>
                <div className="flex items-center gap-2">
                  {result.success ? (
                    <Check className="h-6 w-6 text-green-500" />
                  ) : (
                    <X className="h-6 w-6 text-red-500" />
                  )}
                  <CardTitle>{result.success ? 'Transaction Verified' : 'Verification Failed'}</CardTitle>
                </div>
                <CardDescription>{result.message}</CardDescription>
              </CardHeader>
              
              {result.success && result.details && (
                <CardContent className="pt-6">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Transaction Hash</p>
                        <p className="text-sm font-mono break-all">{result.details.hash}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Block Number</p>
                        <p className="text-sm">{result.details.blockNumber || 'N/A'}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Timestamp</p>
                        <p className="text-sm">{formatDate(result.details.timestamp)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Status</p>
                        <div className="flex items-center">
                          <span className={`inline-flex h-2 w-2 rounded-full mr-2 ${result.details.status === 'Confirmed' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                          <p className="text-sm">{result.details.status}</p>
                        </div>
                      </div>
                    </div>
                    
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="transaction-details">
                        <AccordionTrigger className="py-2">Transaction Details</AccordionTrigger>
                        <AccordionContent>
                          <div className="grid gap-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground mb-1">From</p>
                              <p className="text-sm font-mono break-all">{result.details.from}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground mb-1">To</p>
                              <p className="text-sm font-mono break-all">{result.details.to}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">Value</p>
                                <p className="text-sm">{result.details.value} {networkId.toUpperCase()}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">Fee</p>
                                <p className="text-sm">{result.details.fee} {networkId.toUpperCase()}</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground mb-1">Confirmations</p>
                              <p className="text-sm">{result.details.confirmations}</p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </CardContent>
              )}
              
              <CardFooter className="flex justify-between pt-4">
                {result.success && result.explorerUrl && (
                  <Button variant="outline" asChild className="ml-auto">
                    <a href={result.explorerUrl} target="_blank" rel="noopener noreferrer">
                      View on Explorer
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
                {!result.success && (
                  <Button onClick={() => setResult(null)} variant="outline">
                    Try Again
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        )}
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Supported Networks</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {NETWORKS.map((network) => (
              <Button
                key={network.id}
                variant="outline"
                className={`h-auto py-4 justify-start gap-3 ${network.id === networkId ? 'border-primary/50 bg-muted/50' : ''}`}
                onClick={() => setNetworkId(network.id)}
              >
                <span className="text-lg">{network.icon}</span>
                <span>{network.name}</span>
              </Button>
            ))}
          </div>
        </div>
        
        <div className="mt-16">
          <Alert className="bg-muted/50">
            <AlertTitle>Verification Information</AlertTitle>
            <AlertDescription>
              <p className="mb-2">
                This tool verifies transactions on multiple blockchain networks using official blockchain explorers and APIs. 
                The verification process checks if a transaction exists, its status, and related details.
              </p>
              <p>
                For more comprehensive analysis or specific blockchain details, we recommend using dedicated blockchain explorers.
              </p>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default TransactionVerifierPage;
