import { RyoMcpClient } from '../mcp/client.js';
import {
  CommanderRole,
  CouncilMemberOpinion,
  MarketOverviewResult,
  ScanMarketResult,
  ShogunEdict
} from '../mcp/types.js';
import { RoninAgent } from './ronin.js';
import { ShinobiAgent } from './shinobi.js';
import { DaimyoAgent } from './daimyo.js';

export class ShogunCouncil {
  private mcp: RyoMcpClient;
  private ronin: RoninAgent;
  private shinobi: ShinobiAgent;
  private daimyo: DaimyoAgent;
  private lastEdict: ShogunEdict | null = null;

  constructor(mcp: RyoMcpClient) {
    this.mcp = mcp;
    this.ronin = new RoninAgent(mcp);
    this.shinobi = new ShinobiAgent(mcp);
    this.daimyo = new DaimyoAgent(mcp);
  }

  public getLastEdict(): ShogunEdict | null {
    return this.lastEdict;
  }

  /**
   * Run a full council session across RYO tools
   */
  public async conveneCouncil(customCandidate?: string): Promise<{
    edict: ShogunEdict;
    opinions: CouncilMemberOpinion[];
    marketOverview: MarketOverviewResult;
  }> {
    const reasoningTrail: string[] = [];
    const timestamp = new Date().toISOString();

    // Step 1: Query Market Overview to assess macro regime
    reasoningTrail.push(`[${timestamp}] [MCP:market_overview] Querying global market regime & sentiment.`);
    const overviewResp = await this.mcp.callTool<MarketOverviewResult>('market_overview', {});
    const overview = overviewResp.data;
    reasoningTrail.push(`[Provenance: ${overviewResp.provenance}] Regime: ${overview.regime} | Fear & Greed: ${overview.fear_greed}/100 | BTC Dom: ${overview.btc_dominance}%`);

    // Step 2: Determine Commander Mantle Handover
    let activeCommander: CommanderRole;
    let handoverRationale: string;

    if (overview.fear_greed >= 65 || overview.regime === 'bull_expansion') {
      activeCommander = 'The Ronin (浪人)';
      handoverRationale = `High speculative momentum (Fear/Greed: ${overview.fear_greed}) activates The Ronin. Aggressive breakout velocity takes priority.`;
    } else if (overview.regime === 'rotation' || (overview.fear_greed >= 40 && overview.fear_greed < 65)) {
      activeCommander = 'The Shinobi (忍)';
      handoverRationale = `Market in selective rotation mode (Fear/Greed: ${overview.fear_greed}). The Shinobi takes the command seal to hunt stealth accumulation before price breakout.`;
    } else {
      activeCommander = 'The Daimyo (大名)';
      handoverRationale = `Extreme defensive conditions detected (Fear/Greed: ${overview.fear_greed}). The Daimyo seizes supreme authority to lock the treasury and forbid reckless exposure.`;
    }
    reasoningTrail.push(`[Council Handover] Seal assigned to ${activeCommander}. Rationale: ${handoverRationale}`);

    // Step 3: Candidate Selection
    let targetSymbol = customCandidate;
    if (!targetSymbol) {
      reasoningTrail.push(`[${new Date().toISOString()}] [MCP:scan_market] Scanning EVM pairs for volume surges.`);
      const scanResp = await this.mcp.callTool<ScanMarketResult>('scan_market', { chain: 'eth' });
      targetSymbol = scanResp.data.top[0] || 'INJ';
      reasoningTrail.push(`[Candidate Selected] Top momentum candidate: ${targetSymbol}`);
    }

    // Step 4: Gather Opinions from all 3 Samurai
    reasoningTrail.push(`[${new Date().toISOString()}] Summoning Council evaluations on ${targetSymbol}.`);
    
    // The Ronin's evaluation
    const roninOpinion = await this.ronin.evaluate(targetSymbol);
    reasoningTrail.push(`[Ronin Analysis] ${roninOpinion.stance} (Conviction: ${(roninOpinion.conviction * 100).toFixed(0)}%) -> "${roninOpinion.reasoning}"`);

    // The Shinobi's evaluation
    const shinobiOpinion = await this.shinobi.evaluate(targetSymbol);
    reasoningTrail.push(`[Shinobi Analysis] ${shinobiOpinion.stance} (Conviction: ${(shinobiOpinion.conviction * 100).toFixed(0)}%) -> "${shinobiOpinion.reasoning}"`);

    // The Daimyo's safety audit (Mandatory Veto check)
    const daimyoAudit = await this.daimyo.auditSafety(targetSymbol);
    reasoningTrail.push(`[Daimyo Audit] ${daimyoAudit.isVetoed ? 'VETO EXERCISED' : 'SAFETY APPROVED'} -> "${daimyoAudit.reasoning}"`);

    // Step 5: Synthesize Council Verdict & The Shogun's Edict
    let verdict: 'EXECUTE_TRADE' | 'HONORABLE_HOLD' = 'HONORABLE_HOLD';
    let entry_price: number | undefined;
    let stop_loss: number | undefined;
    let take_profit: number | undefined;
    let risk_reward_ratio: number | undefined;
    let confidence_score = 0;
    let thesis_summary = '';

    if (daimyoAudit.isVetoed) {
      verdict = 'HONORABLE_HOLD';
      confidence_score = 0.95;
      thesis_summary = `The Daimyo vetoed ${targetSymbol} due to security red flags. Capital preserved in cash.`;
      reasoningTrail.push(`[Final Verdict] HONORABLE_HOLD. Reason: Daimyo supreme veto.`);
    } else if (activeCommander === 'The Daimyo (大名)') {
      verdict = 'HONORABLE_HOLD';
      confidence_score = 0.85;
      thesis_summary = `Macro regime is defensive. The Daimyo decrees no new exposures until market structure repairs.`;
      reasoningTrail.push(`[Final Verdict] HONORABLE_HOLD. Reason: Macro regime defensive ceiling.`);
    } else if (roninOpinion.stance === 'ACCELERATE' && daimyoAudit.stance === 'ACCELERATE') {
      verdict = 'EXECUTE_TRADE';
      entry_price = roninOpinion.suggestedAction?.entry;
      stop_loss = roninOpinion.suggestedAction?.sl;
      take_profit = roninOpinion.suggestedAction?.tp;
      risk_reward_ratio = roninOpinion.suggestedAction?.rr || 2.2;
      confidence_score = Number(((roninOpinion.conviction + shinobiOpinion.conviction + daimyoAudit.conviction) / 3).toFixed(2));
      thesis_summary = `Council alignment on ${targetSymbol}. The Ronin executes breakout with Shinobi on-chain backing and Daimyo safety clearance.`;
      reasoningTrail.push(`[Final Verdict] EXECUTE_TRADE on ${targetSymbol} at $${entry_price} (SL: $${stop_loss} | TP: $${take_profit} | R:R: ${risk_reward_ratio}).`);
    } else {
      verdict = 'HONORABLE_HOLD';
      confidence_score = 0.65;
      thesis_summary = `Council debate inconclusive on ${targetSymbol}. Stalking entry awaiting cleaner confluence.`;
      reasoningTrail.push(`[Final Verdict] HONORABLE_HOLD. Reason: Lack of unanimous council confluence.`);
    }

    // Generate the 30-Second Executive Briefing
    const thirty_second_brief = `[MARKET: ${overview.regime.toUpperCase()}] Command Seal: ${activeCommander}. Target: ${targetSymbol}. Verdict: ${verdict} (Conviction: ${(confidence_score * 100).toFixed(0)}%). ${thesis_summary}`;

    const edict: ShogunEdict = {
      edict_id: `edict_${Date.now()}`,
      timestamp,
      regime: overview.regime,
      active_commander: activeCommander,
      handover_rationale: handoverRationale,
      verdict,
      target_symbol: targetSymbol,
      entry_price,
      stop_loss,
      take_profit,
      risk_reward_ratio,
      confidence_score,
      daimyo_veto_exercised: daimyoAudit.isVetoed,
      thesis_summary,
      full_reasoning_trail: reasoningTrail,
      thirty_second_brief
    };

    this.lastEdict = edict;

    return {
      edict,
      opinions: [roninOpinion, shinobiOpinion, daimyoAudit],
      marketOverview: overview
    };
  }
}
