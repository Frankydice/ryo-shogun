import React from 'react';
import { BookOpen, Sparkles, ShieldCheck, Scale, CheckCircle2 } from 'lucide-react';
import { KaizenPostMortem } from '../types/index.js';

interface KaizenLedgerProps {
  postMortems: KaizenPostMortem[];
}

export const KaizenLedger: React.FC<KaizenLedgerProps> = ({ postMortems }) => {
  const winCount = postMortems.filter((km) => km.outcome === 'WIN').length;
  const winRate = postMortems.length > 0 ? Math.round((winCount / postMortems.length) * 100) : 100;

  return (
    <section className="glass-panel rounded-3xl p-6 flex flex-col gap-5 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full bg-purple-900/15 blur-[90px]" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-purple-500/15 text-purple-300 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <BookOpen size={18} />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-display font-bold text-white">
                Kaizen Forensic Ledger · 改善記録
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-300 font-bold uppercase">
                Self-Audit
              </span>
            </div>
            <p className="text-xs text-shogun-muted font-mono mt-0.5">
              Automated post-mortem audits: Thesis Verification vs. Market Luck
            </p>
          </div>
        </div>

        <span className="text-xs font-mono px-3.5 py-1.5 rounded-xl border border-purple-500/30 bg-purple-950/40 text-purple-300 flex items-center gap-1.5">
          <Scale size={13} />
          <span>Continuous Self-Correction Loop</span>
        </span>
      </div>

      {/* Aggregate Forensic Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black/40 border border-white/[0.06] rounded-2xl p-3.5 text-xs font-mono">
        <div>
          <span className="text-[10px] text-shogun-muted uppercase block">Total Audits</span>
          <span className="font-bold text-sm text-white mt-0.5 block">
            {postMortems.length} Cases Documented
          </span>
        </div>

        <div className="sm:border-l sm:border-white/10 sm:pl-3">
          <span className="text-[10px] text-shogun-muted uppercase block">Thesis Validation</span>
          <span className="font-bold text-sm text-shogun-accent mt-0.5 flex items-center gap-1">
            <CheckCircle2 size={13} />
            {winRate}% Confirmed
          </span>
        </div>

        <div className="border-t sm:border-t-0 sm:border-l sm:border-white/10 pt-2 sm:pt-0 sm:pl-3">
          <span className="text-[10px] text-shogun-muted uppercase block">Dojo Rules Active</span>
          <span className="font-bold text-sm text-purple-300 mt-0.5 block">
            {postMortems.length} Adaptive Policies
          </span>
        </div>

        <div className="border-t sm:border-t-0 sm:border-l sm:border-white/10 pt-2 sm:pt-0 sm:pl-3">
          <span className="text-[10px] text-shogun-muted uppercase block">Accountability Model</span>
          <span className="font-bold text-sm text-shogun-gold mt-0.5 block truncate">
            Thesis vs Luck Disambiguation
          </span>
        </div>
      </div>

      {/* Post Mortem Cards (2-Column Grid in Full-Width) */}
      {postMortems.length === 0 ? (
        <div className="border border-dashed border-white/10 rounded-2xl p-8 text-center text-xs font-mono text-shogun-muted bg-black/20">
          No post-mortems conducted yet. Close an active trade in the Dojo Treasury to trigger the automated Kaizen forensic review.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {postMortems.map((km) => {
            const isWin = km.outcome === 'WIN';

            return (
              <div
                key={km.id}
                className="glass-card rounded-2xl p-5 flex flex-col justify-between gap-3.5 transition-all duration-300 hover:border-purple-500/40 hover:-translate-y-0.5 relative overflow-hidden"
              >
                <div>
                  {/* Header row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.05] pb-2.5">
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

                  {/* Analysis Body */}
                  <p className="text-xs sm:text-sm text-shogun-ink/90 leading-relaxed font-sans mt-3">
                    {km.analysis}
                  </p>
                </div>

                {/* Dojo Rule Adjustment Box */}
                <div className="flex items-start gap-2.5 bg-black/50 border border-purple-500/25 rounded-xl p-3">
                  <Sparkles size={16} className="text-purple-400 shrink-0 mt-0.5" />
                  <div className="text-xs font-mono">
                    <span className="text-purple-300 font-bold block mb-0.5">Dojo Rule Adjustment:</span>
                    <span className="text-white/90 leading-relaxed">{km.dojo_rule_adjustment}</span>
                  </div>
                </div>

                {/* Verification Stamp */}
                <div className="flex items-center justify-between text-[10px] font-mono text-shogun-muted pt-1 border-t border-white/[0.05]">
                  <span className="flex items-center gap-1 text-purple-300">
                    <ShieldCheck size={11} />
                    <span>Post-Mortem Seal Verified</span>
                  </span>
                  <span>Audit ID: #{km.id.slice(0, 15)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
