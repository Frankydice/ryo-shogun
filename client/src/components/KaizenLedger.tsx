import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { KaizenPostMortem } from '../types/index.js';

interface KaizenLedgerProps {
  postMortems: KaizenPostMortem[];
}

export const KaizenLedger: React.FC<KaizenLedgerProps> = ({ postMortems }) => {
  return (
    <section className="glass-panel rounded-3xl p-6 flex flex-col gap-5 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-purple-500/15 text-purple-300 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <BookOpen size={18} />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-mono font-extrabold uppercase tracking-widest text-white">
                Kaizen Forensic Ledger · 改善記録
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-300">
                Self-Audit
              </span>
            </div>
            <p className="text-xs text-shogun-muted mt-0.5">
              Automated post-mortem audits: Thesis Verification vs. Market Luck
            </p>
          </div>
        </div>

        <span className="text-xs font-mono px-3 py-1 rounded-xl border border-white/10 bg-black/40 text-purple-300">
          Continuous Self-Correction Loop
        </span>
      </div>

      {/* Post Mortem Cards */}
      {postMortems.length === 0 ? (
        <div className="border border-dashed border-white/10 rounded-2xl p-8 text-center text-xs font-mono text-shogun-muted bg-black/20">
          No post-mortems conducted yet. Close an active trade in the Dojo Treasury to trigger the automated Kaizen forensic review.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3.5">
          {postMortems.map((km) => {
            const isWin = km.outcome === 'WIN';

            return (
              <div
                key={km.id}
                className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col gap-3.5 transition-all duration-300 hover:border-purple-500/30"
              >
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-extrabold text-base text-white">{km.symbol}</span>
                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg border ${
                        isWin
                          ? 'bg-shogun-accent/15 text-shogun-accent border-shogun-accent/30 shadow-[0_0_10px_rgba(110,232,154,0.15)]'
                          : 'bg-shogun-crimson/15 text-shogun-crimson border-shogun-crimson/30 shadow-[0_0_10px_rgba(255,77,77,0.15)]'
                      }`}
                    >
                      {km.outcome} ({km.realized_pnl_usd >= 0 ? `+$${km.realized_pnl_usd.toFixed(2)}` : `-$${Math.abs(km.realized_pnl_usd).toFixed(2)}`})
                    </span>
                    <span className="text-xs font-mono text-shogun-muted border-l border-white/10 pl-2">
                      {km.thesis_evaluation.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-shogun-muted">
                    {new Date(km.reviewed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {/* Analysis */}
                <p className="text-xs sm:text-sm text-shogun-ink/90 leading-relaxed font-sans">
                  {km.analysis}
                </p>

                {/* Dojo Rule Adjustment */}
                <div className="flex items-start gap-2.5 bg-black/50 border border-purple-500/25 rounded-xl p-3">
                  <Sparkles size={16} className="text-purple-400 shrink-0 mt-0.5" />
                  <div className="text-xs font-mono">
                    <span className="text-purple-300 font-bold block mb-0.5">Dojo Rule Adjustment:</span>
                    <span className="text-white/90 leading-relaxed">{km.dojo_rule_adjustment}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
