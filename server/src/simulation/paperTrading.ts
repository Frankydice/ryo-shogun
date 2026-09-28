import { PaperTrade, ShogunEdict } from '../mcp/types.js';
import { KaizenAuditor } from './kaizen.js';

export class PaperTradingEngine {
  private balanceUsd: number;
  private trades: PaperTrade[] = [];
  private kaizen: KaizenAuditor;

  constructor(kaizen: KaizenAuditor, initialBalance = 10000) {
    this.balanceUsd = initialBalance;
    this.kaizen = kaizen;

    // Seed one active trade to demonstrate the dashboard immediately
    this.trades.push({
      id: 'trade_seed_002',
      symbol: 'INJ',
      commander: 'The Ronin (浪人)',
      side: 'BUY',
      entry_price: 24.50,
      current_price: 24.85,
      stop_loss: 22.80,
      take_profit: 27.50,
      size_usd: 1500,
      status: 'OPEN',
      pnl_usd: 21.42,
      pnl_pct: 1.43,
      opened_at: new Date(Date.now() - 1800000).toISOString(),
      thesis: 'RSI momentum expansion above 60 with clean liquidity clearance.'
    });
  }

  public getPortfolio() {
    const openTrades = this.trades.filter(t => t.status === 'OPEN');
    const closedTrades = this.trades.filter(t => t.status !== 'OPEN');
    const unrealizedPnlUsd = openTrades.reduce((acc, t) => acc + t.pnl_usd, 0);
    const realizedPnlUsd = closedTrades.reduce((acc, t) => acc + t.pnl_usd, 0);

    return {
      balanceUsd: Number(this.balanceUsd.toFixed(2)),
      equityUsd: Number((this.balanceUsd + unrealizedPnlUsd).toFixed(2)),
      realizedPnlUsd: Number(realizedPnlUsd.toFixed(2)),
      unrealizedPnlUsd: Number(unrealizedPnlUsd.toFixed(2)),
      openPositionsCount: openTrades.length,
      closedPositionsCount: closedTrades.length,
      winRatePct: closedTrades.length > 0
        ? Number(((closedTrades.filter(t => t.pnl_usd > 0).length / closedTrades.length) * 100).toFixed(1))
        : 100.0,
      trades: [...this.trades].reverse()
    };
  }

  /**
   * Executes a paper trade from a Shogun Edict
   */
  public executeEdict(edict: ShogunEdict): PaperTrade | null {
    if (edict.verdict !== 'EXECUTE_TRADE' || !edict.target_symbol || !edict.entry_price) {
      return null;
    }

    // Check if we already have an open position for this token
    const existing = this.trades.find(t => t.symbol === edict.target_symbol && t.status === 'OPEN');
    if (existing) {
      return null;
    }

    const tradeSizeUsd = Math.min(1500, this.balanceUsd * 0.15); // 15% position size ceiling
    if (this.balanceUsd < tradeSizeUsd) {
      return null;
    }

    const trade: PaperTrade = {
      id: `trade_${Date.now()}`,
      symbol: edict.target_symbol,
      commander: edict.active_commander,
      side: 'BUY',
      entry_price: edict.entry_price,
      current_price: edict.entry_price,
      stop_loss: edict.stop_loss || Number((edict.entry_price * 0.95).toFixed(4)),
      take_profit: edict.take_profit || Number((edict.entry_price * 1.12).toFixed(4)),
      size_usd: tradeSizeUsd,
      status: 'OPEN',
      pnl_usd: 0,
      pnl_pct: 0,
      opened_at: new Date().toISOString(),
      thesis: edict.thesis_summary
    };

    this.trades.push(trade);
    return trade;
  }

  /**
   * Tick simulation: update prices and trigger SL / TP
   */
  public tickPrices(priceUpdates: Record<string, number>) {
    for (const trade of this.trades) {
      if (trade.status !== 'OPEN') continue;

      const newPrice = priceUpdates[trade.symbol] || trade.current_price;
      trade.current_price = newPrice;

      const priceDiff = trade.current_price - trade.entry_price;
      trade.pnl_pct = Number(((priceDiff / trade.entry_price) * 100).toFixed(2));
      trade.pnl_usd = Number(((trade.size_usd * trade.pnl_pct) / 100).toFixed(2));

      // Check Take Profit hit
      if (trade.current_price >= trade.take_profit) {
        trade.status = 'CLOSED_TP';
        trade.closed_at = new Date().toISOString();
        this.balanceUsd += trade.pnl_usd;
        this.kaizen.auditClosedTrade(trade);
      }
      // Check Stop Loss hit
      else if (trade.current_price <= trade.stop_loss) {
        trade.status = 'CLOSED_SL';
        trade.closed_at = new Date().toISOString();
        this.balanceUsd += trade.pnl_usd;
        this.kaizen.auditClosedTrade(trade);
      }
    }
  }

  public manuallyCloseTrade(tradeId: string): PaperTrade | null {
    const trade = this.trades.find(t => t.id === tradeId && t.status === 'OPEN');
    if (!trade) return null;

    trade.status = 'MANUALLY_CLOSED';
    trade.closed_at = new Date().toISOString();
    this.balanceUsd += trade.pnl_usd;
    this.kaizen.auditClosedTrade(trade);
    return trade;
  }
}
