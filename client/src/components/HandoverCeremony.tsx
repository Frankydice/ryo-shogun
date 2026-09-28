import React from 'react';
import { Sword, Eye, ShieldCheck, Crown } from 'lucide-react';
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
      color: 'accent',
      activeBorder: 'border-shogun-accent shadow-[0_0_20px_rgba(110,232,154,0.25)]',
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
      activeBorder: 'border-shogun-gold shadow-[0_0_20px_rgba(229,192,123,0.25)]',
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
      activeBorder: 'border-shogun-crimson shadow-[0_0_20px_rgba(255,77,77,0.25)]',
      tools: ['check_safety', 'supported_tokens'],
      doctrine: 'Holds absolute veto power. Enforces capital preservation when honeypot risks, liquidity traps, or macro fear spikes.'
    }
  ];

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-mono uppercase tracking-wider text-shogun-muted flex items-center gap-2">
          <span>Council of Three · 評定会議</span>
          <span className="w-1.5 h-1.5 rounded-full bg-shogun-accent"></span>
          <span className="text-white text-xs font-normal normal-case">Command Seal Handover</span>
        </h2>
        {edict?.handover_rationale && (
          <span className="text-xs font-mono text-shogun-gold truncate max-w-[50%] hidden md:inline">
            {edict.handover_rationale}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {archetypes.map((arch) => {
          const isActive = activeCommander === arch.id;
          const Icon = arch.icon;

          return (
            <div
              key={arch.id}
              className={`relative rounded-xl border p-4 transition-all duration-300 ${
                isActive
                  ? `bg-shogun-card ${arch.activeBorder} ring-1 ring-white/10`
                  : 'bg-shogun-surface/60 border-shogun-border opacity-70 hover:opacity-90'
              }`}
            >
              {/* Active Crown Badge */}
              {isActive && (
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-shogun-gold/20 border border-shogun-gold/40 text-shogun-gold text-[10px] font-mono font-bold tracking-wider uppercase">
                  <Crown size={11} />
                  <span>SEAL ACTIVE</span>
                </div>
              )}

              {/* Archetype Header */}
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
                    isActive
                      ? 'border-white/20 bg-white/10 text-white'
                      : 'border-white/5 bg-white/5 text-shogun-muted'
                  }`}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-display font-bold text-base text-white">{arch.title}</h3>
                    <span className="font-jp text-xs text-shogun-muted">{arch.kanji}</span>
                  </div>
                  <p className="text-xs text-shogun-muted font-mono">{arch.roleSubtitle}</p>
                </div>
              </div>

              {/* Doctrine description */}
              <p className="mt-3 text-xs text-shogun-ink/80 leading-relaxed min-h-[40px]">
                {arch.doctrine}
              </p>

              {/* Assigned MCP Tool Chips */}
              <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                <span className="text-[10px] font-mono text-shogun-muted mr-1">Tools:</span>
                {arch.tools.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 border border-white/5 text-shogun-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
