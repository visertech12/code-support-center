
import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';
import SEO from '@/components/SEO';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Contact Us | CryptoQR"
        description="Get in touch with the CryptoQR team for support, feedback, or inquiries about our cryptocurrency QR code generator."
        keywords="contact cryptoqr, crypto qr support, cryptocurrency qr help"
      />
      
      <div className="container py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Contact Us</h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Get in Touch</h2>
            <p className="text-muted-foreground">
              Have questions about CryptoQR? We're here to help! Reach out to us through any of the following channels.
            </p>
            
            <div className="space-y-4 mt-6">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-crypto-lightPurple" />
                <a href="mailto:support@cryptoqr.app" className="hover:text-crypto-lightPurple transition-colors">
                  support@cryptoqr.app
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-crypto-lightPurple" />
                <span>Response time: Within 24 hours</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">FAQ</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Is CryptoQR free to use?</h3>
                <p className="text-muted-foreground">Yes, CryptoQR is completely free for generating cryptocurrency QR codes.</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Is my data secure?</h3>
                <p className="text-muted-foreground">We don't store any wallet addresses or personal information. All QR codes are generated client-side.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
