import React from 'react';
import { Sword, Eye, ShieldCheck, Crown, Sparkles } from 'lucide-react';
import { CommanderRole, ShogunEdict } from '../types/index.js';

interface HandoverCeremonyProps {
  edict: ShogunEdict | null;
}

export const HandoverCeremony: React.FC<HandoverCeremonyProps> = ({ edict }) => {
  const activeCommander = edict?.active_commander || 'The Ronin (浪人)';

  const archetypes = [
    {
      id: 'The Ronin (浪人)' as CommanderRole,
      title: 'The Ronin',
      kanji: '浪人',
      roleSubtitle: 'Momentum Breakout Scout',
      icon: Sword,
      trigger: 'Bull Expansion (Fear/Greed ≥ 65)',
      tools: ['scan_market', 'analyze_token'],
      doctrine: 'Drawn in high greed & trending expansion. Prioritizes velocity, clean chart structure, and rapid trend continuation.'
    },
    {
      id: 'The Shinobi (忍)' as CommanderRole,
      title: 'The Shinobi',
      kanji: '忍',
      roleSubtitle: 'Stealth Accumulation Hunter',
      icon: Eye,
      trigger: 'Rotation & Chop (Fear/Greed 40–64)',
      tools: ['deep_analysis', 'compare_tokens'],
      doctrine: 'Active during market rotation & chop. Decodes on-chain whale wallets and funding discrepancies before retail notices.'
    },
    {
      id: 'The Daimyo (大名)' as CommanderRole,
      title: 'The Daimyo',
      kanji: '大名',
      roleSubtitle: 'Capital Guardian & Supreme Veto',
      icon: ShieldCheck,
      trigger: 'Extreme Defense & Safety Veto',
      tools: ['check_safety', 'supported_tokens'],
      doctrine: 'Holds absolute veto power. Enforces capital preservation when honeypot risks, liquidity traps, or macro fear spikes.'
    }
  ];

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse" />
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
            Council of Three · 評定三家
          </h2>
          <span className="text-slate-300">•</span>
          <span className="text-xs font-mono text-slate-500">Regime-Adaptive Command Handover</span>
        </div>

        {edict?.handover_rationale && (
          <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-mono text-purple-700 font-medium">
            <Sparkles size={12} className="shrink-0 text-purple-600" />
            <span className="truncate max-w-[210px] sm:max-w-md">{edict.handover_rationale}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {archetypes.map((arch) => {
          const isActive = activeCommander === arch.id;
          const Icon = arch.icon;

          return (
            <div
              key={arch.id}
              className={`relative rounded-3xl border transition-all duration-200 p-5 sm:p-6 flex flex-col justify-between ${
                isActive
                  ? 'bg-purple-50/40 border-2 border-purple-600 shadow-lg md:scale-[1.02] z-10'
                  : 'bg-white border-slate-200/90 shadow-sm opacity-85 hover:opacity-100 hover:border-purple-300'
              }`}
            >
              {/* Active Command Seal Badge */}
              {isActive && (
                <div className="absolute -top-3 right-6 flex items-center gap-1 px-3 py-1 rounded-full bg-purple-600 text-white text-[10px] font-mono font-extrabold uppercase tracking-widest shadow-md">
                  <Crown size={12} />
                  <span>SEAL OF COMMAND</span>
                </div>
              )}

              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-purple-700">
                    <Icon size={22} />
                  </div>
                  <span className="text-2xl font-jp font-bold text-slate-300">
                    {arch.kanji}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                  {arch.title}
                </h3>
                <span className="text-xs font-mono font-semibold text-purple-700 block mb-3">
                  {arch.roleSubtitle}
                </span>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {arch.doctrine}
                </p>
              </div>

              <div>
                {/* Activation Trigger */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono mb-2">
                  <span className="text-slate-400">Trigger:</span>
                  <span className="font-semibold text-slate-700">{arch.trigger}</span>
                </div>

                {/* Tools */}
                <div className="flex items-center gap-1.5 pt-1">
                  {arch.tools.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono text-[10px] font-bold border border-slate-200"
                    >
                      {t}()
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
