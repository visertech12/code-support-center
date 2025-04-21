
import React, { useState, useEffect } from 'react';
import SEO from '@/components/SEO';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const USDT_API = "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd,btc,eth,eur";

const UsdtConverterPage = () => {
  const [amount, setAmount] = useState("1");
  const [rates, setRates] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(USDT_API)
      .then(res => res.json())
      .then((data) => {
        setRates(data.tether);
        setLoading(false);
      });
  }, []);

  const values = [
    { label: "USD", value: rates?.usd },
    { label: "BTC", value: rates?.btc },
    { label: "ETH", value: rates?.eth },
    { label: "EUR", value: rates?.eur },
  ];

  let parsedAmt = parseFloat(amount);
  if (isNaN(parsedAmt) || parsedAmt < 0) parsedAmt = 0;

  return (
    <div className="max-w-xl mx-auto py-12">
      <SEO title="USDT Converter & Calculator | Wallet2QR" description="Convert USDT to USD, BTC, ETH, EUR and use calculator." />
      <h1 className="text-2xl font-bold mb-4">USDT Converter & Calculator</h1>
      <div className="mb-3 text-muted-foreground">Live prices powered by CoinGecko.</div>
      <form className="flex items-end gap-2 mb-6">
        <div className="flex-1">
          <Input
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Enter amount in USDT"
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
          />
        </div>
        <Button type="button" disabled>
          USDT
        </Button>
      </form>
      {loading && <div>Loading rates...</div>}
      {rates && (
        <div className="grid gap-3">
          {values.map((v, i) =>
            v.value ? (
              <div key={v.label} className="flex justify-between border-b py-2">
                <span>{v.label}:</span>
                <span>
                  {(parsedAmt * v.value).toLocaleString(undefined, { maximumFractionDigits: 8 })}
                </span>
              </div>
            ) : null
          )}
        </div>
      )}
      <div className="text-xs text-muted-foreground mt-5">
        Data from CoinGecko. Rates may be slightly delayed. Always double check before transferring funds!
      </div>
    </div>
  );
};
export default UsdtConverterPage;
