import express, { Request, Response } from 'express';
import cors from 'cors';
import { RyoMcpClient } from '../server/src/mcp/client.js';
import { ShogunCouncil } from '../server/src/agents/council.js';
import { KaizenAuditor } from '../server/src/simulation/kaizen.js';
import { PaperTradingEngine } from '../server/src/simulation/paperTrading.js';

const app = express();
app.use(cors());
app.use(express.json());

const RYO_MCP_ENDPOINT = process.env.RYO_MCP_ENDPOINT || 'https://app-ryochan.com/api/mcp';
const RYO_MCP_KEY = process.env.RYO_MCP_KEY || '';

const mcpClient = new RyoMcpClient(RYO_MCP_ENDPOINT, RYO_MCP_KEY);
const council = new ShogunCouncil(mcpClient);
const kaizenAuditor = new KaizenAuditor();
const paperTrading = new PaperTradingEngine(kaizenAuditor, 10000);

let lastOpinions: any[] = [];
let lastMarketOverview: any = null;

async function ensureSession() {
  if (!lastMarketOverview) {
    try {
      const session = await council.conveneCouncil();
      lastOpinions = session.opinions;
      lastMarketOverview = session.marketOverview;
      paperTrading.executeEdict(session.edict);
    } catch (e) {
      console.error('Session init error:', e);
    }
  }
}

app.get('/api/status', (_req: Request, res: Response) => {
  res.json({
    status: 'ACTIVE',
    server_time: new Date().toISOString(),
    mcp: mcpClient.getStatus()
  });
});

app.get('/api/state', async (_req: Request, res: Response) => {
  await ensureSession();
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

app.post('/api/council/convene', async (req: Request, res: Response) => {
  try {
    const { symbol } = req.body;
    const session = await council.conveneCouncil(symbol);
    lastOpinions = session.opinions;
    lastMarketOverview = session.marketOverview;
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

app.post('/api/trades/close', (req: Request, res: Response) => {
  const { tradeId } = req.body;
  const closed = paperTrading.manuallyCloseTrade(tradeId);
  res.json({
    success: true,
    closedTrade: closed,
    portfolio: paperTrading.getPortfolio(),
    postMortems: kaizenAuditor.getPostMortems()
  });
});

app.post('/api/mcp/configure', (req: Request, res: Response) => {
  const { apiKey } = req.body;
  if (apiKey) mcpClient.setApiKey(apiKey);
  res.json({ success: true, mcp: mcpClient.getStatus() });
});

export default app;
