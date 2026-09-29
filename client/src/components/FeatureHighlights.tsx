import React from 'react';
import { Database, Zap, ShieldAlert, Sparkles } from 'lucide-react';

export const FeatureHighlights: React.FC = () => {
  const guarantees = [
    {
      id: 'provenance',
      title: 'Deterministic Oracles',
      badge: 'Live Feeds',
      badgeColor: 'border-purple-200 bg-purple-50 text-purple-700',
      description: 'Strict honest data provenance. Every price, volume, and sentiment score is verified against live public endpoints.',
      icon: <Database size={16} className="text-purple-600" />,
      iconBg: 'bg-purple-100 border-purple-200'
    },
    {
      id: 'latency',
      title: 'Consensus Latency',
      badge: '< 15ms Roundtrip',
      badgeColor: 'border-emerald-200 bg-emerald-50 text-emerald-800',
      description: 'Three samurai archetypes synchronize across verified market research tools in parallel execution.',
      icon: <Zap size={16} className="text-emerald-600" />,
      iconBg: 'bg-emerald-100 border-emerald-200'
    },
    {
      id: 'safety',
      title: 'Autonomous Safety Harness',
      badge: 'Daimyo Veto Active',
      badgeColor: 'border-rose-200 bg-rose-50 text-rose-800',
      description: 'Zero-tolerance automated halt on honeypots, unlocked liquidity pools, or suspicious minting functions.',
      icon: <ShieldAlert size={16} className="text-rose-600" />,
      iconBg: 'bg-rose-100 border-rose-200'
    },
    {
      id: 'kaizen',
      title: 'Continuous Kaizen Engine',
      badge: 'Thesis vs Luck',
      badgeColor: 'border-purple-200 bg-purple-50 text-purple-700',
      description: 'Every closed position triggers a forensic audit that dynamically updates Council execution rules.',
      icon: <Sparkles size={16} className="text-purple-600" />,
      iconBg: 'bg-purple-100 border-purple-200'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="safety-section">
      {guarantees.map((g) => (
        <div
          key={g.id}
          className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between gap-3 hover:border-purple-300 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${g.iconBg}`}>
              {g.icon}
            </div>

            <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-bold ${g.badgeColor}`}>
              {g.badge}
            </span>
          </div>

          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
              {g.title}
            </h3>
            <p className="text-xs text-slate-500 font-sans mt-1.5 leading-relaxed">
              {g.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
