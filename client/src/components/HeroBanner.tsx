import React from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { ShogunState } from '../types/index.js';

interface HeroBannerProps {
  state: ShogunState | null;
  onConveneCouncil: () => void;
  isLoading: boolean;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  state,
  onConveneCouncil,
  isLoading
}) => {
  const activeCommander = state?.edict?.active_commander || 'The Ronin (浪人)';
  const verdict = state?.edict?.verdict || 'EXECUTE_TRADE';
  const targetSymbol = state?.edict?.target_symbol || 'INJ';
  const confidence = ((state?.edict?.confidence_score || 0.88) * 100).toFixed(0);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-zinc-50/50 to-white">
      {/* Background Subtle Monochrome Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-black/[0.02] rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline, Description & CTAs (7 cols) */}
          <div className="lg:col-span-8 text-center lg:text-left">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
              <span>Next-Gen Autonomous Agent Protocol</span>
              <span className="text-zinc-300">•</span>
              <span className="font-mono">RYO Shogun v2.1</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-black tracking-tight leading-[1.1] mb-6 font-display">
              Co-own Autonomous <br />
              <span className="text-black">
                AI Alpha
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
              RYO Shogun coordinates three autonomous samurai agents to scout, debate, and execute institutional DeFi strategies with strict on-chain risk governance and zero fabricated telemetry.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onConveneCouncil}
                disabled={isLoading}
                className="bg-black hover:bg-zinc-800 text-white font-mono font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl border border-black shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 group"
              >
                <span>{isLoading ? 'Convening Council...' : 'Convene Samurai Council'}</span>
                <ArrowUpRight size={18} className={`transition-transform ${isLoading ? 'animate-pulse' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'}`} />
              </button>

              <button
                onClick={() => handleScrollToSection('market-intelligence')}
                className="bg-white hover:bg-zinc-50 text-black font-mono font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl border border-zinc-300 shadow-sm transition-all"
              >
                Explore Live Markets
              </button>
            </div>
          </div>

          {/* Right Column: Floating Agent Model Card (4 cols) */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative group animate-float">
              {/* Institutional Model Card Container */}
              <div
                className="w-[280px] sm:w-[320px] rounded-3xl p-5 sm:p-6 shadow-xl transition-all duration-300 bg-white border border-zinc-200"
                style={{
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.06), 0 8px 10px -6px rgba(0, 0, 0, 0.03)'
                }}
              >
                {/* Header tag */}
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-4 font-mono">
                  <span>ACTIVE AGENT CORE</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    LIVE
                  </span>
                </div>

                {/* Obsidian Avatar Seal */}
                <div className="w-20 h-20 mx-auto rounded-2xl bg-black border border-zinc-800 flex items-center justify-center text-white font-bold text-3xl font-jp shadow-md my-4">
                  将
                </div>

                <div className="text-center">
                  <div className="text-lg font-extrabold text-black tracking-tight">
                    Shogun-Council-v2.1
                  </div>
                  <div className="text-xs font-medium text-zinc-500 font-mono mt-0.5">
                    Autonomous Multi-Agent Forecaster
                  </div>
                </div>

                {/* Live Model Stats Box */}
                <div className="mt-5 pt-4 border-t border-zinc-100 space-y-2.5 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Commander Seal:</span>
                    <span className="font-bold text-slate-800">{activeCommander.split(' ')[0]}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Conviction:</span>
                    <span className="font-bold text-black">{confidence}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Target Asset:</span>
                    <span className="font-bold text-emerald-600">{targetSymbol}USDT</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Execution Status:</span>
                    <span className="font-bold text-slate-800">{verdict}</span>
                  </div>
                </div>

                {/* Card Sub-Caption */}
                <div className="mt-5 text-center text-xs text-slate-500 font-medium">
                  Autonomous debate turns live market data into verified on-chain execution.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Indicator Chevrons */}
        <div className="flex justify-center mt-12 sm:mt-16">
          <button
            onClick={() => handleScrollToSection('market-intelligence')}
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-black transition-colors cursor-pointer group"
          >
            <span className="text-[11px] font-mono tracking-wider uppercase font-semibold text-slate-400 group-hover:text-black">
              Live Terminal
            </span>
            <div className="flex flex-col items-center -space-y-1.5 animate-bounce">
              <ChevronDown size={18} className="text-zinc-600" />
              <ChevronDown size={18} className="text-zinc-400" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
