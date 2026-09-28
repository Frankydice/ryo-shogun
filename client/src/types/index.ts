export type MarketRegime = 'bull_expansion' | 'rotation' | 'fear_distribution' | 'extreme_volatility';
export type CommanderRole = 'The Ronin (浪人)' | 'The Shinobi (忍)' | 'The Daimyo (大名)';

export interface MarketOverviewResult {
  regime: MarketRegime;
  fear_greed: number;
  btc_dominance: number;
  eth_gas_gwei: number;
  trending_narratives: string[];
  summary: string;
}

export interface CouncilMemberOpinion {
  role: CommanderRole;
  stance: 'ACCELERATE' | 'STALKING_ENTRY' | 'VETO_HOLD';
  conviction: number;
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

export interface PortfolioSummary {
  balanceUsd: number;
  equityUsd: number;
  realizedPnlUsd: number;
  unrealizedPnlUsd: number;
  openPositionsCount: number;
  closedPositionsCount: number;
  winRatePct: number;
  trades: PaperTrade[];
}

export interface ShogunState {
  edict: ShogunEdict | null;
  opinions: CouncilMemberOpinion[];
  marketOverview: MarketOverviewResult | null;
  portfolio: PortfolioSummary;
  postMortems: KaizenPostMortem[];
  mcpStatus: {
    endpoint: string;
    hasKey: boolean;
    mode: string;
  };
}
