import {
  MarketOverviewResult,
  ScanMarketResult,
  AnalyzeTokenResult,
  DeepAnalysisResult,
  CheckSafetyResult,
  CompareTokensResult
} from './types.js';

export const mockMarketOverviews: MarketOverviewResult[] = [
  {
    regime: 'bull_expansion',
    fear_greed: 72,
    btc_dominance: 56.4,
    eth_gas_gwei: 18,
    trending_narratives: ['AI Agents', 'DeFAI Infrastructure', 'Base Ecosystem Breakouts'],
    summary: 'Strong speculative momentum across Layer 2s. Breadth expanding into high-beta AI and DeFi runners.'
  },
  {
    regime: 'rotation',
    fear_greed: 58,
    btc_dominance: 54.1,
    eth_gas_gwei: 14,
    trending_narratives: ['DeFi Yield Rotation', 'Cross-Chain Restaking'],
    summary: 'Capital rotating out of large-caps into selective mid-cap quality. Choppy sideways action on majors.'
  },
  {
    regime: 'fear_distribution',
    fear_greed: 32,
    btc_dominance: 58.9,
    eth_gas_gwei: 9,
    trending_narratives: ['Cash Preservation', 'Hedging Volatility'],
    summary: 'Market in defensive posture following macroeconomic uncertainty. Low liquidity and elevated slippage.'
  }
];

export const mockTokenCatalog: Record<string, {
  analyze: AnalyzeTokenResult;
  deep: DeepAnalysisResult;
  safety: CheckSafetyResult;
}> = {
  INJ: {
    analyze: {
      symbol: 'INJ',
      price_usd: 24.85,
      trend: 'up',
      rsi_14: 64.2,
      macd_signal: 'bullish_cross',
      support_level: 22.40,
      resistance_level: 27.50,
      volatility_atr: 1.15
    },
    deep: {
      symbol: 'INJ',
      volume_to_liquidity: 1.85,
      whale_concentration_pct: 34.2,
      net_inflow_24h_usd: 12450000,
      derivatives_open_interest_usd: 84000000,
      funding_rate_pct: 0.012,
      derivatives_bias: 'long_heavy'
    },
    safety: {
      symbol: 'INJ',
      score: 0.94,
      is_honeypot: false,
      liquidity_locked_pct: 100,
      mint_disabled: true,
      flags: []
    }
  },
  PENDLE: {
    analyze: {
      symbol: 'PENDLE',
      price_usd: 4.62,
      trend: 'up',
      rsi_14: 59.8,
      macd_signal: 'bullish_cross',
      support_level: 4.10,
      resistance_level: 5.20,
      volatility_atr: 0.28
    },
    deep: {
      symbol: 'PENDLE',
      volume_to_liquidity: 1.42,
      whale_concentration_pct: 28.5,
      net_inflow_24h_usd: 6800000,
      derivatives_open_interest_usd: 42000000,
      funding_rate_pct: 0.008,
      derivatives_bias: 'long_heavy'
    },
    safety: {
      symbol: 'PENDLE',
      score: 0.91,
      is_honeypot: false,
      liquidity_locked_pct: 100,
      mint_disabled: true,
      flags: []
    }
  },
  AAVE: {
    analyze: {
      symbol: 'AAVE',
      price_usd: 182.40,
      trend: 'up',
      rsi_14: 54.1,
      macd_signal: 'neutral',
      support_level: 168.00,
      resistance_level: 198.00,
      volatility_atr: 7.20
    },
    deep: {
      symbol: 'AAVE',
      volume_to_liquidity: 0.95,
      whale_concentration_pct: 42.1,
      net_inflow_24h_usd: 8900000,
      derivatives_open_interest_usd: 110000000,
      funding_rate_pct: 0.005,
      derivatives_bias: 'neutral'
    },
    safety: {
      symbol: 'AAVE',
      score: 0.96,
      is_honeypot: false,
      liquidity_locked_pct: 100,
      mint_disabled: true,
      flags: []
    }
  },
  MEME_RUG: {
    analyze: {
      symbol: 'MEME_RUG',
      price_usd: 0.0042,
      trend: 'up',
      rsi_14: 86.4,
      macd_signal: 'bullish_cross',
      support_level: 0.0010,
      resistance_level: 0.0050,
      volatility_atr: 0.0012
    },
    deep: {
      symbol: 'MEME_RUG',
      volume_to_liquidity: 8.50,
      whale_concentration_pct: 82.4,
      net_inflow_24h_usd: -240000,
      derivatives_open_interest_usd: 0,
      funding_rate_pct: 0.0,
      derivatives_bias: 'neutral'
    },
    safety: {
      symbol: 'MEME_RUG',
      score: 0.28,
      is_honeypot: false,
      liquidity_locked_pct: 12.0,
      mint_disabled: false,
      flags: ['High whale concentration (>80%)', 'Unlocked liquidity pool', 'Mint function active in contract']
    }
  }
};
