import {
  MarketOverviewResult,
  ScanMarketResult,
  AnalyzeTokenResult,
  DeepAnalysisResult,
  CheckSafetyResult,
  CompareTokensResult
} from './types.js';
import { mockMarketOverviews, mockTokenCatalog } from './mockData.js';

export class RyoMcpClient {
  private endpoint: string;
  private apiKey: string | null;
  private isLiveConnected = false;

  constructor(endpoint = 'https://app-ryochan.com/api/mcp', apiKey?: string) {
    this.endpoint = endpoint;
    this.apiKey = apiKey && apiKey.trim().length > 0 ? apiKey.trim() : null;
  }

  public setApiKey(key: string) {
    this.apiKey = key.trim();
  }

  public getStatus() {
    return {
      endpoint: this.endpoint,
      hasKey: Boolean(this.apiKey),
      mode: this.apiKey ? 'LIVE_MCP_CREDENTIALED' : 'LOCAL_BUSHIDO_SIMULATOR'
    };
  }

  /**
   * Universal caller over JSON-RPC 2.0 with Honest Provenance fallback
   */
  public async callTool<T>(toolName: string, args: Record<string, any> = {}): Promise<{ data: T; provenance: 'LIVE_MCP' | 'LOCAL_FALLBACK' }> {
    if (this.apiKey) {
      try {
        const payload = {
          jsonrpc: '2.0',
          id: Date.now(),
          method: 'tools/call',
          params: {
            name: toolName,
            arguments: args
          }
        };

        const res = await fetch(this.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          const json = await res.json();
          if (json.result && json.result.content) {
            const parsed = JSON.parse(json.result.content[0].text);
            return { data: parsed as T, provenance: 'LIVE_MCP' };
          }
        }
      } catch (err) {
        console.warn(`[RyoMcpClient] Live call to ${toolName} failed, falling back to local deterministic cache:`, (err as Error).message);
      }
    }

    // Fallback: Honest Local Deterministic Simulation
    const fallbackData = this.getMockResponse(toolName, args);
    return { data: fallbackData as T, provenance: 'LOCAL_FALLBACK' };
  }

  private getMockResponse(toolName: string, args: Record<string, any>): any {
    switch (toolName) {
      case 'market_overview': {
        const index = Math.floor(Date.now() / 60000) % mockMarketOverviews.length;
        return mockMarketOverviews[index];
      }

      case 'scan_market': {
        const chain = args.chain || 'eth';
        return {
          chain,
          top: ['INJ', 'PENDLE', 'AAVE', 'MEME_RUG'],
          volume_24h_change: {
            INJ: 34.2,
            PENDLE: 28.1,
            AAVE: 14.5,
            MEME_RUG: 142.0
          },
          timestamp: new Date().toISOString()
        } as ScanMarketResult;
      }

      case 'analyze_token': {
        const symbol = (args.symbol || 'INJ').toUpperCase();
        if (mockTokenCatalog[symbol]) {
          return mockTokenCatalog[symbol].analyze;
        }
        return {
          symbol,
          price_usd: 10.0,
          trend: 'up',
          rsi_14: 60,
          macd_signal: 'bullish_cross',
          support_level: 9.2,
          resistance_level: 11.5,
          volatility_atr: 0.5
        } as AnalyzeTokenResult;
      }

      case 'deep_analysis': {
        const symbol = (args.symbol || 'INJ').toUpperCase();
        if (mockTokenCatalog[symbol]) {
          return mockTokenCatalog[symbol].deep;
        }
        return {
          symbol,
          volume_to_liquidity: 1.2,
          whale_concentration_pct: 30.0,
          net_inflow_24h_usd: 5000000,
          derivatives_open_interest_usd: 50000000,
          funding_rate_pct: 0.01,
          derivatives_bias: 'long_heavy'
        } as DeepAnalysisResult;
      }

      case 'check_safety': {
        const symbol = (args.symbol || 'INJ').toUpperCase();
        if (mockTokenCatalog[symbol]) {
          return mockTokenCatalog[symbol].safety;
        }
        return {
          symbol,
          score: 0.85,
          is_honeypot: false,
          liquidity_locked_pct: 95.0,
          mint_disabled: true,
          flags: []
        } as CheckSafetyResult;
      }

      case 'compare_tokens': {
        return {
          candidates: [
            { symbol: 'INJ', composite_score: 88, risk_adjusted_momentum: 2.1 },
            { symbol: 'PENDLE', composite_score: 82, risk_adjusted_momentum: 1.9 },
            { symbol: 'AAVE', composite_score: 75, risk_adjusted_momentum: 1.4 },
            { symbol: 'MEME_RUG', composite_score: 22, risk_adjusted_momentum: 0.3 }
          ],
          winner: 'INJ',
          rationale: 'INJ demonstrates superior relative momentum with 0 security red flags and positive net funding inflows.'
        } as CompareTokensResult;
      }

      case 'supported_tokens': {
        return {
          supported_chains: ['ethereum', 'arbitrum', 'base'],
          tokens: ['INJ', 'PENDLE', 'AAVE', 'SUI', 'VIRTUAL', 'ETH', 'WBTC']
        };
      }

      default:
        throw new Error(`Unknown RYO MCP tool: ${toolName}`);
    }
  }
}
