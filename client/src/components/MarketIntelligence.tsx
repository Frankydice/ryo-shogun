import React, { useState } from 'react';
import { Radio, ArrowUpRight, Play, CheckCircle2 } from 'lucide-react';

export interface MarketTokenItem {
  symbol: string;
  badge: string;
  price: number;
  change24h: number;
  volumeUsd: string;
  liquidityUsd: string;
  sparkline: string;
}

interface MarketIntelligenceProps {
  selectedSymbol: string;
  onSelectToken: (symbol: string) => void;
  onInjectCatalyst: (eventTitle: string) => Promise<void>;
  isLoading: boolean;
}

export const MarketIntelligence: React.FC<MarketIntelligenceProps> = ({
  selectedSymbol,
  onSelectToken,
  onInjectCatalyst,
  isLoading
}) => {
  const [injecting, setInjecting] = useState(false);
  const [injected, setInjected] = useState(false);

  const tokens: MarketTokenItem[] = [
    {
      symbol: 'NVDAUSDT',
      badge: 'rToken',
      price: 128.45,
      change24h: 3.42,
      volumeUsd: '$2.4M',
      liquidityUsd: '$1.8M',
      sparkline: 'M0,15 Q10,12 20,8 T40,10 T60,5 T80,2'
    },
    {
      symbol: 'TSLAUSDT',
      badge: 'rToken',
      price: 242.10,
      change24h: 5.18,
      volumeUsd: '$1.2M',
      liquidityUsd: '$980K',
      sparkline: 'M0,18 Q15,14 30,10 T50,8 T70,3 T80,2'
    },
    {
      symbol: 'AAPLUSDT',
      badge: 'rToken',
      price: 228.60,
      change24h: 1.15,
      volumeUsd: '$890K',
      liquidityUsd: '$760K',
      sparkline: 'M0,14 Q15,15 30,12 T50,11 T70,6 T80,4'
    },
    {
      symbol: 'COINUSDT',
      badge: 'rToken',
      price: 312.40,
      change24h: 6.84,
      volumeUsd: '$1.6M',
      liquidityUsd: '$1.2M',
      sparkline: 'M0,16 Q10,14 25,6 T50,8 T70,3 T80,1'
    },
    {
      symbol: 'MSTRUSDT',
      badge: 'rToken',
      price: 345.80,
      change24h: 8.92,
      volumeUsd: '$980K',
      liquidityUsd: '$860K',
      sparkline: 'M0,18 Q12,16 30,8 T50,6 T70,2 T80,1'
    },
    {
      symbol: 'SPYUSDT',
      badge: 'rToken',
      price: 588.20,
      change24h: 0.85,
      volumeUsd: '$2.1M',
      liquidityUsd: '$1.7M',
      sparkline: 'M0,13 Q15,12 30,11 T50,9 T70,8 T80,6'
    }
  ];

  const handleInject = async () => {
    try {
      setInjecting(true);
      await onInjectCatalyst('Fed Weekend Emergency Statement');
      setInjected(true);
      setTimeout(() => setInjected(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setInjecting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
      {/* Left: Live Market Intelligence Token Grid (8 cols) */}
      <div className="lg:col-span-8 glass-panel rounded-3xl p-5 flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-shogun-accent/15 text-shogun-accent">
              <Radio size={16} />
            </span>
            <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-white">
              LIVE MARKET INTELLIGENCE
            </span>
          </div>

          <button
            onClick={() => onSelectToken('INJ')}
            className="text-xs font-mono text-shogun-muted hover:text-shogun-accent transition flex items-center gap-1"
          >
            <span>View All Markets</span>
            <ArrowUpRight size={13} />
          </button>
        </div>

        {/* 6 Token Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
          {tokens.map((token) => {
            const isSelected = selectedSymbol.toUpperCase().includes(token.symbol.replace('USDT', ''));
            const isPositive = token.change24h >= 0;

            return (
              <button
                key={token.symbol}
                onClick={() => onSelectToken(token.symbol.replace('USDT', ''))}
                className={`glass-card rounded-2xl p-3 text-left transition-all duration-200 flex flex-col justify-between relative overflow-hidden group ${
                  isSelected
                    ? 'border-shogun-accent/60 bg-shogun-accent/10 shadow-[0_0_15px_rgba(110,232,154,0.18)] -translate-y-0.5'
                    : 'hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono font-bold text-xs text-white truncate">
                      {token.symbol}
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded border border-emerald-400/40 text-emerald-300 bg-emerald-950/40">
                      {token.badge}
                    </span>
                  </div>

                  <div className="mt-1.5">
                    <span className="font-mono font-extrabold text-sm text-white block">
                      ${token.price.toFixed(2)}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold block ${
                        isPositive ? 'text-shogun-accent' : 'text-shogun-crimson'
                      }`}
                    >
                      {isPositive ? `+${token.change24h}%` : `${token.change24h}%`}
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-white/[0.05] flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[9px] font-mono text-shogun-muted">
                    <span>Vol {token.volumeUsd}</span>
                    <span>Liq {token.liquidityUsd}</span>
                  </div>

                  <svg className="w-full h-5 overflow-visible shrink-0 mt-0.5" viewBox="0 0 80 20">
                    <path
                      d={token.sparkline}
                      fill="none"
                      stroke={isPositive ? '#6EE89A' : '#FF4D4D'}
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Active Event Simulation Card (4 cols) */}
      <div className="lg:col-span-4 glass-panel rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden">
        {/* Subtle glow */}
        <div className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full bg-shogun-gold/10 blur-[60px]" />

        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-3">
            <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-white">
              ACTIVE EVENT SIMULATION
            </span>
            <span className="text-xs font-mono text-shogun-muted hover:text-white cursor-pointer flex items-center gap-0.5">
              <span>View All</span>
              <ArrowUpRight size={12} />
            </span>
          </div>

          {/* Event Content */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full border border-shogun-gold/50 bg-shogun-gold/20 text-shogun-gold uppercase">
                HIGH IMPACT
              </span>
              <span className="font-bold text-xs text-white truncate">
                Fed Weekend Emergency Statement
              </span>
            </div>

            <div className="text-[10px] font-mono text-shogun-muted flex items-center gap-2">
              <span className="text-shogun-gold">Macro</span>
              <span>•</span>
              <span className="text-shogun-accent">Bullish</span>
              <span>•</span>
              <span className="text-white/80">INJ, SOL, PENDLE</span>
            </div>

            <p className="text-xs text-shogun-ink/80 leading-relaxed font-sans mt-0.5">
              Unexpected rate cut announcement over the weekend, increasing risk appetite and liquidity across markets.
            </p>

            {/* Impact Metric Pills */}
            <div className="grid grid-cols-3 gap-2 bg-black/50 border border-white/[0.06] rounded-xl p-2.5 text-[11px] font-mono mt-1">
              <div>
                <span className="text-[9px] text-shogun-muted uppercase block">Expected Impact</span>
                <span className="font-bold text-white text-xs block truncate mt-0.5">Strong Bullish</span>
              </div>
              <div className="border-l border-white/10 pl-2">
                <span className="text-[9px] text-shogun-muted uppercase block">Sentiment</span>
                <span className="font-bold text-shogun-accent text-xs flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-shogun-accent"></span>
                  Positive
                </span>
              </div>
              <div className="border-l border-white/10 pl-2">
                <span className="text-[9px] text-shogun-muted uppercase block">Timeframe</span>
                <span className="font-bold text-white text-xs block mt-0.5">1–6h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-3">
          <button
            onClick={handleInject}
            disabled={injecting || isLoading}
            className={`w-full py-2.5 px-4 rounded-xl font-mono font-bold text-xs transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_18px_rgba(110,232,154,0.25)] ${
              injected
                ? 'bg-emerald-500 text-black'
                : 'bg-shogun-accent hover:bg-emerald-400 text-shogun-bg hover:scale-[1.01]'
            } disabled:opacity-60`}
          >
            {injected ? (
              <>
                <CheckCircle2 size={15} />
                <span>Catalyst Injected into Council!</span>
              </>
            ) : (
              <>
                <Play size={14} className={injecting ? 'animate-spin' : 'fill-current'} />
                <span>{injecting ? 'Injecting Catalyst...' : 'Inject Catalyst'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
