import React from 'react';
import { ScrollText, ShieldAlert, Award, Share2, Zap, Target, Lock } from 'lucide-react';
import { ShogunEdict } from '../types/index.js';

interface MorningEdictProps {
  edict: ShogunEdict | null;
  onOpenThesisModal: () => void;
}

export const MorningEdict: React.FC<MorningEdictProps> = ({ edict, onOpenThesisModal }) => {
  if (!edict) {
    return (
      <div className="glass-panel rounded-3xl p-8 animate-pulse">
        <div className="h-4 bg-white/10 rounded w-1/4 mb-3"></div>
        <div className="h-8 bg-white/10 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-white/10 rounded w-1/2"></div>
      </div>
    );
  }

  const isTrade = edict.verdict === 'EXECUTE_TRADE';

  return (
    <section className={`relative overflow-hidden rounded-3xl border transition-all duration-500 ${
      isTrade
        ? 'border-shogun-accent/50 bg-gradient-to-br from-[#07160f] via-[#091a13] to-[#040a07] shadow-[0_0_50px_-10px_rgba(110,232,154,0.25)]'
        : 'border-shogun-gold/40 bg-gradient-to-br from-[#161208] via-[#1a150a] to-[#0a0804] shadow-[0_0_50px_-10px_rgba(229,192,123,0.2)]'
    } p-6 sm:p-8`}>
      {/* Background Watermark & Lighting */}
      <div className="pointer-events-none absolute -right-6 -bottom-10 select-none text-white/[0.03] text-9xl font-black font-jp">
        将軍
      </div>
      <div className={`pointer-events-none absolute top-0 right-1/4 w-80 h-80 rounded-full blur-[100px] ${
        isTrade ? 'bg-shogun-accent/15' : 'bg-shogun-gold/15'
      }`} />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Top Header Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <span className={`p-2 rounded-xl border ${
              isTrade
                ? 'bg-shogun-accent/15 border-shogun-accent/30 text-shogun-accent'
                : 'bg-shogun-gold/15 border-shogun-gold/30 text-shogun-gold'
            }`}>
              <ScrollText size={20} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-shogun-gold">
                  The Shogun's Decree · 朝の布告
                </span>
                <span className="text-white/30">•</span>
                <span className="text-xs font-mono text-white/70">
                  {new Date(edict.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
              <h2 className="font-display font-bold text-lg text-white">
                30-Second Executive Market Verdict
              </h2>
            </div>
          </div>

          {/* Share to X Button */}
          <button
            onClick={onOpenThesisModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-shogun-accent hover:bg-emerald-400 text-shogun-bg font-mono font-bold text-xs transition shadow-[0_0_20px_rgba(110,232,154,0.3)] hover:scale-102"
          >
            <Share2 size={14} />
            <span>Export Proof of Thesis</span>
          </button>
        </div>

        {/* 30-Second Executive Summary */}
        <div className="bg-black/40 border border-white/[0.08] rounded-2xl p-5 backdrop-blur-md">
          <p className="text-base sm:text-xl font-medium text-white leading-relaxed font-sans">
            "{edict.thirty_second_brief}"
          </p>
        </div>

        {/* High-Impact Stat Matrix */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Commander & Verdict */}
          <div className="glass-card rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-shogun-muted">
              <span>Command Seal</span>
              <Lock size={12} className="text-shogun-gold" />
            </div>
            <div className="mt-2">
              <span className="font-bold text-sm text-white block truncate">
                {edict.active_commander}
              </span>
              <span className={`inline-flex items-center gap-1 text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg border mt-1.5 ${
                isTrade
                  ? 'border-shogun-accent/50 bg-shogun-accent/20 text-shogun-accent shadow-[0_0_10px_rgba(110,232,154,0.2)]'
                  : 'border-shogun-gold/50 bg-shogun-gold/20 text-shogun-gold shadow-[0_0_10px_rgba(229,192,123,0.2)]'
              }`}>
                {edict.verdict}
              </span>
            </div>
          </div>

          {/* Candidate Target & Entry */}
          <div className="glass-card rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-shogun-muted">
              <span>Target Asset</span>
              <Target size={12} className="text-shogun-accent" />
            </div>
            <div className="mt-2">
              <span className="font-extrabold text-2xl text-white font-mono block">
                {edict.target_symbol || 'MARKET'}
              </span>
              <span className="text-xs font-mono text-shogun-gold mt-1 block">
                {edict.entry_price ? `Entry: $${edict.entry_price}` : 'Defensive Hold'}
              </span>
            </div>
          </div>

          {/* Risk:Reward & Targets */}
          <div className="glass-card rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-shogun-muted">
              <span>Risk : Reward Ratio</span>
              <Zap size={12} className="text-shogun-accent" />
            </div>
            <div className="mt-2">
              <span className="font-extrabold text-2xl text-shogun-accent font-mono block">
                {edict.risk_reward_ratio ? `1 : ${edict.risk_reward_ratio}` : 'N/A'}
              </span>
              <span className="text-xs font-mono text-shogun-muted mt-1 block truncate">
                SL: {edict.stop_loss ? `$${edict.stop_loss}` : '—'} | TP: {edict.take_profit ? `$${edict.take_profit}` : '—'}
              </span>
            </div>
          </div>

          {/* Daimyo Veto Seal */}
          <div className="glass-card rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-shogun-muted">
              <span>Daimyo Veto Check</span>
              <span className="text-[10px] font-mono text-white/50">Honeypot Audit</span>
            </div>
            <div className="mt-2">
              <div className="flex items-center gap-2">
                {edict.daimyo_veto_exercised ? (
                  <>
                    <ShieldAlert size={20} className="text-shogun-crimson animate-pulse" />
                    <span className="font-extrabold text-xl text-shogun-crimson">VETOED</span>
                  </>
                ) : (
                  <>
                    <Award size={20} className="text-shogun-accent" />
                    <span className="font-extrabold text-xl text-shogun-accent">CLEARED</span>
                  </>
                )}
              </div>
              <span className="text-xs font-mono text-white/70 mt-1 block">
                {edict.daimyo_veto_exercised ? 'Halted: Unacceptable Risk' : `Conviction: ${(edict.confidence_score * 100).toFixed(0)}% Verified`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
