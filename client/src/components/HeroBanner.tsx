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
    <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50/50 to-white">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline, Description & CTAs (7 cols) */}
          <div className="lg:col-span-8 text-center lg:text-left">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-purple-700 text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
              <span>Next-Gen Autonomous Agent Protocol</span>
              <span className="text-purple-300">•</span>
              <span className="font-mono">RYO Shogun v2.1</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
              Co-own Autonomous <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600">
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
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium text-base px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 group"
              >
                <span>Convene Samurai Council</span>
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => handleScrollToSection('market-intelligence')}
                className="bg-white hover:bg-slate-50 text-slate-800 font-medium text-base px-8 py-3.5 rounded-xl border border-slate-200 shadow-sm transition-all"
              >
                Explore Live Markets
              </button>
            </div>
          </div>

          {/* Right Column: Floating Agent Model Card (styled after Olas-Predict-R1-14B) (4 cols) */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative group animate-float">
              {/* Olas-style Model Card Container */}
              <div
                className="w-[280px] sm:w-[320px] rounded-3xl p-5 sm:p-6 shadow-xl transition-all duration-300 bg-white border border-slate-200"
                style={{
                  boxShadow: '0 20px 25px -5px rgba(126, 34, 206, 0.08), 0 8px 10px -6px rgba(126, 34, 206, 0.04)'
                }}
              >
                {/* Header tag */}
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-4 font-mono">
                  <span>ACTIVE AGENT CORE</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    LIVE
                  </span>
                </div>

                {/* Glowing Avatar Seal */}
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-400 flex items-center justify-center text-white font-bold text-3xl font-jp shadow-lg shadow-purple-500/25 my-4">
                  将
                </div>

                <div className="text-center">
                  <div className="text-lg font-extrabold text-slate-900 tracking-tight">
                    Shogun-Council-v2.1
                  </div>
                  <div className="text-xs font-medium text-purple-700 font-mono mt-0.5">
                    Autonomous Multi-Agent Forecaster
                  </div>
                </div>

                {/* Live Model Stats Box */}
                <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Commander Seal:</span>
                    <span className="font-bold text-slate-800">{activeCommander.split(' ')[0]}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Conviction:</span>
                    <span className="font-bold text-purple-700">{confidence}%</span>
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

                {/* Card Sub-Caption (Olas style) */}
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
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-purple-600 transition-colors cursor-pointer group"
          >
            <span className="text-[11px] font-mono tracking-wider uppercase font-semibold text-slate-400 group-hover:text-purple-600">
              Live Terminal
            </span>
            <div className="flex flex-col items-center -space-y-1.5 animate-bounce">
              <ChevronDown size={18} className="text-purple-500" />
              <ChevronDown size={18} className="text-purple-400" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
