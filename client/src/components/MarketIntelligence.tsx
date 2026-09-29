import React, { useState, useEffect } from 'react';
import { Radio, Play, CheckCircle2, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { clientLiveMarket, LiveTickerItem } from '../services/liveMarket.js';

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
  const [tokens, setTokens] = useState<LiveTickerItem[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [injecting, setInjecting] = useState(false);
  const [injected, setInjected] = useState(false);

  const fetchLiveTokens = async () => {
    setIsRefreshing(true);
    try {
      const data = await clientLiveMarket.getLiveTickers();
      setTokens(data);
    } catch (err) {
      console.warn('Failed to load live tickers:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLiveTokens();
    const interval = setInterval(fetchLiveTokens, 15000);
    return () => clearInterval(interval);
  }, []);

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
    <div className="flex flex-col gap-4" id="market-intelligence">
      {/* Header Bar with Olas Corner-Bracket */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse"></div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Live Market Intelligence</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold border border-purple-200">
                100% FACTUAL
              </span>
            </h2>
            <p className="text-xs text-slate-500 font-mono">
              Direct live oracles from Gate.io Spot & EVM liquidity pools
            </p>
          </div>
        </div>

        <button
          onClick={fetchLiveTokens}
          disabled={isRefreshing}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-mono text-slate-600 transition-colors"
          title="Refresh live feeds"
        >
          <RefreshCw size={13} className={isRefreshing ? 'animate-spin text-purple-600' : ''} />
          <span>Sync Oracles</span>
        </button>
      </div>

      {/* Token Cards Grid (2 cols mobile, 3 cols tablet, 6 cols desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {tokens.map((t) => {
          const isSelected = selectedSymbol.includes(t.symbol.replace('USDT', ''));
          const isBullish = t.change24h >= 0;

          return (
            <div
              key={t.symbol}
              onClick={() => onSelectToken(t.symbol)}
              className={`rounded-2xl p-4 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-purple-50/60 border-2 border-purple-600 shadow-md -translate-y-0.5'
                  : 'bg-white border border-slate-200/90 shadow-sm hover:border-purple-300 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              {/* Card Top: Symbol & Badge */}
              <div className="flex items-center justify-between gap-1">
                <span className="font-mono font-extrabold text-sm sm:text-base text-slate-900">
                  {t.symbol}
                </span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  {t.badge}
                </span>
              </div>

              {/* Price & 24h Change */}
              <div className="my-3">
                <div className="text-base sm:text-lg font-mono font-extrabold text-slate-900">
                  ${t.price >= 1000 ? t.price.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : t.price.toFixed(t.price < 1 ? 4 : 2)}
                </div>
                <div className={`flex items-center gap-1 text-xs font-mono font-bold mt-0.5 ${
                  isBullish ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {isBullish ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                  <span>{isBullish ? '+' : ''}{t.change24h.toFixed(2)}%</span>
                </div>
              </div>

              {/* Sparkline & Volume */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="text-[10px] font-mono text-slate-400">
                  <span>Vol: </span>
                  <span className="font-semibold text-slate-700">{t.volumeUsd}</span>
                </div>

                <svg width="48" height="18" viewBox="0 0 80 24" className="shrink-0">
                  <path
                    d={t.sparkline || 'M0,12 L80,12'}
                    fill="none"
                    stroke={isBullish ? '#10B981' : '#EF4444'}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Catalyst Simulation Card (Olas Style) */}
      <div className="rounded-2xl p-4 sm:p-5 bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <Radio size={20} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 text-sm">
                Scenario Stress-Test Engine
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold border border-amber-200">
                WAR ROOM READY
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Inject external macro shocks to test the Samurai Council's autonomous handover and Daimyo veto rules.
            </p>
          </div>
        </div>

        <button
          onClick={handleInject}
          disabled={injecting || injected || isLoading}
          className={`shrink-0 px-4 py-2.5 rounded-xl font-medium text-xs font-mono transition-all flex items-center justify-center gap-2 ${
            injected
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm hover:shadow'
          }`}
        >
          {injected ? (
            <>
              <CheckCircle2 size={15} />
              <span>Shock Injected!</span>
            </>
          ) : (
            <>
              <Play size={14} />
              <span>{injecting ? 'Simulating...' : 'Inject Fed Rate Shock'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
