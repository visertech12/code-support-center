import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QrCode, Copy, Download, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { QRCodeCanvas } from 'qrcode.react';
import { saveQRCodeData, markQRCodeAsDownloaded } from '@/utils/qrCodeStorage';

const COINS = [
  { id: 'usdt', name: 'Tether (USDT)', icon: '💵' },
  { id: 'btc', name: 'Bitcoin (BTC)', icon: '₿' },
  { id: 'eth', name: 'Ethereum (ETH)', icon: 'Ξ' },
  { id: 'sol', name: 'Solana (SOL)', icon: '◎' },
  { id: 'bnb', name: 'BNB', icon: '🔶' },
  { id: 'xrp', name: 'XRP', icon: '✕' },
  { id: 'ada', name: 'Cardano (ADA)', icon: '₳' },
  { id: 'doge', name: 'Dogecoin (DOGE)', icon: '🐶' },
];

const NETWORKS = {
  usdt: [
    { id: 'tron', name: 'Tron (TRC20)' },
    { id: 'ethereum', name: 'Ethereum (ERC20)' },
    { id: 'bsc', name: 'BNB Smart Chain (BEP20)' },
    { id: 'solana', name: 'Solana' },
    { id: 'polygon', name: 'Polygon' },
  ],
  btc: [{ id: 'bitcoin', name: 'Bitcoin' }],
  eth: [{ id: 'ethereum', name: 'Ethereum' }],
  sol: [{ id: 'solana', name: 'Solana' }],
  bnb: [
    { id: 'bsc', name: 'BNB Smart Chain (BEP20)' },
    { id: 'bep2', name: 'Binance Chain (BEP2)' },
  ],
  xrp: [{ id: 'xrp', name: 'XRP Ledger' }],
  ada: [{ id: 'cardano', name: 'Cardano' }],
  doge: [{ id: 'dogecoin', name: 'Dogecoin' }],
};

