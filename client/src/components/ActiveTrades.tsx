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
    <section className="rounded-2xl border border-shogun-border bg-shogun-surface/80 p-5 flex flex-col gap-4">
      {/* Portfolio Header Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded bg-shogun-gold/10 text-shogun-gold border border-shogun-gold/30">
            <Wallet size={16} />
          </span>
          <div>
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
              Dojo Treasury & Paper Ledger · 模擬取引
            </h2>
            <p className="text-xs text-shogun-muted">Simulated practice trades with risk guardrails</p>
          </div>
        </div>

        {/* Aggregate Metrics */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          <div>
            <span className="text-shogun-muted block">Equity:</span>
            <span className="font-bold text-sm text-white">
              ${portfolio?.equityUsd?.toLocaleString() || '10,000.00'}
            </span>
          </div>

          <div>
            <span className="text-shogun-muted block">Net PnL:</span>
            <span
              className={`font-bold text-sm flex items-center gap-0.5 ${
                totalPnl >= 0 ? 'text-shogun-accent' : 'text-shogun-crimson'
              }`}
            >
              {totalPnl >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              {totalPnl >= 0 ? `+$${totalPnl.toFixed(2)}` : `-$${Math.abs(totalPnl).toFixed(2)}`}
            </span>
          </div>

          <div>
            <span className="text-shogun-muted block">Win Rate:</span>
            <span className="font-bold text-sm text-shogun-gold">
              {portfolio?.winRatePct || 100}%
            </span>
          </div>
        </div>
      </div>

      {/* Open Positions List */}
      <div>
        <h3 className="text-xs font-mono uppercase text-shogun-muted mb-2.5 flex items-center gap-1.5">
          <Flame size={12} className="text-shogun-accent" />
          <span>Active Open Deployments ({openTrades.length})</span>
        </h3>

        {openTrades.length === 0 ? (
          <div className="border border-dashed border-white/10 rounded-xl p-6 text-center text-xs font-mono text-shogun-muted">
            No active positions open. The Shogun Council is stalking the market.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2.5">
            {openTrades.map((t) => {
              const isProfit = t.pnl_usd >= 0;

              return (
                <div
                  key={t.id}
                  className="rounded-xl border border-white/10 bg-shogun-card p-3.5 flex flex-wrap items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center font-bold text-sm text-white font-mono">
                      {t.symbol}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{t.symbol}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-shogun-muted">
                          {t.commander}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-shogun-muted">
                        Entry: ${t.entry_price} → Current: ${t.current_price}
                      </p>
                    </div>
                  </div>

                  {/* Targets & Levels */}
                  <div className="hidden sm:flex items-center gap-4 text-xs font-mono">
                    <div>
                      <span className="text-shogun-muted block text-[10px]">Stop Loss</span>
                      <span className="text-shogun-crimson font-medium">${t.stop_loss}</span>
                    </div>
                    <div>
                      <span className="text-shogun-muted block text-[10px]">Take Profit</span>
                      <span className="text-shogun-accent font-medium">${t.take_profit}</span>
                    </div>
                  </div>

                  {/* PnL & Action */}
                  <div className="flex items-center gap-3">
                    <div className="text-right font-mono">
                      <span className={`text-sm font-bold block ${isProfit ? 'text-shogun-accent' : 'text-shogun-crimson'}`}>
                        {isProfit ? `+$${t.pnl_usd.toFixed(2)}` : `-$${Math.abs(t.pnl_usd).toFixed(2)}`}
                      </span>
                      <span className={`text-[10px] block ${isProfit ? 'text-shogun-accent/70' : 'text-shogun-crimson/70'}`}>
                        {isProfit ? `+${t.pnl_pct.toFixed(2)}%` : `${t.pnl_pct.toFixed(2)}%`}
                      </span>
                    </div>

                    <button
                      onClick={() => onCloseTrade(t.id)}
                      disabled={isClosing}
                      className="px-2.5 py-1.5 rounded-lg border border-shogun-crimson/40 bg-shogun-crimson/10 hover:bg-shogun-crimson/20 text-shogun-crimson text-xs font-mono transition flex items-center gap-1 disabled:opacity-50"
                      title="Close Trade and Trigger Kaizen Post-Mortem Audit"
                    >
                      <XCircle size={13} />
                      <span className="hidden md:inline">Close & Audit</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Closed Positions Summary */}
      {closedTrades.length > 0 && (
        <div className="mt-2 pt-3 border-t border-white/5">
          <span className="text-xs font-mono text-shogun-muted block mb-2">
            Recently Closed & Audited ({closedTrades.length})
          </span>
          <div className="flex flex-wrap gap-2">
            {closedTrades.slice(0, 4).map((ct) => (
              <span
                key={ct.id}
                className="text-xs font-mono px-2.5 py-1 rounded-lg border border-white/5 bg-black/30 flex items-center gap-1.5"
              >
                <CheckCircle size={11} className={ct.pnl_usd >= 0 ? 'text-shogun-accent' : 'text-shogun-crimson'} />
                <span className="font-bold text-white">{ct.symbol}</span>
                <span className={ct.pnl_usd >= 0 ? 'text-shogun-accent' : 'text-shogun-crimson'}>
                  {ct.pnl_usd >= 0 ? `+$${ct.pnl_usd.toFixed(1)}` : `-$${Math.abs(ct.pnl_usd).toFixed(1)}`}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
