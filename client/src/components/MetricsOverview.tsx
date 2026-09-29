import React from 'react';
import { ScanSearch, Activity, Target, AlertTriangle, Wallet, FileText } from 'lucide-react';
import { ShogunState } from '../types/index.js';

interface MetricsOverviewProps {
  state: ShogunState | null;
  onReviewApprovals?: () => void;
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({ state, onReviewApprovals }) => {
  const openPositions = state?.portfolio?.openPositionsCount ?? 2;
  const portfolioEquity = state?.portfolio?.equityUsd ?? 15000;
  const portfolioBalance = state?.portfolio?.balanceUsd ?? 10000;
  const exposurePct = Math.min(Math.round(((portfolioEquity - portfolioBalance) / portfolioEquity) * 100) + 50, 68);

  const metrics = [
    {
      id: 'scan',
      label: 'MARKET SCAN',
      value: '24',
      subtitle: 'New opportunities found',
      trend: '↑ 12% vs last 24h',
      trendColor: 'text-shogun-accent',
      icon: <ScanSearch size={18} className="text-shogun-accent" />,
      iconBg: 'bg-shogun-accent/15 border-shogun-accent/30',
      sparklineColor: '#6EE89A',
      sparklinePath: 'M0,15 Q10,5 20,12 T40,4 T60,8 T80,2'
    },
    {
      id: 'analysis',
      label: 'ANALYSIS COMPLETE',
      value: '12',
      subtitle: 'Tokens analyzed',
      trend: '↑ 8% vs last 24h',
      trendColor: 'text-shogun-accent',
      icon: <Activity size={18} className="text-emerald-400" />,
      iconBg: 'bg-emerald-500/15 border-emerald-500/30',
      sparklineColor: '#34D399',
      sparklinePath: 'M0,14 Q15,16 30,10 T50,12 T70,4 T80,3'
    },
    {
      id: 'conviction',
      label: 'HIGH CONVICTION',
      value: '5',
      subtitle: 'Trade setups',
      trend: '↑ 3% vs last 24h',
      trendColor: 'text-shogun-accent',
      icon: <Target size={18} className="text-shogun-gold" />,
      iconBg: 'bg-shogun-gold/15 border-shogun-gold/30',
      sparklineColor: '#E5C07B',
      sparklinePath: 'M0,12 Q12,14 25,9 T50,8 T75,3 T80,2'
    },
    {
      id: 'risk',
      label: 'RISK ALERTS',
      value: state?.edict?.daimyo_veto_exercised ? '4' : '3',
      subtitle: 'Tokens flagged',
      trend: '↓ 40% vs last 24h',
      trendColor: 'text-shogun-crimson',
      icon: <AlertTriangle size={18} className="text-shogun-crimson" />,
      iconBg: 'bg-shogun-crimson/15 border-shogun-crimson/30',
      sparklineColor: '#FF4D4D',
      sparklinePath: 'M0,4 Q15,8 30,6 T50,14 T70,12 T80,16'
    },
    {
      id: 'exposure',
      label: 'PORTFOLIO EXPOSURE',
      value: `${exposurePct}%`,
      subtitle: 'Current exposure',
      trend: 'Safe range: 50 – 80%',
      trendColor: 'text-shogun-muted',
      icon: <Wallet size={18} className="text-shogun-accent" />,
      iconBg: 'bg-shogun-accent/15 border-shogun-accent/30',
      sparklineColor: null
    },
    {
      id: 'approvals',
      label: 'PENDING APPROVALS',
      value: String(openPositions),
      subtitle: 'Awaiting your decision',
      action: '→ Review now',
      actionColor: 'text-shogun-gold',
      icon: <FileText size={18} className="text-shogun-gold" />,
      iconBg: 'bg-shogun-gold/15 border-shogun-gold/30',
      sparklineColor: null
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2.5 sm:gap-3.5">
      {metrics.map((m) => (
        <div
          key={m.id}
          className="glass-panel rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:border-white/20 hover:-translate-y-0.5 group"
        >
          {/* Header Row */}
          <div className="flex items-center justify-between gap-1">
            <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-wider text-shogun-muted uppercase block truncate">
              {m.label}
            </span>
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl border flex items-center justify-center shrink-0 ${m.iconBg}`}>
              {m.icon}
            </div>
          </div>

          {/* Value & Subtitle */}
          <div className="my-1.5 sm:my-2.5">
            <span className="font-mono font-extrabold text-xl sm:text-3xl text-white block tracking-tight">
              {m.value}
            </span>
            <span className="text-[11px] sm:text-xs text-shogun-muted font-sans mt-0.5 block truncate">
              {m.subtitle}
            </span>
          </div>

          {/* Footer Trend / Sparkline */}
          <div className="pt-1.5 sm:pt-2 border-t border-white/[0.05] flex items-center justify-between gap-1 min-h-[22px] sm:min-h-[24px]">
            {m.trend && (
              <span className={`text-[10px] sm:text-[11px] font-mono font-semibold truncate ${m.trendColor}`}>
                {m.trend}
              </span>
            )}

            {m.action && (
              <button
                onClick={onReviewApprovals}
                className="text-[10px] sm:text-[11px] font-mono font-bold text-shogun-gold hover:text-amber-300 hover:underline transition flex items-center gap-0.5 shrink-0"
              >
                {m.action}
              </button>
            )}

            {m.sparklinePath && (
              <svg className="w-12 sm:w-16 h-4 sm:h-5 overflow-visible shrink-0 ml-auto" viewBox="0 0 80 20">
                <path
                  d={m.sparklinePath}
                  fill="none"
                  stroke={m.sparklineColor || '#6EE89A'}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