const QRGenerator = () => {
  const { coinId } = useParams<{ coinId?: string }>();
  const [coinId_, setCoinId] = useState(coinId || 'usdt');
  const [networkId, setNetworkId] = useState('tron');
  const [address, setAddress] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrValue, setQrValue] = useState('');
  const [qrSize, setQrSize] = useState(256);
  const [qrColor, setQrColor] = useState('#000000');
  const [qrBgColor, setQrBgColor] = useState('#FFFFFF');
  const { toast } = useToast();

  const handleCoinChange = (newCoinId: string) => {
    setCoinId(newCoinId);
    const networks = NETWORKS[newCoinId as keyof typeof NETWORKS];
    if (networks && networks.length > 0) {
      setNetworkId(networks[0].id);
    }
  };

  useEffect(() => {
    if (coinId) {
      handleCoinChange(coinId);
    }
  }, [coinId]);

  const isValidAddress = () => {
    return address.trim().length > 10;
  };

  const generateQR = () => {
    if (!isValidAddress()) {
      toast({
        title: "Invalid Address",
        description: "Please enter a valid cryptocurrency address.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      const selectedCoin = COINS.find(coin => coin.id === coinId_);
      const selectedNetwork = NETWORKS[coinId_ as keyof typeof NETWORKS].find(
        network => network.id === networkId
      );
      
      const qrValue = `${selectedCoin?.name}:${address} (${selectedNetwork?.name})`;
      setQrValue(qrValue);
      setIsGenerating(false);
      
      saveQRCodeData(qrValue);
      
      toast({
        title: "QR Code Generated",
        description: "Your cryptocurrency QR code has been generated successfully.",
      });
    }, 800);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrValue);
    toast({
      title: "Copied!",
      description: "QR code information copied to clipboard.",
    });
  };

  const downloadQR = () => {
    const canvas = document.getElementById('qr-code-canvas') as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${coinId_}-${networkId}-qr.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      if (qrValue) {
        markQRCodeAsDownloaded(qrValue, new Date().toISOString().split('T')[0]);
      }
      
      toast({
        title: "Downloaded!",
        description: "QR code image has been downloaded.",
      });
    }
  };

  const calculateQRSize = () => {
    const isMobile = window.innerWidth < 768;
    return isMobile ? Math.min(window.innerWidth - 64, 256) : qrSize;
  };

  useEffect(() => {
    const handleResize = () => {
      setQrSize(calculateQRSize());
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial size calculation

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto p-2 sm:p-4">
      <Card className="border-2 border-muted backdrop-blur-sm bg-card/80 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardContent className="pt-4 sm:pt-6">
          <div className="grid gap-4 sm:gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="coin" className="text-base font-medium">Cryptocurrency</Label>
                <Select value={coinId_} onValueChange={handleCoinChange}>
                  <SelectTrigger 
                    id="coin" 
                    className="h-12 text-base bg-background/50 backdrop-blur-sm border-2 hover:border-primary/50 transition-colors"
                  >
                    <SelectValue placeholder="Select a coin" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {COINS.map((coin) => (
                      <SelectItem 
                        key={coin.id} 
                        value={coin.id}
                        className="hover:bg-muted/50 cursor-pointer py-3 text-base"
                      >
                        <span className="flex items-center gap-2">
                          <span>{coin.icon}</span>
                          <span>{coin.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="network" className="text-base font-medium">Network</Label>
                <Select value={networkId} onValueChange={setNetworkId}>
                  <SelectTrigger 
                    id="network" 
                    className="h-12 text-base bg-background/50 backdrop-blur-sm border-2 hover:border-primary/50 transition-colors"
                  >
                    <SelectValue placeholder="Select network" />
                  </SelectTrigger>
                  <SelectContent>
                    {NETWORKS[coinId_ as keyof typeof NETWORKS]?.map((network) => (
                      <SelectItem 
                        key={network.id} 
                        value={network.id}
                        className="hover:bg-muted/50 cursor-pointer py-3 text-base"
                      >
                        {network.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address" className="text-base font-medium">Wallet Address</Label>
              <Input
                id="address"
                placeholder={`Enter your ${coinId_.toUpperCase()} wallet address`}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="h-12 text-base bg-background/50 backdrop-blur-sm border-2 hover:border-primary/50 transition-colors"
              />
              <p className="text-sm text-muted-foreground">
                Enter the wallet address where you want to receive funds
              </p>
            </div>
            
            <Button
              onClick={generateQR}
              disabled={!address.trim() || isGenerating}
              className="h-12 text-base bg-gradient-to-r from-crypto-lightPurple to-crypto-purple hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <QrCode className="mr-2 h-5 w-5" />
                  Generate QR Code
                </>
              )}
            </Button>
            
            {qrValue && (
              <div className="mt-4 sm:mt-6 flex flex-col items-center space-y-4 sm:space-y-6 animate-fade-in">
                <div className="p-4 sm:p-6 bg-white rounded-xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-crypto-lightPurple/10 to-crypto-purple/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <QRCodeCanvas
                    id="qr-code-canvas"
                    value={qrValue}
                    size={calculateQRSize()}
                    fgColor={qrColor}
                    bgColor={qrBgColor}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                
                <div className="space-y-6 w-full">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="qr-size" className="text-base font-medium">QR Size</Label>
                      <Select 
                        value={qrSize.toString()} 
                        onValueChange={(value) => setQrSize(parseInt(value))}
                      >
                        <SelectTrigger id="qr-size" className="h-12 text-base bg-background/50 backdrop-blur-sm border-2 hover:border-primary/50 transition-colors">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="128">Small (128px)</SelectItem>
                          <SelectItem value="256">Medium (256px)</SelectItem>
                          <SelectItem value="384">Large (384px)</SelectItem>
                          <SelectItem value="512">Extra Large (512px)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="qr-color" className="text-base font-medium">QR Colors</Label>
                      <div className="flex space-x-2">
                        <div className="flex-1 space-y-1">
                          <Input
                            id="qr-color"
                            type="color"
                            value={qrColor}
                            onChange={(e) => setQrColor(e.target.value)}
                            className="h-12 w-full p-1 cursor-pointer bg-background/50 backdrop-blur-sm border-2 hover:border-primary/50 transition-colors"
                          />
                          <p className="text-xs text-center text-muted-foreground">QR Color</p>
                        </div>
                        <div className="flex-1 space-y-1">
                          <Input
                            type="color"
                            value={qrBgColor}
                            onChange={(e) => setQrBgColor(e.target.value)}
                            className="h-12 w-full p-1 cursor-pointer bg-background/50 backdrop-blur-sm border-2 hover:border-primary/50 transition-colors"
                          />
                          <p className="text-xs text-center text-muted-foreground">Background</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={copyToClipboard}
                      className="flex-1 h-12 hover:bg-muted/50 transition-colors duration-300"
                    >
                      <Copy className="mr-2 h-5 w-5" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      onClick={downloadQR}
                      className="flex-1 h-12 hover:bg-muted/50 transition-colors duration-300"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRGenerator;
