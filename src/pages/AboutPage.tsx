
import React from 'react';
import { QrCode, CheckCircle, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AboutPage = () => {
  return (
    <div>
      {/* Header */}
      <section className="bg-muted/40 py-12">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">About CryptoQR</h1>
            <p className="text-xl text-muted-foreground">
              The easiest way to generate QR codes for your cryptocurrency wallet addresses.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-12">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                CryptoQR was built to simplify cryptocurrency transactions by providing a fast, 
                easy-to-use tool for generating QR codes across multiple cryptocurrencies and networks.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Whether you're accepting payments for your business, receiving funds from friends, 
                or setting up donation options, our platform makes it easy to create and share 
                your cryptocurrency QR codes.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-crypto-lightPurple mr-3 mt-0.5" />
                  <p>Support for multiple cryptocurrencies</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-crypto-lightPurple mr-3 mt-0.5" />
                  <p>Compatible with various blockchain networks</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-crypto-lightPurple mr-3 mt-0.5" />
                  <p>Customizable QR codes for your needs</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative w-full aspect-square max-w-md mx-auto bg-gradient-to-br from-crypto-lightPurple/10 to-crypto-purple/10 p-8 rounded-2xl border-2 border-crypto-lightPurple/20 flex items-center justify-center">
                <QrCode className="h-64 w-64 text-crypto-lightPurple" />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-crypto-purple/20 rounded-xl" />
              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-crypto-lightPurple/20 rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-muted/40">
        <div className="container">
          <h2 className="text-3xl font-bold mb-10 text-center">Why Choose CryptoQR</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-xl border">
              <div className="bg-crypto-lightPurple/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-crypto-lightPurple" />
              </div>
              <h3 className="text-xl font-medium mb-3">Secure</h3>
              <p className="text-muted-foreground">
                Our platform is built with security in mind. We never store your wallet addresses, 
                and all QR generation happens client-side on your device.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-xl border">
              <div className="bg-crypto-purple/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-crypto-purple" />
              </div>
              <h3 className="text-xl font-medium mb-3">Fast</h3>
              <p className="text-muted-foreground">
                Generate QR codes in seconds. Our lightning-fast interface allows you to 
                quickly create and customize QR codes for any supported cryptocurrency.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-xl border">
              <div className="bg-crypto-accent/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <QrCode className="h-6 w-6 text-crypto-accent" />
              </div>
              <h3 className="text-xl font-medium mb-3">Versatile</h3>
              <p className="text-muted-foreground">
                Support for a wide range of cryptocurrencies and networks means you can 
                use CryptoQR for all your crypto QR code generation needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Generate your first cryptocurrency QR code in seconds.
            </p>
            <Button asChild size="lg" className="bg-crypto-lightPurple hover:bg-crypto-purple">
              <Link to="/">Generate QR Code</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
