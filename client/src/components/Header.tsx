import React, { useState, useEffect } from 'react';
import { Key, RefreshCw, Terminal, Clock, ShieldAlert, ShieldCheck, ChevronDown } from 'lucide-react';
import { ShogunState, UserSubAccount } from '../types/index.js';

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
  activeAccount: UserSubAccount;
  onOpenAccountModal: () => void;
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
  isLoading,
  activeAccount,
  onOpenAccountModal
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

  const colorStyles: Record<UserSubAccount['avatarColor'], { bg: string; border: string; text: string }> = {
    emerald: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/40', text: 'text-shogun-accent' },
    gold: { bg: 'bg-amber-500/20', border: 'border-amber-500/40', text: 'text-shogun-gold' },
    purple: { bg: 'bg-purple-500/20', border: 'border-purple-500/40', text: 'text-purple-300' },
    cyan: { bg: 'bg-cyan-500/20', border: 'border-cyan-500/40', text: 'text-cyan-300' },
    crimson: { bg: 'bg-red-500/20', border: 'border-red-500/40', text: 'text-shogun-crimson' }
  };
  const activeStyle = colorStyles[activeAccount?.avatarColor || 'emerald'] || colorStyles.emerald;

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#040806]/95 backdrop-blur-xl px-3 py-2 sm:px-6 sm:py-2.5">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Brand & JST Clock */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="relative group">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-shogun-accent/25 via-emerald-500/15 to-shogun-gold/20 border border-shogun-accent/50 flex items-center justify-center font-bold text-shogun-accent text-sm sm:text-base shadow-[0_0_18px_rgba(110,232,154,0.35)] transition-transform group-hover:scale-105">
                将
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-shogun-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-shogun-accent"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-display font-black text-base sm:text-lg tracking-tight text-white">
                  RYO <span className="text-transparent bg-clip-text bg-gradient-to-r from-shogun-accent to-emerald-300">SHOGUN</span>
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-shogun-muted font-mono flex items-center gap-1 sm:gap-1.5">
                <span className="hidden sm:inline">Autonomous Samurai Council</span>
                <span className="hidden sm:inline text-white/20">•</span>
                <span className="text-shogun-gold flex items-center gap-1">
                  <Clock size={10} />
                  {jstTime || '08:38:26 JST'}
                </span>
              </p>
            </div>
          </div>

          {/* Center: Desktop Navigation Tabs */}
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
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Circuit Breaker Pill */}
            <button
              onClick={onToggleCircuit}
              className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-xl border text-xs font-mono transition-all hover:scale-102 ${
                circuitTripped
                  ? 'border-shogun-crimson/50 bg-shogun-crimson/15 text-shogun-crimson shadow-[0_0_15px_rgba(255,77,77,0.25)]'
                  : 'border-shogun-accent/40 bg-shogun-accent/10 text-shogun-accent shadow-[0_0_12px_rgba(110,232,154,0.15)]'
              }`}
              title="Click to toggle Circuit Breaker harness"
            >
              {circuitTripped ? (
                <ShieldAlert size={13} className="animate-pulse text-shogun-crimson shrink-0" />
              ) : (
                <ShieldCheck size={13} className="text-shogun-accent shrink-0" />
              )}
              <div className="text-left">
                <span className="font-bold block leading-none text-[10px] sm:text-xs">
                  <span className="hidden sm:inline">{circuitTripped ? 'CIRCUIT TRIPPED' : 'CIRCUIT ARMED'}</span>
                  <span className="sm:hidden">{circuitTripped ? 'TRIPPED' : 'ARMED'}</span>
                </span>
                <span className="text-[9px] opacity-80 hidden sm:block leading-tight">
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

            {/* Sub-Account Selector Button */}
            <button
              onClick={onOpenAccountModal}
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1.5 rounded-xl border border-white/10 bg-black/40 hover:bg-white/[0.06] hover:border-shogun-accent/50 text-xs font-mono transition-all group cursor-pointer shadow-sm"
              title="Switch or create sub-accounts"
            >
              <div
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg border flex items-center justify-center font-bold text-[9px] sm:text-[10px] ${activeStyle.bg} ${activeStyle.border} ${activeStyle.text}`}
              >
                {activeAccount?.name ? activeAccount.name.slice(0, 2).toUpperCase() : 'HQ'}
              </div>
              <div className="text-left">
                <span className="text-[8px] sm:text-[9px] text-shogun-muted uppercase block leading-none group-hover:text-shogun-accent transition-colors">
                  Account
                </span>
                <span className="font-bold text-white block leading-tight truncate max-w-[65px] sm:max-w-[120px] text-[11px] sm:text-xs">
                  {activeAccount?.name || 'Tokyo HQ'}
                </span>
              </div>
              <ChevronDown size={11} className="text-shogun-muted group-hover:text-white transition-colors" />
            </button>

            {/* Quick MCP / Scanner Tools */}
            <div className="flex items-center gap-1 sm:gap-1.5 pl-1 border-l border-white/10">
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

        {/* Mobile Navigation Tab Strip (Horizontal Scrollable) */}
        <div className="flex md:hidden items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 pb-0.5 border-t border-white/[0.05] -mx-1 px-1">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 px-2.5 py-1 text-[11px] font-mono rounded-lg transition-all ${
                  isActive
                    ? 'text-shogun-accent font-bold bg-shogun-accent/15 border border-shogun-accent/40 shadow-[0_0_8px_rgba(110,232,154,0.2)]'
                    : 'text-shogun-muted hover:text-white bg-black/40 border border-white/[0.06]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

