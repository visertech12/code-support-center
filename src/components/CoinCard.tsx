
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CoinCardProps {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  networks: string[];
  color?: string;
}

const CoinCard: React.FC<CoinCardProps> = ({
  id,
  name,
  symbol,
  icon,
  networks,
  color = 'bg-crypto-lightPurple'
}) => {
  return (
    <Card className="overflow-hidden border border-border hover:border-primary/20 transition-all duration-300 h-full flex flex-col">
      <CardHeader className={`${color} text-white`}>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">
            <span className="mr-2">{icon}</span>
            {name}
          </CardTitle>
          <Badge variant="secondary" className="font-mono bg-white/20 hover:bg-white/30">
            {symbol}
          </Badge>
        </div>
        <CardDescription className="text-white/80 mt-2">
          Generate QR codes for {name}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 flex-grow">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Supported Networks</h4>
            <div className="flex flex-wrap gap-2">
              {networks.map((network) => (
                <Badge key={network} variant="outline">
                  {network}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button asChild className="w-full bg-crypto-lightPurple hover:bg-crypto-purple">
          <Link to={`/coins/${id}`}>
            Generate {symbol} QR
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CoinCard;
