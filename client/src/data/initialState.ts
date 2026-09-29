import { ShogunState } from '../types/index.js';

export const initialShogunState: ShogunState = {
  edict: {
    edict_id: 'edict_seed_001',
    timestamp: new Date().toISOString(),
    regime: 'bull_expansion',
    active_commander: 'The Ronin (浪人)',
    handover_rationale: 'Bullish regime expansion detected with rising market breadth and high risk-appetite.',
    verdict: 'EXECUTE_TRADE',
    target_symbol: 'INJ',
    entry_price: 7.67,
    stop_loss: 7.35,
    take_profit: 8.45,
    risk_reward_ratio: 2.43,
    confidence_score: 0.88,
    daimyo_veto_exercised: false,
    thesis_summary: 'Momentum breakout confirmed on INJ with surging on-chain volume and tight risk parameter.',
    full_reasoning_trail: [
      'The Ronin scouted +18% 24h volume expansion via live Gate.io and EVM feeds',
      'The Shinobi confirmed stealth whale accumulation clusters at $7.60 via on-chain flow analysis',
      'The Daimyo verified 96% security score, liquidity locked, and zero honeypot vectors'
    ],
    thirty_second_brief: 'Bullish regime expansion active. The Ronin leads capital deployment into INJ targeting $8.45 with Daimyo safety clearance.'
  },
  opinions: [
    {
      role: 'The Ronin (浪人)',
      stance: 'ACCELERATE',
      conviction: 92,
      reasoning: 'Clear bullish momentum structure on INJ. Relative strength against market benchmark indicates sustained upside.',
      toolsCalled: ['scan_market', 'analyze_token'],
      suggestedAction: { symbol: 'INJ', entry: 7.67, sl: 7.35, tp: 8.45, rr: 2.43 }
    },
    {
      role: 'The Shinobi (忍)',
      stance: 'ACCELERATE',
      conviction: 85,
      reasoning: 'On-chain accumulation verified. Smart money inflows detected across liquid DEX pairs over past 4 hours.',
      toolsCalled: ['deep_analysis', 'compare_tokens'],
      suggestedAction: { symbol: 'INJ', entry: 7.67, sl: 7.35, tp: 8.45, rr: 2.43 }
    },
    {
      role: 'The Daimyo (大名)',
      stance: 'ACCELERATE',
      conviction: 95,
      reasoning: 'Daimyo seal granted for INJ. Contract audit verified: 96% safety score, 100% liquidity locked, minting function disabled, zero honeypot vectors.',
      toolsCalled: ['check_safety', 'supported_tokens']
    }
  ],
  marketOverview: {
    regime: 'bull_expansion',
    fear_greed: 73,
    btc_dominance: 56.0,
    eth_gas_gwei: 1.3,
    trending_narratives: ['Autonomous AI Agents', 'Olas Agent Economies', 'DeFi Restaking & Perps', 'Layer-2 Liquidity Inflows'],
    summary: 'Macro liquidity expanding across major ecosystems. Risk-on rotation favored for momentum breakouts.'
  },
  portfolio: {
    balanceUsd: 10006.15,
    equityUsd: 10346.65,
    realizedPnlUsd: 340.50,
    unrealizedPnlUsd: 340.50,
    openPositionsCount: 1,
    closedPositionsCount: 1,
    winRatePct: 100,
    trades: [
      {
        id: 'trade_seed_001',
        symbol: 'INJ',
        commander: 'The Ronin (浪人)',
        side: 'BUY',
        entry_price: 7.67,
        current_price: 7.73,
        stop_loss: 7.35,
        take_profit: 8.45,
        size_usd: 1500,
        status: 'OPEN',
        pnl_usd: 11.73,
        pnl_pct: 0.78,
        opened_at: new Date(Date.now() - 3600000).toISOString(),
        thesis: 'Momentum breakout confirmed on INJ with surging on-chain volume.'
      },
      {
        id: 'trade_seed_002',
        symbol: 'PENDLE',
        commander: 'The Shinobi (忍)',
        side: 'BUY',
        entry_price: 2.10,
        current_price: 2.48,
        stop_loss: 1.95,
        take_profit: 2.48,
        size_usd: 2000,
        status: 'CLOSED_TP',
        pnl_usd: 340.50,
        pnl_pct: 18.29,
        opened_at: new Date(Date.now() - 14400000).toISOString(),
        closed_at: new Date(Date.now() - 3600000).toISOString(),
        thesis: 'Stealth accumulation at $2.10 support. Target of $2.48 hit without testing stop-loss.'
      }
    ]
  },
  postMortems: [
    {
      id: 'km_postmortem_001',
      trade_id: 'trade_seed_002',
      symbol: 'PENDLE',
      outcome: 'WIN',
      realized_pnl_usd: 340.50,
      thesis_evaluation: 'THESIS_CONFIRMED',
      analysis: 'Stealth accumulation at $2.10 support confirmed by whale wallet cluster analysis. TP executed before liquidity exhaustion.',
      dojo_rule_adjustment: 'Increase Shinobi weight by 5% in Rotation regime',
      reviewed_at: new Date(Date.now() - 3600000).toISOString()
    }
  ],
  mcpStatus: {
    endpoint: 'https://app-ryochan.com/api/mcp',
    hasKey: false,
    mode: 'FACTUAL_LIVE_ORACLE'
  }
};
