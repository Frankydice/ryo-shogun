import React, { useState } from 'react';
import { Code } from 'lucide-react';
import { ShogunEdict } from '../types/index.js';

interface TokenChartProps {
  edict: ShogunEdict | null;
  activeSymbol?: string;
  onOpenPlaybook?: () => void;
}

interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const TokenChart: React.FC<TokenChartProps> = ({
  edict,
  activeSymbol,
  onOpenPlaybook
}) => {
  const [timeframe, setTimeframe] = useState<'15m' | '1h' | '4h' | '1D'>('1h');

  // Determine current active symbol and pricing
  const rawSymbol = activeSymbol || edict?.target_symbol || 'NVDAUSDT';
  const displaySymbol = rawSymbol.includes('USDT') ? rawSymbol : `${rawSymbol}USDT`;
  const isDefaultNvda = displaySymbol.startsWith('NVDA');

  const currentPrice = isDefaultNvda ? 128.45 : (edict?.entry_price || 24.85);
  const changePct = isDefaultNvda ? 3.42 : 4.15;
  const entryPrice = edict?.entry_price || (isDefaultNvda ? 128.40 : currentPrice);
  const tpPrice = edict?.take_profit || Number((entryPrice * 1.037).toFixed(2));
  const slPrice = edict?.stop_loss || Number((entryPrice * 0.982).toFixed(2));

  // Synthesize realistic candlesticks around entry
  const candles: Candle[] = [
    { time: '12:00', open: entryPrice * 0.985, high: entryPrice * 0.992, low: entryPrice * 0.982, close: entryPrice * 0.990, volume: 42 },
    { time: '13:00', open: entryPrice * 0.990, high: entryPrice * 0.994, low: entryPrice * 0.986, close: entryPrice * 0.988, volume: 38 },
    { time: '14:00', open: entryPrice * 0.988, high: entryPrice * 0.995, low: entryPrice * 0.987, close: entryPrice * 0.993, volume: 55 },
    { time: '15:00', open: entryPrice * 0.993, high: entryPrice * 0.998, low: entryPrice * 0.991, close: entryPrice * 0.997, volume: 62 },
    { time: '16:00', open: entryPrice * 0.997, high: entryPrice * 1.002, low: entryPrice * 0.994, close: entryPrice * 1.000, volume: 78 },
    { time: '17:00', open: entryPrice * 1.000, high: entryPrice * 1.004, low: entryPrice * 0.998, close: entryPrice * 1.001, volume: 49 },
    { time: '18:00', open: entryPrice * 1.001, high: entryPrice * 1.003, low: entryPrice * 0.996, close: entryPrice * 0.998, volume: 40 },
    { time: '19:00', open: entryPrice * 0.998, high: entryPrice * 1.001, low: entryPrice * 0.995, close: entryPrice * 0.996, volume: 34 },
    { time: '20:00', open: entryPrice * 0.996, high: entryPrice * 1.005, low: entryPrice * 0.995, close: entryPrice * 1.003, volume: 84 },
    { time: '21:00', open: entryPrice * 1.003, high: entryPrice * 1.008, low: entryPrice * 1.001, close: entryPrice * 1.007, volume: 92 },
    { time: '22:00', open: entryPrice * 1.007, high: entryPrice * 1.010, low: entryPrice * 1.004, close: entryPrice * 1.005, volume: 60 },
    { time: '23:00', open: entryPrice * 1.005, high: entryPrice * 1.009, low: entryPrice * 1.002, close: entryPrice * 1.003, volume: 45 },
    { time: '00:00', open: entryPrice * 1.003, high: entryPrice * 1.006, low: entryPrice * 0.999, close: entryPrice * 1.001, volume: 51 },
    { time: '01:00', open: entryPrice * 1.001, high: entryPrice * 1.007, low: entryPrice * 1.000, close: entryPrice * 1.006, volume: 72 },
    { time: '02:00', open: entryPrice * 1.006, high: entryPrice * 1.011, low: entryPrice * 1.004, close: entryPrice * 1.009, volume: 88 },
    { time: '03:00', open: entryPrice * 1.009, high: entryPrice * 1.014, low: entryPrice * 1.007, close: entryPrice * 1.012, volume: 95 },
    { time: '04:00', open: entryPrice * 1.012, high: entryPrice * 1.016, low: entryPrice * 1.010, close: entryPrice * 1.015, volume: 110 },
    { time: '05:00', open: entryPrice * 1.015, high: entryPrice * 1.018, low: entryPrice * 1.011, close: entryPrice * 1.013, volume: 74 },
    { time: '06:00', open: entryPrice * 1.013, high: entryPrice * 1.020, low: entryPrice * 1.012, close: entryPrice * 1.018, volume: 82 },
    { time: '07:00', open: entryPrice * 1.018, high: entryPrice * 1.024, low: entryPrice * 1.016, close: entryPrice * 1.021, volume: 104 },
    { time: '08:00', open: entryPrice * 1.021, high: entryPrice * 1.026, low: entryPrice * 1.019, close: currentPrice, volume: 130 }
  ];

  // Price boundaries
  const allPrices = candles.flatMap((c) => [c.low, c.high]);
  allPrices.push(slPrice, tpPrice, entryPrice);
  const minP = Math.min(...allPrices) * 0.995;
  const maxP = Math.max(...allPrices) * 1.005;
  const pRange = maxP - minP;

  // Chart dimensions
  const chartW = 600;
  const chartH = 210;
  const maxVol = Math.max(...candles.map((c) => c.volume));

  const getY = (price: number) => {
    return chartH - ((price - minP) / pRange) * chartH;
  };

  const tpY = getY(tpPrice);
  const entryY = getY(entryPrice);
  const slY = getY(slPrice);

  const candleW = 14;
  const spacing = chartW / candles.length;

  return (
    <div className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col gap-3.5 sm:gap-4 relative overflow-hidden">
      {/* Top Token Info & Price Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 border-b border-white/[0.08] pb-3.5 sm:pb-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-500/20 via-shogun-accent/10 to-teal-500/20 border border-shogun-accent/40 flex items-center justify-center font-bold text-shogun-accent font-mono text-sm sm:text-base shadow-[0_0_15px_rgba(110,232,154,0.2)] shrink-0">
            {displaySymbol.slice(0, 3)}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="font-mono font-extrabold text-base sm:text-xl text-white">
                {displaySymbol}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded border border-emerald-400/40 text-emerald-300 bg-emerald-950/40 font-bold">
                rToken
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded border border-teal-500/30 text-teal-300 bg-teal-950/30 hidden xs:inline">
                24/7 EQUITY
              </span>
            </div>

            <p className="text-[11px] sm:text-xs text-shogun-muted font-sans mt-0.5">
              {isDefaultNvda ? 'NVIDIA Tokenized Equity • Deep Liquidity' : `${displaySymbol} • Verified Council Radar`}
            </p>
          </div>
        </div>

        {/* Price & Playbook button */}
        <div className="flex items-center gap-2.5 sm:gap-4 ml-auto">
          <div className="text-right">
            <span className="font-mono font-extrabold text-xl sm:text-3xl text-white block">
              ${currentPrice.toFixed(2)}
            </span>
            <span className="text-[11px] sm:text-xs font-mono font-bold text-shogun-accent block">
              +{changePct}% (24h)
            </span>
          </div>

          <button
            onClick={onOpenPlaybook}
            className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border border-shogun-accent/40 bg-shogun-accent/10 hover:bg-shogun-accent/20 text-shogun-accent text-[11px] sm:text-xs font-mono font-bold transition shadow-[0_0_12px_rgba(110,232,154,0.15)]"
          >
            <Code size={13} />
            <span className="hidden xs:inline">Playbook</span>
          </button>
        </div>
      </div>

      {/* Quick Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-black/40 border border-white/[0.06] rounded-2xl p-2.5 sm:p-3 text-xs font-mono">
        <div>
          <span className="text-[9px] sm:text-[10px] text-shogun-muted uppercase block">Bid / Ask</span>
          <span className="font-bold text-white text-[11px] sm:text-xs mt-0.5 block truncate">
            ${(currentPrice * 0.9995).toFixed(2)} / ${(currentPrice * 1.0005).toFixed(2)}
          </span>
        </div>

        <div className="border-l border-white/10 pl-2 sm:pl-3">
          <span className="text-[9px] sm:text-[10px] text-shogun-muted uppercase block">Spread</span>
          <span className="font-bold text-shogun-accent text-[11px] sm:text-xs mt-0.5 block">0.11% (Tight)</span>
        </div>

        <div className="border-t sm:border-t-0 sm:border-l sm:border-white/10 pt-1.5 sm:pt-0 sm:pl-3">
          <span className="text-[9px] sm:text-[10px] text-shogun-muted uppercase block">Synthetic NAV Parity</span>
          <span className="font-bold text-white text-[11px] sm:text-xs mt-0.5 block truncate">
            ${(currentPrice * 0.9996).toFixed(2)} (+0.04%)
          </span>
        </div>

        <div className="border-t sm:border-t-0 border-l border-white/10 pt-1.5 sm:pt-0 pl-2 sm:pl-3">
          <span className="text-[9px] sm:text-[10px] text-shogun-muted uppercase block">24h Volume</span>
          <span className="font-bold text-white text-[11px] sm:text-xs mt-0.5 block">$62.03M</span>
        </div>

        <div className="col-span-2 sm:col-span-1 border-t sm:border-t-0 sm:border-l sm:border-white/10 pt-1.5 sm:pt-0 sm:pl-3">
          <span className="text-[9px] sm:text-[10px] text-shogun-muted uppercase block">Liquidity</span>
          <span className="font-bold text-shogun-accent text-[11px] sm:text-xs mt-0.5 block">$1.8M</span>
        </div>
      </div>

      {/* Chart Timeframe Controls Bar */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-[11px] sm:text-xs font-mono text-shogun-muted font-bold tracking-wider uppercase">
          24h Price Chart
        </span>

        <div className="flex items-center gap-1 bg-black/50 border border-white/[0.08] p-1 rounded-xl text-xs font-mono">
          {(['15m', '1h', '4h', '1D'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2 sm:px-2.5 py-0.5 rounded-lg text-[10px] sm:text-xs transition-all ${
                timeframe === tf
                  ? 'bg-shogun-accent/20 text-shogun-accent font-bold border border-shogun-accent/40 shadow-[0_0_8px_rgba(110,232,154,0.2)]'
                  : 'text-shogun-muted hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Candlestick SVG Chart with Volume and Target Overlays */}
      <div className="relative w-full h-[220px] sm:h-[250px] bg-black/30 rounded-2xl border border-white/[0.05] p-2 sm:p-3 flex flex-col justify-between overflow-hidden">
        {/* Crisp HTML Target Badges that never stretch on mobile */}
        {tpY >= 0 && tpY <= chartH && (
          <div
            className="absolute right-2 px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-bold border border-shogun-accent/60 bg-[#07190f]/90 text-shogun-accent shadow-sm pointer-events-none -translate-y-1/2 z-10"
            style={{ top: `${(tpY / chartH) * 80 + 10}%` }}
          >
            TP ${tpPrice.toFixed(2)}
          </div>
        )}
        {entryY >= 0 && entryY <= chartH && (
          <div
            className="absolute right-2 px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-bold border border-sky-400/60 bg-[#081726]/90 text-sky-400 shadow-sm pointer-events-none -translate-y-1/2 z-10"
            style={{ top: `${(entryY / chartH) * 80 + 10}%` }}
          >
            Entry ${entryPrice.toFixed(2)}
          </div>
        )}
        {slY >= 0 && slY <= chartH && (
          <div
            className="absolute right-2 px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-bold border border-shogun-crimson/60 bg-[#200a0a]/90 text-shogun-crimson shadow-sm pointer-events-none -translate-y-1/2 z-10"
            style={{ top: `${(slY / chartH) * 80 + 10}%` }}
          >
            SL ${slPrice.toFixed(2)}
          </div>
        )}

        <svg
          viewBox={`0 0 ${chartW} ${chartH}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Horizontal Grid lines */}
          <line x1="0" y1={chartH * 0.2} x2={chartW} y2={chartH * 0.2} stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
          <line x1="0" y1={chartH * 0.5} x2={chartW} y2={chartH * 0.5} stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
          <line x1="0" y1={chartH * 0.8} x2={chartW} y2={chartH * 0.8} stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />

          {/* Volume bars (bottom 25% height) */}
          {candles.map((c, i) => {
            const x = i * spacing + spacing / 2;
            const isBull = c.close >= c.open;
            const barH = (c.volume / maxVol) * 45;
            const y = chartH - barH;

            return (
              <rect
                key={`vol-${i}`}
                x={x - candleW / 2}
                y={y}
                width={candleW}
                height={barH}
                fill={isBull ? '#6EE89A' : '#FF4D4D'}
                opacity="0.22"
                rx="2"
              />
            );
          })}

          {/* Candlestick Wicks and Bodies */}
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
                  stroke={isBull ? '#6EE89A' : '#FF4D4D'}
                  strokeWidth="1.5"
                />

                {/* Candle Body */}
                <rect
                  x={x - candleW / 2}
                  y={bodyTop}
                  width={candleW}
                  height={bodyH}
                  fill={isBull ? '#6EE89A' : '#FF4D4D'}
                  rx="1.5"
                />
              </g>
            );
          })}

          {/* Take Profit Target Line (Neon Emerald Dashed Line) */}
          {tpY >= 0 && tpY <= chartH && (
            <line
              x1="0"
              y1={tpY}
              x2={chartW}
              y2={tpY}
              stroke="#6EE89A"
              strokeWidth="1.8"
              strokeDasharray="4 4"
            />
          )}

          {/* Council Entry Target Line (Cyan / Light Blue Solid Line) */}
          {entryY >= 0 && entryY <= chartH && (
            <line
              x1="0"
              y1={entryY}
              x2={chartW}
              y2={entryY}
              stroke="#38BDF8"
              strokeWidth="1.8"
            />
          )}

          {/* Stop Loss Target Line (Crimson Dashed Line) */}
          {slY >= 0 && slY <= chartH && (
            <line
              x1="0"
              y1={slY}
              x2={chartW}
              y2={slY}
              stroke="#FF4D4D"
              strokeWidth="1.8"
              strokeDasharray="4 4"
            />
          )}
        </svg>

        {/* Bottom Time Axis Ticks */}
        <div className="flex items-center justify-between text-[10px] font-mono text-shogun-muted pt-2 border-t border-white/[0.05]">
          <span>12:00</span>
          <span>16:00</span>
          <span>20:00</span>
          <span>00:00</span>
          <span>04:00</span>
          <span>08:00</span>
        </div>
      </div>
    </div>
  );
};
