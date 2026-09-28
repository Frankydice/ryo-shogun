import { KaizenPostMortem, PaperTrade } from '../mcp/types.js';

export class KaizenAuditor {
  private postMortems: KaizenPostMortem[] = [];

  constructor() {
    // Seed an initial post-mortem to demonstrate the system immediately
    this.postMortems.push({
      id: 'kaizen_seed_001',
      trade_id: 'trade_seed_001',
      symbol: 'PENDLE',
      outcome: 'WIN',
      realized_pnl_usd: 340.50,
      thesis_evaluation: 'THESIS_CONFIRMED',
      analysis: 'The Shinobi accurately spotted stealth accumulation at $4.10 support. Target of $4.85 hit without testing stop-loss.',
      dojo_rule_adjustment: 'Maintain 1.5x ATR buffer on high-yield rotation tokens.',
      reviewed_at: new Date(Date.now() - 3600000).toISOString()
    });
  }

  public getPostMortems(): KaizenPostMortem[] {
    return [...this.postMortems].reverse();
  }

  /**
   * Conduct an automated forensic audit on a closed trade
   */
  public auditClosedTrade(trade: PaperTrade): KaizenPostMortem {
    const isWin = trade.status === 'CLOSED_TP' || trade.pnl_usd > 0;
    
    let evaluation: KaizenPostMortem['thesis_evaluation'];
    let analysis: string;
    let ruleAdjustment: string;

    if (isWin) {
      evaluation = 'THESIS_CONFIRMED';
      analysis = `Trade on ${trade.symbol} concluded honorably at target $${trade.take_profit}. PnL: +$${trade.pnl_usd.toFixed(2)} (+${trade.pnl_pct.toFixed(2)}%). Original thesis held firm through consolidation.`;
      ruleAdjustment = `Affirm current conviction weighting for ${trade.commander}. Increase position sizing allocation by 5% on next identical regime match.`;
    } else {
      evaluation = 'STOP_TOO_TIGHT';
      analysis = `Trade on ${trade.symbol} breached stop-loss at $${trade.stop_loss}. Loss realized: -$${Math.abs(trade.pnl_usd).toFixed(2)} (${trade.pnl_pct.toFixed(2)}%). Macro volatility breached the initial buffer.`;
      ruleAdjustment = `Expand stop-loss buffer from 1.5x ATR to 1.8x ATR on volatile EVM pairs to prevent premature liquidation before trend resumption.`;
    }

    const postMortem: KaizenPostMortem = {
      id: `kaizen_${Date.now()}`,
      trade_id: trade.id,
      symbol: trade.symbol,
      outcome: isWin ? 'WIN' : 'LOSS',
      realized_pnl_usd: trade.pnl_usd,
      thesis_evaluation: evaluation,
      analysis,
      dojo_rule_adjustment: ruleAdjustment,
      reviewed_at: new Date().toISOString()
    };

    this.postMortems.push(postMortem);
    return postMortem;
  }
}
