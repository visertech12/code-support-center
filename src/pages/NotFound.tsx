
import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <QrCode className="h-24 w-24 text-muted-foreground opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold">404</span>
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The QR code you're looking for doesn't exist or has been moved to a different location.
        </p>
        
        <Button asChild className="bg-crypto-lightPurple hover:bg-crypto-purple">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
