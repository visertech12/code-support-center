
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { QrCode, ArrowRight, Layers, Microscope } from 'lucide-react';
import QRGenerator from '@/components/QRGenerator';
import SEO from '@/components/SEO';

const Index = () => {
  return (
    <div>
      <SEO
        title="Generate Cryptocurrency QR Codes Instantly"
        description="Create QR codes for multiple cryptocurrencies and networks. Fast, secure, and easy to use platform for generating crypto wallet QR codes."
        keywords="crypto qr code, cryptocurrency, bitcoin qr, ethereum qr, blockchain, wallet address"
      />
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-crypto-blue/10 to-crypto-purple/10 pointer-events-none" />
        <div className="container py-24 md:py-32">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="inline-block rounded-full bg-muted px-3 py-1 text-sm">
                Cryptocurrency QR Generator
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Generate <span className="gradient-text">crypto QR codes</span> in seconds
              </h1>
              <p className="text-xl text-muted-foreground">
                Create QR codes for multiple cryptocurrencies and networks. Fast, secure, and easy to use.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-crypto-lightPurple hover:bg-crypto-purple">
                  <a href="#generator">
                    <QrCode className="mr-2 h-5 w-5" />
                    Generate QR Code
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/coins">
                    View Supported Coins
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative order-first md:order-last">
              <div className="relative w-full aspect-square bg-gradient-to-br from-crypto-lightPurple to-crypto-accent p-8 rounded-2xl shadow-2xl flex items-center justify-center">
                <QrCode className="h-full w-full text-white animate-pulse-slow" />
              </div>
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-crypto-purple rounded-xl opacity-50" />
              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-crypto-lightPurple rounded-xl opacity-50" />
              <div className="absolute top-1/2 -right-10 w-20 h-20 bg-crypto-accent rounded-full opacity-20" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/40">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Why use Wallet2QR?</h2>
            <p className="text-muted-foreground">
              Our platform makes it easy to generate QR codes for cryptocurrency wallet addresses across multiple networks
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-xl border">
              <div className="bg-crypto-lightPurple/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <QrCode className="h-6 w-6 text-crypto-lightPurple" />
              </div>
              <h3 className="text-xl font-medium mb-2">Multiple Coins</h3>
              <p className="text-muted-foreground">
                Generate QR codes for Bitcoin, Ethereum, USDT, and many more cryptocurrencies.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-xl border">
              <div className="bg-crypto-purple/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Layers className="h-6 w-6 text-crypto-purple" />
              </div>
              <h3 className="text-xl font-medium mb-2">Multiple Networks</h3>
              <p className="text-muted-foreground">
                Support for various networks like Ethereum, Solana, Tron, and BNB Smart Chain.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-xl border">
              <div className="bg-crypto-accent/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Microscope className="h-6 w-6 text-crypto-accent" />
              </div>
              <h3 className="text-xl font-medium mb-2">Transaction Verification</h3>
              <p className="text-muted-foreground">
                Verify blockchain transactions across multiple networks with our advanced verification tool.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 bg-gradient-to-br from-crypto-blue/5 to-crypto-purple/5">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground">
              Comprehensive tools for all your cryptocurrency needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background p-8 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-6">
                <QrCode className="h-10 w-10 text-crypto-purple" />
              </div>
              <h3 className="text-2xl font-medium mb-3">QR Code Generator</h3>
              <p className="text-muted-foreground mb-6">
                Create custom QR codes for your crypto wallet addresses with support for multiple networks and coins.
              </p>
              <Button asChild variant="outline">
                <a href="#generator">
                  Generate QR Code
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            
            <div className="bg-background p-8 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-6">
                <Microscope className="h-10 w-10 text-crypto-accent" />
              </div>
              <h3 className="text-2xl font-medium mb-3">Transaction Verifier</h3>
              <p className="text-muted-foreground mb-6">
                Verify transactions across multiple blockchain networks to confirm their authenticity and status.
              </p>
              <Button asChild variant="outline">
                <Link to="/verify">
                  Verify Transaction
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="generator" className="py-16">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Generate Your QR Code</h2>
            <p className="text-muted-foreground">
              Select your cryptocurrency, choose a network, and enter your wallet address to generate a QR code
            </p>
          </div>
          
          <QRGenerator />
        </div>
      </section>
    </div>
  );
};

export default Index;
