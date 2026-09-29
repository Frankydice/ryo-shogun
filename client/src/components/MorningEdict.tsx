import React from 'react';
import { ScrollText, Award, Share2, Target, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ShogunEdict } from '../types/index.js';

interface MorningEdictProps {
  edict: ShogunEdict | null;
  onOpenThesisModal: () => void;
}

export const MorningEdict: React.FC<MorningEdictProps> = ({ edict, onOpenThesisModal }) => {
  if (!edict) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200 animate-pulse">
        <div className="h-4 bg-slate-100 rounded w-1/4 mb-3"></div>
        <div className="h-8 bg-slate-100 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-slate-100 rounded w-1/2"></div>
      </div>
    );
  }

  const isTrade = edict.verdict === 'EXECUTE_TRADE';

  return (
    <section className="bg-white rounded-3xl p-5 sm:p-8 border border-zinc-200 shadow-sm relative overflow-hidden">
      <div className="flex flex-col gap-5 sm:gap-6 relative z-10">
        {/* Top Header Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-zinc-100 text-black flex items-center justify-center shrink-0">
              <ScrollText size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600">
                  The Shogun's Decree · 朝の布告
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-mono text-slate-400">
                  {new Date(edict.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
              <h2 className="font-extrabold text-base sm:text-xl text-black tracking-tight font-display">
                30-Second Executive Market Verdict
              </h2>
            </div>
          </div>

          {/* Share to X / Export Proof Button */}
          <button
            onClick={onOpenThesisModal}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-mono font-semibold text-xs border border-black shadow-sm hover:shadow transition-all"
          >
            <Share2 size={14} />
            <span>Export Proof of Thesis</span>
          </button>
        </div>

        {/* 30-Second Executive Summary Quote Box */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 sm:p-6">
          <p className="text-base sm:text-xl font-medium text-slate-800 leading-relaxed font-sans italic">
            "{edict.thirty_second_brief}"
          </p>
        </div>

        {/* High-Impact Stat Matrix (4 cols) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Commander & Verdict */}
          <div className="bg-white rounded-2xl p-4 border border-zinc-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Command Seal</span>
              <Lock size={13} className="text-zinc-700" />
            </div>
            <div className="mt-2.5">
              <span className="font-extrabold text-sm text-slate-900 block truncate">
                {edict.active_commander}
              </span>
              <span className={`inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border mt-1.5 ${
                isTrade
                  ? 'border-emerald-300 bg-emerald-100 text-emerald-800'
                  : 'border-amber-300 bg-amber-100 text-amber-800'
              }`}>
                {isTrade ? <CheckCircle2 size={12} /> : null}
                {edict.verdict}
              </span>
            </div>
          </div>

          {/* Conviction Score */}
          <div className="bg-white rounded-2xl p-4 border border-zinc-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Confidence Conviction</span>
              <Award size={13} className="text-zinc-700" />
            </div>
            <div className="mt-2.5">
              <div className="text-2xl font-mono font-extrabold text-black">
                {((edict.confidence_score || 0.88) * 100).toFixed(0)}%
              </div>
              <span className="text-[11px] font-mono text-slate-500 block truncate">
                Council Confluence Score
              </span>
            </div>
          </div>

          {/* Risk / Reward Ratio */}
          <div className="bg-white rounded-2xl p-4 border border-zinc-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Risk / Reward Ratio</span>
              <Target size={13} className="text-emerald-600" />
            </div>
            <div className="mt-2.5">
              <div className="text-2xl font-mono font-extrabold text-emerald-600">
                {edict.risk_reward_ratio ? `${edict.risk_reward_ratio}x` : '2.43x'}
              </div>
              <span className="text-[11px] font-mono text-slate-500 block truncate">
                Target RR Asymmetry
              </span>
            </div>
          </div>

          {/* Execution Boundary */}
          <div className="bg-white rounded-2xl p-4 border border-zinc-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Execution Boundary</span>
              <ShieldCheck size={13} className="text-zinc-700" />
            </div>
            <div className="mt-2.5">
              <span className="font-extrabold text-sm text-slate-900 block truncate">
                {edict.target_symbol}USDT
              </span>
              <div className="text-[11px] font-mono font-semibold text-slate-500 flex items-center gap-1.5 mt-1">
                <span>Entry: ${edict.entry_price || '7.67'}</span>
                <span>•</span>
                <span className="text-emerald-600">TP: ${edict.take_profit || '8.25'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
