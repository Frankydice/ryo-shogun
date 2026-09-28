import React, { useState, useEffect } from 'react';
import { Key, RefreshCw, Terminal, Clock, ShieldAlert, ShieldCheck, User, ChevronDown } from 'lucide-react';
import { ShogunState } from '../types/index.js';

interface HeaderProps {
  state: ShogunState | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  circuitTripped: boolean;
  onToggleCircuit: () => void;
  onRefresh: () => void;
  onOpenMcpModal: () => void;
  onOpenScanModal: () => void;
  isLoading: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  state,
  activeTab,
  setActiveTab,
  circuitTripped,
  onToggleCircuit,
  onRefresh,
  onOpenMcpModal,
  onOpenScanModal,
  isLoading
}) => {
  const [jstTime, setJstTime] = useState('');
  const isLive = state?.mcpStatus?.hasKey;

  // Live JST Clock (Tokyo Time UTC+9)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const jstString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Tokyo',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setJstTime(`${jstString} JST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navTabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'debate', label: 'Agent Debate' },
    { id: 'safety', label: 'Safety Harness' },
    { id: 'backtest', label: 'Backtest & OOS' },
    { id: 'audit', label: 'Audit Logs' }
  ];

  const pnlPct = state?.portfolio?.realizedPnlUsd !== undefined && state.portfolio.balanceUsd
    ? Number(((state.portfolio.realizedPnlUsd / state.portfolio.balanceUsd) * 100).toFixed(2))
    : -2.41;

  const aumFormatted = state?.portfolio?.equityUsd
    ? `$${state.portfolio.equityUsd.toLocaleString()}`
    : '$15,000';

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#040806]/90 backdrop-blur-xl px-4 py-2.5 sm:px-6">
      <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Left: Brand & JST Clock */}
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-shogun-accent/25 via-emerald-500/15 to-shogun-gold/20 border border-shogun-accent/50 flex items-center justify-center font-bold text-shogun-accent text-base shadow-[0_0_18px_rgba(110,232,154,0.35)] transition-transform group-hover:scale-105">
              将
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-shogun-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-shogun-accent"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-lg tracking-tight text-white">
                RYO <span className="text-transparent bg-clip-text bg-gradient-to-r from-shogun-accent to-emerald-300">SHOGUN</span>
              </span>
            </div>
            <p className="text-[11px] text-shogun-muted font-mono flex items-center gap-1.5">
              <span>Autonomous Samurai Council</span>
              <span className="text-white/20">•</span>
              <span className="text-shogun-gold flex items-center gap-1">
                <Clock size={10} />
                {jstTime || '08:38:26 JST'}
              </span>
            </p>
          </div>
        </div>

        {/* Center: Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-black/40 border border-white/[0.07] p-1 rounded-xl">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all ${
                  isActive
                    ? 'text-shogun-accent font-bold bg-shogun-accent/10 border border-shogun-accent/30 shadow-[0_0_12px_rgba(110,232,154,0.2)]'
                    : 'text-shogun-muted hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-shogun-accent rounded-full shadow-[0_0_8px_#6EE89A]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Status Bar Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Circuit Breaker Pill */}
          <button
            onClick={onToggleCircuit}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all hover:scale-102 ${
              circuitTripped
                ? 'border-shogun-crimson/50 bg-shogun-crimson/15 text-shogun-crimson shadow-[0_0_15px_rgba(255,77,77,0.25)]'
                : 'border-shogun-accent/40 bg-shogun-accent/10 text-shogun-accent shadow-[0_0_12px_rgba(110,232,154,0.15)]'
            }`}
            title="Click to toggle Circuit Breaker harness"
          >
            {circuitTripped ? (
              <ShieldAlert size={14} className="animate-pulse text-shogun-crimson" />
            ) : (
              <ShieldCheck size={14} className="text-shogun-accent" />
            )}
            <div className="text-left">
              <span className="font-bold block leading-none">
                {circuitTripped ? 'CIRCUIT TRIPPED' : 'CIRCUIT ARMED'}
              </span>
              <span className="text-[10px] opacity-80 block leading-tight">
                {circuitTripped ? 'Trading Locked' : 'Guard Active'}
              </span>
            </div>
          </button>

          {/* AUM Metric */}
          <div className="hidden xl:flex flex-col text-right px-2 font-mono">
            <span className="text-[10px] text-shogun-muted uppercase">AUM</span>
            <span className="text-xs font-bold text-white">{aumFormatted}</span>
          </div>

          {/* Daily PnL */}
          <div className="hidden xl:flex flex-col text-right px-2 font-mono">
            <span className="text-[10px] text-shogun-muted uppercase">Daily PnL</span>
            <span
              className={`text-xs font-bold ${
                pnlPct >= 0 ? 'text-shogun-accent' : 'text-shogun-crimson'
              }`}
            >
              {pnlPct >= 0 ? `+${pnlPct}%` : `${pnlPct}%`}
            </span>
          </div>

          {/* Sub-Account Selector */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-white/10 bg-black/40 text-xs font-mono">
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white/80">
              <User size={12} />
            </div>
            <div className="text-left">
              <span className="text-[9px] text-shogun-muted uppercase block leading-none">Sub-Account</span>
              <span className="font-bold text-white block leading-tight">Tokyo HQ</span>
            </div>
            <ChevronDown size={12} className="text-shogun-muted ml-0.5" />
          </div>

          {/* Quick MCP / Scanner Tools */}
          <div className="flex items-center gap-1.5 pl-1 border-l border-white/10">
            <button
              onClick={onOpenMcpModal}
              className={`p-1.5 rounded-lg border text-xs transition ${
                isLive
                  ? 'border-shogun-accent/50 bg-shogun-accent/15 text-shogun-accent'
                  : 'border-white/10 bg-white/5 text-shogun-muted hover:text-white'
              }`}
              title={isLive ? 'Live MCP Protocol Active' : 'Configure MCP Key'}
            >
              <Key size={13} />
            </button>

            <button
              onClick={onOpenScanModal}
              className="p-1.5 rounded-lg border border-shogun-accent/30 bg-shogun-accent/10 text-shogun-accent text-xs transition hover:bg-shogun-accent/20"
              title="Summon on Token"
            >
              <Terminal size={13} />
            </button>

            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-white text-xs transition hover:bg-white/10 disabled:opacity-50"
              title="Convene Council"
            >
              <RefreshCw size={13} className={isLoading ? 'animate-spin text-shogun-accent' : ''} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

