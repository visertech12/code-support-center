
import React from 'react';
import { Link } from 'react-router-dom';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
        <div className="prose prose-sm max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Terms of Service</h2>
            <p className="text-muted-foreground">
              By accessing and using CryptoQR, you agree to comply with and be bound by these terms and conditions.
              We reserve the right to modify these terms at any time without prior notice.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
            <p className="text-muted-foreground">
              Permission is granted to temporarily use CryptoQR for personal, non-commercial purposes only.
              This is the grant of a license, not a transfer of title.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Disclaimer</h2>
            <p className="text-muted-foreground">
              The materials on CryptoQR are provided on an 'as is' basis. We make no warranties, expressed or implied,
              and hereby disclaim and negate all other warranties including, without limitation, implied warranties or
              conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
