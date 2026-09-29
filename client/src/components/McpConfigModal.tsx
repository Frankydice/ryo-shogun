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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md max-h-[92vh] overflow-y-auto no-scrollbar rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-2xl flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-100 text-purple-700">
              <Key size={16} />
            </span>
            <span className="font-mono font-bold text-sm text-slate-900 uppercase tracking-wider">
              RYO-CHAN MCP Configuration
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 transition">
            <X size={18} />
          </button>
        </div>

        {/* Status Info */}
        <div className="text-xs text-slate-600 leading-relaxed flex flex-col gap-2.5">
          <p>
            RYO Shogun connects to the official RYO-CHAN Model Context Protocol endpoint at{' '}
            <code className="text-purple-700 font-mono bg-purple-50 px-1.5 py-0.5 rounded">https://app-ryochan.com/api/mcp</code>.
          </p>
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center justify-between">
            <span className="font-medium text-slate-600">Status:</span>
            <span className="font-mono font-bold text-emerald-700 flex items-center gap-1">
              <ShieldCheck size={14} />
              {currentKey ? 'Live Credential Active' : 'Live Public Oracles Active'}
            </span>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div>
            <label className="text-xs font-mono font-bold text-slate-700 block mb-1.5">
              Enter Builder MCP Key:
            </label>
            <input
              type="password"
              placeholder="ryo_mcp_..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 font-mono focus:border-purple-600 focus:bg-white focus:outline-none transition"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <a
              href="https://discord.gg/qkWPjxzxtC"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-purple-700 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Request Key on Discord</span>
              <ExternalLink size={12} />
            </a>

            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-mono font-bold text-xs shadow-sm transition"
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
