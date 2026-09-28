import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { KaizenPostMortem } from '../types/index.js';

interface KaizenLedgerProps {
  postMortems: KaizenPostMortem[];
}

export const KaizenLedger: React.FC<KaizenLedgerProps> = ({ postMortems }) => {
  return (
    <section className="rounded-2xl border border-shogun-border bg-shogun-surface/80 p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">
            <BookOpen size={16} />
          </span>
          <div>
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
              Kaizen Forensic Ledger · 改善記録
            </h2>
            <p className="text-xs text-shogun-muted">Automated post-mortem audits: Thesis vs Luck</p>
          </div>
        </div>

        <span className="text-xs font-mono px-2 py-0.5 rounded border border-purple-500/30 bg-purple-500/10 text-purple-300">
          Self-Accountability Loop
        </span>
      </div>

      {/* Post Mortem Cards */}
      {postMortems.length === 0 ? (
        <div className="border border-dashed border-white/10 rounded-xl p-6 text-center text-xs font-mono text-shogun-muted">
          No post-mortems conducted yet. Close an active trade to trigger automated forensic review.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {postMortems.map((km) => {
            const isWin = km.outcome === 'WIN';

            return (
              <div
                key={km.id}
                className="rounded-xl border border-white/[0.06] bg-shogun-card p-4 flex flex-col gap-3 transition hover:border-white/15"
              >
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-bold text-sm text-white">{km.symbol}</span>
                    <span
                      className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                        isWin ? 'bg-shogun-accent/20 text-shogun-accent' : 'bg-shogun-crimson/20 text-shogun-crimson'
                      }`}
                    >
                      {km.outcome} (${km.realized_pnl_usd >= 0 ? `+${km.realized_pnl_usd.toFixed(2)}` : km.realized_pnl_usd.toFixed(2)})
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
                <p className="text-xs text-shogun-ink/90 leading-relaxed font-sans">
                  {km.analysis}
                </p>

                {/* Dojo Rule Adjustment */}
                <div className="flex items-start gap-2 bg-black/40 border border-purple-500/20 rounded-lg p-2.5">
                  <Sparkles size={14} className="text-purple-400 shrink-0 mt-0.5" />
                  <div className="text-xs font-mono">
                    <span className="text-purple-300 font-bold block">Dojo Rule Adjustment:</span>
                    <span className="text-white/80">{km.dojo_rule_adjustment}</span>
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
