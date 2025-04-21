
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, QrCode, Shield, Zap, Smartphone, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';

const ServicesPage = () => {
  return (
    <div>
      <SEO 
        title="CryptoQR Services | Advanced Cryptocurrency QR Code Solutions"
        description="Explore our premium cryptocurrency QR code services for businesses and individuals. Secure, customizable, and versatile solutions."
        keywords="crypto services, cryptocurrency QR, business crypto solutions, crypto wallet QR"
      />
      
      {/* Header - Made more responsive */}
      <section className="bg-muted/40 py-8 sm:py-12">
        <div className="container px-4 sm:px-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Our Services</h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Comprehensive solutions for cryptocurrency QR code generation and management
            </p>
          </div>
        </div>
      </section>

      {/* Main Services Grid - Improved responsive layout */}
      <section className="py-10 sm:py-16">
        <div className="container px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-background rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-crypto-lightPurple/20 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <QrCode className="h-7 w-7 text-crypto-lightPurple" />
              </div>
              <h3 className="text-xl font-bold mb-2">QR Code Generator</h3>
              <p className="text-muted-foreground mb-4">
                Create customized QR codes for cryptocurrency wallet addresses across multiple networks.
              </p>
              <Button asChild variant="outline" size="sm" className="mt-2">
                <Link to="/">
                  Try Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="bg-background rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-crypto-purple/20 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-crypto-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Transactions</h3>
              <p className="text-muted-foreground mb-4">
                Ensure safe and reliable cryptocurrency transfers with verified QR code technology.
              </p>
              <Button asChild variant="outline" size="sm" className="mt-2">
                <Link to="/about">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="bg-background rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-crypto-accent/20 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Zap className="h-7 w-7 text-crypto-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Processing</h3>
              <p className="text-muted-foreground mb-4">
                Generate and process cryptocurrency QR codes instantly for seamless transactions.
              </p>
              <Button asChild variant="outline" size="sm" className="mt-2">
                <Link to="/">
                  Generate Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="bg-background rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-500/20 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Smartphone className="h-7 w-7 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Mobile Compatible</h3>
              <p className="text-muted-foreground mb-4">
                Use our services on any device - desktop, tablet, or mobile for maximum convenience.
              </p>
              <Button asChild variant="outline" size="sm" className="mt-2">
                <Link to="/">
                  Try Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="bg-background rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-green-500/20 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Network className="h-7 w-7 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Multi-Network Support</h3>
              <p className="text-muted-foreground mb-4">
                Generate QR codes for various blockchain networks including Ethereum, Bitcoin, Solana, and more.
              </p>
              <Button asChild variant="outline" size="sm" className="mt-2">
                <Link to="/networks">
                  View Networks <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Made responsive */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-crypto-lightPurple/10 to-crypto-purple/10">
        <div className="container px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">
              Generate your first cryptocurrency QR code in seconds. No signup required.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-crypto-lightPurple to-crypto-purple hover:opacity-90 transition-opacity">
              <Link to="/">
                Generate QR Code Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
