
import React, { useState } from 'react';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';

const API = "https://api.coingecko.com/api/v3/coins/list";
const COIN_API = "https://api.coingecko.com/api/v3/coins/";

const RandomCoinGeneratorPage = () => {
  const [coinList, setCoinList] = useState<any[]>([]);
  const [randomCoin, setRandomCoin] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [loadingCoin, setLoadingCoin] = useState(false);

  // Fetch coins list lazily when used the first time
  const fetchCoinList = async () => {
    setLoading(true);
    const res = await fetch(API);
    const data = await res.json();
    setCoinList(data);
    setLoading(false);
    return data;
  };

  const fetchRandomCoin = async () => {
    let list = coinList;
    if (!coinList.length) {
      list = await fetchCoinList();
    }
    if (!list.length) return;
    const idx = Math.floor(Math.random() * list.length);
    const coin = list[idx];
    setLoadingCoin(true);
    const detailedRes = await fetch(`${COIN_API}${coin.id}`);
    const details = await detailedRes.json();
    setRandomCoin(details);
    setLoadingCoin(false);
  };

  return (
    <div className="max-w-xl mx-auto py-12">
      <SEO title="Random Coin Generator | Wallet2QR" description="Discover a random coin using CoinGecko public API" />
      <h1 className="text-2xl font-bold mb-4">Random Coin Generator</h1>
      <div className="mb-6">
        Click the button below to discover a random cryptocurrency, with live data powered by CoinGecko.
      </div>
      <Button onClick={fetchRandomCoin} disabled={loading || loadingCoin} className="mb-5">
        {loadingCoin ? "Fetching Coin..." : "Pick a Random Coin"}
      </Button>
      {loading && <div>Preparing all coins list (loading)...</div>}
      {randomCoin && (
        <div className="border rounded-lg p-5 mt-6 bg-muted">
          <div className="flex items-center gap-3 mb-4">
            <img src={randomCoin.image?.thumb} alt="" className="w-8 h-8 rounded" />
            <span className="font-bold text-lg">{randomCoin.name}</span>
            <span className="bg-muted-foreground text-xs rounded px-2">{randomCoin.symbol?.toUpperCase()}</span>
            <a href={randomCoin.links?.homepage?.[0]} className="ml-auto underline text-xs" target="_blank" rel="noopener noreferrer">
              Website
            </a>
          </div>
          <div className="mb-3">
            <span className="font-medium">Rank: </span> {randomCoin.coingecko_rank ?? "N/A"}
          </div>
          <div className="mb-2 text-muted-foreground">{randomCoin.description?.en?.slice(0, 160) ?? "No description."}</div>
          <div className="mb-2">
            <span className="font-medium">Current Price (USD): </span>
            {randomCoin.market_data?.current_price?.usd
              ? `$${randomCoin.market_data.current_price.usd.toLocaleString(undefined, { maximumFractionDigits: 10 })}`
              : "N/A"}
          </div>
          <div className="mt-2">
            <span className="font-medium">Explore: </span>
            {randomCoin.links?.blockchain_site?.filter((u: string) => u)?.slice(0, 2).map((u: string, i: number) => (
              <a key={i} href={u} className="underline text-xs mx-2" target="_blank" rel="noopener noreferrer">
                {u.replace(/^https?:\/\//, '').split('/')[0]}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomCoinGeneratorPage;
