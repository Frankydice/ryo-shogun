import React from 'react';
import { Sword, Eye, ShieldCheck, Crown, Sparkles } from 'lucide-react';
import { CommanderRole, ShogunEdict } from '../types/index.js';

interface HandoverCeremonyProps {
  edict: ShogunEdict | null;
}

export const HandoverCeremony: React.FC<HandoverCeremonyProps> = ({ edict }) => {
  const activeCommander = edict?.active_commander || 'The Shinobi (忍)';

  const archetypes = [
    {
      id: 'The Ronin (浪人)' as CommanderRole,
      title: 'The Ronin',
      kanji: '浪人',
      roleSubtitle: 'Momentum Breakout Scout',
      icon: Sword,
      color: 'emerald',
      bgGlow: 'from-emerald-500/20 via-emerald-900/10 to-transparent',
      borderColor: 'border-shogun-accent',
      accentColor: 'text-shogun-accent',
      shadow: 'shadow-[0_0_30px_rgba(110,232,154,0.3)]',
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
      color: 'gold',
      bgGlow: 'from-amber-500/20 via-amber-900/10 to-transparent',
      borderColor: 'border-shogun-gold',
      accentColor: 'text-shogun-gold',
      shadow: 'shadow-[0_0_30px_rgba(229,192,123,0.3)]',
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
      color: 'crimson',
      bgGlow: 'from-rose-500/20 via-rose-900/10 to-transparent',
      borderColor: 'border-shogun-crimson',
      accentColor: 'text-shogun-crimson',
      shadow: 'shadow-[0_0_30px_rgba(255,77,77,0.3)]',
      trigger: 'Extreme Defense & Safety Veto',
      tools: ['check_safety', 'supported_tokens'],
      doctrine: 'Holds absolute veto power. Enforces capital preservation when honeypot risks, liquidity traps, or macro fear spikes.'
    }
  ];

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-shogun-accent animate-ping" />
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
            Council of Three · 評定三家
          </h2>
          <span className="text-white/30">•</span>
          <span className="text-xs font-mono text-shogun-muted">Regime-Adaptive Command Handover</span>
        </div>

        {edict?.handover_rationale && (
          <div className="inline-flex items-center gap-1.5 rounded-full border border-shogun-gold/30 bg-shogun-gold/10 px-3 py-1 text-[11px] sm:text-xs font-mono text-shogun-gold">
            <Sparkles size={12} className="shrink-0" />
            <span className="truncate max-w-[210px] sm:max-w-md">{edict.handover_rationale}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
        {archetypes.map((arch) => {
          const isActive = activeCommander === arch.id;
          const Icon = arch.icon;

          return (
            <div
              key={arch.id}
              className={`relative rounded-2xl sm:rounded-3xl border transition-all duration-300 p-4 sm:p-6 flex flex-col justify-between ${
                isActive
                  ? `glass-panel ${arch.borderColor} ${arch.shadow} md:scale-[1.02] z-10 bg-gradient-to-b ${arch.bgGlow}`
                  : 'glass-card opacity-65 hover:opacity-90 hover:border-white/20'
              }`}
            >
              {/* Active Command Seal Ribbon */}
              {isActive && (
                <div className="absolute -top-3 right-6 flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-shogun-gold to-amber-500 text-shogun-bg text-[10px] font-mono font-extrabold uppercase tracking-widest shadow-lg">
                  <Crown size={12} />
                  <span>SEAL OF COMMAND</span>
                </div>
              )}

              <div>
                {/* Header & Icon */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${
                        isActive
                          ? `${arch.borderColor} bg-white/10 ${arch.accentColor} shadow-inner`
                          : 'border-white/10 bg-black/40 text-shogun-muted'
                      }`}
                    >
                      <Icon size={24} />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <h3 className="font-display font-extrabold text-lg text-white">{arch.title}</h3>
                        <span className="font-jp text-xs font-bold text-white/40">{arch.kanji}</span>
                      </div>
                      <p className="text-xs font-mono text-shogun-muted">{arch.roleSubtitle}</p>
                    </div>
                  </div>
                </div>

                {/* Doctrine Body */}
                <p className="mt-4 text-xs font-sans text-shogun-ink/90 leading-relaxed min-h-[48px]">
                  {arch.doctrine}
                </p>
              </div>

              {/* Bottom Condition & Tools */}
              <div className="mt-5 pt-4 border-t border-white/[0.08] flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-shogun-muted">Activation Trigger:</span>
                  <span className={`font-semibold ${isActive ? arch.accentColor : 'text-white/70'}`}>
                    {arch.trigger}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] font-mono text-shogun-muted mr-1">MCP Tools:</span>
                  {arch.tools.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/40 border border-white/5 text-shogun-muted"
                    >
                      {t}
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
