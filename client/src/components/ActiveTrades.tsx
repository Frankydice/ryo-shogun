import React from 'react';
import { Wallet, TrendingUp, TrendingDown, XCircle, CheckCircle, Flame } from 'lucide-react';
import { PortfolioSummary } from '../types/index.js';

interface ActiveTradesProps {
  portfolio: PortfolioSummary | null;
  onCloseTrade: (tradeId: string) => void;
  isClosing: boolean;
}

export const ActiveTrades: React.FC<ActiveTradesProps> = ({
  portfolio,
  onCloseTrade,
  isClosing
}) => {
  const trades = portfolio?.trades || [];
  const openTrades = trades.filter((t) => t.status === 'OPEN');
  const closedTrades = trades.filter((t) => t.status !== 'OPEN');

  const totalPnl = (portfolio?.realizedPnlUsd || 0) + (portfolio?.unrealizedPnlUsd || 0);

  return (
    <section className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col gap-4 sm:gap-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 sm:pb-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="p-1.5 sm:p-2 rounded-xl bg-shogun-gold/15 border border-shogun-gold/30 text-shogun-gold">
            <Wallet size={18} />
          </span>
          <div>
            <h2 className="text-sm sm:text-base font-display font-bold text-white">
              Dojo Treasury & Paper Ledger · 模擬取引
            </h2>
            <p className="text-[11px] sm:text-xs text-shogun-muted font-mono">Zero real funds at risk · Mathematical risk discipline</p>
          </div>
        </div>

        <span className="text-[10px] sm:text-xs font-mono px-2.5 sm:px-3 py-1 rounded-full border border-shogun-accent/30 bg-shogun-accent/10 text-shogun-accent font-bold shrink-0">
          Simulated Treasury
        </span>
      </div>

      {/* Aggregate Financial Metrics */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <div className="glass-card rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 flex flex-col">
          <span className="text-[9px] sm:text-[10px] font-mono text-shogun-muted uppercase">Total Equity</span>
          <span className="font-extrabold text-xs sm:text-lg text-white font-mono mt-0.5 sm:mt-1 truncate">
            ${portfolio?.equityUsd?.toLocaleString() || '10,000.00'}
          </span>
        </div>

        <div className="glass-card rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 flex flex-col">
          <span className="text-[9px] sm:text-[10px] font-mono text-shogun-muted uppercase truncate">Realized PnL</span>
          <span
            className={`font-extrabold text-xs sm:text-lg font-mono mt-0.5 sm:mt-1 flex items-center gap-0.5 sm:gap-1 truncate ${
              totalPnl >= 0 ? 'text-shogun-accent' : 'text-shogun-crimson'
            }`}
          >
            {totalPnl >= 0 ? <TrendingUp size={12} className="shrink-0 sm:w-3.5 sm:h-3.5" /> : <TrendingDown size={12} className="shrink-0 sm:w-3.5 sm:h-3.5" />}
            <span>{totalPnl >= 0 ? `+$${totalPnl.toFixed(2)}` : `-$${Math.abs(totalPnl).toFixed(2)}`}</span>
          </span>
        </div>

        <div className="glass-card rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 flex flex-col">
          <span className="text-[9px] sm:text-[10px] font-mono text-shogun-muted uppercase">Win Rate</span>
          <span className="font-extrabold text-xs sm:text-lg text-shogun-gold font-mono mt-0.5 sm:mt-1">
            {portfolio?.winRatePct || 100}%
          </span>
        </div>
      </div>

      {/* Open Positions List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Flame size={14} className="text-shogun-accent" />
            <span>Active Deployments ({openTrades.length})</span>
          </h3>
          <span className="text-[10px] font-mono text-shogun-muted">15% Max Position Cap</span>
        </div>

        {openTrades.length === 0 ? (
          <div className="border border-dashed border-white/10 rounded-2xl p-8 text-center text-xs font-mono text-shogun-muted bg-black/20">
            No active positions open. The Shogun Council is stalking the market.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {openTrades.map((t) => {
              const isProfit = t.pnl_usd >= 0;

              // Compute where current price sits between SL and TP
              const totalDistance = t.take_profit - t.stop_loss;
              const currentDistance = Math.max(0, Math.min(totalDistance, t.current_price - t.stop_loss));
              const progressPct = totalDistance > 0 ? (currentDistance / totalDistance) * 100 : 50;

              return (
                <div
                  key={t.id}
                  className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0c1611] to-[#080e0b] p-4 flex flex-col gap-3 shadow-lg"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-shogun-accent/15 border border-shogun-accent/30 flex items-center justify-center font-bold text-base text-shogun-accent font-mono shadow-inner">
                        {t.symbol}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-base text-white font-mono">{t.symbol}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-shogun-gold font-medium">
                            {t.commander}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-shogun-muted">
                          Entry: ${t.entry_price} → Current: <span className="text-white font-bold">${t.current_price}</span>
                        </p>
                      </div>
                    </div>

                    {/* PnL & Action */}
                    <div className="flex items-center gap-3">
                      <div className="text-right font-mono">
                        <span className={`text-base font-extrabold block ${isProfit ? 'text-shogun-accent' : 'text-shogun-crimson'}`}>
                          {isProfit ? `+$${t.pnl_usd.toFixed(2)}` : `-$${Math.abs(t.pnl_usd).toFixed(2)}`}
                        </span>
                        <span className={`text-[11px] font-bold block ${isProfit ? 'text-shogun-accent/80' : 'text-shogun-crimson/80'}`}>
                          {isProfit ? `+${t.pnl_pct.toFixed(2)}%` : `${t.pnl_pct.toFixed(2)}%`}
                        </span>
                      </div>

                      <button
                        onClick={() => onCloseTrade(t.id)}
                        disabled={isClosing}
                        className="px-3 py-2 rounded-xl border border-shogun-crimson/40 bg-shogun-crimson/10 hover:bg-shogun-crimson/25 text-shogun-crimson text-xs font-mono font-bold transition flex items-center gap-1.5 disabled:opacity-50 hover:scale-102 shadow-sm"
                        title="Close trade and trigger Kaizen Post-Mortem Audit"
                      >
                        <XCircle size={14} />
                        <span>Close & Audit</span>
                      </button>
                    </div>
                  </div>

                  {/* Visual Distance Slider between SL and TP */}
                  <div className="bg-black/50 border border-white/5 rounded-xl p-3 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-shogun-crimson font-medium">SL: ${t.stop_loss}</span>
                      <span className="text-shogun-muted text-[10px]">Position Target Corridor</span>
                      <span className="text-shogun-accent font-medium">TP: ${t.take_profit}</span>
                    </div>

                    <div className="relative w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-shogun-crimson via-shogun-gold to-shogun-accent rounded-full transition-all duration-300"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Closed Positions Summary */}
      {closedTrades.length > 0 && (
        <div className="pt-3 border-t border-white/[0.08]">
          <span className="text-xs font-mono text-shogun-muted block mb-2.5">
            Recently Audited Trades ({closedTrades.length})
          </span>
          <div className="flex flex-wrap gap-2">
            {closedTrades.slice(0, 4).map((ct) => (
              <span
                key={ct.id}
                className="text-xs font-mono px-3 py-1.5 rounded-xl border border-white/10 bg-black/40 flex items-center gap-2"
              >
                <CheckCircle size={13} className={ct.pnl_usd >= 0 ? 'text-shogun-accent' : 'text-shogun-crimson'} />
                <span className="font-bold text-white">{ct.symbol}</span>
                <span className={`font-semibold ${ct.pnl_usd >= 0 ? 'text-shogun-accent' : 'text-shogun-crimson'}`}>
                  {ct.pnl_usd >= 0 ? `+$${ct.pnl_usd.toFixed(2)}` : `-$${Math.abs(ct.pnl_usd).toFixed(2)}`}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
