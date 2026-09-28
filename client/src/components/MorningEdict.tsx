import React from 'react';
import { ScrollText, ShieldAlert, Award, Share2 } from 'lucide-react';
import { ShogunEdict } from '../types/index.js';

interface MorningEdictProps {
  edict: ShogunEdict | null;
  onOpenThesisModal: () => void;
}

export const MorningEdict: React.FC<MorningEdictProps> = ({ edict, onOpenThesisModal }) => {
  if (!edict) {
    return (
      <div className="bg-shogun-surface border border-shogun-border rounded-2xl p-6 animate-pulse">
        <div className="h-4 bg-white/10 rounded w-1/4 mb-3"></div>
        <div className="h-6 bg-white/10 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-white/10 rounded w-1/2"></div>
      </div>
    );
  }

  const isTrade = edict.verdict === 'EXECUTE_TRADE';

  return (
    <section className="relative overflow-hidden rounded-2xl border border-shogun-border bg-gradient-to-r from-shogun-surface via-shogun-card to-shogun-surface p-5 sm:p-6 shadow-2xl">
      {/* Decorative Kanji watermark */}
      <div className="absolute right-4 top-2 pointer-events-none select-none text-white/[0.03] text-8xl font-black font-jp">
        将軍
      </div>

      <div className="relative z-10 flex flex-col gap-4">
        {/* Top Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-shogun-gold/10 text-shogun-gold border border-shogun-gold/30">
              <ScrollText size={16} />
            </span>
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-shogun-gold">
              30-Second Executive Edict · 朝の布告
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenThesisModal}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-shogun-accent/40 bg-shogun-accent/10 hover:bg-shogun-accent/20 text-shogun-accent text-xs font-mono font-medium transition"
            >
              <Share2 size={13} />
              <span>Share to X</span>
            </button>
          </div>
        </div>

        {/* The 30-Second Synopsis */}
        <div className="flex flex-col gap-2">
          <p className="text-base sm:text-lg font-medium text-white leading-relaxed">
            {edict.thirty_second_brief}
          </p>
        </div>

        {/* Structured Numbers Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {/* Target & Verdict */}
          <div className="bg-black/30 border border-white/5 rounded-xl p-3">
            <span className="text-[11px] font-mono text-shogun-muted uppercase block">Command Seal</span>
            <span className="font-semibold text-sm text-shogun-ink truncate block mt-0.5">
              {edict.active_commander}
            </span>
            <div className="mt-1">
              <span className={`inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                isTrade ? 'bg-shogun-accent/20 text-shogun-accent' : 'bg-shogun-gold/20 text-shogun-gold'
              }`}>
                {edict.verdict}
              </span>
            </div>
          </div>

          {/* Entry & Token */}
          <div className="bg-black/30 border border-white/5 rounded-xl p-3">
            <span className="text-[11px] font-mono text-shogun-muted uppercase block">Candidate Target</span>
            <span className="font-bold text-base text-white block mt-0.5">
              {edict.target_symbol || 'HOLD'}
            </span>
            <span className="text-xs font-mono text-shogun-muted block">
              {edict.entry_price ? `$${edict.entry_price}` : 'No Entry'}
            </span>
          </div>

          {/* Risk / Reward & Confidence */}
          <div className="bg-black/30 border border-white/5 rounded-xl p-3">
            <span className="text-[11px] font-mono text-shogun-muted uppercase block">Risk : Reward</span>
            <span className="font-bold text-base text-shogun-accent block mt-0.5">
              {edict.risk_reward_ratio ? `1 : ${edict.risk_reward_ratio}` : 'N/A'}
            </span>
            <span className="text-xs font-mono text-shogun-muted block">
              SL: {edict.stop_loss ? `$${edict.stop_loss}` : '—'} | TP: {edict.take_profit ? `$${edict.take_profit}` : '—'}
            </span>
          </div>

          {/* Daimyo Veto Check */}
          <div className="bg-black/30 border border-white/5 rounded-xl p-3">
            <span className="text-[11px] font-mono text-shogun-muted uppercase block">Daimyo Safety Seal</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              {edict.daimyo_veto_exercised ? (
                <>
                  <ShieldAlert size={16} className="text-shogun-crimson" />
                  <span className="font-bold text-sm text-shogun-crimson">VETOED</span>
                </>
              ) : (
                <>
                  <Award size={16} className="text-shogun-accent" />
                  <span className="font-bold text-sm text-shogun-accent">PASSED ({(edict.confidence_score * 100).toFixed(0)}%)</span>
                </>
              )}
            </div>
            <span className="text-xs font-mono text-shogun-muted block mt-0.5 truncate">
              {edict.daimyo_veto_exercised ? 'Security Red Flags' : 'Zero Rug Flags'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
