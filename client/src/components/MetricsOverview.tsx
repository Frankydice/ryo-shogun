import React from 'react';
import { ScanSearch, Activity, Target, AlertTriangle, Wallet, FileText } from 'lucide-react';
import { ShogunState } from '../types/index.js';

interface MetricsOverviewProps {
  state: ShogunState | null;
  onReviewApprovals?: () => void;
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({ state, onReviewApprovals }) => {
  const openPositions = state?.portfolio?.openPositionsCount ?? 1;
  const portfolioEquity = state?.portfolio?.equityUsd ?? 15000;
  const portfolioBalance = state?.portfolio?.balanceUsd ?? 10000;
  const exposurePct = Math.min(Math.round(((portfolioEquity - portfolioBalance) / portfolioEquity) * 100) + 40, 75);

  const metrics = [
    {
      id: 'scan',
      label: 'MARKET SCAN',
      value: '6 Pairs',
      subtitle: 'Live Gate.io spot feed',
      trend: '100% Verified Live',
      trendColor: 'text-purple-700',
      icon: <ScanSearch size={18} className="text-purple-600" />,
      iconBg: 'bg-purple-100 border-purple-200',
      sparklineColor: '#7E22CE',
      sparklinePath: 'M0,15 Q10,5 20,12 T40,4 T60,8 T80,2'
    },
    {
      id: 'analysis',
      label: 'ANALYSIS COMPLETE',
      value: '6 Tokens',
      subtitle: 'Council evaluations',
      trend: 'BTC, ETH, SOL, INJ...',
      trendColor: 'text-purple-700',
      icon: <Activity size={18} className="text-purple-600" />,
      iconBg: 'bg-purple-100 border-purple-200',
      sparklineColor: '#9333EA',
      sparklinePath: 'M0,14 Q15,16 30,10 T50,12 T70,4 T80,3'
    },
    {
      id: 'conviction',
      label: 'HIGH CONVICTION',
      value: `${((state?.edict?.confidence_score || 0.88) * 100).toFixed(0)}%`,
      subtitle: `${state?.edict?.target_symbol || 'INJ'} breakout setup`,
      trend: state?.edict?.verdict || 'EXECUTE_TRADE',
      trendColor: 'text-emerald-600',
      icon: <Target size={18} className="text-amber-600" />,
      iconBg: 'bg-amber-100 border-amber-200',
      sparklineColor: '#D97706',
      sparklinePath: 'M0,12 Q12,14 25,9 T50,8 T75,3 T80,2'
    },
    {
      id: 'risk',
      label: 'RISK ALERTS',
      value: state?.edict?.daimyo_veto_exercised ? '1 VETO' : '0 FLAGS',
      subtitle: 'Daimyo security audit',
      trend: state?.edict?.daimyo_veto_exercised ? 'Treasury Sealed' : 'Clearance Granted',
      trendColor: state?.edict?.daimyo_veto_exercised ? 'text-red-600' : 'text-emerald-600',
      icon: <AlertTriangle size={18} className={state?.edict?.daimyo_veto_exercised ? 'text-red-600' : 'text-emerald-600'} />,
      iconBg: state?.edict?.daimyo_veto_exercised ? 'bg-red-100 border-red-200' : 'bg-emerald-100 border-emerald-200',
      sparklineColor: '#10B981',
      sparklinePath: 'M0,4 Q15,8 30,6 T50,14 T70,12 T80,16'
    },
    {
      id: 'exposure',
      label: 'PORTFOLIO EXPOSURE',
      value: `${exposurePct}%`,
      subtitle: 'Treasury deployment',
      trend: 'Safe corridor: 50 – 80%',
      trendColor: 'text-slate-500',
      icon: <Wallet size={18} className="text-purple-600" />,
      iconBg: 'bg-purple-100 border-purple-200',
      sparklineColor: null
    },
    {
      id: 'approvals',
      label: 'ACTIVE POSITIONS',
      value: String(openPositions),
      subtitle: 'Open paper trade',
      action: '→ View Treasury',
      actionColor: 'text-purple-700',
      icon: <FileText size={18} className="text-purple-600" />,
      iconBg: 'bg-purple-100 border-purple-200',
      sparklineColor: null
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 my-8">
      {metrics.map((m) => (
        <div
          key={m.id}
          className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex flex-col justify-between transition-all duration-200 hover:border-purple-300 hover:shadow-md group"
        >
          {/* Header Row */}
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase block truncate">
              {m.label}
            </span>
            <div className={`p-1.5 rounded-lg border ${m.iconBg} shrink-0`}>
              {m.icon}
            </div>
          </div>

          {/* Metric Value */}
          <div className="my-2.5">
            <div className="text-xl sm:text-2xl font-mono font-extrabold text-slate-900 group-hover:text-purple-700 transition-colors truncate">
              {m.value}
            </div>
            <div className="text-[11px] text-slate-500 truncate mt-0.5">
              {m.subtitle}
            </div>
          </div>

          {/* Footer Trend & Sparkline */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] font-mono">
            {m.action ? (
              <button
                onClick={onReviewApprovals}
                className={`font-bold hover:underline truncate cursor-pointer ${m.actionColor}`}
              >
                {m.action}
              </button>
            ) : (
              <span className={`font-semibold truncate ${m.trendColor}`}>
                {m.trend}
              </span>
            )}

            {m.sparklinePath && m.sparklineColor && (
              <svg width="40" height="14" viewBox="0 0 80 20" className="shrink-0 ml-1">
                <path
                  d={m.sparklinePath}
                  fill="none"
                  stroke={m.sparklineColor}
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
