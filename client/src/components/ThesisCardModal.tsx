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
    `⚡ The Shogun Council has spoken on @ryodigital @app_ryochan!\n\n` +
    `🎌 Commander: ${edict.active_commander}\n` +
    `🎯 Target: ${edict.target_symbol || 'MARKET'} | Verdict: ${edict.verdict}\n` +
    `📊 Risk:Reward: 1:${edict.risk_reward_ratio || '2.3'} | Conviction: ${(edict.confidence_score * 100).toFixed(0)}%\n` +
    `🛡️ Daimyo Safety: ${edict.daimyo_veto_exercised ? 'VETOED' : 'APPROVED'}\n\n` +
    `Proof of Thesis: "${edict.thesis_summary}"\n\n` +
    `#RYOHackathon #AgenticSocialFi #DeFAI #Tokyo2026`
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-shogun-surface p-6 shadow-2xl flex flex-col gap-5">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-shogun-accent/10 text-shogun-accent">
              <Sparkles size={16} />
            </span>
            <span className="font-mono font-bold text-sm text-white uppercase tracking-wider">
              Export Proof of Thesis · 布告証明
            </span>
          </div>
          <button onClick={onClose} className="p-1 text-shogun-muted hover:text-white transition">
            <X size={18} />
          </button>
        </div>

        {/* The Aesthetic Card (Capture Target) */}
        <div
          ref={cardRef}
          className="rounded-2xl border border-shogun-accent/30 bg-gradient-to-br from-[#07110c] via-[#0b1712] to-[#050806] p-6 shadow-2xl relative overflow-hidden"
        >
          {/* Watermark */}
          <div className="absolute -right-4 -bottom-6 pointer-events-none select-none text-white/[0.04] text-9xl font-black font-jp">
            将軍
          </div>

          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold font-display text-white">
                  RYO <span className="text-shogun-accent">SHOGUN</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-shogun-gold/40 text-shogun-gold bg-shogun-gold/10">
                  PROOF OF THESIS
                </span>
              </div>
              <span className="text-[10px] font-mono text-shogun-muted">
                {new Date(edict.timestamp).toLocaleDateString()}
              </span>
            </div>

            {/* Target & Verdict */}
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] font-mono text-shogun-muted uppercase block">Target Token</span>
                <span className="text-2xl font-bold text-white font-mono">{edict.target_symbol || 'MARKET'}</span>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-shogun-muted uppercase block">Command Verdict</span>
                <span className="text-sm font-bold font-mono px-2.5 py-1 rounded bg-shogun-accent/20 text-shogun-accent border border-shogun-accent/30">
                  {edict.verdict}
                </span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 bg-black/40 border border-white/5 rounded-xl p-3 text-center">
              <div>
                <span className="text-[10px] font-mono text-shogun-muted block">Entry</span>
                <span className="text-xs font-bold text-white font-mono">
                  {edict.entry_price ? `$${edict.entry_price}` : '—'}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-shogun-muted block">Risk / Reward</span>
                <span className="text-xs font-bold text-shogun-accent font-mono">
                  {edict.risk_reward_ratio ? `1 : ${edict.risk_reward_ratio}` : 'N/A'}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-shogun-muted block">Conviction</span>
                <span className="text-xs font-bold text-shogun-gold font-mono">
                  {(edict.confidence_score * 100).toFixed(0)}%
                </span>
              </div>
            </div>

            {/* Thesis Rationale */}
            <p className="text-xs font-sans text-white/90 leading-relaxed italic bg-black/30 p-3 rounded-lg border-l-2 border-shogun-gold">
              "{edict.thesis_summary}"
            </p>

            {/* Card Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-mono text-shogun-muted">
              <span>Commander: {edict.active_commander}</span>
              <span className="text-shogun-accent">RYO-CHAN Hackathon 2026</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
          <button
            onClick={handleCopyText}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-white transition"
          >
            {copied ? <Check size={14} className="text-shogun-accent" /> : <Copy size={14} />}
            <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
          </button>

          <button
            onClick={handleDownloadImage}
            disabled={downloading}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-white transition"
          >
            <Download size={14} />
            <span>{downloading ? 'Rendering...' : 'Save PNG Card'}</span>
          </button>

          <a
            href={tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-shogun-accent hover:bg-emerald-400 text-shogun-bg font-mono font-bold text-xs transition shadow-[0_0_15px_rgba(110,232,154,0.3)]"
          >
            <Twitter size={14} />
            <span>Post to X (Win Award)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
