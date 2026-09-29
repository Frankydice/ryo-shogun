import React from 'react';
import { Database, Zap, ShieldAlert, Sparkles } from 'lucide-react';

export const FeatureHighlights: React.FC = () => {
  const guarantees = [
    {
      id: 'provenance',
      title: 'Deterministic Provenance',
      badge: 'RYO JSON-RPC',
      badgeColor: 'border-shogun-accent/40 bg-shogun-accent/10 text-shogun-accent',
      description: 'Strict honest data provenance. Missing on-chain metrics remain missing without hallucination.',
      icon: <Database size={16} className="text-shogun-accent" />,
      iconBg: 'bg-shogun-accent/15 border-shogun-accent/30'
    },
    {
      id: 'latency',
      title: 'Consensus Latency',
      badge: '< 15ms Roundtrip',
      badgeColor: 'border-emerald-400/40 bg-emerald-950/30 text-emerald-300',
      description: 'Three samurai archetypes synchronize across 7 official RYO research tools in parallel.',
      icon: <Zap size={16} className="text-emerald-400" />,
      iconBg: 'bg-emerald-500/15 border-emerald-500/30'
    },
    {
      id: 'safety',
      title: 'Autonomous Safety Harness',
      badge: 'Daimyo Veto Active',
      badgeColor: 'border-shogun-crimson/40 bg-shogun-crimson/15 text-shogun-crimson',
      description: 'Zero-tolerance automated halt on honeypots, unlocked liquidity, or suspicious minting.',
      icon: <ShieldAlert size={16} className="text-shogun-crimson" />,
      iconBg: 'bg-shogun-crimson/15 border-shogun-crimson/30'
    },
    {
      id: 'kaizen',
      title: 'Continuous Kaizen Engine',
      badge: 'Thesis vs Luck',
      badgeColor: 'border-purple-400/40 bg-purple-950/30 text-purple-300',
      description: 'Every closed paper position triggers a forensic audit that dynamically updates Dojo execution rules.',
      icon: <Sparkles size={16} className="text-purple-300" />,
      iconBg: 'bg-purple-500/15 border-purple-500/30'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {guarantees.map((g) => (
        <div
          key={g.id}
          className="glass-card rounded-2xl p-4 flex flex-col justify-between gap-3 transition-all duration-300 hover:border-white/20 hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${g.iconBg}`}>
              {g.icon}
            </div>

            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-bold ${g.badgeColor}`}>
              {g.badge}
            </span>
          </div>

          <div>
            <h3 className="font-mono font-bold text-xs sm:text-sm text-white">
              {g.title}
            </h3>
            <p className="text-xs text-shogun-muted font-sans mt-1 leading-relaxed">
              {g.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
