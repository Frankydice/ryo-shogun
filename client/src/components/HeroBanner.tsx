import React from 'react';
import { Zap } from 'lucide-react';
import { ShogunState } from '../types/index.js';

interface HeroBannerProps {
  state: ShogunState | null;
  onOpenStatusModal?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ state, onOpenStatusModal }) => {
  const regime = state?.marketOverview?.regime || 'fear_distribution';
  const fearGreed = state?.marketOverview?.fear_greed || 32;
  const btcDom = state?.marketOverview?.btc_dominance || 58.9;
  const gas = state?.marketOverview?.eth_gas_gwei || 9;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#09150e]/80 via-[#060c09]/90 to-black/80 p-6 sm:p-8 backdrop-blur-2xl">
      {/* Ambient background glow orbs & Japanese atmosphere */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-80 w-[450px] rounded-full bg-shogun-accent/15 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-20 right-1/4 h-72 w-96 rounded-full bg-emerald-900/20 blur-[100px]" />

      <div className="relative z-10 flex flex-col gap-5">
        {/* Top Tag & View System Status button */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-shogun-accent/40 bg-shogun-accent/10 px-3.5 py-1 text-xs font-mono text-shogun-accent shadow-[0_0_15px_rgba(110,232,154,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-shogun-accent animate-ping" />
            <span className="font-bold tracking-wide uppercase">RYO-CHAN HACKATHON 2026</span>
            <span className="text-white/30">•</span>
            <span className="text-white/80 font-normal">Agentic SocialFi Challenge</span>
          </div>

          <button
            onClick={onOpenStatusModal}
            className="flex items-center gap-1.5 text-xs font-mono px-3.5 py-1.5 rounded-xl border border-shogun-accent/40 bg-shogun-accent/10 text-shogun-accent hover:bg-shogun-accent/20 transition-all shadow-[0_0_12px_rgba(110,232,154,0.15)]"
          >
            <span>View System Status</span>
            <span>&rarr;</span>
          </button>
        </div>

        {/* Hero Title & Value Proposition */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
          <div className="max-w-2xl">
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Regime-Adaptive <span className="text-transparent bg-clip-text bg-gradient-to-r from-shogun-accent via-emerald-300 to-shogun-gold text-glow-accent">Trading Intelligence</span>
            </h1>
            <p className="mt-2 text-sm sm:text-base text-shogun-ink/80 leading-relaxed font-sans">
              Three autonomous samurai archetypes orchestrating RYO-CHAN's research MCP tools. We turn raw on-chain market evidence into verifiable, veto-guarded execution trails in 30 seconds.
            </p>
          </div>

          {/* Real-time Ticker Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-black/50 border border-white/10 rounded-2xl p-3 text-xs font-mono min-w-[320px]">
            <div>
              <span className="text-[10px] text-shogun-muted uppercase block">Regime</span>
              <span className="font-bold text-xs text-shogun-gold mt-0.5 block uppercase truncate">
                {regime.replace(/_/g, ' ')}
              </span>
            </div>

            <div className="sm:border-l sm:border-white/10 sm:pl-2">
              <span className="text-[10px] text-shogun-muted uppercase block">Fear / Greed</span>
              <span className="font-bold text-xs text-white mt-0.5 block">
                {fearGreed} <span className="text-[10px] text-shogun-gold font-normal">/ 100</span>
              </span>
            </div>

            <div className="border-t sm:border-t-0 sm:border-l sm:border-white/10 pt-1.5 sm:pt-0 sm:pl-2">
              <span className="text-[10px] text-shogun-muted uppercase block">BTC Dom</span>
              <span className="font-bold text-xs text-white mt-0.5 block">
                {btcDom}%
              </span>
            </div>

            <div className="border-t sm:border-t-0 sm:border-l sm:border-white/10 pt-1.5 sm:pt-0 sm:pl-2">
              <span className="text-[10px] text-shogun-muted uppercase block">ETH Gas</span>
              <span className="font-bold text-xs text-shogun-accent mt-0.5 flex items-center gap-0.5">
                <Zap size={12} />
                {gas} Gwei
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
