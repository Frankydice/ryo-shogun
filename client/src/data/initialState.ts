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
    entry_price: 24.85,
    stop_loss: 23.35,
    take_profit: 28.50,
    risk_reward_ratio: 2.43,
    confidence_score: 0.88,
    daimyo_veto_exercised: false,
    thesis_summary: 'Momentum breakout confirmed on INJ with surging on-chain volume and tight risk parameter.',
    full_reasoning_trail: [
      'The Ronin scouted +18% 24h volume expansion via mcp::scan_market()',
      'The Shinobi confirmed stealth whale accumulation clusters at $24.80 via mcp::deep_analysis()',
      'The Daimyo verified 94% security score, liquidity locked, and zero honeypot vectors via mcp::check_safety()'
    ],
    thirty_second_brief: 'Bullish regime expansion active. The Ronin leads capital deployment into INJ targeting $28.50 with Daimyo safety clearance.'
  },
  opinions: [
    {
      role: 'The Ronin (浪人)',
      stance: 'ACCELERATE',
      conviction: 92,
      reasoning: 'Clear bullish momentum structure. Relative strength against market benchmark indicates sustained upside.',
      toolsCalled: ['scan_market', 'analyze_token'],
      suggestedAction: { symbol: 'INJ', entry: 24.85, sl: 23.35, tp: 28.50, rr: 2.43 }
    },
    {
      role: 'The Shinobi (忍)',
      stance: 'ACCELERATE',
      conviction: 85,
      reasoning: 'On-chain accumulation verified. Smart money inflows detected across liquid DEX pairs over past 4 hours.',
      toolsCalled: ['deep_analysis', 'compare_tokens'],
      suggestedAction: { symbol: 'INJ', entry: 24.85, sl: 23.35, tp: 28.50, rr: 2.43 }
    },
    {
      role: 'The Daimyo (大名)',
      stance: 'ACCELERATE',
      conviction: 95,
      reasoning: 'Daimyo seal granted for INJ. Contract audit verified: 94% safety score, 100% liquidity locked, minting function disabled, zero honeypot vectors.',
      toolsCalled: ['check_safety', 'supported_tokens']
    }
  ],
  marketOverview: {
    regime: 'bull_expansion',
    fear_greed: 72,
    btc_dominance: 56.4,
    eth_gas_gwei: 18,
    trending_narratives: ['DeFAI Autonomous Agents', 'Tokenized Real World Equities', 'Layer-1 Execution Layers'],
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
        entry_price: 24.85,
        current_price: 25.80,
        stop_loss: 23.35,
        take_profit: 28.50,
        size_usd: 1500,
        status: 'OPEN',
        pnl_usd: 57.34,
        pnl_pct: 3.82,
        opened_at: new Date(Date.now() - 3600000).toISOString(),
        thesis: 'Momentum breakout confirmed on INJ with surging on-chain volume.'
      },
      {
        id: 'trade_seed_002',
        symbol: 'PENDLE',
        commander: 'The Shinobi (忍)',
        side: 'BUY',
        entry_price: 4.10,
        current_price: 4.85,
        stop_loss: 3.85,
        take_profit: 4.85,
        size_usd: 2000,
        status: 'CLOSED_TP',
        pnl_usd: 340.50,
        pnl_pct: 18.29,
        opened_at: new Date(Date.now() - 14400000).toISOString(),
        closed_at: new Date(Date.now() - 3600000).toISOString(),
        thesis: 'Stealth accumulation at $4.10 support. Target of $4.85 hit without testing stop-loss.'
      }
    ]
  },
  postMortems: [
    {
      id: 'kaizen_seed_001',
      trade_id: 'trade_seed_002',
      symbol: 'PENDLE',
      outcome: 'WIN',
      realized_pnl_usd: 340.50,
      thesis_evaluation: 'THESIS_CONFIRMED',
      analysis: 'The Shinobi accurately spotted stealth accumulation at $4.10 support. Target of $4.85 hit without testing stop-loss.',
      dojo_rule_adjustment: 'Maintain 1.5x ATR buffer on high-yield rotation tokens.',
      reviewed_at: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 'kaizen_seed_002',
      trade_id: 'trade_seed_003',
      symbol: 'MEME_RUG',
      outcome: 'WIN',
      realized_pnl_usd: 0.00,
      thesis_evaluation: 'THESIS_CONFIRMED',
      analysis: 'The Daimyo successfully executed an autonomous safety veto before capital commitment. Zero drawdown sustained.',
      dojo_rule_adjustment: 'Mandate minimum $1M locked DEX liquidity threshold for all unverified token contracts.',
      reviewed_at: new Date(Date.now() - 7200000).toISOString()
    }
  ],
  mcpStatus: {
    endpoint: 'https://app-ryochan.com/api/mcp',
    hasKey: true,
    mode: 'deterministic_fallback'
  }
};
