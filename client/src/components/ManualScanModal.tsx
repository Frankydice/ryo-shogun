import React, { useState } from 'react';
import { X, Terminal, ArrowRight } from 'lucide-react';

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

  const quickCandidates = ['INJ', 'PENDLE', 'AAVE', 'MEME_RUG', 'SUI'];

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-shogun-surface p-6 shadow-2xl flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-shogun-accent/10 text-shogun-accent">
              <Terminal size={16} />
            </span>
            <span className="font-mono font-bold text-sm text-white uppercase tracking-wider">
              Summon Council on Token
            </span>
          </div>
          <button onClick={onClose} className="p-1 text-shogun-muted hover:text-white transition">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-mono text-white block mb-1.5">
              Target Token Ticker Symbol:
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. INJ, PENDLE, AAVE, MEME_RUG..."
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                autoFocus
                className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white placeholder:text-shogun-muted font-mono focus:border-shogun-accent focus:outline-none uppercase"
              />
            </div>
          </div>

          {/* Quick Select Tokens */}
          <div>
            <span className="text-[11px] font-mono text-shogun-muted block mb-1.5">Quick Presets:</span>
            <div className="flex flex-wrap gap-1.5">
              {quickCandidates.map((sym) => (
                <button
                  type="button"
                  key={sym}
                  onClick={() => handleQuickSelect(sym)}
                  className={`text-xs font-mono px-2.5 py-1 rounded-lg border transition ${
                    sym === 'MEME_RUG'
                      ? 'border-shogun-crimson/40 bg-shogun-crimson/10 text-shogun-crimson hover:bg-shogun-crimson/20'
                      : 'border-white/10 bg-white/5 text-shogun-muted hover:text-white hover:border-white/20'
                  }`}
                >
                  {sym} {sym === 'MEME_RUG' && '(Test Veto)'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-xl text-xs font-mono text-shogun-muted hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !tokenInput.trim()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-shogun-accent hover:bg-emerald-400 text-shogun-bg font-mono font-bold text-xs transition disabled:opacity-50"
            >
              <span>Convene Shogun</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
