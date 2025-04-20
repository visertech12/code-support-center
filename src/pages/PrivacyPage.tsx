
import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-sm max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Privacy</h2>
            <p className="text-muted-foreground">
              At CryptoQR, we take your privacy seriously. This Privacy Policy outlines how we handle your information
              and what measures we take to protect it.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information Collection</h2>
            <p className="text-muted-foreground">
              We do not store any cryptocurrency addresses or personal information. All QR code generation
              is performed client-side and no data is transmitted to our servers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="text-muted-foreground">
              While we implement security measures to protect your information, please be aware that no method of
              transmission over the internet is 100% secure.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
