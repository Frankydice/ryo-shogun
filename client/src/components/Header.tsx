import React from 'react';
import { Key, RefreshCw, Terminal } from 'lucide-react';
import { ShogunState } from '../types/index.js';

interface HeaderProps {
  state: ShogunState | null;
  onRefresh: () => void;
  onOpenMcpModal: () => void;
  onOpenScanModal: () => void;
  isLoading: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  state,
  onRefresh,
  onOpenMcpModal,
  onOpenScanModal,
  isLoading
}) => {
  const regime = state?.marketOverview?.regime || 'rotation';
  const fearGreed = state?.marketOverview?.fear_greed || 50;
  const isLive = state?.mcpStatus?.hasKey;

  const regimeColors: Record<string, string> = {
    bull_expansion: 'text-shogun-accent border-shogun-accent/30 bg-shogun-accent/10',
    rotation: 'text-shogun-gold border-shogun-gold/30 bg-shogun-gold/10',
    fear_distribution: 'text-shogun-crimson border-shogun-crimson/30 bg-shogun-crimson/10',
    extreme_volatility: 'text-purple-400 border-purple-500/30 bg-purple-500/10'
  };

  return (
    <header className="border-b border-shogun-border bg-shogun-surface/80 backdrop-blur-md sticky top-0 z-40 px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-shogun-accent/20 to-shogun-gold/10 border border-shogun-accent/40 flex items-center justify-center font-bold text-shogun-accent text-lg shadow-[0_0_15px_rgba(110,232,154,0.3)]">
            将
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg tracking-tight text-white">
                RYO <span className="text-shogun-accent">SHOGUN</span>
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full border border-shogun-gold/40 bg-shogun-gold/10 text-shogun-gold uppercase font-medium">
                将軍 · DOJO
              </span>
            </div>
            <p className="text-xs text-shogun-muted font-mono flex items-center gap-1.5">
              <span>Autonomous Samurai Council</span>
              <span className="text-white/20">|</span>
              <span className="text-white/60">Tokyo 2026</span>
            </p>
          </div>
        </div>

        {/* Status Indicators & Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Regime Badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-mono font-medium ${regimeColors[regime] || regimeColors.rotation}`}>
            <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
            <span className="capitalize">{regime.replace('_', ' ')}</span>
            <span className="text-white/40">({fearGreed}/100)</span>
          </div>

          {/* MCP Status Chip */}
          <button
            onClick={onOpenMcpModal}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-mono transition hover:opacity-80 ${
              isLive
                ? 'border-shogun-accent/40 bg-shogun-accent/10 text-shogun-accent'
                : 'border-white/10 bg-white/5 text-shogun-muted'
            }`}
            title="Click to configure live RYO MCP key"
          >
            <Key size={13} />
            <span>{isLive ? 'LIVE MCP' : 'BUSHIDO SIMULATOR'}</span>
          </button>

          {/* Manual Candidate Scan Trigger */}
          <button
            onClick={onOpenScanModal}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-shogun-accent/30 bg-shogun-card hover:bg-shogun-accent/10 text-shogun-accent text-xs font-medium font-mono transition"
          >
            <Terminal size={13} />
            <span className="hidden sm:inline">Summon on Token</span>
          </button>

          {/* Refresh / Convene Council */}
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-shogun-muted hover:text-white transition disabled:opacity-50"
            title="Convene Council Now"
          >
            <RefreshCw size={15} className={isLoading ? 'animate-spin text-shogun-accent' : ''} />
          </button>
        </div>
      </div>
    </header>
  );
};
