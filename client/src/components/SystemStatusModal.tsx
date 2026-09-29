import React from 'react';
import { X, CheckCircle, Activity } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto no-scrollbar rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-2xl flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-xl bg-zinc-100 text-zinc-900">
              <Activity size={18} />
            </span>
            <div>
              <span className="font-mono font-bold text-sm text-slate-900 uppercase tracking-wider block">
                RYO Shogun System Status
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                Real-Time Autonomous Infrastructure & Provenance
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 transition">
            <X size={18} />
          </button>
        </div>

        {/* Status Rows */}
        <div className="flex flex-col gap-3 font-mono text-xs">
          {/* MCP Endpoint */}
          <div className="rounded-2xl p-4 bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-slate-400 text-[10px] uppercase block">RYO MCP Gateway</span>
              <span className="font-bold text-slate-800 text-xs mt-0.5 block truncate max-w-[280px]">
                {endpoint}
              </span>
            </div>
            <span
              className={`px-2.5 py-1 rounded-full border text-[10px] font-bold flex items-center gap-1 ${
                isLive
                  ? 'border-zinc-300 bg-zinc-100 text-zinc-900'
                  : 'border-emerald-300 bg-emerald-100 text-emerald-800'
              }`}
            >
              <CheckCircle size={12} />
              {isLive ? 'CREDENTIALED' : 'LIVE ORACLE'}
            </span>
          </div>

          {/* Circuit Breaker Status */}
          <div className="rounded-2xl p-4 bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-slate-400 text-[10px] uppercase block">Safety Circuit Breaker</span>
              <span className="font-bold text-slate-800 text-xs mt-0.5 block">
                {circuitTripped ? 'TRIPPED (All automated executions halted)' : 'ARMED (Max slippage 2.5%, honeypot guard on)'}
              </span>
            </div>
            <span
              className={`px-2.5 py-1 rounded-full border text-[10px] font-bold ${
                circuitTripped
                  ? 'border-rose-300 bg-rose-100 text-rose-800'
                  : 'border-emerald-300 bg-emerald-100 text-emerald-800'
              }`}
            >
              {circuitTripped ? 'LOCKED' : 'ACTIVE'}
            </span>
          </div>

          {/* Three Samurai Health */}
          <div className="rounded-2xl p-4 bg-slate-50 border border-slate-200/80 flex flex-col gap-2">
            <span className="text-slate-400 text-[10px] uppercase block">Samurai Council Health</span>
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="bg-white border border-slate-200 p-2.5 rounded-xl shadow-sm">
                <span className="text-[10px] text-slate-400 block font-semibold">The Ronin</span>
                <span className="text-zinc-900 font-bold text-xs mt-0.5 block">READY (12ms)</span>
              </div>
              <div className="bg-white border border-slate-200 p-2.5 rounded-xl shadow-sm">
                <span className="text-[10px] text-slate-400 block font-semibold">The Shinobi</span>
                <span className="text-zinc-800 font-bold text-xs mt-0.5 block">READY (15ms)</span>
              </div>
              <div className="bg-white border border-slate-200 p-2.5 rounded-xl shadow-sm">
                <span className="text-[10px] text-slate-400 block font-semibold">The Daimyo</span>
                <span className="text-zinc-800 font-bold text-xs mt-0.5 block">READY (9ms)</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-mono font-bold text-xs shadow-sm transition"
        >
          Close Status Monitor
        </button>
      </div>
    </div>
  );
};
