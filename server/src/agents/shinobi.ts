import { RyoMcpClient } from '../mcp/client.js';
import { CouncilMemberOpinion, DeepAnalysisResult, CompareTokensResult } from '../mcp/types.js';

export class ShinobiAgent {
  private mcp: RyoMcpClient;

  constructor(mcp: RyoMcpClient) {
    this.mcp = mcp;
  }

  /**
   * The Shinobi evaluates stealth on-chain flows and hidden accumulation
   */
  public async evaluate(candidateSymbol: string): Promise<CouncilMemberOpinion> {
    const toolsCalled: string[] = ['deep_analysis', 'compare_tokens'];

    // 1. Deep analysis of derivatives and whale flows
    const deepResp = await this.mcp.callTool<DeepAnalysisResult>('deep_analysis', { symbol: candidateSymbol });
    const deep = deepResp.data;

    // 2. Head-to-head comparison
    const compResp = await this.mcp.callTool<CompareTokensResult>('compare_tokens', {});
    const comp = compResp.data;

    const hasNetInflows = deep.net_inflow_24h_usd > 0;
    const isWhaleConcentrationSafe = deep.whale_concentration_pct < 45;
    const isRelativeWinner = comp.winner === candidateSymbol;

    if (hasNetInflows && isWhaleConcentrationSafe && isRelativeWinner) {
      return {
        role: 'The Shinobi (忍)',
        stance: 'ACCELERATE',
        conviction: 0.84,
        reasoning: `Quiet footprints detected. 24h net inflow of +$${(deep.net_inflow_24h_usd / 1e6).toFixed(2)}M with dispersed whale holdings (${deep.whale_concentration_pct}%). Relative strength score dominates cohort. Accumulate from the shadows.`,
        toolsCalled
      };
    }

    if (deep.whale_concentration_pct > 70) {
      return {
        role: 'The Shinobi (忍)',
        stance: 'VETO_HOLD',
        conviction: 0.90,
        reasoning: `Shadow trap identified on ${candidateSymbol}. Extreme whale concentration of ${deep.whale_concentration_pct}%. An exit by a single entity will liquidate the book.`,
        toolsCalled
      };
    }

    return {
      role: 'The Shinobi (忍)',
      stance: 'STALKING_ENTRY',
      conviction: 0.60,
      reasoning: `Net flows on ${candidateSymbol} are mixed ($${(deep.net_inflow_24h_usd / 1e6).toFixed(2)}M). Awaiting funding rate stabilization (${(deep.funding_rate_pct * 100).toFixed(3)}%).`,
      toolsCalled
    };
  }
}
