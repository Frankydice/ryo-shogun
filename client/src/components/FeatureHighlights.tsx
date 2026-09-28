import React from 'react';
import { Maximize2, Sparkles, ShieldCheck, Award } from 'lucide-react';

export const FeatureHighlights: React.FC = () => {
  const highlights = [
    {
      id: 'layout',
      title: 'Clean & Modern Layout',
      description: 'Better spacing, clearer hierarchy, and more readable information.',
      icon: <Maximize2 size={16} className="text-shogun-accent" />,
      iconBg: 'bg-shogun-accent/15 border-shogun-accent/30'
    },
    {
      id: 'interactive',
      title: 'Interactive Elements',
      description: 'Hover states, active states, and smooth transitions for a premium feel.',
      icon: <Sparkles size={16} className="text-emerald-400" />,
      iconBg: 'bg-emerald-500/15 border-emerald-500/30'
    },
    {
      id: 'safety',
      title: 'Clear Risk & Safety Indicators',
      description: 'Visibly show circuit breaker status, exposure levels and risk alerts.',
      icon: <ShieldCheck size={16} className="text-teal-300" />,
      iconBg: 'bg-teal-500/15 border-teal-500/30'
    },
    {
      id: 'functional',
      title: 'Beautiful yet Functional',
      description: 'Same information, better presentation, more enjoyable to use.',
      icon: <Award size={16} className="text-shogun-gold" />,
      iconBg: 'bg-shogun-gold/15 border-shogun-gold/30'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {highlights.map((h) => (
        <div
          key={h.id}
          className="glass-card rounded-2xl p-4 flex items-start gap-3.5 transition-all duration-300 hover:border-white/20 hover:-translate-y-0.5"
        >
          <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${h.iconBg}`}>
            {h.icon}
          </div>

          <div>
            <h3 className="font-mono font-bold text-xs sm:text-sm text-white">
              {h.title}
            </h3>
            <p className="text-xs text-shogun-muted font-sans mt-0.5 leading-relaxed">
              {h.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
