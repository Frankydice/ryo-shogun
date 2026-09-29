import React, { useState, useEffect } from 'react';
import { Code, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { ShogunEdict } from '../types/index.js';
import { clientLiveMarket, LiveCandle, LiveTickerItem } from '../services/liveMarket.js';

interface TokenChartProps {
  edict: ShogunEdict | null;
  activeSymbol?: string;
  onOpenPlaybook?: () => void;
}

export const TokenChart: React.FC<TokenChartProps> = ({
  edict,
  activeSymbol = 'INJUSDT',
  onOpenPlaybook
}) => {
  const [timeframe, setTimeframe] = useState<'15m' | '1h' | '4h' | '1D'>('1h');
  const [candles, setCandles] = useState<LiveCandle[]>([]);
  const [ticker, setTicker] = useState<LiveTickerItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const displaySymbol = activeSymbol.includes('USDT') ? activeSymbol : `${activeSymbol}USDT`;
  const rawSymbol = displaySymbol.replace('USDT', '');

  // Fetch real candles and ticker for active symbol
  const loadMarketData = async () => {
    setIsLoading(true);
    try {
      const tickers = await clientLiveMarket.getLiveTickers();
      const current = tickers.find((t) => t.symbol === displaySymbol || t.symbol === `${rawSymbol}USDT`) || tickers[0];
      if (current) setTicker(current);

      const liveCandles = await clientLiveMarket.getLiveCandles(displaySymbol, timeframe);
      if (liveCandles.length > 0) {
        setCandles(liveCandles);
      }
    } catch (err) {
      console.warn('Failed to load chart candles:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMarketData();
  }, [displaySymbol, timeframe]);

  const currentPrice = ticker?.price || edict?.entry_price || 7.67;
  const changePct = ticker?.change24h || 5.31;
  const entryPrice = edict?.target_symbol === rawSymbol && edict?.entry_price ? edict.entry_price : currentPrice;
  const tpPrice = edict?.target_symbol === rawSymbol && edict?.take_profit ? edict.take_profit : Number((entryPrice * 1.045).toFixed(4));
  const slPrice = edict?.target_symbol === rawSymbol && edict?.stop_loss ? edict.stop_loss : Number((entryPrice * 0.978).toFixed(4));

  // Determine chart price scale
  const candlePrices = candles.flatMap((c) => [c.low, c.high]);
  if (candlePrices.length === 0) {
    candlePrices.push(currentPrice * 0.98, currentPrice * 1.02);
  }
  candlePrices.push(slPrice, tpPrice, entryPrice);

  const minP = Math.min(...candlePrices) * 0.998;
  const maxP = Math.max(...candlePrices) * 1.002;
  const pRange = maxP - minP || 1;

  const chartW = 700;
  const chartH = 220;
  const getY = (price: number) => {
    return chartH - ((price - minP) / pRange) * chartH;
  };

  const tpY = getY(tpPrice);
  const entryY = getY(entryPrice);
  const slY = getY(slPrice);

  const candleW = Math.max(Math.min(chartW / (candles.length || 24) - 4, 18), 6);
  const spacing = chartW / (candles.length || 24);
  const maxVol = Math.max(...(candles.map((c) => c.volume) || [100]));

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm flex flex-col gap-4 relative overflow-hidden">
      {/* Top Header: Symbol Info & Timeframe Selectors */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        {/* Token Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center font-bold text-purple-700 font-mono text-base shadow-sm shrink-0">
            {rawSymbol.slice(0, 3)}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-extrabold text-xl text-slate-900">
                {displaySymbol}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-purple-200 text-purple-700 bg-purple-50 font-bold">
                SPOT
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5 text-xs font-mono">
              <span className="font-extrabold text-slate-900">
                ${currentPrice >= 1000 ? currentPrice.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : currentPrice.toFixed(currentPrice < 1 ? 4 : 2)}
              </span>
              <span className={`font-bold flex items-center gap-0.5 ${changePct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {changePct >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {changePct >= 0 ? '+' : ''}{changePct.toFixed(2)}%
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-400">Gate.io Live</span>
            </div>
          </div>
        </div>

        {/* Timeframe Controls & Playbook Code CTA */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            {(['15m', '1h', '4h', '1D'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  timeframe === tf
                    ? 'bg-white text-purple-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <button
            onClick={loadMarketData}
            disabled={isLoading}
            className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 transition"
            title="Refresh Live K-lines"
          >
            <RefreshCw size={14} className={isLoading ? 'animate-spin text-purple-600' : ''} />
          </button>

          {onOpenPlaybook && (
            <button
              onClick={onOpenPlaybook}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300 text-xs font-mono text-slate-700 font-semibold transition-all shadow-sm"
            >
              <Code size={14} />
              <span>Playbook</span>
            </button>
          )}
        </div>
      </div>

      {/* Candlestick SVG Canvas */}
      <div className="relative w-full bg-slate-50/60 rounded-2xl p-3 border border-slate-100">
        <svg
          viewBox={`0 0 ${chartW} ${chartH}`}
          className="w-full h-auto max-h-[300px] overflow-visible select-none"
        >
          {/* Subtle Gridlines */}
          <line x1="0" y1={chartH * 0.25} x2={chartW} y2={chartH * 0.25} stroke="#E2E8F0" strokeDasharray="3 3" />
          <line x1="0" y1={chartH * 0.50} x2={chartW} y2={chartH * 0.50} stroke="#E2E8F0" strokeDasharray="3 3" />
          <line x1="0" y1={chartH * 0.75} x2={chartW} y2={chartH * 0.75} stroke="#E2E8F0" strokeDasharray="3 3" />

          {/* Volume Bars */}
          {candles.map((c, i) => {
            const x = i * spacing + spacing / 2;
            const volH = maxVol > 0 ? (c.volume / maxVol) * 45 : 10;
            const isBull = c.close >= c.open;
            return (
              <rect
                key={`vol-${i}`}
                x={x - candleW / 2}
                y={chartH - volH}
                width={candleW}
                height={volH}
                fill={isBull ? '#10B981' : '#EF4444'}
                opacity="0.15"
                rx="1"
              />
            );
          })}

          {/* Candlesticks */}
          {candles.map((c, i) => {
            const x = i * spacing + spacing / 2;
            const isBull = c.close >= c.open;
            const highY = getY(c.high);
            const lowY = getY(c.low);
            const openY = getY(c.open);
            const closeY = getY(c.close);

            const bodyTop = Math.min(openY, closeY);
            const bodyH = Math.max(Math.abs(closeY - openY), 2.5);

            return (
              <g key={`candle-${i}`}>
                {/* Wick */}
                <line
                  x1={x}
                  y1={highY}
                  x2={x}
                  y2={lowY}
                  stroke={isBull ? '#10B981' : '#EF4444'}
                  strokeWidth="1.5"
                />

                {/* Candle Body */}
                <rect
                  x={x - candleW / 2}
                  y={bodyTop}
                  width={candleW}
                  height={bodyH}
                  fill={isBull ? '#10B981' : '#EF4444'}
                  rx="1.5"
                />
              </g>
            );
          })}

          {/* Take Profit Target Line (Emerald Dashed) */}
          {tpY >= 0 && tpY <= chartH && (
            <g>
              <line x1="0" y1={tpY} x2={chartW} y2={tpY} stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 4" />
              <text x={chartW - 6} y={tpY - 4} textAnchor="end" fill="#10B981" fontSize="10" fontFamily="monospace" fontWeight="bold">
                TP: ${tpPrice}
              </text>
            </g>
          )}

          {/* Council Entry Target Line (Purple Solid) */}
          {entryY >= 0 && entryY <= chartH && (
            <g>
              <line x1="0" y1={entryY} x2={chartW} y2={entryY} stroke="#7E22CE" strokeWidth="1.8" />
              <text x={chartW - 6} y={entryY - 4} textAnchor="end" fill="#7E22CE" fontSize="10" fontFamily="monospace" fontWeight="bold">
                ENTRY: ${entryPrice}
              </text>
            </g>
          )}

          {/* Stop Loss Target Line (Crimson Dashed) */}
          {slY >= 0 && slY <= chartH && (
            <g>
              <line x1="0" y1={slY} x2={chartW} y2={slY} stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4 4" />
              <text x={chartW - 6} y={slY - 4} textAnchor="end" fill="#EF4444" fontSize="10" fontFamily="monospace" fontWeight="bold">
                SL: ${slPrice}
              </text>
            </g>
          )}
        </svg>

        {/* Time Axis Ticks */}
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-200">
          <span>{candles[0]?.time || '00:00'}</span>
          <span>{candles[Math.floor(candles.length / 3)]?.time || '08:00'}</span>
          <span>{candles[Math.floor((candles.length * 2) / 3)]?.time || '16:00'}</span>
          <span>{candles[candles.length - 1]?.time || '23:00'}</span>
        </div>
      </div>

      {/* Quick Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-mono">
          <span className="text-slate-400 block text-[10px] uppercase">24h High / Low</span>
          <span className="font-bold text-slate-800">
            ${ticker?.high24h?.toFixed(2) || '7.73'} / ${ticker?.low24h?.toFixed(2) || '7.26'}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-mono">
          <span className="text-slate-400 block text-[10px] uppercase">24h Quote Volume</span>
          <span className="font-bold text-slate-800">{ticker?.volumeUsd || '$4.1M'}</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-mono">
          <span className="text-slate-400 block text-[10px] uppercase">DEX Pool Liquidity</span>
          <span className="font-bold text-slate-800">{ticker?.liquidityUsd || '$1.8M'}</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-mono">
          <span className="text-slate-400 block text-[10px] uppercase">Risk / Reward (R:R)</span>
          <span className="font-bold text-purple-700">{edict?.risk_reward_ratio || 2.43}x</span>
        </div>
      </div>
    </div>
  );
};
