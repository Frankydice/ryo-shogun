import React, { useState, useEffect } from 'react';
import { Key, RefreshCw, Terminal, Clock } from 'lucide-react';
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

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#040705]/85 backdrop-blur-xl px-4 py-3 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3.5">
          <div className="relative group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-shogun-accent/30 via-emerald-500/10 to-shogun-gold/20 border border-shogun-accent/50 flex items-center justify-center font-bold text-shogun-accent text-lg shadow-[0_0_20px_rgba(110,232,154,0.35)] transition-transform group-hover:scale-105">
              将
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-shogun-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-shogun-accent"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-xl tracking-tight text-white">
                RYO <span className="text-transparent bg-clip-text bg-gradient-to-r from-shogun-accent to-emerald-300">SHOGUN</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-shogun-gold/40 bg-shogun-gold/10 text-shogun-gold uppercase font-bold tracking-wider">
                将軍 · 評定所
              </span>
            </div>
            <p className="text-xs text-shogun-muted font-mono flex items-center gap-2">
              <span>Autonomous Samurai Council</span>
              <span className="text-white/20">•</span>
              <span className="text-shogun-gold flex items-center gap-1">
                <Clock size={11} />
                {jstTime || 'Tokyo HQ'}
              </span>
            </p>
          </div>
        </div>

        {/* Global Controls & Status */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* MCP Status Chip */}
          <button
            onClick={onOpenMcpModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-medium transition hover:scale-102 ${
              isLive
                ? 'border-shogun-accent/50 bg-shogun-accent/15 text-shogun-accent shadow-[0_0_15px_rgba(110,232,154,0.2)]'
                : 'border-white/10 bg-white/5 text-shogun-muted hover:border-white/20 hover:text-white'
            }`}
            title="Configure live RYO MCP key"
          >
            <Key size={13} className={isLive ? 'text-shogun-accent' : 'text-shogun-muted'} />
            <span>{isLive ? 'LIVE MCP PROTOCOL' : 'BUSHIDO SIMULATOR'}</span>
          </button>

          {/* Summon on Token Button */}
          <button
            onClick={onOpenScanModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-shogun-accent/40 bg-shogun-card hover:bg-shogun-accent/15 text-shogun-accent text-xs font-bold font-mono transition shadow-[0_0_15px_rgba(110,232,154,0.15)] hover:border-shogun-accent"
          >
            <Terminal size={13} />
            <span>Summon on Token</span>
          </button>

          {/* Re-convene Council Button */}
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-mono transition disabled:opacity-50"
            title="Trigger Full Council Debate Now"
          >
            <RefreshCw size={13} className={isLoading ? 'animate-spin text-shogun-accent' : ''} />
            <span className="hidden sm:inline">{isLoading ? 'Convening...' : 'Convene'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
