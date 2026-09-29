import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { RyoMcpClient } from './mcp/client.js';
import { ShogunCouncil } from './agents/council.js';
import { KaizenAuditor } from './simulation/kaizen.js';
import { PaperTradingEngine } from './simulation/paperTrading.js';
import { liveMarketService } from './services/liveMarket.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const RYO_MCP_ENDPOINT = process.env.RYO_MCP_ENDPOINT || 'https://app-ryochan.com/api/mcp';
const RYO_MCP_KEY = process.env.RYO_MCP_KEY || '';

app.use(cors());
app.use(express.json());

// Initialize core components
const mcpClient = new RyoMcpClient(RYO_MCP_ENDPOINT, RYO_MCP_KEY);
const council = new ShogunCouncil(mcpClient);
const kaizenAuditor = new KaizenAuditor();
const paperTrading = new PaperTradingEngine(kaizenAuditor, Number(process.env.SIMULATED_STARTING_BALANCE_USD) || 10000);

let lastOpinions: any[] = [];
let lastMarketOverview: any = null;

// Initial council run
async function initSession() {
  try {
    const session = await council.conveneCouncil();
    lastOpinions = session.opinions;
    lastMarketOverview = session.marketOverview;
    paperTrading.executeEdict(session.edict);
  } catch (e) {
    console.error('Initial council convene error:', e);
  }
}
initSession();

// Periodic background council & real-time price tick
const intervalMs = Number(process.env.SCAN_INTERVAL_MS) || 30000;
setInterval(async () => {
  try {
    // 1. Tick prices using 100% factual live tickers
    const tickers = await liveMarketService.getLiveTickers(['INJ', 'PENDLE', 'AAVE', 'BTC', 'ETH', 'SOL']);
    const realPrices: Record<string, number> = {};
    for (const [sym, t] of Object.entries(tickers)) {
      realPrices[sym] = t.price;
    }
    paperTrading.tickPrices(realPrices);

    // 2. Convene council cycle
    const session = await council.conveneCouncil();
    lastOpinions = session.opinions;
    lastMarketOverview = session.marketOverview;
    paperTrading.executeEdict(session.edict);
  } catch (err) {
    console.error('Background council loop error:', err);
  }
}, intervalMs);

// REST API Endpoints
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ACTIVE',
    server_time: new Date().toISOString(),
    mcp: mcpClient.getStatus()
  });
});

app.get('/api/state', (req, res) => {
  const edict = council.getLastEdict();
  const portfolio = paperTrading.getPortfolio();
  const postMortems = kaizenAuditor.getPostMortems();

  res.json({
    edict,
    opinions: lastOpinions,
    marketOverview: lastMarketOverview,
    portfolio,
    postMortems,
    mcpStatus: mcpClient.getStatus()
  });
});

app.get('/api/market/overview', async (req, res) => {
  try {
    const overview = await liveMarketService.getLiveMarketOverview();
    res.json(overview);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/market/tickers', async (req, res) => {
  try {
    const rawTickers = await liveMarketService.getLiveTickers();
    const badges: Record<string, string> = {
      BTC: 'Major',
      ETH: 'Major',
      SOL: 'L1',
      INJ: 'DeFi',
      PENDLE: 'Yield',
      AAVE: 'Lending'
    };

    const formatted = Object.values(rawTickers).map((t) => ({
      symbol: `${t.symbol}USDT`,
      badge: badges[t.symbol] || 'Token',
      price: t.price,
      change24h: t.change24h,
      high24h: t.high24h,
      low24h: t.low24h,
      volumeUsd: t.formattedVolume,
      liquidityUsd: `$${((t.volumeUsd * 0.45) / 1e6).toFixed(1)}M`,
      sparkline: 'M0,15 Q20,10 40,8 T80,4'
    }));

    res.json(formatted);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/market/klines', async (req, res) => {
  try {
    const symbol = (req.query.symbol as string) || 'INJ_USDT';
    const interval = (req.query.interval as string) || '1h';
    const limit = parseInt((req.query.limit as string) || '24', 10);
    const candles = await liveMarketService.getLiveCandles(symbol, interval, limit);
    res.json(candles);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/council/convene', async (req, res) => {
  try {
    const { symbol } = req.body;
    const session = await council.conveneCouncil(symbol);
    lastOpinions = session.opinions;
    lastMarketOverview = session.marketOverview;
    
    // Execute trade if edict was issued
    const newTrade = paperTrading.executeEdict(session.edict);

    res.json({
      success: true,
      edict: session.edict,
      opinions: session.opinions,
      marketOverview: session.marketOverview,
      newTrade
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/trades/close', (req, res) => {
  const { tradeId } = req.body;
  if (!tradeId) {
    return res.status(400).json({ error: 'Missing tradeId parameter' });
  }

  const closed = paperTrading.manuallyCloseTrade(tradeId);
  if (!closed) {
    return res.status(404).json({ error: 'Trade not found or already closed' });
  }

  res.json({
    success: true,
    closedTrade: closed,
    portfolio: paperTrading.getPortfolio(),
    postMortems: kaizenAuditor.getPostMortems()
  });
});

app.post('/api/mcp/configure', (req, res) => {
  const { apiKey } = req.body;
  if (apiKey) {
    mcpClient.setApiKey(apiKey);
  }
  res.json({ success: true, mcp: mcpClient.getStatus() });
});

app.listen(PORT, () => {
  console.log(`[RYO Shogun] Dojo Server running on http://localhost:${PORT}`);
  console.log(`[RYO Shogun] MCP Endpoint configured to: ${RYO_MCP_ENDPOINT}`);
});
