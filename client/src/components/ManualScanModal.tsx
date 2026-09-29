import React, { useState } from 'react';
import { X, Terminal } from 'lucide-react';

interface ManualScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConvene: (symbol: string) => void;
  isLoading: boolean;
}

export const ManualScanModal: React.FC<ManualScanModalProps> = ({
  isOpen,
  onClose,
  onConvene,
  isLoading
}) => {
  const [tokenInput, setTokenInput] = useState('');

  if (!isOpen) return null;

  const quickCandidates = ['BTC', 'ETH', 'SOL', 'INJ', 'PENDLE', 'AAVE', 'MEME_RUG'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenInput.trim()) {
      onConvene(tokenInput.trim().toUpperCase());
      onClose();
    }
  };

  const handleQuickSelect = (sym: string) => {
    onConvene(sym);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md max-h-[92vh] overflow-y-auto no-scrollbar rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-2xl flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-zinc-100 text-zinc-900">
              <Terminal size={16} />
            </span>
            <span className="font-mono font-bold text-sm text-slate-900 uppercase tracking-wider">
              Summon Council on Token
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 transition">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div>
            <label className="text-xs font-mono font-bold text-slate-700 block mb-1.5">
              Target Token Ticker Symbol:
            </label>
            <input
              type="text"
              placeholder="e.g. INJ, PENDLE, AAVE, SOL, BTC..."
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              autoFocus
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 font-mono focus:border-black focus:bg-white focus:outline-none uppercase transition"
            />
          </div>

          {/* Quick Select Tokens */}
          <div>
            <span className="text-[11px] font-mono text-slate-400 block mb-1.5">Quick Presets:</span>
            <div className="flex flex-wrap gap-1.5">
              {quickCandidates.map((sym) => (
                <button
                  type="button"
                  key={sym}
                  onClick={() => handleQuickSelect(sym)}
                  className={`text-xs font-mono px-2.5 py-1 rounded-lg border transition ${
                    sym === 'MEME_RUG'
                      ? 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-zinc-100 hover:text-black hover:border-black'
                  }`}
                >
                  {sym} {sym === 'MEME_RUG' && '(Test Veto)'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl text-xs font-mono text-slate-500 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 rounded-xl bg-black hover:bg-zinc-800 text-white font-mono font-bold text-xs shadow-sm transition disabled:opacity-50"
            >
              {isLoading ? 'Convening...' : 'Evaluate Token'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
