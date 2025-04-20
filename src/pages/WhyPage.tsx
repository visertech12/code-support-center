
import React from 'react';
import { Shield, Zap, Lock } from 'lucide-react';
import SEO from '@/components/SEO';

const WhyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Why CryptoQR | Fast & Secure Cryptocurrency QR Codes"
        description="Discover why CryptoQR is the best choice for generating cryptocurrency QR codes - secure, fast, and easy to use across multiple networks."
        keywords="why cryptoqr, crypto qr benefits, cryptocurrency qr advantages"
      />
      
      <div className="container py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Why Choose CryptoQR?</h1>
        
        <div className="grid gap-8 md:grid-cols-3">
          <div className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow">
            <Shield className="h-12 w-12 text-crypto-lightPurple mb-4" />
            <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
            <p className="text-muted-foreground">
              All QR codes are generated locally in your browser. We never store or transmit your wallet addresses.
            </p>
          </div>
          
          <div className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow">
            <Zap className="h-12 w-12 text-crypto-lightPurple mb-4" />
            <h3 className="text-xl font-semibold mb-3">Fast & Easy</h3>
            <p className="text-muted-foreground">
              Generate QR codes instantly for any cryptocurrency. No account or sign-up required.
            </p>
          </div>
          
          <div className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow">
            <Lock className="h-12 w-12 text-crypto-lightPurple mb-4" />
            <h3 className="text-xl font-semibold mb-3">Multi-Network Support</h3>
            <p className="text-muted-foreground">
              Support for multiple cryptocurrencies and networks, including Bitcoin, Ethereum, and more.
            </p>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Features & Benefits</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-card/50">
              <h3 className="font-medium mb-2">Customizable QR Codes</h3>
              <p className="text-muted-foreground">
                Customize your QR code's size and colors to match your branding or preferences.
              </p>
            </div>
            <div className="p-4 border rounded-lg bg-card/50">
              <h3 className="font-medium mb-2">Instant Downloads</h3>
              <p className="text-muted-foreground">
                Download your QR codes instantly in high-quality PNG format.
              </p>
            </div>
            <div className="p-4 border rounded-lg bg-card/50">
              <h3 className="font-medium mb-2">Mobile Responsive</h3>
              <p className="text-muted-foreground">
                Generate and view QR codes seamlessly on any device.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyPage;
