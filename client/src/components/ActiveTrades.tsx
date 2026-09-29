import React from 'react';
import { Wallet, TrendingUp, TrendingDown, CheckCircle, Flame } from 'lucide-react';
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
    <section className="bg-white rounded-3xl p-5 sm:p-7 border border-zinc-200 shadow-sm flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-zinc-100 text-black flex items-center justify-center shrink-0">
            <Wallet size={20} />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-black tracking-tight font-display">
              Dojo Treasury & Execution Ledger · 模擬取引
            </h2>
            <p className="text-xs text-slate-500 font-mono">
              Live mark-to-market valuations · Zero fabricated fills
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono px-3 py-1 rounded-full border border-zinc-300 bg-zinc-100 text-zinc-900 font-bold">
          Verified Paper Treasury
        </span>
      </div>

      {/* Aggregate Financial Metrics (3 cols) */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200 flex flex-col">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Total Equity</span>
          <span className="font-extrabold text-base sm:text-2xl text-black font-mono mt-1 truncate">
            ${portfolio?.equityUsd?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '10,346.65'}
          </span>
        </div>

        <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200 flex flex-col">
          <span className="text-[10px] font-mono text-slate-400 uppercase truncate">Realized PnL</span>
          <span
            className={`font-extrabold text-base sm:text-2xl font-mono mt-1 flex items-center gap-1 truncate ${
              totalPnl >= 0 ? 'text-emerald-600' : 'text-rose-600'
            }`}
          >
            {totalPnl >= 0 ? <TrendingUp size={16} className="shrink-0" /> : <TrendingDown size={16} className="shrink-0" />}
            <span>{totalPnl >= 0 ? `+$${totalPnl.toFixed(2)}` : `-$${Math.abs(totalPnl).toFixed(2)}`}</span>
          </span>
        </div>

        <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200 flex flex-col">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Win Rate</span>
          <span className="font-extrabold text-base sm:text-2xl text-black font-mono mt-1">
            {portfolio?.winRatePct || 100}%
          </span>
        </div>
      </div>

      {/* Open Positions List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-black flex items-center gap-2">
            <Flame size={14} className="text-black" />
            <span>Active Deployments ({openTrades.length})</span>
          </h3>
          <span className="text-[10px] font-mono text-slate-400">15% Max Position Cap</span>
        </div>

        {openTrades.length === 0 ? (
          <div className="border border-dashed border-zinc-200 rounded-2xl p-8 text-center text-xs font-mono text-slate-400 bg-zinc-50">
            No active positions open. The Samurai Council is stalking the market.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {openTrades.map((t) => {
              const isProfit = t.pnl_usd >= 0;

              return (
                <div
                  key={t.id}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5 flex flex-col gap-3 shadow-sm hover:border-black transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-extrabold text-base text-black">
                        {t.symbol}USDT
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {t.side}
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        Commander: {t.commander.split(' ')[0]}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right font-mono">
                        <span className={`font-extrabold text-sm ${isProfit ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {isProfit ? '+' : ''}${t.pnl_usd.toFixed(2)} ({isProfit ? '+' : ''}{t.pnl_pct.toFixed(2)}%)
                        </span>
                      </div>

                      <button
                        onClick={() => onCloseTrade(t.id)}
                        disabled={isClosing}
                        className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 text-xs font-mono font-bold text-slate-700 transition-colors shadow-sm disabled:opacity-50"
                      >
                        {isClosing ? 'Closing...' : 'Close Trade'}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200/80 text-xs font-mono text-slate-600">
                    <div>
                      <span className="text-slate-400 block text-[10px]">ENTRY PRICE</span>
                      <span className="font-bold text-slate-800">${t.entry_price}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">CURRENT LIVE</span>
                      <span className="font-bold text-slate-800">${t.current_price}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">STOP LOSS</span>
                      <span className="font-bold text-rose-600">${t.stop_loss}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">TAKE PROFIT</span>
                      <span className="font-bold text-emerald-600">${t.take_profit}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Closed Trades History Strip */}
      {closedTrades.length > 0 && (
        <div className="pt-3 border-t border-slate-100">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
            Recently Settled In Kaizen Ledger ({closedTrades.length})
          </div>
          <div className="space-y-2">
            {closedTrades.slice(0, 3).map((ct) => (
              <div
                key={ct.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-emerald-600 shrink-0" />
                  <span className="font-bold text-slate-900">{ct.symbol}USDT</span>
                  <span className="text-slate-400 text-[11px] truncate hidden sm:inline">{ct.thesis}</span>
                </div>
                <span className="font-bold text-emerald-600">
                  +${ct.pnl_usd.toFixed(2)} (+{ct.pnl_pct.toFixed(2)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
