// ========================================================
// RYO Shogun — MCP & Domain Types
// ========================================================

export type MarketRegime = 'bull_expansion' | 'rotation' | 'fear_distribution' | 'extreme_volatility';

export interface MarketOverviewResult {
  regime: MarketRegime;
  fear_greed: number; // 0 - 100
  btc_dominance: number;
  eth_gas_gwei: number;
  trending_narratives: string[];
  summary: string;
}

export interface ScanMarketResult {
  chain: string;
  top: string[]; // e.g. ["INJ", "PENDLE", "SUI", "AAVE", "TIA"]
  volume_24h_change: Record<string, number>;
  timestamp: string;
}

export interface AnalyzeTokenResult {
  symbol: string;
  price_usd: number;
  trend: 'up' | 'down' | 'sideways';
  rsi_14: number;
  macd_signal: 'bullish_cross' | 'bearish_cross' | 'neutral';
  support_level: number;
  resistance_level: number;
  volatility_atr: number;
}

export interface DeepAnalysisResult {
  symbol: string;
  volume_to_liquidity: number;
  whale_concentration_pct: number;
  net_inflow_24h_usd: number;
  derivatives_open_interest_usd: number;
  funding_rate_pct: number;
  derivatives_bias: 'long_heavy' | 'short_heavy' | 'neutral';
}

export interface CheckSafetyResult {
  symbol: string;
  score: number; // 0.0 to 1.0 (>= 0.75 is safe)
  is_honeypot: boolean;
  liquidity_locked_pct: number;
  mint_disabled: boolean;
  flags: string[];
}

export interface CompareTokensResult {
  candidates: {
    symbol: string;
    composite_score: number;
    risk_adjusted_momentum: number;
  }[];
  winner: string;
  rationale: string;
}

export type CommanderRole = 'The Ronin (浪人)' | 'The Shinobi (忍)' | 'The Daimyo (大名)';

export interface CouncilMemberOpinion {
  role: CommanderRole;
  stance: 'ACCELERATE' | 'STALKING_ENTRY' | 'VETO_HOLD';
  conviction: number; // 0.0 - 1.0
  reasoning: string;
  toolsCalled: string[];
  suggestedAction?: {
    symbol: string;
    entry: number;
    sl: number;
    tp: number;
    rr: number;
  };
}

export interface ShogunEdict {
  edict_id: string;
  timestamp: string;
  regime: MarketRegime;
  active_commander: CommanderRole;
  handover_rationale: string;
  verdict: 'EXECUTE_TRADE' | 'HONORABLE_HOLD';
  target_symbol?: string;
  entry_price?: number;
  stop_loss?: number;
  take_profit?: number;
  risk_reward_ratio?: number;
  confidence_score: number;
  daimyo_veto_exercised: boolean;
  thesis_summary: string;
  full_reasoning_trail: string[];
  thirty_second_brief: string;
}

export interface PaperTrade {
  id: string;
  symbol: string;
  commander: CommanderRole;
  side: 'BUY' | 'SELL';
  entry_price: number;
  current_price: number;
  stop_loss: number;
  take_profit: number;
  size_usd: number;
  status: 'OPEN' | 'CLOSED_TP' | 'CLOSED_SL' | 'MANUALLY_CLOSED';
  pnl_usd: number;
  pnl_pct: number;
  opened_at: string;
  closed_at?: string;
  thesis: string;
}

export interface KaizenPostMortem {
  id: string;
  trade_id: string;
  symbol: string;
  outcome: 'WIN' | 'LOSS';
  realized_pnl_usd: number;
  thesis_evaluation: 'THESIS_CONFIRMED' | 'LUCKY_MACRO_PUMP' | 'STOP_TOO_TIGHT' | 'PREMATURE_BREAKOUT';
  analysis: string;
  dojo_rule_adjustment: string;
  reviewed_at: string;
}
