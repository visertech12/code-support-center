
import React, { useState } from "react";
import { Check, X, Shield } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

function isUsdtAddress(address: string): boolean {
  // Simple heuristic: 
  // TRC20 addresses start with 'T' and are 34 chars
  // ERC20/Omni: '0x' and 42 chars or Bitcoin-like
  if (!address) return false;
  const reTron = /^T[a-zA-Z0-9]{33}$/; // TRC20 (Tron)
  const reEth = /^0x[a-fA-F0-9]{40}$/; // ERC20 (Ethereum)
  const reOmni = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/; // BTC-format (Omni)
  return reTron.test(address) || reEth.test(address) || reOmni.test(address);
}

const networkTips = [
  {
    name: "TRC20 (Tron)",
    example: "TJKof8YXAXZsqVK81cqU4D3V6s1Fz1bchq",
    desc: "Starts with 'T', 34 chars. No fees on many exchanges.",
  },
  {
    name: "ERC20 (Ethereum)",
    example: "0x31b98d14007bdee637298086988a0bbd31184523",
    desc: "Starts with '0x', 42 chars. Standard Ethereum addresses.",
  },
  {
    name: "Omni (Bitcoin-based)",
    example: "1G9czvfyMZRiKfMKFSNtj1shTVafGZRSWu",
    desc: "Looks like Bitcoin. Less commonly used for USDT.",
  },
];

export default function UsdtValidatorPage() {
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setChecked(true);
    setIsValid(isUsdtAddress(input.trim()));
  };

  return (
    <div>
      <SEO
        title="USDT Address Validator | Wallet2QR"
        description="Quickly check if a crypto address is a valid USDT (Tether) address on major networks such as TRC20, ERC20, and Omni. Secure and reliable."
        keywords="USDT, Tether, address validator, crypto verification"
      />

      <section className="bg-gradient-to-br from-crypto-lightPurple/60 to-crypto-purple/40 py-10 sm:py-16 mb-10 border-b">
        <div className="container px-4 max-w-2xl mx-auto text-center">
          <Shield className="inline h-12 w-12 text-crypto-purple mb-2" />
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">USDT Address Validator</h1>
          <p className="text-lg text-muted-foreground mb-4">
            Instantly validate if a given address belongs to USDT (Tether) on major blockchains (TRC20, ERC20, Omni).
          </p>
        </div>
      </section>

      <div className="container max-w-xl mx-auto px-4">
        <Card className="mb-10 shadow-md border border-primary/10">
          <CardHeader>
            <CardTitle>Check USDT Address</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleCheck}>
              <input
                className="w-full px-4 py-3 border border-muted-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-crypto-lightPurple bg-background text-lg"
                type="text"
                value={input}
                onChange={e => { setInput(e.target.value); setChecked(false); setIsValid(null); }}
                placeholder="Paste or type USDT address here"
                autoFocus
                spellCheck={false}
              />
              <Button type="submit" className="w-full">
                Check Address
              </Button>
              {checked && (
                <div className="flex items-center justify-center gap-2 mt-4">
                  {isValid ? (
                    <>
                      <Check className="h-6 w-6 text-green-500" />
                      <span className="text-green-600 font-semibold text-lg">
                        This is a valid USDT address.
                      </span>
                    </>
                  ) : (
                    <>
                      <X className="h-6 w-6 text-red-500" />
                      <span className="text-red-600 font-semibold text-lg">
                        This is not a valid USDT address.
                      </span>
                    </>
                  )}
                </div>
              )}
            </form>
            <div className="mt-8 text-sm text-muted-foreground">
              <strong>What is a USDT address?</strong>
              <p className="mb-1">A USDT (Tether) address can belong to several networks. Make sure you double check the address matches the network you intend to use for sending or receiving funds.</p>
              <ul className="list-none my-3 space-y-2">
                {networkTips.map(tip => (
                  <li key={tip.name} className="flex gap-2 items-start">
                    <span className="mt-1 w-2 h-2 rounded-full bg-crypto-lightPurple flex-shrink-0" />
                    <span>
                      <span className="font-bold">{tip.name}: </span>
                      <span className="font-mono bg-gray-100 rounded px-1 py-0.5">{tip.example}</span>
                      <span className="text-muted-foreground block ml-5">{tip.desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <span className="font-semibold">Note:</span> This tool performs a rapid format check and does not guarantee the safety of the address. Always double check addresses, especially when transacting large amounts.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
