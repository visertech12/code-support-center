
import React, { useState } from 'react';
import SEO from '@/components/SEO';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const validateAddress = (address: string): string => {
  // Very simple regex stub, real logic needed per network!
  if (!address) return '';
  if (/^(0x)?[0-9a-fA-F]{40}$/.test(address.trim())) {
    return "Valid Ethereum/USDT-ERC20 address";
  }
  if (/^T[a-zA-Z0-9]{33}$/.test(address.trim())) {
    return "Valid TRC20 address";
  }
  if (/^1[0-9A-HJ-NP-Za-km-z]{25,34}$/.test(address.trim()) || /^3[0-9A-HJ-NP-Za-km-z]{25,34}$/.test(address.trim())) {
    return "Valid OMNI/BTC address";
  }
  return "Invalid or unsupported address format";
};

const UsdtValidatorPage = () => {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function handleCheck(e: React.FormEvent) {
    e.preventDefault();
    setResult(validateAddress(address));
  }

  return (
    <div className="max-w-xl mx-auto py-12">
      <SEO title="USDT Address Validator | Wallet2QR" description="Check and validate USDT addresses (ERC20, TRC20, OMNI/BTC)" />
      <h1 className="text-2xl font-bold mb-4">USDT Address Check & Validator</h1>
      <form onSubmit={handleCheck} className="space-y-4">
        <Input value={address} onChange={e => setAddress(e.target.value)} placeholder="Paste USDT address here..." />
        <Button type="submit">Validate Address</Button>
      </form>
      {result && <div className="mt-6 text-md font-medium">{result}</div>}
      <div className="text-xs text-muted-foreground mt-4">* Supports Ethereum (ERC20), Tron (TRC20), Bitcoin (OMNI)</div>
    </div>
  );
};

export default UsdtValidatorPage;
