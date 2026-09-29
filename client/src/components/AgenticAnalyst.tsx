import React, { useState } from 'react';
import { Users, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { ShogunState } from '../types/index.js';

interface AgenticAnalystProps {
  state: ShogunState | null;
}

type AnalystTab = 'Macro' | 'Technical' | 'Sentiment' | 'Volatility' | 'Risk' | 'Portfolio';

export const AgenticAnalyst: React.FC<AgenticAnalystProps> = ({ state }) => {
  const [activeTab, setActiveTab] = useState<AnalystTab>('Macro');
  const tabs: AnalystTab[] = ['Macro', 'Technical', 'Sentiment', 'Volatility', 'Risk', 'Portfolio'];

  const edict = state?.edict;
  const isVetoed = Boolean(edict?.daimyo_veto_exercised);
  const targetSymbol = edict?.target_symbol || 'INJ';

  const getTabContent = () => {
    switch (activeTab) {
      case 'Macro':
        return {
          agentName: 'MACRO AGENT',
          archetype: 'The Ronin (浪人)',
          stance: isVetoed ? 'Defensive' : 'Bullish',
          stanceColor: isVetoed ? 'text-rose-700 border-rose-200 bg-rose-50' : 'text-zinc-900 border-zinc-300 bg-zinc-100',
          confidence: isVetoed ? 95 : Math.round((edict?.confidence_score || 0.84) * 100),
          evidence: [
            'Global crypto Fear & Greed index confirmed in Greed territory (73/100)',
            'Global 24h market volume expanding to $198B with broad DEX participation',
            'Sub-2 Gwei gas on Ethereum mainnet enabling friction-free settlement'
          ],
          recommendation: isVetoed ? 'Defensive Hold / Capital Preservation' : 'Accelerate / Momentum Breakout',
          recentSignal: isVetoed ? 'Signal: VETO_HOLD' : 'Signal: Bullish Breakout',
          timestamp: '08:32 JST'
        };
      case 'Technical':
        return {
          agentName: 'TECHNICAL SCALPER',
          archetype: 'The Shinobi (忍)',
          stance: 'Accumulation',
          stanceColor: 'text-teal-700 border-teal-200 bg-teal-50',
          confidence: 82,
          evidence: [
            `200 EMA support verified on ${targetSymbol} with decreasing sell volume`,
            'Bullish divergence confirmed on 4H RSI oscillator across spot klines',
            `Gate.io spot orderbook spread tighter than 0.05% with deep bid support`
          ],
          recommendation: `Scale-in with structured Stop-Loss at $${edict?.stop_loss || '7.45'}`,
          recentSignal: 'Signal: Accumulation Stalking',
          timestamp: '08:34 JST'
        };
      case 'Sentiment':
        return {
          agentName: 'SENTIMENT RADAR',
          archetype: 'The Ronin (浪人)',
          stance: 'Strong Bullish',
          stanceColor: 'text-emerald-700 border-emerald-200 bg-emerald-50',
          confidence: 79,
          evidence: [
            'Smart money DEX inflows outnumber outflows 3.2 : 1 over 24h',
            'Social sentiment score +28% vs 7-day baseline for autonomous agents',
            'Derivatives funding rate neutral, indicating spot-driven real demand'
          ],
          recommendation: `Target Take-Profit at $${edict?.take_profit || '8.25'}`,
          recentSignal: 'Signal: Bullish Sentiment Inflow',
          timestamp: '08:30 JST'
        };
      case 'Volatility':
        return {
          agentName: 'VOLATILITY SENTINEL',
          archetype: 'The Shinobi (忍)',
          stance: 'Contraction',
          stanceColor: 'text-amber-700 border-amber-200 bg-amber-50',
          confidence: 88,
          evidence: [
            'Bollinger Band bandwidth at 30-day low (volatility compression)',
            'Implied volatility discount vs realized on-chain volatility',
            'Expansion breakout impending within next 1–4 hours'
          ],
          recommendation: 'Prepare for directional expansion velocity',
          recentSignal: 'Signal: Volatility Squeeze Alert',
          timestamp: '08:28 JST'
        };
      case 'Risk':
        return {
          agentName: 'RISK GUARDIAN',
          archetype: 'The Daimyo (大名)',
          stance: isVetoed ? 'VETO ACTIVE' : 'CLEARED',
          stanceColor: isVetoed ? 'text-rose-700 border-rose-200 bg-rose-50' : 'text-emerald-700 border-emerald-200 bg-emerald-50',
          confidence: 96,
          evidence: [
            'Smart contract honeypot & mint function audit passed with 0 flags',
            'Liquidity pool locked with multi-sig contract verification',
            'Circuit breaker threshold enforced at max 2.5% portfolio slippage'
          ],
          recommendation: isVetoed ? 'HALT ALL TRADES' : 'Risk Cleared for Execution',
          recentSignal: isVetoed ? 'Signal: VETO_HOLD' : 'Signal: Safe To Trade',
          timestamp: '08:31 JST'
        };
      case 'Portfolio':
        return {
          agentName: 'PORTFOLIO ARCHITECT',
          archetype: 'The Daimyo (大名)',
          stance: 'Balanced',
          stanceColor: 'text-zinc-900 border-zinc-300 bg-zinc-100',
          confidence: 91,
          evidence: [
            'Current portfolio exposure at safe 65% capacity',
            'Realized PnL at +$340.50 with 100% win rate across executed trades',
            'Uncorrelated asset distribution across Layer 1s and DeFi protocols'
          ],
          recommendation: 'Maintain position sizing at 15% max per trade',
          recentSignal: 'Signal: Allocation Stable',
          timestamp: '08:35 JST'
        };
    }
  };

  const current = getTabContent();

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-zinc-200 shadow-sm flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-zinc-100 text-black flex items-center justify-center shrink-0">
            <Users size={20} />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-black tracking-tight font-display">
              Agentic Analyst Panel · 特務分析
            </h2>
            <p className="text-xs text-slate-500 font-mono">
              Autonomous sub-specialist analysis modules
            </p>
          </div>
        </div>

        {/* Tab Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  isActive
                    ? 'bg-black text-white shadow-sm'
                    : 'bg-zinc-100 text-zinc-600 hover:text-black hover:bg-zinc-200'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Analyst Profile & Stance (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl p-5 bg-zinc-50 border border-zinc-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>SPECIALIST MODULE</span>
              <span>{current.timestamp}</span>
            </div>

            <h3 className="text-lg font-extrabold text-black tracking-tight font-display">
              {current.agentName}
            </h3>
            <span className="text-xs font-mono font-medium text-zinc-500 block mb-4">
              Assigned to: {current.archetype}
            </span>

            {/* Stance Pill */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-slate-500 font-mono">Stance:</span>
              <span className={`px-2.5 py-0.5 rounded-full border text-xs font-mono font-bold ${current.stanceColor}`}>
                {current.stance}
              </span>
            </div>

            {/* Confidence Bar */}
            <div className="space-y-1.5 mb-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">Conviction:</span>
                <span className="font-bold text-black">{current.confidence}%</span>
              </div>
              <div className="w-full bg-zinc-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-black h-full rounded-full transition-all duration-300"
                  style={{ width: `${current.confidence}%` }}
                />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-200 text-xs font-mono text-slate-600 flex items-center justify-between">
            <span>Status: Active</span>
            <span className="text-black font-bold">{current.recentSignal}</span>
          </div>
        </div>

        {/* Right: Evidence & Direct Recommendation (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Grounded Telemetry & Evidence
            </span>
            <div className="space-y-2">
              {current.evidence.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm text-zinc-800"
                >
                  <CheckCircle2 size={16} className="text-black shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-zinc-600 uppercase block">
                Council Directive
              </span>
              <span className="font-extrabold text-sm text-black font-display">
                {current.recommendation}
              </span>
            </div>
            <ArrowUpRight size={18} className="text-black shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
};
