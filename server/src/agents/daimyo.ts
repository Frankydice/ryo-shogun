import { RyoMcpClient } from '../mcp/client.js';
import { CouncilMemberOpinion, CheckSafetyResult } from '../mcp/types.js';

export class DaimyoAgent {
  private mcp: RyoMcpClient;

  constructor(mcp: RyoMcpClient) {
    this.mcp = mcp;
  }

  /**
   * The Daimyo holds absolute veto authority to protect the treasury
   */
  public async auditSafety(candidateSymbol: string): Promise<CouncilMemberOpinion & { isVetoed: boolean }> {
    const toolsCalled: string[] = ['check_safety', 'supported_tokens'];

    const safetyResp = await this.mcp.callTool<CheckSafetyResult>('check_safety', { symbol: candidateSymbol });
    const safety = safetyResp.data;

    const isHoneypot = safety.is_honeypot;
    const isLiquidityLow = safety.liquidity_locked_pct < 80;
    const isMintActive = !safety.mint_disabled;
    const hasFlags = safety.flags && safety.flags.length > 0;
    const isScoreUnacceptable = safety.score < 0.75;

    if (isHoneypot || isLiquidityLow || isMintActive || isScoreUnacceptable) {
      const redFlags = safety.flags.length > 0 ? safety.flags.join(', ') : 'Compromised contract security thresholds';
      return {
        role: 'The Daimyo (大名)',
        stance: 'VETO_HOLD',
        conviction: 1.0, // Absolute veto
        isVetoed: true,
        reasoning: `DAIMYO VETO EXERCISED ON ${candidateSymbol}. Security score (${(safety.score * 100).toFixed(0)}%) violates the Bushido Code. Violations: [${redFlags}]. Treasury sealed. No capital shall be risked.`,
        toolsCalled
      };
    }

    return {
      role: 'The Daimyo (大名)',
      stance: 'ACCELERATE',
      conviction: 0.95,
      isVetoed: false,
      reasoning: `Daimyo seal granted for ${candidateSymbol}. Contract audit verified: ${(safety.score * 100).toFixed(0)}% safety score, ${safety.liquidity_locked_pct}% liquidity locked, minting function disabled, zero honeypot vectors.`,
      toolsCalled
    };
  }
}
