import React from 'react';

const ECOSYSTEM_PARTNERS = [
  { name: 'Gate.io Spot', desc: 'Live Tickers & Candlesticks' },
  { name: 'DexScreener', desc: 'On-Chain Liquidity & Pools' },
  { name: 'Ethereum RPC', desc: 'Mainnet Gas & Execution' },
  { name: 'Robinhood Chain', desc: 'Institutional DeFi & Perps' },
  { name: 'CoinPaprika', desc: 'Global BTC Dominance & Volume' },
  { name: 'Alternative.me', desc: 'Global Fear & Greed Index' },
  { name: 'Arbitrum One', desc: 'Layer-2 Low Latency' },
  { name: 'Base', desc: 'Coinbase EVM Liquidity' },
  { name: 'Solana', desc: 'High-Frequency Flow' },
];

export const EcosystemMarquee: React.FC = () => {
  return (
    <div className="w-full py-10 sm:py-14 bg-white border-y border-zinc-200 overflow-hidden">
      {/* Corner-Bracket Badge */}
      <div className="flex justify-center w-full mb-8">
        <div className="relative inline-block">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute w-2 h-2 border-zinc-900 top-0 left-0 border-t-2 border-l-2 z-20"></div>
            <div className="absolute w-2 h-2 border-zinc-900 top-0 right-0 border-t-2 border-r-2 z-20"></div>
            <div className="absolute w-2 h-2 border-zinc-900 bottom-0 left-0 border-b-2 border-l-2 z-20"></div>
            <div className="absolute w-2 h-2 border-zinc-900 bottom-0 right-0 border-b-2 border-r-2 z-20"></div>
          </div>
          <div className="relative inline-flex items-center justify-center px-4 py-1.5 font-bold text-xs tracking-wider uppercase rounded-md text-center bg-zinc-100 text-zinc-900 border border-zinc-200 z-10 font-mono">
            Verified Live Oracles & Protocol Rails
          </div>
        </div>
      </div>

      {/* Infinite Scrolling Track */}
      <div className="relative overflow-hidden w-full">
        {/* Left and Right Edge Gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-36 z-10 bg-gradient-to-r from-white to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-36 z-10 bg-gradient-to-l from-white to-transparent"></div>

        <div className="flex animate-scroll w-max hover:[animation-play-state:paused] items-center gap-12 sm:gap-16">
          {/* Double array to create seamless loop */}
          {[...ECOSYSTEM_PARTNERS, ...ECOSYSTEM_PARTNERS, ...ECOSYSTEM_PARTNERS].map((partner, idx) => (
            <div
              key={`${partner.name}-${idx}`}
              className="flex items-center gap-2.5 shrink-0 px-4 py-2 rounded-xl bg-zinc-50 border border-zinc-200 hover:border-zinc-900 hover:bg-zinc-100 transition-all cursor-default group"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <div>
                <span className="font-extrabold text-sm sm:text-base text-zinc-800 group-hover:text-black transition-colors font-mono">
                  {partner.name}
                </span>
                <span className="block text-[10px] text-zinc-500 font-mono">
                  {partner.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
