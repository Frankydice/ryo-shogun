import React from 'react';
import { BookOpen, Scale, CheckCircle2 } from 'lucide-react';
import { KaizenPostMortem } from '../types/index.js';

interface KaizenLedgerProps {
  postMortems: KaizenPostMortem[];
}

export const KaizenLedger: React.FC<KaizenLedgerProps> = ({ postMortems }) => {
  const winCount = postMortems.filter((km) => km.outcome === 'WIN').length;
  const winRate = postMortems.length > 0 ? Math.round((winCount / postMortems.length) * 100) : 100;

  return (
    <section className="bg-white rounded-3xl p-5 sm:p-7 border border-zinc-200 shadow-sm flex flex-col gap-5 relative overflow-hidden" id="kaizen-section">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-zinc-100 text-black flex items-center justify-center shrink-0">
            <BookOpen size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-extrabold text-black tracking-tight font-display">
                Kaizen Forensic Ledger · 改善記録
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-zinc-300 bg-zinc-100 text-zinc-900 font-bold uppercase">
                Self-Audit
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Automated post-mortem audits: Thesis Verification vs. Market Luck
            </p>
          </div>
        </div>

        <span className="text-xs font-mono px-3 py-1 rounded-full border border-zinc-300 bg-zinc-100 text-zinc-900 flex items-center gap-1.5 font-semibold">
          <Scale size={13} />
          <span>Continuous Self-Correction Loop</span>
        </span>
      </div>

      {/* Aggregate Forensic Metrics Strip (4 cols) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-zinc-50 border border-zinc-200 rounded-2xl p-4 text-xs font-mono">
        <div>
          <span className="text-[10px] text-slate-400 uppercase block">Total Audits</span>
          <span className="font-extrabold text-sm text-black mt-0.5 block">
            {postMortems.length} Cases Documented
          </span>
        </div>

        <div className="border-l border-zinc-200 pl-3">
          <span className="text-[10px] text-slate-400 uppercase block">Thesis Validation</span>
          <span className="font-extrabold text-sm text-emerald-600 mt-0.5 flex items-center gap-1">
            <CheckCircle2 size={14} className="shrink-0" />
            <span>{winRate}% Confirmed</span>
          </span>
        </div>

        <div className="border-t sm:border-t-0 sm:border-l sm:border-zinc-200 pt-2 sm:pt-0 sm:pl-3">
          <span className="text-[10px] text-slate-400 uppercase block">Adaptive Policies</span>
          <span className="font-extrabold text-sm text-black mt-0.5 block">
            {postMortems.length} Enforced Rules
          </span>
        </div>

        <div className="border-t sm:border-t-0 border-l border-zinc-200 pt-2 sm:pt-0 pl-3">
          <span className="text-[10px] text-slate-400 uppercase block">Accountability</span>
          <span className="font-extrabold text-sm text-amber-700 mt-0.5 block truncate">
            Thesis vs Luck Model
          </span>
        </div>
      </div>

      {/* Post Mortem Cards */}
      {postMortems.length === 0 ? (
        <div className="border border-dashed border-slate-200 rounded-2xl p-8 text-center text-xs font-mono text-slate-400 bg-slate-50">
          No post-mortems conducted yet. Close an active trade in the Dojo Treasury to trigger the automated Kaizen forensic review.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {postMortems.map((km) => {
            const isWin = km.outcome === 'WIN';

            return (
              <div
                key={km.id}
                className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-sm flex flex-col justify-between gap-3.5 hover:border-black hover:shadow-md transition-all"
              >
                <div>
                  {/* Header row */}
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-base text-black">{km.symbol}</span>
                      <span
                        className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full border ${
                          isWin
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                            : 'bg-rose-100 text-rose-800 border-rose-200'
                        }`}
                      >
                        {km.outcome} (+${(km.realized_pnl_usd || 0).toFixed(2)})
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-slate-400">
                      Trade ID: {km.trade_id.slice(-7)}
                    </span>
                  </div>

                  {/* Verification verdict */}
                  <div className="my-3 flex items-center gap-2 text-xs font-mono">
                    <span className="text-slate-400">Audit Verdict:</span>
                    <span className="font-bold text-black">
                      {km.thesis_evaluation === 'THESIS_CONFIRMED' ? 'Thesis Verified' : km.thesis_evaluation}
                    </span>
                  </div>

                  {/* Lesson Learned */}
                  <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-200 text-xs text-slate-700 leading-relaxed font-sans">
                    <span className="font-mono font-bold text-black block mb-1">
                      KAIZEN LESSON:
                    </span>
                    "{km.analysis}"
                  </div>
                </div>

                {/* Footer Hash & Sanctions */}
                <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="truncate">Hash: {km.id}</span>
                  <span className="text-black font-bold">{km.dojo_rule_adjustment}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
