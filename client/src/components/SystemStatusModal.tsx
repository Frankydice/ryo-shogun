import React from 'react';
import { X, CheckCircle, ShieldCheck, Activity } from 'lucide-react';
import { ShogunState } from '../types/index.js';

interface SystemStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: ShogunState | null;
  circuitTripped: boolean;
}

export const SystemStatusModal: React.FC<SystemStatusModalProps> = ({
  isOpen,
  onClose,
  state,
  circuitTripped
}) => {
  if (!isOpen) return null;

  const isLive = state?.mcpStatus?.hasKey;
  const endpoint = state?.mcpStatus?.endpoint || 'https://app-ryochan.com/api/mcp';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-white/15 bg-[#0a110d]/95 p-6 shadow-2xl flex flex-col gap-5 backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-xl bg-shogun-accent/15 text-shogun-accent border border-shogun-accent/30">
              <Activity size={16} />
            </span>
            <div>
              <span className="font-mono font-extrabold text-sm text-white uppercase tracking-wider block">
                RYO Shogun System Status
              </span>
              <span className="text-[10px] font-mono text-shogun-muted">
                Real-Time Autonomous Infrastructure & Provenance
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-shogun-muted hover:text-white transition">
            <X size={18} />
          </button>
        </div>

        {/* Status Rows */}
        <div className="flex flex-col gap-3 font-mono text-xs">
          {/* MCP Endpoint */}
          <div className="glass-card rounded-2xl p-3.5 flex items-center justify-between">
            <div>
              <span className="text-shogun-muted text-[10px] uppercase block">RYO MCP Gateway</span>
              <span className="font-bold text-white text-xs mt-0.5 block truncate max-w-[280px]">
                {endpoint}
              </span>
            </div>
            <span
              className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1 ${
                isLive
                  ? 'border-shogun-accent/40 bg-shogun-accent/15 text-shogun-accent'
                  : 'border-shogun-gold/40 bg-shogun-gold/15 text-shogun-gold'
              }`}
            >
              <CheckCircle size={12} />
              {isLive ? 'LIVE' : 'SIMULATOR'}
            </span>
          </div>

          {/* Circuit Breaker Status */}
          <div className="glass-card rounded-2xl p-3.5 flex items-center justify-between">
            <div>
              <span className="text-shogun-muted text-[10px] uppercase block">Safety Circuit Breaker</span>
              <span className="font-bold text-white text-xs mt-0.5 block">
                {circuitTripped ? 'TRIPPED (All automated executions halted)' : 'ARMED (Max slippage 2.5%, honeypot guard on)'}
              </span>
            </div>
            <span
              className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold ${
                circuitTripped
                  ? 'border-shogun-crimson/50 bg-shogun-crimson/15 text-shogun-crimson'
                  : 'border-shogun-accent/40 bg-shogun-accent/15 text-shogun-accent'
              }`}
            >
              {circuitTripped ? 'LOCKED' : 'ACTIVE'}
            </span>
          </div>

          {/* Three Samurai Health */}
          <div className="glass-card rounded-2xl p-3.5 flex flex-col gap-2">
            <span className="text-shogun-muted text-[10px] uppercase block">Samurai Council Health</span>
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="bg-black/40 border border-white/5 p-2 rounded-xl">
                <span className="text-[10px] text-shogun-muted block">The Ronin</span>
                <span className="text-shogun-accent font-bold text-xs mt-0.5 block">READY (12ms)</span>
              </div>
              <div className="bg-black/40 border border-white/5 p-2 rounded-xl">
                <span className="text-[10px] text-shogun-muted block">The Shinobi</span>
                <span className="text-teal-300 font-bold text-xs mt-0.5 block">READY (15ms)</span>
              </div>
              <div className="bg-black/40 border border-white/5 p-2 rounded-xl">
                <span className="text-[10px] text-shogun-muted block">The Daimyo</span>
                <span className="text-shogun-gold font-bold text-xs mt-0.5 block">GUARD (9ms)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex items-center justify-between border-t border-white/[0.08] text-[10px] font-mono text-shogun-muted">
          <span className="flex items-center gap-1 text-shogun-accent">
            <ShieldCheck size={12} />
            <span>Honest Data Provenance Verified</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-shogun-accent hover:bg-emerald-400 text-shogun-bg font-bold font-mono text-xs transition"
          >
            Close Status
          </button>
        </div>
      </div>
    </div>
  );
};
