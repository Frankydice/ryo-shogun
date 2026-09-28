import React, { useState } from 'react';
import { Users, ShieldCheck, ChevronRight } from 'lucide-react';
import { ShogunState } from '../types/index.js';

interface AgenticAnalystProps {
  state: ShogunState | null;
}

type AnalystTab = 'Macro' | 'Technical' | 'Sentiment' | 'Volatility' | 'Risk' | 'Portfolio';

export const AgenticAnalyst: React.FC<AgenticAnalystProps> = ({ state }) => {
  const [activeTab, setActiveTab] = useState<AnalystTab>('Macro');

  const tabs: AnalystTab[] = ['Macro', 'Technical', 'Sentiment', 'Volatility', 'Risk', 'Portfolio'];

  // Current council opinions & edict
  const edict = state?.edict;
  const isVetoed = Boolean(edict?.daimyo_veto_exercised);
  const activeCommander = edict?.active_commander || 'The Ronin (浪人)';

  // Determine agent card content based on tab
  const getTabContent = () => {
    switch (activeTab) {
      case 'Macro':
        return {
          agentName: 'MACRO AGENT',
          archetype: 'The Ronin (浪人)',
          stance: isVetoed ? 'Defensive' : 'Bullish',
          stanceColor: isVetoed ? 'text-shogun-crimson border-shogun-crimson/40 bg-shogun-crimson/15' : 'text-shogun-accent border-shogun-accent/40 bg-shogun-accent/15',
          confidence: isVetoed ? 95 : Math.round((edict?.confidence_score || 0.84) * 100),
          evidence: [
            'Rate-cut expectation increased across global liquid indexes',
            'Risk appetite improving; on-chain DEX velocity expanding',
            'RYO MCP on-chain momentum confirmed across key pairs'
          ],
          recommendation: isVetoed ? 'Defensive Hold / Cash Preservation' : 'Long Bias / Momentum Expansion',
          recentSignal: isVetoed ? 'Signal: VETO_HOLD' : 'Signal: Bullish Breakout',
          timestamp: '08:32 JST'
        };
      case 'Technical':
        return {
          agentName: 'TECHNICAL SCALPER',
          archetype: 'The Shinobi (忍)',
          stance: 'Accumulation',
          stanceColor: 'text-teal-300 border-teal-400/40 bg-teal-950/30',
          confidence: 82,
          evidence: [
            '200 EMA support retested with declining sell volume',
            'Bullish divergence confirmed on 4H RSI oscillator',
            'Liquidity cluster sweep executed at $128.40 entry zone'
          ],
          recommendation: 'Scale-in with structured Stop-Loss at $126.10',
          recentSignal: 'Signal: Accumulation Stalking',
          timestamp: '08:34 JST'
        };
      case 'Sentiment':
        return {
          agentName: 'SENTIMENT RADAR',
          archetype: 'The Ronin (浪人)',
          stance: 'Strong Bullish',
          stanceColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30',
          confidence: 79,
          evidence: [
            'Social sentiment score +28% vs 7-day baseline',
            'Smart money wallet inflows outnumber outflows 3.2 : 1',
            'Negative funding rate squeeze potential high'
          ],
          recommendation: 'Target Take-Profit at $133.20 (+3.7%)',
          recentSignal: 'Signal: Bullish Sentiment Inflow',
          timestamp: '08:30 JST'
        };
      case 'Volatility':
        return {
          agentName: 'VOLATILITY SENTINEL',
          archetype: 'The Shinobi (忍)',
          stance: 'Contraction',
          stanceColor: 'text-shogun-gold border-shogun-gold/40 bg-shogun-gold/15',
          confidence: 88,
          evidence: [
            'Bollinger Band bandwidth at 30-day low (compression)',
            'Implied volatility discount vs realized volatility',
            'Expansion impending within next 1–4 hours'
          ],
          recommendation: 'Prepare for directional expansion breakout',
          recentSignal: 'Signal: Volatility Squeeze Alert',
          timestamp: '08:28 JST'
        };
      case 'Risk':
        return {
          agentName: 'RISK GUARDIAN',
          archetype: 'The Daimyo (大名)',
          stance: isVetoed ? 'VETO ACTIVE' : 'CLEARED',
          stanceColor: isVetoed ? 'text-shogun-crimson border-shogun-crimson/50 bg-shogun-crimson/20' : 'text-shogun-accent border-shogun-accent/50 bg-shogun-accent/20',
          confidence: 96,
          evidence: [
            'Smart contract honeypot & mint function audit passed',
            'Liquidity pool locked with multi-sig verification',
            'Circuit breaker threshold set to max 2.5% portfolio slippage'
          ],
          recommendation: isVetoed ? 'HALT ALL TRADES' : 'Risk Cleared for Execution',
          recentSignal: isVetoed ? 'Signal: VETOED' : 'Signal: Safe to Deploy',
          timestamp: '08:35 JST'
        };
      case 'Portfolio':
        return {
          agentName: 'TREASURY ALLOCATOR',
          archetype: 'Council Arbiter',
          stance: 'Balanced',
          stanceColor: 'text-purple-300 border-purple-400/40 bg-purple-950/30',
          confidence: 90,
          evidence: [
            'Current portfolio exposure at optimal 68% range',
            'Max single-asset exposure capped at 15% of equity',
            'Cash reserve buffer of $4,800 intact for drawdowns'
          ],
          recommendation: 'Maintain position sizing at 5% risk allocation',
          recentSignal: 'Signal: Normal Allocation',
          timestamp: '08:36 JST'
        };
    }
  };

  const current = getTabContent();

  return (
    <div className="glass-panel rounded-3xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-3.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-shogun-accent/15 text-shogun-accent">
              <Users size={16} />
            </span>
            <span className="font-mono font-extrabold text-xs uppercase tracking-widest text-white">
              Agentic Analyst
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.2 rounded-full border border-shogun-accent/40 bg-shogun-accent/10 text-shogun-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-shogun-accent animate-ping" />
              LIVE
            </span>
          </div>

          <ChevronRight size={16} className="text-shogun-muted" />
        </div>

        {/* Tab Row */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                  isActive
                    ? 'bg-shogun-accent/15 text-shogun-accent font-bold border border-shogun-accent/40 shadow-[0_0_10px_rgba(110,232,154,0.15)]'
                    : 'text-shogun-muted hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Active Agent Card */}
        <div className="glass-card rounded-2xl p-4 flex flex-col gap-3.5 border border-white/[0.08]">
          {/* Agent Header & Stance */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-shogun-accent/15 border border-shogun-accent/30 flex items-center justify-center text-shogun-accent font-bold font-mono text-xs">
                将
              </div>
              <div>
                <span className="font-mono font-bold text-xs text-white block">
                  {current.agentName}
                </span>
                <span className="text-[10px] font-mono text-shogun-muted">
                  {activeCommander}
                </span>
              </div>
            </div>

            <span
              className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg border ${current.stanceColor}`}
            >
              {current.stance}
            </span>
          </div>

          {/* Confidence Score Bar */}
          <div className="flex items-center justify-between text-xs font-mono bg-black/40 border border-white/[0.05] rounded-xl p-2.5">
            <span className="text-shogun-muted">Confidence Rating</span>
            <div className="flex items-center gap-1.5 font-bold text-shogun-accent">
              <ShieldCheck size={14} />
              <span>{current.confidence}%</span>
            </div>
          </div>

          {/* Key Evidence Bullets */}
          <div>
            <span className="text-[11px] font-mono text-shogun-muted uppercase block mb-1.5">
              Key Evidence
            </span>
            <ul className="flex flex-col gap-1.5 text-xs text-shogun-ink/90 font-sans">
              {current.evidence.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                  <span className="text-shogun-accent mt-0.5">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendation */}
          <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
            <span className="text-shogun-muted">Recommendation</span>
            <span className="font-bold text-white text-right truncate max-w-[200px]">
              {current.recommendation}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Timestamp & Recent Signal */}
      <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/[0.06] text-[11px] font-mono text-shogun-muted">
        <span className="text-white/80 font-bold">{current.recentSignal}</span>
        <span>Time: {current.timestamp}</span>
      </div>
    </div>
  );
};
