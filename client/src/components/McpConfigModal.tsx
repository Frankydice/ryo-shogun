import React, { useState } from 'react';
import { X, Key, ShieldCheck, ExternalLink, Check } from 'lucide-react';

interface McpConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentKey: boolean;
  onSaveKey: (key: string) => void;
}

export const McpConfigModal: React.FC<McpConfigModalProps> = ({
  isOpen,
  onClose,
  currentKey,
  onSaveKey
}) => {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSaveKey(apiKey.trim());
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        onClose();
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-shogun-surface p-6 shadow-2xl flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-shogun-gold/10 text-shogun-gold">
              <Key size={16} />
            </span>
            <span className="font-mono font-bold text-sm text-white uppercase tracking-wider">
              RYO-CHAN MCP Configuration
            </span>
          </div>
          <button onClick={onClose} className="p-1 text-shogun-muted hover:text-white transition">
            <X size={18} />
          </button>
        </div>

        {/* Status Info */}
        <div className="text-xs text-shogun-muted leading-relaxed flex flex-col gap-2">
          <p>
            RYO Shogun connects to the official RYO-CHAN Model Context Protocol endpoint at{' '}
            <code className="text-shogun-accent font-mono">https://app-ryochan.com/api/mcp</code>.
          </p>
          <div className="bg-black/40 border border-white/5 p-3 rounded-xl flex items-center justify-between">
            <span>Status:</span>
            <span className="font-mono font-bold text-shogun-accent flex items-center gap-1">
              <ShieldCheck size={14} />
              {currentKey ? 'Live Credential Active' : 'Bushido Deterministic Mode'}
            </span>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-mono text-white block mb-1.5">
              Enter your Builder MCP Key:
            </label>
            <input
              type="password"
              placeholder="ryo_mcp_..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white placeholder:text-shogun-muted font-mono focus:border-shogun-accent focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <a
              href="https://discord.gg/qkWPjxzxtC"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-shogun-gold hover:underline flex items-center gap-1"
            >
              <span>Request Key on Discord</span>
              <ExternalLink size={12} />
            </a>

            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-shogun-accent hover:bg-emerald-400 text-shogun-bg font-mono font-bold text-xs transition"
            >
              {saved ? <Check size={14} /> : null}
              <span>{saved ? 'Saved!' : 'Activate Key'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
