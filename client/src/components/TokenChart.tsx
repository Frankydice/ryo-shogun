import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { ShogunEdict } from '../types/index.js';

interface TokenChartProps {
  edict: ShogunEdict | null;
}

export const TokenChart: React.FC<TokenChartProps> = ({ edict }) => {
  const [timeframe, setTimeframe] = useState<'15M' | '1H' | '4H' | '1D'>('1H');
  const symbol = edict?.target_symbol || 'INJ';
  const entry = edict?.entry_price || 24.85;
  const sl = edict?.stop_loss || Number((entry * 0.94).toFixed(2));
  const tp = edict?.take_profit || Number((entry * 1.15).toFixed(2));

  // Generate simulated candle data points based on entry and levels
  const basePrice = entry * 0.96;
  const points = [
    { x: 0, y: basePrice },
    { x: 50, y: basePrice * 1.01 },
    { x: 100, y: basePrice * 0.99 },
    { x: 150, y: basePrice * 1.025 },
    { x: 200, y: basePrice * 1.015 },
    { x: 250, y: basePrice * 1.035 },
    { x: 300, y: basePrice * 1.02 },
    { x: 350, y: basePrice * 1.045 },
    { x: 400, y: entry }
  ];

  const minPrice = Math.min(sl * 0.98, ...points.map((p) => p.y));
  const maxPrice = Math.max(tp * 1.03, ...points.map((p) => p.y));
  const priceRange = maxPrice - minPrice;

  const chartHeight = 220;
  const chartWidth = 450;

  const getY = (val: number) => {
    return chartHeight - ((val - minPrice) / priceRange) * chartHeight;
  };

  const pathData = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${(p.x / 400) * chartWidth},${getY(p.y)}`)
    .join(' ');

  const areaData = `${pathData} L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`;

  const entryY = getY(entry);
  const slY = getY(sl);
  const tpY = getY(tp);

  return (
    <div className="glass-panel rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden">
      {/* Chart Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-shogun-accent/10 border border-shogun-accent/30 flex items-center justify-center font-bold text-shogun-accent font-mono text-sm">
            {symbol.slice(0, 3)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-white font-mono">{symbol}/USD</span>
              <span className="text-xs font-mono font-medium text-shogun-accent flex items-center gap-0.5">
                <TrendingUp size={12} />
                +4.2%
              </span>
            </div>
            <p className="text-xs font-mono text-shogun-muted">
              Live Council Execution Radar · RYO Market Intelligence
            </p>
          </div>
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center gap-1 bg-black/40 border border-white/5 p-1 rounded-lg text-xs font-mono">
          {(['15M', '1H', '4H', '1D'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2 py-0.5 rounded transition ${
                timeframe === tf
                  ? 'bg-shogun-accent/20 text-shogun-accent font-bold'
                  : 'text-shogun-muted hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Interactive Chart */}
      <div className="relative w-full h-[230px] flex items-center justify-center">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6EE89A" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#6EE89A" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1={chartHeight * 0.25} x2={chartWidth} y2={chartHeight * 0.25} stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
          <line x1="0" y1={chartHeight * 0.5} x2={chartWidth} y2={chartHeight * 0.5} stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
          <line x1="0" y1={chartHeight * 0.75} x2={chartWidth} y2={chartHeight * 0.75} stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />

          {/* Area Fill */}
          <path d={areaData} fill="url(#chartGradient)" />

          {/* Price Line */}
          <path d={pathData} fill="none" stroke="#6EE89A" strokeWidth="2.5" />

          {/* Take Profit Target Line (Neon Emerald) */}
          {tpY >= 0 && tpY <= chartHeight && (
            <g>
              <line x1="0" y1={tpY} x2={chartWidth} y2={tpY} stroke="#6EE89A" strokeWidth="1.5" strokeDasharray="4 4" />
              <text x={chartWidth - 5} y={tpY - 5} fill="#6EE89A" fontSize="10" fontFamily="monospace" textAnchor="end">
                TP: ${tp} (+{(((tp - entry) / entry) * 100).toFixed(1)}%)
              </text>
            </g>
          )}

          {/* Entry Price Line (Gold) */}
          {entryY >= 0 && entryY <= chartHeight && (
            <g>
              <line x1="0" y1={entryY} x2={chartWidth} y2={entryY} stroke="#E5C07B" strokeWidth="1.5" strokeDasharray="2 2" />
              <text x={chartWidth - 5} y={entryY - 5} fill="#E5C07B" fontSize="10" fontFamily="monospace" textAnchor="end">
                ENTRY: ${entry}
              </text>
            </g>
          )}

          {/* Stop Loss Target Line (Crimson) */}
          {slY >= 0 && slY <= chartHeight && (
            <g>
              <line x1="0" y1={slY} x2={chartWidth} y2={slY} stroke="#FF4D4D" strokeWidth="1.5" strokeDasharray="4 4" />
              <text x={chartWidth - 5} y={slY + 12} fill="#FF4D4D" fontSize="10" fontFamily="monospace" textAnchor="end">
                SL: ${sl} ({(((sl - entry) / entry) * 100).toFixed(1)}%)
              </text>
            </g>
          )}

          {/* Current Live Pulse Dot */}
          <circle cx={chartWidth} cy={entryY} r="5" fill="#6EE89A" className="animate-ping" />
          <circle cx={chartWidth} cy={entryY} r="4" fill="#6EE89A" />
        </svg>
      </div>

      {/* Level Summary Legend */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.06] text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-shogun-crimson"></span>
          <div>
            <span className="text-shogun-muted block text-[10px]">Stop Loss</span>
            <span className="text-shogun-crimson font-bold">${sl}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 border-x border-white/5 px-2">
          <span className="w-2.5 h-2.5 rounded-full bg-shogun-gold"></span>
          <div>
            <span className="text-shogun-muted block text-[10px]">Council Entry</span>
            <span className="text-shogun-gold font-bold">${entry}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-right justify-end">
          <span className="w-2.5 h-2.5 rounded-full bg-shogun-accent"></span>
          <div>
            <span className="text-shogun-muted block text-[10px]">Take Profit</span>
            <span className="text-shogun-accent font-bold">${tp}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
