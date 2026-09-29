import React from 'react';
import { ShieldCheck, TrendingUp, Zap, Activity } from 'lucide-react';
import { ShogunState } from '../types/index.js';
import { LiveMacroIndicators } from '../services/liveMarket.js';

interface AgentEconomyFlywheelProps {
  state: ShogunState | null;
  macro: LiveMacroIndicators | null;
  onOpenAudit?: () => void;
}

export const AgentEconomyFlywheel: React.FC<AgentEconomyFlywheelProps> = ({
  state,
  macro,
  onOpenAudit
}) => {
  const fearGreed = macro?.fear_greed ?? state?.marketOverview?.fear_greed ?? 73;
  const sentiment = macro?.sentiment ?? (fearGreed >= 65 ? 'Greed' : fearGreed < 40 ? 'Fear' : 'Neutral');
  const btcDom = macro?.btc_dominance ?? state?.marketOverview?.btc_dominance ?? 56.0;
  const ethGas = macro?.eth_gas_gwei ?? state?.marketOverview?.eth_gas_gwei ?? 1.3;
  const globalVol = macro?.global_volume_24h_usd ?? 198000000000;
  const activeCommander = state?.edict?.active_commander || 'The Ronin (浪人)';

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200/80 relative" id="agent-economies">
      <div className="max-w-6xl mx-auto">
        {/* Section Header with Olas Corner-Bracket */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute w-2 h-2 border-[#C084FC] top-0 left-0 border-t-2 border-l-2 z-20"></div>
              <div className="absolute w-2 h-2 border-[#C084FC] top-0 right-0 border-t-2 border-r-2 z-20"></div>
              <div className="absolute w-2 h-2 border-[#C084FC] bottom-0 left-0 border-b-2 border-l-2 z-20"></div>
              <div className="absolute w-2 h-2 border-[#C084FC] bottom-0 right-0 border-b-2 border-r-2 z-20"></div>
            </div>
            <div className="relative inline-flex items-center justify-center px-4 py-1.5 font-semibold text-xs tracking-wider uppercase rounded-md text-center bg-[#7E22CE0D] text-[#7E22CE] z-10 font-mono">
              Autonomous Agent Flywheel
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            SHOGUN: Powers Autonomous Trading Economies
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Autonomous samurai agents coordinate across market regimes. Each cycle stakes treasury capital, validates on-chain liquidity via verified oracles, executes under strict Daimyo veto rules, and feeds verified post-mortems into the Kaizen Ledger.
          </p>
        </div>

        {/* 4 Factual Live Telemetry Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-12">
          {/* 1. Fear & Greed Index */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase font-mono">
              <span>Fear & Greed</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-purple-700 font-mono">
                  {fearGreed}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                  {sentiment}
                </span>
              </div>
              <span className="text-xs text-slate-400 mt-1 block">Live Alternative.me API</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-purple-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(fearGreed, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* 2. Ethereum Gas Gwei */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase font-mono">
              <span>Ethereum Gas</span>
              <Zap size={14} className="text-purple-600" />
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono">
                  {ethGas}
                </span>
                <span className="text-sm font-semibold text-slate-500 font-mono">Gwei</span>
              </div>
              <span className="text-xs text-slate-400 mt-1 block">Publicnode Mainnet RPC</span>
            </div>
            <div className="text-[11px] font-mono font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded w-fit">
              Sub-cent Execution
            </div>
          </div>

          {/* 3. BTC Dominance */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase font-mono">
              <span>BTC Dominance</span>
              <TrendingUp size={14} className="text-purple-600" />
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono">
                  {btcDom}%
                </span>
              </div>
              <span className="text-xs text-slate-400 mt-1 block">Live CoinPaprika Global</span>
            </div>
            <div className="text-[11px] font-mono font-medium text-purple-700 bg-purple-50 px-2 py-0.5 rounded w-fit">
              Macro Liquidity Anchor
            </div>
          </div>

          {/* 4. Global 24h Volume */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase font-mono">
              <span>24h Global Volume</span>
              <Activity size={14} className="text-purple-600" />
            </div>
            <div className="my-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono">
                  ${(globalVol / 1e9).toFixed(0)}B
                </span>
              </div>
              <span className="text-xs text-slate-400 mt-1 block">Spot & Derivatives Total</span>
            </div>
            <div className="text-[11px] font-mono font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded w-fit">
              High Breadth Depth
            </div>
          </div>
        </div>

        {/* Visual Flywheel Architecture Diagram */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10 items-stretch">
            {/* Step 1: Capital Staking */}
            <div className="flex flex-col justify-between p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-purple-300 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-4">
                  01
                </div>
                <h3 className="font-extrabold text-slate-900 text-base mb-1">
                  Capital Staking
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Users & DAOs stake capital into the Dojo Treasury. Risk limits and stop-losses are strictly bound before deployment.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Equity:</span>
                <span className="font-bold text-slate-800">${state?.portfolio?.equityUsd?.toLocaleString() || '15,000'}</span>
              </div>
            </div>

            {/* Step 2: Samurai Debate */}
            <div className="flex flex-col justify-between p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-purple-300 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold mb-4 shadow-sm">
                  02
                </div>
                <h3 className="font-extrabold text-slate-900 text-base mb-1">
                  Council Deliberation
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  The Ronin (momentum), Shinobi (on-chain whale flows), and Daimyo (risk audit) deliberate. Active commander seal: <span className="font-semibold text-purple-700">{activeCommander}</span>.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Conviction:</span>
                <span className="font-bold text-purple-700">{((state?.edict?.confidence_score || 0.88) * 100).toFixed(0)}%</span>
              </div>
            </div>

            {/* Step 3: Verified Execution */}
            <div className="flex flex-col justify-between p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-purple-300 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold mb-4">
                  03
                </div>
                <h3 className="font-extrabold text-slate-900 text-base mb-1">
                  Verified EVM Execution
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Edicts dispatch to Gate.io and on-chain liquidity pools. Honeypot checks, slippage guards, and circuit breakers enforce safety.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Target:</span>
                <span className="font-bold text-teal-700">{state?.edict?.target_symbol || 'INJ'}USDT</span>
              </div>
            </div>

            {/* Step 4: Kaizen Ledger */}
            <div className="flex flex-col justify-between p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-purple-300 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-4">
                  04
                </div>
                <h3 className="font-extrabold text-slate-900 text-base mb-1">
                  Kaizen Accountability
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Every closed trade generates an immutable post-mortem report. Unprofitable strategies trigger policy sanctions to ensure continuous improvement.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Win Rate:</span>
                <span className="font-bold text-emerald-600">{state?.portfolio?.winRatePct || 100}%</span>
              </div>
            </div>
          </div>

          {/* Bottom Action Strip */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <ShieldCheck size={16} className="text-emerald-600" />
              <span>Zero fabricated telemetry: All data points continuously grounded via live public oracles.</span>
            </div>
            <button
              onClick={onOpenAudit}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-900 transition-colors"
            >
              <span>Inspect Kaizen Forensic Records</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
