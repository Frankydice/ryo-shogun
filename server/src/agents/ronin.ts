import { RyoMcpClient } from '../mcp/client.js';
import { CouncilMemberOpinion, AnalyzeTokenResult, ScanMarketResult } from '../mcp/types.js';

export class RoninAgent {
  private mcp: RyoMcpClient;

  constructor(mcp: RyoMcpClient) {
    this.mcp = mcp;
  }

  /**
   * The Ronin evaluates momentum velocity and breakout structure
   */
  public async evaluate(candidateSymbol: string): Promise<CouncilMemberOpinion> {
    const toolsCalled: string[] = ['scan_market', 'analyze_token'];
    
    // 1. Scan token technicals
    const analyzeResp = await this.mcp.callTool<AnalyzeTokenResult>('analyze_token', { symbol: candidateSymbol });
    const token = analyzeResp.data;

    const isMomentumStrong = token.trend === 'up' && token.rsi_14 >= 55 && token.rsi_14 <= 75;
    const isBullishMacd = token.macd_signal === 'bullish_cross';

    if (isMomentumStrong && isBullishMacd) {
      const entry = token.price_usd;
      const sl = Number((entry - (token.volatility_atr * 1.5)).toFixed(4));
      const tp = Number((entry + (token.volatility_atr * 3.5)).toFixed(4));
      const rr = Number(((tp - entry) / (entry - sl)).toFixed(2));

      return {
        role: 'The Ronin (浪人)',
        stance: 'ACCELERATE',
        conviction: 0.88,
        reasoning: `Blade drawn on ${candidateSymbol}. Confirmed upward trajectory with RSI at ${token.rsi_14.toFixed(1)} and bullish MACD expansion. High velocity breakout favored.`,
        toolsCalled,
        suggestedAction: {
          symbol: candidateSymbol,
          entry,
          sl,
          tp,
          rr
        }
      };
    }

    if (token.rsi_14 > 80) {
      return {
        role: 'The Ronin (浪人)',
        stance: 'VETO_HOLD',
        conviction: 0.75,
        reasoning: `RSI on ${candidateSymbol} is dangerously over-extended (${token.rsi_14.toFixed(1)}). Chasing into resistance invites exhaustion. Awaiting cooldown.`,
        toolsCalled
      };
    }

    return {
      role: 'The Ronin (浪人)',
      stance: 'STALKING_ENTRY',
      conviction: 0.50,
      reasoning: `${candidateSymbol} has trend (${token.trend}) but lacks breakout velocity. Keep the sword sheathed until resistance at $${token.resistance_level} is tested.`,
      toolsCalled
    };
  }
}
