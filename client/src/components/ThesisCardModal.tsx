import React, { useRef, useState } from 'react';
import { X, Twitter, Copy, Check, Sparkles, Download } from 'lucide-react';
import { toPng } from 'html-to-image';
import { ShogunEdict } from '../types/index.js';

interface ThesisCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  edict: ShogunEdict | null;
}

export const ThesisCardModal: React.FC<ThesisCardModalProps> = ({
  isOpen,
  onClose,
  edict
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen || !edict) return null;

  const tweetText = encodeURIComponent(
    `⚡ The Shogun Council has spoken!\n\n` +
    `🎌 Commander: ${edict.active_commander}\n` +
    `🎯 Target: ${edict.target_symbol || 'MARKET'} | Verdict: ${edict.verdict}\n` +
    `📊 Risk:Reward: 1:${edict.risk_reward_ratio || '2.3'} | Conviction: ${(edict.confidence_score * 100).toFixed(0)}%\n` +
    `🛡️ Daimyo Safety: ${edict.daimyo_veto_exercised ? 'VETOED' : 'APPROVED'}\n\n` +
    `Proof of Thesis: "${edict.thesis_summary}"\n\n` +
    `#RYOHackathon #AgenticSocialFi #Tokyo2026`
  );

  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

  const handleCopyText = () => {
    const rawText =
      `⚡ [RYO SHOGUN PROOF OF THESIS]\n` +
      `Commander: ${edict.active_commander}\n` +
      `Target: ${edict.target_symbol || 'MARKET'} (${edict.verdict})\n` +
      `Entry: $${edict.entry_price || '—'} | SL: $${edict.stop_loss || '—'} | TP: $${edict.take_profit || '—'}\n` +
      `R:R: 1:${edict.risk_reward_ratio || '—'} | Conviction: ${(edict.confidence_score * 100).toFixed(0)}%\n` +
      `Thesis: ${edict.thesis_summary}\n` +
      `Verified by RYO Shogun Autonomous Council.`;

    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    try {
      setDownloading(true);
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `shogun_thesis_${edict.target_symbol || 'edict'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export card image:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto no-scrollbar rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-2xl flex flex-col gap-5">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-zinc-100 text-zinc-900">
              <Sparkles size={16} />
            </span>
            <span className="font-mono font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-wider">
              Export Proof of Thesis · 布告証明
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 transition">
            <X size={18} />
          </button>
        </div>

        {/* Capture Target Card */}
        <div
          ref={cardRef}
          className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 sm:p-6 shadow-md relative overflow-hidden"
        >
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold font-display text-slate-900">
                  RYO <span className="text-black font-black">SHOGUN</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-zinc-300 text-zinc-900 bg-zinc-100 font-bold">
                  AUTONOMOUS THESIS
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {new Date(edict.timestamp).toLocaleDateString()}
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-1">
                <span>Commander: <strong className="text-slate-800">{edict.active_commander}</strong></span>
                <span className="font-bold text-black">{edict.verdict}</span>
              </div>
              <h3 className="text-2xl font-mono font-black text-slate-900 tracking-tight">
                {edict.target_symbol}USDT
              </h3>
            </div>

            <div className="bg-white rounded-xl p-3.5 border border-slate-200 text-xs sm:text-sm text-slate-700 font-sans italic">
              "{edict.thesis_summary}"
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/80 text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[10px]">ENTRY</span>
                <span className="font-bold text-slate-800">${edict.entry_price || '—'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">TAKE PROFIT</span>
                <span className="font-bold text-emerald-600">${edict.take_profit || '—'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">CONVICTION</span>
                <span className="font-bold text-black">{((edict.confidence_score || 0.88) * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <a
            href={tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition shadow-sm"
          >
            <Twitter size={15} />
            <span>Post to X</span>
          </a>

          <button
            onClick={handleCopyText}
            className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-mono font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            <span>{copied ? 'Copied!' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handleDownloadImage}
            disabled={downloading}
            className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-mono font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition disabled:opacity-50"
          >
            <Download size={14} />
            <span>{downloading ? 'Exporting...' : 'PNG'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
